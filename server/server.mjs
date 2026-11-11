import {createServer} from 'node:http';
import {createHash,createHmac,randomBytes,timingSafeEqual,sign} from 'node:crypto';
import {readFileSync,writeFileSync,mkdirSync,renameSync,existsSync} from 'node:fs';
import {join,extname,dirname,resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';

const root=dirname(dirname(fileURLToPath(import.meta.url)));
const site=existsSync(join(root,'site','index.html'))?join(root,'site'):root;
const dataDir=resolve(process.env.BU_DATA_DIR||join(root,'private-data'));
const admin=process.env.BU_ADMIN_PASSWORD||'';
if(admin.length<16) throw Error('Set BU_ADMIN_PASSWORD to at least 16 characters.');
const port=Number(process.env.PORT||4315);
const host=process.env.HOST||'127.0.0.1';
const defaultOrigin='http://127.0.0.1:'+port;
const allowed=new Set((process.env.BU_ALLOWED_ORIGINS||defaultOrigin).split(',').map(x=>new URL(x.trim()).origin));
const driveRoot=process.env.BU_DRIVE_ROOT_ID||'';
const service=process.env.BU_DRIVE_CREDENTIALS_FILE
  ? JSON.parse(readFileSync(process.env.BU_DRIVE_CREDENTIALS_FILE,'utf8')) : null;
mkdirSync(dataDir,{recursive:true,mode:0o700});
const file=join(dataDir,'classroom.json');
const db=existsSync(file)?JSON.parse(readFileSync(file,'utf8')):{
  key:randomBytes(32).toString('hex'),rooms:[],students:[],sessions:{},files:{},placements:[],assignments:[],submissions:[]
};
db.studyProfiles ||= [];
const chapterId=/^g(?:[1-9]|1[0-2])-c[1-9][0-9]?$/;
const catalog=new Map();
const attempts=new Map(), studyAttempts=new Map();
let driveToken, syncJob;
function save() {
  writeFileSync(file+'.tmp',JSON.stringify(db),{mode:0o600});
  renameSync(file+'.tmp',file);
}
if(!existsSync(file)) save();
const hash=value=>createHash('sha256').update(value).digest('hex');
const secret=()=>randomBytes(24).toString('base64url');
const id=()=>randomBytes(10).toString('hex');
const secureEqual=(a,b)=>timingSafeEqual(Buffer.from(hash(a),'hex'),Buffer.from(hash(b),'hex'));
function fail(status,message) { throw Object.assign(new Error(message),{status}); }
function demand(condition,message,status=400) { if(!condition) fail(status,message); }
function text(value,max=120) {
  demand(typeof value==='string','Vui lòng nhập nội dung hợp lệ.');
  value=value.trim();
  demand(value.length>0&&value.length<=max,'Nội dung nằm ngoài độ dài cho phép.');
  return value;
}
function bank(chapter) {
  demand(typeof chapter==='string'&&chapterId.test(chapter),'Chương không hợp lệ.');
  if(!catalog.has(chapter)) {
    const path=join(site,'data',chapter+'.json');
    demand(existsSync(path),'Chương không tồn tại.',404);
    catalog.set(chapter,JSON.parse(readFileSync(path,'utf8')));
  }
  return catalog.get(chapter);
}
function room(id) {
  const result=db.rooms.find(r=>r.id===id);
  demand(result,'Không tìm thấy lớp.',404);
  return result;
}
function roomChapter(r,chapter) {
  bank(chapter);
  demand(chapter.startsWith('g'+r.grade+'-'),'Chương không thuộc khối của lớp.');
  return chapter;
}
function authorization(request,role) {
  const match=/^Bearer ([A-Za-z0-9_-]{32})$/.exec(request.headers.authorization||'');
  const session=match&&db.sessions[hash(match[1])];
  demand(session&&session.expires>Date.now()&&session.role===role,'Phiên đăng nhập hết hạn hoặc thiếu quyền.',401);
  if(role==='teacher') return session;
  const student=db.students.find(s=>s.id===session.studentId&&s.active);
  demand(student,'Quyền lớp đã hết hiệu lực.',403);
  return student;
}
function visible(student,placement) {
  return placement?.published&&placement.roomId===student.roomId&&db.files[placement.fileId]?.active;
}
function session(role,studentId) {
  const token=secret();
  for(const key of Object.keys(db.sessions)) if(db.sessions[key].expires<=Date.now()) delete db.sessions[key];
  db.sessions[hash(token)]={role,studentId,expires:Date.now()+(role==='teacher'?8:24)*3600e3};
  save();
  return token;
}
function authBudget(req, budgets=attempts, limit=30) {
  const current=Date.now();
  for(const [address,value] of budgets) if(value.until<current) budgets.delete(address);
  const address=req.socket.remoteAddress;
  const item=budgets.get(address)||{count:0,until:current+10*60e3};
  demand(item.count<limit,'Hãy thử lại sau ít phút.',429);
  item.count++;
  budgets.set(address,item);
}
function publicFile(placement) {
  const f=db.files[placement.fileId];
  return {id:placement.id,name:f.name,kind:f.kind,session:placement.session,order:placement.order};
}
function publicAssignment(a,student) {
  return {id:a.id,title:a.title,due:a.due,questions:a.questions.length,
    result:db.submissions.find(s=>s.assignmentId===a.id&&s.studentId===student.id)?.result||null};
}
function studentAssignment(student,id) {
  const a=db.assignments.find(a=>a.id===id&&a.roomId===student.roomId);
  demand(a&&(!a.studentId||a.studentId===student.id),'Bài giao không thuộc tài khoản.',404);
  return a;
}
function safeQuestion(q) {
  return {id:q.id,type:q.type,prompt:q.prompt,options:q.options,figure:q.figure,
    statements:q.statements?.map(s=>({text:s.text,figure:s.figure}))};
}
function score(q,response) {
  if(q.type==='mcq') return Number(response===q.answer);
  if(q.type==='tf') return q.statements.filter((s,i)=>Array.isArray(response)&&s.answer===response[i]).length;
  if(typeof response!=='string'||response.length>48) return 0;
  const source=response.trim().replace(/[−–]/g,'-').replace(/,/g,'.').replace(/\s/g,'');
  if(!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:\/[+-]?(?:\d+(?:\.\d+)?|\.\d+))?$/.test(source)) return 0;
  const [numerator,denominator='1']=source.split('/');
  return Number(Math.abs(Number(numerator)/Number(denominator)-q.answer)<=(q.tolerance||1e-6));
}
async function body(req) {
  let size=0;
  const chunks=[];
  for await(const chunk of req) {
    size+=chunk.length;
    demand(size<65536,'Yêu cầu quá lớn.',413);
    chunks.push(chunk);
  }
  try {return JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}');}
  catch {fail(400,'Dữ liệu không hợp lệ.');}
}
const DRIVE='https://www.googleapis.com/drive/v3/';
async function googleToken() {
  demand(service?.private_key&&service?.client_email&&driveRoot,'Chưa cấu hình thư mục và quyền đọc Google Drive.',503);
  if(driveToken?.expires>Date.now()+60000) return driveToken.value;
  const now=Math.floor(Date.now()/1000);
  const encoded=value=>Buffer.from(JSON.stringify(value)).toString('base64url');
  const data=encoded({alg:'RS256',typ:'JWT'})+'.'+encoded({iss:service.client_email,
    scope:'https://www.googleapis.com/auth/drive.readonly',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3600});
  const assertion=data+'.'+sign('RSA-SHA256',Buffer.from(data),service.private_key).toString('base64url');
  const response=await fetch('https://oauth2.googleapis.com/token',{method:'POST',body:new URLSearchParams({
    grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion
  }),signal:AbortSignal.timeout(15000)});
  demand(response.ok,'Google Drive từ chối xác thực. Kiểm tra quyền tài khoản dịch vụ.',502);
  const token=await response.json();
  driveToken={value:token.access_token,expires:Date.now()+token.expires_in*1000};
  return driveToken.value;
}
function fileKind(mime) {
  if(mime==='application/pdf') return 'PDF';
  if(/^video\/(mp4|webm|ogg)$/.test(mime)) return 'Video';
  if(mime==='application/vnd.google-apps.document'||mime==='text/plain') return 'Ghi chú';
  return '';
}
async function scanDrive() {
  demand(/^[\w-]+$/.test(driveRoot),'Chưa cấu hình mã thư mục Drive.',503);
  const token=await googleToken();
  const found={},todo=[driveRoot],seen=new Set();
  for(const folder of todo) {
    if(seen.has(folder)) continue;
    seen.add(folder);
    demand(seen.size<=300,'Thư mục vượt giới hạn 300 thư mục con. Hãy dùng một thư mục lớp chọn lọc.');
    let page;
    do {
      const params=new URLSearchParams({q:"'"+folder+"' in parents and trashed = false",
        fields:'nextPageToken,files(id,name,mimeType,modifiedTime)',pageSize:'1000',
        supportsAllDrives:'true',includeItemsFromAllDrives:'true'});
      if(page) params.set('pageToken',page);
      const response=await fetch(DRIVE+'files?'+params,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(20000)});
      demand(response.ok,'Lỗi đọc Google Drive. Kiểm tra quyền xem thư mục.',502);
      const data=await response.json();
      for(const f of data.files||[]) {
        if(f.mimeType==='application/vnd.google-apps.folder') todo.push(f.id);
        const kind=fileKind(f.mimeType);
        if(kind) found[f.id]={...f,kind,active:true};
      }
      page=data.nextPageToken;
    } while(page);
  }
  db.files=Object.fromEntries(Object.entries(db.files).map(([key,value])=>[key,{...value,active:false}]));
  Object.assign(db.files,found);
  db.syncedAt=new Date().toISOString();
  save();
  return {count:Object.keys(found).length,syncedAt:db.syncedAt};
}
function syncDrive() {
  syncJob ||= scanDrive().finally(()=>{syncJob=undefined;});
  return syncJob;
}
function ticket(s,placementId) {
  const data=Buffer.from(JSON.stringify([s.id,placementId,Date.now()+45*60e3])).toString('base64url');
  const signature=createHmac('sha256',db.key).update(data).digest('base64url');
  return data+'.'+signature;
}
async function media(req,res,url) {
  const [payload,signature]=String(url.searchParams.get('t')||'').split('.');
  demand(payload&&signature&&secureEqual(signature,createHmac('sha256',db.key).update(payload).digest('base64url')),
    'Liên kết xem hết hạn hoặc không hợp lệ.',403);
  const [studentId,placementId,until]=JSON.parse(Buffer.from(payload,'base64url').toString());
  const student=db.students.find(s=>s.active&&s.id===studentId);
  const placement=db.placements.find(p=>p.id===placementId);
  demand(student&&until>Date.now()&&visible(student,placement),'Tài liệu chưa mở hoặc quyền đã hết hạn.',403);
  const f=db.files[placement.fileId];
  const isDoc=f.mimeType==='application/vnd.google-apps.document';
  const remote=DRIVE+'files/'+encodeURIComponent(f.id)+(isDoc?'/export?mimeType=application%2Fpdf':'?alt=media&supportsAllDrives=true');
  const headers={Authorization:'Bearer '+await googleToken()};
  if(req.headers.range&&!isDoc) headers.Range=req.headers.range;
  const response=await fetch(remote,{headers,signal:AbortSignal.timeout(600000)});
  if(response.status===416) {res.writeHead(416).end();return;}
  demand(response.ok&&response.body,'Tệp chưa sẵn sàng trên Google Drive.',502);
  const out={'Content-Type':isDoc?'application/pdf':f.mimeType,'Content-Disposition':'inline','Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'};
  for(const key of ['content-range','content-length','accept-ranges']) {
    const value=response.headers.get(key);
    if(value&&(key!=='content-length'||!response.headers.has('content-encoding'))) out[key]=value;
  }
  res.writeHead(response.status,out);
  await pipeline(Readable.fromWeb(response.body),res);
}

function saveStudyProfile(req,payload) {
  authBudget(req,studyAttempts,180);
  const profileKey=payload.key;
  demand(typeof profileKey==='string'&&/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(profileKey),'Hồ sơ không hợp lệ.');
  const keyHash=hash(profileKey), current=db.studyProfiles.find(item=>item.keyHash===keyHash);
  if(payload.share===false) {
    if(current) {
      if(current.blocked) Object.assign(current,{name:'',grade:null,done:0,accuracy:0,chapters:[],withdrawn:true});
      else db.studyProfiles=db.studyProfiles.filter(item=>item!==current);
      save();
    }
    return {ok:true};
  }
  demand(payload.share===true,'Chọn chia sẻ hồ sơ để tiếp tục.');
  demand(!current?.blocked,'Hồ sơ này đã bị tắt đồng bộ.',403);
  const grade=Number(payload.grade);
  demand(Number.isInteger(grade)&&grade>=1&&grade<=12,'Khối lớp không hợp lệ.');
  const seen=new Set(), chapters=Array.isArray(payload.chapters)?payload.chapters:[];
  const counts=chapters.slice(0,15).filter(item=>{
    if(!item||typeof item.id!=='string'||!chapterId.test(item.id)||!item.id.startsWith('g'+grade+'-')||seen.has(item.id))return false;
    seen.add(item.id);
    return existsSync(join(site,'data',item.id+'.json'));
  }).map(item=>{
    const total=bank(item.id).chapterIds.length;
    return {id:item.id,done:Math.min(total,Math.max(0,Math.floor(Number(item.done)||0))),total};
  });
  const name=text(payload.name,70);
  const account=current||{id:id(),keyHash,blocked:false};
  Object.assign(account,{name,grade,done:counts.reduce((n,item)=>n+item.done,0),chapters:counts,
    accuracy:Math.min(100,Math.max(0,Math.round(Number(payload.accuracy)||0))),updated:new Date().toISOString(),withdrawn:false});
  if(!current) db.studyProfiles.push(account);
  save();
  return {ok:true};
}
async function api(req,path,payload) {
  if(path==='/api/study/profile'&&req.method==='POST')return saveStudyProfile(req,payload);
  if(path==='/api/login'&&req.method==='POST') {
    authBudget(req);
    const credential=text(payload.password,180);
    if(payload.role==='teacher') {
      demand(secureEqual(credential,admin),'Mật khẩu giáo viên chưa đúng.',401);
      return {token:session('teacher')};
    }
    const match=db.students.find(s=>s.active&&s.passwordHash===hash(credential));
    demand(match,'Mật khẩu lớp chưa đúng hoặc đã bị thu hồi.',401);
    return {token:session('student',match.id),name:match.name,grade:room(match.roomId).grade};
  }
  if(path.startsWith('/api/admin/')) {
    authorization(req,'teacher');
    if(path==='/api/admin/state'&&req.method==='GET') return {
      rooms:db.rooms,students:db.students.map(({passwordHash,...rest})=>rest),
      files:Object.values(db.files).filter(f=>f.active),placements:db.placements,
      assignments:db.assignments.map(({questions,...a})=>({...a,count:questions.length})),
      submissions:db.submissions,studyProfiles:db.studyProfiles.filter(s=>!s.withdrawn).map(({keyHash,...s})=>s),
      syncedAt:db.syncedAt,driveReady:Boolean(driveRoot&&service)
    };
    demand(req.method==='POST','Phương thức không hợp lệ.',405);
    if(path==='/api/admin/rooms') {
      const grade=Number(payload.grade);
      demand(Number.isInteger(grade)&&grade>=1&&grade<=12,'Chọn khối lớp hợp lệ.');
      db.rooms.push({id:id(),name:text(payload.name,70),grade});save();return {ok:true};
    }
    if(path==='/api/admin/students') {
      const group=room(payload.roomId);
      const password=secret();
      db.students.push({id:id(),roomId:group.id,name:text(payload.name,70),active:true,passwordHash:hash(password)});
      save();return {password};
    }
    if(path==='/api/admin/revoke') {
      const student=db.students.find(s=>s.id===payload.id);
      demand(student,'Không tìm thấy học sinh.',404);
      student.active=false;save();return {ok:true};
    }
    if(path==='/api/admin/study-profile') {
      const account=db.studyProfiles.find(s=>s.id===payload.id&&!s.withdrawn);
      demand(account,'Không tìm thấy hồ sơ.',404);
      account.blocked=payload.blocked===true;
      save();return {ok:true};
    }
    if(path==='/api/admin/sync') return syncDrive();
    if(path==='/api/admin/place') {
      const group=room(payload.roomId),chapter=roomChapter(group,payload.chapter);
      const label=text(payload.session,80), ids=payload.fileIds;
      demand(Array.isArray(ids)&&ids.length&&ids.length<=50&&ids.every(x=>db.files[x]?.active),'Chọn các tệp đã đồng bộ.');
      let next=1+Math.max(0,...db.placements.filter(p=>p.roomId===group.id&&p.chapter===chapter&&p.session===label).map(p=>p.order));
      for(const fileId of new Set(ids)) {
        if(!db.placements.some(p=>p.fileId===fileId&&p.roomId===group.id&&p.chapter===chapter&&p.session===label)) {
          db.placements.push({id:id(),fileId,roomId:group.id,chapter,session:label,order:next++,published:false});
        }
      }
      save();return {ok:true};
    }
    if(path==='/api/admin/material') {
      const placement=db.placements.find(p=>p.id===payload.id);
      demand(placement,'Không tìm thấy tệp đã xếp.',404);
      if(payload.remove===true) db.placements=db.placements.filter(p=>p.id!==placement.id);
      else {
        const order=Number(payload.order);
        demand(Number.isInteger(order)&&order>=1&&order<=999,'Thứ tự phải từ 1 đến 999.');
        if(payload.chapter!==undefined) {
          const group=room(placement.roomId);
          const chapter=roomChapter(group,payload.chapter);
          const label=text(payload.session,80);
          demand(!db.placements.some(p=>p!==placement&&p.roomId===group.id&&p.fileId===placement.fileId&&p.chapter===chapter&&p.session===label),'Tệp đã có trong buổi này.');
          if(placement.chapter!==chapter||placement.session!==label)placement.published=false;
          Object.assign(placement,{chapter,session:label});
        }
        placement.order=order;
      }
      save();return {ok:true};
    }
    if(path==='/api/admin/publish') {
      const group=room(payload.roomId), chapter=roomChapter(group,payload.chapter), label=text(payload.session,80);
      for(const p of db.placements) if(p.roomId===group.id&&p.chapter===chapter&&p.session===label) p.published=payload.publish===true;
      save();return {ok:true};
    }
    if(path==='/api/admin/assign') {
      const group=room(payload.roomId),chapter=roomChapter(group,payload.chapter),data=bank(chapter);
      const ids=Array.isArray(payload.ids)?[...new Set(payload.ids)]:[];
      demand(ids.length>=1&&ids.length<=20&&ids.every(x=>data.chapterIds.includes(x)),'Chọn từ 1 đến 20 câu có sẵn.');
      if(payload.studentId) demand(db.students.some(s=>s.id===payload.studentId&&s.roomId===group.id&&s.active),'Học sinh không thuộc lớp.');
      const due=payload.due||'';
      demand(due===''||/^\d{4}-\d{2}-\d{2}$/.test(due),'Ngày nộp không hợp lệ.');
      db.assignments.push({id:id(),roomId:group.id,studentId:payload.studentId||'',chapter,
        title:text(payload.title,120),due,questions:ids.map(qid=>data.questions[qid])});
      save();return {ok:true};
    }
  }
  if(path==='/api/student/chapter'&&req.method==='POST') {
    const s=authorization(req,'student'),group=room(s.roomId);
    const chapter=roomChapter(group,payload.chapter);
    return {student:s.name,room:group.name,materials:db.placements.filter(p=>visible(s,p)&&p.chapter===chapter)
      .sort((a,b)=>a.session.localeCompare(b.session,'vi',{numeric:true})||a.order-b.order).map(publicFile),
      assignments:db.assignments.filter(a=>a.roomId===s.roomId&&a.chapter===chapter&&(!a.studentId||a.studentId===s.id)).map(a=>publicAssignment(a,s))};
  }
  if(path==='/api/student/media'&&req.method==='POST') {
    const s=authorization(req,'student'),p=db.placements.find(p=>p.id===payload.id);
    demand(visible(s,p),'Bạn chưa có quyền xem tệp này.',403);
    return {url:'/api/media?t='+encodeURIComponent(ticket(s,p.id))};
  }
  if(path==='/api/student/assignment'&&req.method==='POST') {
    const s=authorization(req,'student'),a=studentAssignment(s,payload.id);
    return {id:a.id,title:a.title,due:a.due,questions:a.questions.map(safeQuestion),
      result:db.submissions.find(r=>r.assignmentId===a.id&&r.studentId===s.id)?.result||null};
  }
  if(path==='/api/student/submit'&&req.method==='POST') {
    const s=authorization(req,'student'),a=studentAssignment(s,payload.id);
    const old=db.submissions.find(r=>r.assignmentId===a.id&&r.studentId===s.id);
    if(old) return old.result;
    const today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Ho_Chi_Minh'}).format(new Date());
    demand(!a.due||today<=a.due,'Bài đã quá hạn nộp.',409);
    const details=a.questions.map(q=>{
      const correct=score(q,payload.answers?.[q.id]), units=q.type==='tf'?4:1;
      return {id:q.id,correct,units,answer:q.type==='tf'?q.statements.map(x=>x.answer):q.answer,explanation:q.explanation};
    });
    const correct=details.reduce((n,p)=>n+p.correct,0),total=details.reduce((n,p)=>n+p.units,0);
    const result={correct,total,score:Math.round(100*correct/total)/10,details,at:new Date().toISOString()};
    db.submissions.push({assignmentId:a.id,studentId:s.id,result});save();return result;
  }
  fail(404,'Không tìm thấy thao tác.');
}
const staticFiles=new Set(['index.html','admin.html','admin.js','settings.js','study-store.js','class-api.js','classroom.js','math.js','learning.js','theme.css','learning.css',
  'data/curriculum.js','data/book-notes.js','data/exams.js','assets/Inter.woff','assets/STIXTwoText.woff','assets/STIXTwoText-Italic.woff','assets/bu-icon.svg']);
function isStaticPath(path) {
  const name=path.slice(site.length+1);
  return staticFiles.has(name)||/^data\/g(?:[1-9]|1[0-2])-c[1-9][0-9]?\.json$/.test(name);
}
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.woff':'font/woff','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','no-referrer');
  const url=new URL(req.url,defaultOrigin);
  try {
    if(url.pathname.startsWith('/api/')) {
      const origin=req.headers.origin;
      if(origin) {
        demand(allowed.has(origin),'Website này chưa được phép truy cập lớp.',403);
        res.setHeader('Access-Control-Allow-Origin',origin);
        res.setHeader('Vary','Origin');
      }
      res.setHeader('Cache-Control','no-store');
      if(req.method==='OPTIONS') {
        res.writeHead(204,{'Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Allow-Methods':'GET, POST, OPTIONS'}).end();
        return;
      }
      if(url.pathname==='/api/media'&&req.method==='GET') {await media(req,res,url);return;}
      const response=await api(req,url.pathname,req.method==='POST'?await body(req):{});
      res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'}).end(JSON.stringify(response));
      return;
    }
    demand(req.method==='GET','Phương thức không hợp lệ.',405);
    const path=resolve(site,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
    demand(path.startsWith(site+sep)&&isStaticPath(path)&&types[extname(path)]&&existsSync(path),'Không tìm thấy trang.',404);
    res.writeHead(200,{'Content-Type':types[extname(path)]}).end(readFileSync(path));
  } catch(error) {
    if(res.headersSent) {if(!res.destroyed) res.destroy();return;}
    const status=error.status||500;
    if(status===500) console.error(error.name,error.code||'');
    res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'}).end(JSON.stringify({error:error.status?error.message:'Máy chủ lớp học gặp lỗi.'}));
  }
});
server.listen(port,host,()=>console.log('Bu Education classroom listening on port '+port));
if(service&&driveRoot) {
  const refresh=()=>syncDrive().catch(error=>console.warn(error.message));
  refresh();
  setInterval(refresh,15*60e3).unref();
}
