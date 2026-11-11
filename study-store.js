const buStudy = (() => {
  'use strict';
  const prefix = 'bu-pages-v1:';
  const memory = new Map();
  const loaded = new Map();
  const families = new WeakMap();
  const groups = buCurriculum;
  const chapters = new Map(groups.flatMap(g=>g.chapters.map(c=>[c.id,{...c,grade:g.grade}])));
  const tags = ['recognize','apply','trap'];
  const format = ['mixed','mcq','tf','short'];
  function read(key,fallback) {
    if (memory.has(key)) return memory.get(key);
    try {
      const value=JSON.parse(localStorage.getItem(prefix+key));
      if (value!==null) return value;
    } catch {}
    return fallback;
  }
  function write(key,value) {
    try {
      localStorage.setItem(prefix+key,JSON.stringify(value));
      memory.delete(key);
    } catch { memory.set(key,value); }
  }
  function profile(id) {
    const current = read('profile:'+id,null);
    if (!current) throw Error('AUTH: Chọn hồ sơ để tiếp tục.');
    return current;
  }
  function save(current) { write('profile:'+current.user.id,current); }
  function activeRun(current,id) {
    const run=current.runs.find(r=>r.id===id);
    if(!run) throw Error('Không tìm thấy bài đã lưu.');
    return run;
  }
  async function bank(id) {
    if(!chapters.has(id)) throw Error('Chương không hợp lệ.');
    if(!loaded.has(id)) {
      loaded.set(id,fetch('data/'+id+'.json').then(r=>{
        if(!r.ok) throw Error('Chưa tải được kho câu hỏi. Thử lại khi có kết nối.');
        return r.json();
      }).then(data=>{
        const reviewedByLesson={};
        for(const lesson of workbookLessons(chapters.get(id))){
          if(!lesson.review)continue;
          const questions=reviewedMethodQuestions(id,lesson).flatMap(group=>group.questions);
          questions.push(...reviewedChapterQuestions(id,lesson));
          reviewedByLesson[lesson.id]=questions.map(q=>q.id);
          for(const q of questions)data.questions[q.id]=q;
        }
        const reviewedIds=Object.values(reviewedByLesson).flat();
        return {...data,reviewedByLesson,reviewedIds,
          practiceChapterIds:buReviewedChapters.includes(id)?reviewedIds:[...reviewedIds,...data.chapterIds]};
      }).catch(error=>{loaded.delete(id);throw error;}));
    }
    return loaded.get(id);
  }
  function publicQuestion(q) {
    const {id,chapterId,type,kind,level,prompt,figure,focus,options,statements,tags}=q;
    return {id,chapterId,type,kind,level,prompt,figure,focus,options,tags,
      statements:statements?.map(({text,figure})=>({text,figure}))};
  }
  function parseNumber(value) {
    const clean=String(value).replace(/[−–]/g,'-').replace(/\s/g,'').replace(/,/g,'.');
    const valid=/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:\/[+-]?(?:\d+(?:\.\d+)?|\.\d+))?$/;
    if(clean.length>48 || !valid.test(clean)) return NaN;
    const [a,b='1']=clean.split('/');
    return Number(a)/Number(b);
  }
  function grade(q,selected,hinted,partial=false) {
    let complete, correct, units, parts=null;
    if (q.type==='written') {
      selected=String(selected??'').trim();
      complete=selected.length>0&&selected.length<=1500;
      units=correct=0;
    } else if (q.type==='order') {
      selected=String(selected??'').trim().split(/[\s,]+/u).map(Number);
      units=1;
      complete=selected.length===q.options.length&&new Set(selected).size===selected.length&&
        selected.every(n=>Number.isInteger(n)&&n>=1&&n<=q.options.length);
      correct=complete&&selected.every((n,i)=>n===q.answer[i])?1:0;
      selected=selected.join(' ');
    } else if (q.type==='tf') {
      units=4;
      selected=Array.from({length:4},(_,i)=>typeof selected?.[i]==='boolean'?selected[i]:null);
      complete=selected.every(x=>x!==null);
      parts=q.statements.map(({text,figure,answer,explanation},i)=>
        ({text,figure,answer,explanation,selected:selected[i],correct:selected[i]===answer}));
      correct=parts.filter(p=>p.correct).length;
    } else if (q.type==='mcq') {
      units=1;
      complete=Number.isInteger(selected) && selected>=0 && selected<q.options.length;
      selected=complete?selected:null;
      correct=complete&&selected===q.answer?1:0;
    } else {
      units=1;
      const number=parseNumber(selected??'');
      complete=Number.isFinite(number);
      selected=complete?String(selected).trim():null;
      correct=complete&&Math.abs(number-Number(q.answer))<=(q.tolerance||1e-6)?1:0;
    }
    const invalid={short:'Nhập một số hoặc phân số hợp lệ.',order:'Nhập mỗi số một lần, cách nhau bằng dấu cách.',written:'Nhập bài làm từ 1 đến 1500 ký tự.'};
    if(!complete&&!partial) throw Error(invalid[q.type]||'Chọn đủ đáp án để kiểm tra.');
    return {id:q.id,question:publicQuestion(q),selected,answer:q.answerText??q.answer,parts,correct,units,
      allCorrect:units>0&&correct===units,complete,explanation:q.explanation,rule:q.rule,trap:q.trap,
      hinted,at:new Date().toISOString()};
  }
  function worksheetItem(current,q) {
    const previous=current.bookResponses?.[q.id];
    return {question:publicQuestion(q),hint:q.hint||q.rule||'',feedback:previous?
      grade(q,previous.response,previous.hinted,true):null};
  }
  function exerciseStem(text) {
    return normalize(text).replace(/[−–]/gu,'-').replace(/\d+(?:[,.]\d+)?/gu,'#')
      .replace(/\s*dien ket qua bang so,? khong ghi don vi[.!]?$/gu,'')
      .replace(/\s+/gu,' ').replace(/[.!?]+$/gu,'').trim();
  }
  function questionFamily(q) {
    if(!families.has(q))families.set(q,q.family||(q.type==='tf'?
      q.statements.map(s=>exerciseStem(s.text)).sort().join(' | '):exerciseStem(q.prompt)));
    return families.get(q);
  }
  function validExercise(q) {
    if(!q)return false;
    if(q.type!=='tf')return q.type==='mcq'||q.type==='short';
    return q.statements?.length===4&&q.statements.every(s=>!s.text.includes('Đáp án đề xuất'))&&
      new Set(q.statements.map(s=>exerciseStem(s.text))).size===4;
  }
  function lessonQuestions(data,lessonId) {
    return lessonId?(data.reviewedByLesson[lessonId]??data.byLesson[lessonId]):data.practiceChapterIds;
  }
  function practicePool(data,ids,type,levels) {
    return ids.map(id=>data.questions[id]).filter(q=>validExercise(q)&&(type==='mixed'||q.type===type)&&
      (!levels.length||levels.some(tag=>q.tags.includes(tag))));
  }
  function methodQuestions(chapter) {
    const entries=workbookLessons(chapter).flatMap((lesson,li)=>getBookMethods(lesson).map(({method},mi)=>{
      const scope=bookLessonKey(lesson,li)+'-method-'+(mi+1);
      if(lesson.review)return [scope,{lessonId:lesson.id,questions:reviewedMethodQuestions(chapter.id,lesson)[mi].questions}];
      const id=chapter.id+'-'+scope;
      const {original,useWorked}=bookMethodPractice(chapter.id,scope,method);
      const questions=[];
      original.forEach((q,i)=>questions.push({...q,id:id+'-short-'+(i+1),type:'short'}));
      const example=useWorked?method.worked.at(-1):null;
      if(method.practice||example){
        const [prompt,hint,answer]=method.practice||[example[1],'',example[3]];
        const explanation=example?.[2].join('\n')||'';
        questions.push({id:id+'-written',type:'written',prompt,hint,answer,explanation});
      }
      return [scope,{lessonId:lesson.id,questions}];
    }));
    return Object.fromEntries(entries);
  }
  function storedProgress(current,chapter,lesson='') {
    return Object.values(current.marks[chapter.id]||{}).filter(p=>lesson?p.lessonId===lesson:p.whole);
  }
  function progress(current,chapter,lesson='') {
    const marks=storedProgress(current,chapter,lesson);
    const total=lesson?lessonCatalog[chapter.id].find(l=>l.id===lesson)?.formats.mixed||0:chapter.total;
    const correct=marks.reduce((n,p)=>n+p.correct,0),units=marks.reduce((n,p)=>n+p.units,0);
    const completion=total?Math.min(100,Math.round(marks.length/total*100)):0;
    const accuracy=units?Math.round(correct/units*100):0;
    return {id:lesson||chapter.id,title:chapter.title,done:marks.length,total,completion,accuracy,
      wrong:marks.filter(p=>p.correct<p.units).length,badge:completion>=75&&accuracy>=80?'Nắm chắc':''};
  }
  function day(iso) { return new Intl.DateTimeFormat('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'}).format(new Date(iso)); }
  function runSummary(r) {
    const {id,chapterId,lessonId,title,mode,type,grade,started,updated,paperId}=r;
    return {id,chapterId,lessonId,title,mode,type,grade,paperId,count:r.ids.length,answered:Object.keys(r.feedback).length,started,updated};
  }
  function dashboard(current) {
    const currentChapters=groups.find(g=>g.grade===current.user.grade).chapters;
    const summaries=currentChapters.map(c=>progress(current,c));
    const lessons={};
    for(const c of currentChapters) {
      const saved=Object.values(current.marks[c.id]||{});
      for(const id of new Set(saved.flatMap(m=>Object.keys(m.lessons||{})))) lessons[id]=lessonProgress(current,c,id);
    }
    const marks=currentChapters.flatMap(c=>Object.values(current.marks[c.id]||{}));
    const correct=marks.reduce((n,p)=>n+p.correct,0),units=marks.reduce((n,p)=>n+p.units,0);
    const today=day(Date.now());
    const visible=current.runs.filter(r=>r.grade===current.user.grade);
    return {active:visible.filter(r=>!r.result).sort((a,b)=>b.updated-a.updated).map(runSummary),
      history:visible.filter(r=>r.result).sort((a,b)=>b.updated-a.updated).map(r=>{
        const {id,title,grade,score,correct,total,finishedAt:date}=r.result;
        return {id,title,grade,score,correct,total,date};
      }),assignments:[],chapters:summaries,lessons,total:marks.length,today:marks.filter(p=>day(p.firstAt)===today).length,
      accuracy:units?Math.round(correct/units*100):0,dailyGoal:8,
      completedChapters:summaries.filter(c=>c.completion===100).length};
  }
  function lessonProgress(current,chapter,lesson) {
    const scoped=Object.values(current.marks[chapter.id]||{}).map(p=>p.lessons?.[lesson]).filter(Boolean);
    const total=lessonCatalog[chapter.id].find(l=>l.id===lesson)?.formats.mixed||0;
    const correct=scoped.reduce((n,p)=>n+p.correct,0),units=scoped.reduce((n,p)=>n+p.units,0);
    return {id:lesson,done:scoped.length,total,completion:total?Math.round(scoped.length/total*100):0,
      accuracy:units?Math.round(correct/units*100):0,wrong:scoped.filter(p=>p.correct<p.units).length};
  }
  function enter(current) {
    return {token:current.user.id,role:'student',user:current.user,curriculum:groups,dashboard:dashboard(current)};
  }
  async function runBank(run) {
    if(run.paperId){
      const paper=buExamPapers.find(item=>item.id===run.paperId);
      if(!paper)throw Error('Không tìm thấy đề đã lưu.');
      return {questions:Object.fromEntries(paper.questions.map(q=>[q.id,q])),chapterIds:[]};
    }
    if (!run.chapters) return bank(run.chapterId);
    const banks = await Promise.all(run.chapters.map(bank));
    return {questions:Object.assign({},...banks.map(data=>data.questions)),chapterIds:banks.flatMap(data=>[...data.chapterIds,...data.reviewedIds]),
      practiceChapterIds:banks.flatMap(data=>data.practiceChapterIds)};
  }
  function quiz(r,data) {
    return {...runSummary(r),chapterTitle:chapters.get(r.chapterId).title,deadline:r.deadline||r.started+86400000,
      questions:r.ids.map(id=>publicQuestion(data.questions[id])),
      drafts:r.drafts,feedback:Object.values(r.feedback),hints:r.hints};
  }
  function select(pool,count,levels,marks,review,recent=new Set(),mixed=false) {
    const randomized=pool.map(q=>({q,tie:Math.random()}));
    const recentFamilies=new Set(pool.filter(q=>recent.has(q.id)).map(questionFamily));
    randomized.sort((a,b)=>{
      if (review) return a.tie-b.tie;
      const ageA=marks[a.q.id]?Date.parse(marks[a.q.id].at):0;
      const ageB=marks[b.q.id]?Date.parse(marks[b.q.id].at):0;
      return Number(recentFamilies.has(questionFamily(a.q)))-Number(recentFamilies.has(questionFamily(b.q)))||
        Number(recent.has(a.q.id))-Number(recent.has(b.q.id))||ageA-ageB||
        Number(Boolean(b.q.reviewed))-Number(Boolean(a.q.reviewed))||a.tie-b.tie;
    });
    const used=new Set(),families=new Set(),picked=[];
    const rotation=levels.length?levels:[''];
    while(picked.length<count && picked.length<pool.length) {
      let added=false;
      for(const tag of rotation) {
        if(picked.length===count) break;
        const candidate=({q})=>!used.has(q.id)&&!families.has(questionFamily(q))&&(!tag||q.tags.includes(tag));
        const preferredType=['mcq','tf','short'][picked.length%3];
        const found=(mixed&&randomized.find(item=>candidate(item)&&item.q.type===preferredType))||randomized.find(candidate);
        if(!found) continue;
        used.add(found.q.id);
        families.add(questionFamily(found.q));
        picked.push(found.q.id);
        added=true;
      }
      if(!added) break;
    }
    return picked;
  }
  function recentQuestions(current) {
    return new Set(current.runs.slice(0,4).flatMap(run=>run.ids));
  }
  function record(current,r,q,mark,whole) {
    const history=current.marks[q.chapterId||r.chapterId]||={};
    const previous=history[q.id];
    const lessons=previous?.lessons||{};
    if(r.lessonId) lessons[r.lessonId]={correct:mark.correct,units:mark.units};
    history[q.id]={correct:mark.correct,units:mark.units,firstAt:previous?.firstAt||mark.at,at:mark.at,
      whole:whole||previous?.whole||false,lessonId:r.lessonId,lessons};
  }
  const methods = {
    login(name,unusedBirthday,selectedGrade) {
      name=String(name).normalize('NFC').trim().replace(/\s+/g,' ');
      const grade=Number(selectedGrade);
      if(name.length<2 || name.length>70 || !groups.some(g=>g.grade===grade)) throw Error('Nhập tên và chọn lớp.');
      const list=read('profiles',[]);
      let user=list.find(u=>u.name.toLocaleLowerCase('vi')===name.toLocaleLowerCase('vi')&&u.grade===grade);
      if(!user) {
        user={id:crypto.randomUUID(),name,grade};
        write('profiles',[...list,user]);
        save({user,marks:{},runs:[]});
      }
      return enter(profile(user.id));
    },
    bootstrap(id) { return enter(profile(id)); },
    logout() { return true; },
    getDashboard(id) { return dashboard(profile(id)); },
    async exerciseAvailability(id,{chapters:ids,lessonId='',type='mixed',levels=[]}) {
      const grade=profile(id).user.grade;
      if(ids.some(id=>chapters.get(id)?.grade!==grade))throw Error('Chương không thuộc lớp đã chọn.');
      const banks=await Promise.all(ids.map(bank));
      const available=banks.flatMap(data=>practicePool(data,lessonQuestions(data,lessonId)||[],type,levels));
      return new Set(available.map(questionFamily)).size;
    },
    async startQuiz(id,request) {
      const chapter=chapters.get(request.chapterId);
      if(!chapter||chapter.grade!==profile(id).user.grade) throw Error('Chương không thuộc lớp đã chọn.');
      const data=await bank(chapter.id);
      const current=profile(id);
      const lessonId=request.lessonId||'';
      const review=request.mode==='review';
      const ids=review?(lessonId?[...data.byLesson[lessonId]||[],...data.reviewedByLesson[lessonId]||[]]:[...data.chapterIds,...data.reviewedIds]):lessonQuestions(data,lessonId);
      if(!ids) throw Error('Bài học không hợp lệ.');
      const type=format.includes(request.type)&&!review?request.type:'mixed';
      const levels=review?[]:tags.filter(t=>request.levels?.includes(t));
      const marks=current.marks[chapter.id]||{};
      const pool=practicePool(data,ids,type,levels).filter(q=>!review||(marks[q.id]&&marks[q.id].correct<marks[q.id].units));
      if(!pool.length) throw Error(review?'Chương này chưa có câu cần ôn lại.':'Đổi phạm vi hoặc mức luyện để có thêm câu.');
      const count=Number.isInteger(request.count)?Math.min(20,Math.max(1,request.count)):6;
      const lesson=lessonCatalog[chapter.id].find(l=>l.id===lessonId);
      const now=Date.now();
      const r={id:crypto.randomUUID(),chapterId:chapter.id,lessonId,title:lesson?.title||chapter.title,
        grade:chapter.grade,mode:review?'review':'practice',type,ids:select(pool,count,levels,marks,review,recentQuestions(current),type==='mixed'),
        started:now,updated:now,drafts:{},feedback:{},hints:[]};
      current.runs.unshift(r);
      save(current);
      return quiz(r,data);
    },
    async bookWorksheet(id,chapterId) {
      const chapter=chapters.get(chapterId);
      if(chapter?.grade!==profile(id).user.grade)throw Error('Chương không thuộc lớp đã chọn.');
      const data=await bank(chapterId), current=profile(id);
      const methods=methodQuestions(chapter);
      const used=new Set(Object.values(methods).flatMap(method=>method.questions.filter(validExercise).map(questionFamily)));
      const scoped=(ids,perType)=>{
        const picked=[];
        for(const type of ['mcq','tf','short']) {
          const pool=practicePool(data,ids,type,[]);
          for(const level of tags.slice(0,perType)) {
            const unique=q=>!used.has(questionFamily(q));
            const next=pool.find(q=>unique(q)&&q.tags.includes(level))||pool.find(unique);
            if(next){picked.push(next);used.add(questionFamily(next));}
          }
        }
        return picked.map(q=>worksheetItem(current,q));
      };
      const lessons=Object.fromEntries(Object.keys(data.byLesson).map(lesson=>[lesson,scoped(lessonQuestions(data,lesson),1)]));
      const end=scoped(data.practiceChapterIds,3);
      const examples={};
      for(const [lesson,ids] of Object.entries(data.byLesson)){
        if(data.reviewedByLesson[lesson])continue;
        const pool=practicePool(data,ids,'mixed',[]).filter(q=>q.type!=='tf'&&!used.has(questionFamily(q))&&q.explanation?.length>=45);
        const example=pool.find(q=>q.tags.includes('apply')&&q.type==='short')||pool.find(q=>q.tags.includes('apply'))||pool[0];
        if(example){
          used.add(questionFamily(example));
          examples[lesson]={question:publicQuestion(example),answer:example.answer,explanation:example.explanation};
        }
      }
      return {end,lessons,examples,methods:Object.fromEntries(Object.entries(methods).map(([scope,{lessonId,questions}])=>
        [scope,{lessonId,items:questions.map(q=>worksheetItem(current,q))}]))};
    },
    async checkBookExercise(id,chapterId,lessonId,qid,response,hinted,scope='') {
      const chapter=chapters.get(chapterId);
      if(chapter?.grade!==profile(id).user.grade)throw Error('Chương không thuộc lớp đã chọn.');
      const data=await bank(chapterId), current=profile(id);
      const ids=[...(lessonQuestions(data,lessonId)||[]),...(lessonId?data.byLesson[lessonId]||[]:data.chapterIds)];
      const method=scope?methodQuestions(chapter)[scope]:null;
      const question=scope?(method?.lessonId===lessonId?method.questions.find(q=>q.id===qid):null):
        (ids?.includes(qid)?data.questions[qid]:null);
      if(!question)throw Error('Bài tập không thuộc phạm vi này.');
      const mark=grade(question,response,Boolean(hinted));
      const responses=current.bookResponses||={};
      responses[qid]={response:mark.selected,hinted:mark.hinted};
      if(data.questions[qid])record(current,{chapterId,lessonId},question,mark,data.practiceChapterIds.includes(qid)||data.chapterIds.includes(qid));
      save(current);
      return mark;
    },
    async startSemester(id,request) {
      const initial=profile(id);
      const ids=[...new Set(Array.isArray(request.chapters)?request.chapters:[])];
      if(!ids.length||ids.some(id=>chapters.get(id)?.grade!==initial.user.grade))throw Error('Chọn chương thuộc khối đang học.');
      const periods={mid1:'Giữa kỳ I',end1:'Cuối kỳ I',mid2:'Giữa kỳ II',end2:'Cuối kỳ II'};
      if(!Object.hasOwn(periods,request.period)||![30,45,60,90].includes(request.minutes))throw Error('Kỳ kiểm tra hoặc thời gian không hợp lệ.');
      const data=await runBank({chapters:ids});
      const current=profile(id), grade=current.user.grade;
      const type=format.includes(request.type)?request.type:'mixed';
      const levels=tags.filter(tag=>request.levels?.includes(tag));
      const pool=practicePool(data,data.practiceChapterIds,type,levels);
      if(!pool.length)throw Error('Không có câu phù hợp với bộ lọc này.');
      const count=Number.isInteger(request.count)?Math.min(20,Math.max(1,request.count)):6;
      const marks=Object.assign({},...ids.map(chapter=>current.marks[chapter]));
      const now=Date.now();
      const r={id:crypto.randomUUID(),chapterId:ids[0],chapters:ids,lessonId:'',title:periods[request.period]+' · Toán '+grade,
        grade,mode:'semester',period:request.period,type,ids:select(pool,count,levels,marks,false,recentQuestions(current),type==='mixed'),started:now,
        deadline:now+request.minutes*60000,updated:now,drafts:{},feedback:{},hints:[]};
      current.runs.unshift(r);
      save(current);
      return quiz(r,data);
    },
    async startReferencePaper(id,paperId) {
      const current=profile(id), paper=buExamPapers.find(p=>p.id===paperId&&p.grade===current.user.grade);
      if(!paper)throw Error('Đề không thuộc lớp đã chọn.');
      const now=Date.now();
      const r={id:crypto.randomUUID(),chapterId:paper.chapterId,lessonId:'',title:paper.title,grade:paper.grade,
        mode:'semester',paperId,period:paper.period,type:'mixed',ids:paper.questions.map(q=>q.id),
        started:now,deadline:now+paper.minutes*60000,updated:now,drafts:{},feedback:{},hints:[]};
      current.runs.unshift(r);
      save(current);
      return quiz(r,await runBank(r));
    },
    async resumeQuiz(id,runId) {
      const current=profile(id),r=activeRun(current,runId),data=await runBank(r);
      return r.result?{finished:true,result:makeResult(r,data)}:quiz(r,data);
    },
    async getHint(id,runId,qid) {
      const first=activeRun(profile(id),runId),data=await runBank(first);
      const current=profile(id),r=activeRun(current,runId);
      if(r.result||r.mode==='semester'||!r.ids.includes(qid)) throw Error('Câu hỏi không thuộc lượt luyện.');
      if(!r.hints.includes(qid)) {r.hints.push(qid);save(current);}
      return {hint:data.questions[qid].hint||data.questions[qid].rule||'Đọc lại điều kiện của đề.'};
    },
    async answerQuestion(id,runId,qid,response) {
      const first=activeRun(profile(id),runId),data=await runBank(first);
      const current=profile(id),r=activeRun(current,runId);
      if(r.result||r.mode==='semester'||!r.ids.includes(qid)) throw Error('Câu hỏi không thuộc lượt luyện.');
      const feedback=r.feedback[qid] ||= grade(data.questions[qid],response,r.hints.includes(qid));
      delete r.drafts[qid];
      r.updated=Date.now();
      record(current,r,data.questions[qid],feedback,data.chapterIds.includes(qid)||data.reviewedIds?.includes(qid));
      save(current);
      const chapter=chapters.get(r.chapterId);
      return {feedback,chapterProgress:progress(current,chapter),lessonProgress:r.lessonId?lessonProgress(current,chapter,r.lessonId):null};
    },
    saveProgress(id,runId,patch) {
      const current=profile(id),r=activeRun(current,runId);
      if(!r.result) {
        for(const [qid,value] of Object.entries(patch||{})) if(r.ids.includes(qid)&&!r.feedback[qid]) r.drafts[qid]=value;
        r.updated=Date.now();
        save(current);
      }
      return {saved:runSummary(r)};
    },
    pauseQuiz(id,runId,patch) { return methods.saveProgress(id,runId,patch); },
    async submitQuiz(id,runId,drafts) {
      const first=activeRun(profile(id),runId),data=await runBank(first);
      const current=profile(id),r=activeRun(current,runId);
      if(r.result) return makeResult(r,data);
      for(const qid of r.ids) if(!r.feedback[qid]) {
        const mark=grade(data.questions[qid],drafts?.[qid]??r.drafts[qid],r.hints.includes(qid),true);
        r.feedback[qid]=mark;
        if(!r.paperId&&(mark.complete||mark.parts?.some(p=>p.selected!==null)))record(current,r,data.questions[qid],mark,
          data.chapterIds.includes(qid)||data.reviewedIds?.includes(qid));
      }
      const details=Object.values(r.feedback);
      const correct=details.reduce((n,p)=>n+p.correct,0),total=details.reduce((n,p)=>n+p.units,0);
      r.updated=Date.now();
      r.result={id:r.id,chapterId:r.chapterId,chapterIds:r.chapters,period:r.period,lessonId:r.lessonId,mode:r.mode,paperId:r.paperId,title:r.title,grade:r.grade,correct,total,
        score:Math.round(correct/total*100)/10,seconds:Math.floor((r.updated-r.started)/1000),finishedAt:new Date(r.updated).toISOString()};
      r.drafts={};
      current.runs=current.runs.filter(r=>!r.result||current.runs.filter(x=>x.result).indexOf(r)<30);
      save(current);
      return makeResult(r,data);
    },
    async getResult(id,runId) {
      const r=activeRun(profile(id),runId);
      if(!r.result) throw Error('Bài vẫn đang làm.');
      return makeResult(r,await runBank(r));
    },
    async getMistakes(id,chapterId) {
      const current=profile(id),found=[];
      const selected=groups.find(g=>g.grade===current.user.grade).chapters.filter(c=>!chapterId||c.id===chapterId);
      await Promise.all(selected.filter(c=>Object.keys(current.marks[c.id]||{}).length).map(async chapter=>{
        const data=await bank(chapter.id);
        for(const [qid,mark] of Object.entries(current.marks[chapter.id])) {
          const q=data.questions[qid];
          if(!q||mark.correct>=mark.units) continue;
          const lesson=lessonCatalog[chapter.id].find(l=>l.id===mark.lessonId);
          found.push({question:publicQuestion(q),trap:q.trap||'Đọc lại cách giải',chapterId:chapter.id,
            chapterTitle:lesson?.title||chapter.title,lessonId:lesson?.id||'',at:mark.at});
        }
      }));
      return found.sort((a,b)=>b.at.localeCompare(a.at)).slice(0,150);
    }
  };
  function makeResult(r,data) {
    return {chapterIds:r.chapters,period:r.period,lessonId:r.lessonId,mode:r.mode,...r.result,details:r.ids.map(id=>r.feedback[id]||grade(data.questions[id],null,false,true))};
  }
  return {call(method,...args) {
    if(!Object.hasOwn(methods,method)) return Promise.reject(Error('Tính năng cần kết nối máy chủ của lớp.'));
    return Promise.resolve().then(()=>methods[method](...args));
  }};
})();
