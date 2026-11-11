'use strict';

const examKinds = {mid1:'Giữa kỳ I', end1:'Cuối kỳ I', mid2:'Giữa kỳ II', end2:'Cuối kỳ II'};
const learningOptions = {chapter:'', lesson:'', period:'mid1', mode:'custom', selected:null};
function gradeField(grade, id) {
  return '<label class="learn-field">Khối lớp<select id="'+id+'">'+gradeOptions(grade)+'</select></label>';
}
function formatChapter(chapter) {
  return chapter.title.replace(/^(Chương|Chủ đề)\s*\d+\s*[:.]?\s*/u,'');
}
async function changeLearningGrade(grade, page) {
  try {
    const current = await rpc('login',state.user.name,'',grade);
    state.token = current.token;
    storage.set('bu_pages_token',current.token);
    storage.set('tmn_grade',grade);
    state.chapter=state.lesson='';
    learningOptions.chapter=learningOptions.lesson='';
    learningOptions.selected=null;
    enter(current,page);
  } catch (error) { fail(error); }
}
function renderPortalHome() {
  state.page='home';
  state.quiz=null;
  setNav('home');
  const name=state.user.name.trim().split(/\s+/).at(-1);
  const cards=[
    ['study','book','Tự học','Mở sách Toán theo chương, học từng dạng và kiểm tra đáp án ngay trên trang.'],
    ['exam','target','Luyện thi','Tạo đề theo bài hoặc ôn giữa kỳ, cuối kỳ.'],
    ['online','classroom','Học viên online','Dùng mật khẩu học viên để xem lại buổi học và bài được giao.']
  ];
  $('#main').innerHTML='<div class="portal-home"><header class="hub-cover"><h1>Chào '+esc(name)+'</h1><p>Toán lớp '+state.user.grade+
    '</p>'+heroArt+'</header><section class="hub-grid" aria-label="Chọn khu học">'+cards.map(([key,asset,title,copy])=>
      '<button type="button" class="hub-card" data-hub="'+key+'"><span class="hub-card-icon">'+icon(asset)+'</span>'+icon('arrow')+
      '<strong>'+title+'</strong><small>'+copy+'</small></button>').join('')+
      '</section><a href="admin.html" class="hub-host">Cổng Host ↗</a></div>';
  $$('[data-hub]').forEach(card=>card.onclick=()=>navigate(card.dataset.hub));
}
function examSources(grade,period) {
  return (buExamSources[grade]?.[period]||[]).map(([title,url,year])=>
    '<article class="exam-source"><div><strong>'+esc(title)+'</strong><small>'+esc(year)+' · TOANMATH</small></div>'+
    '<a class="btn secondary" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+
    (url.endsWith('.html')?'Mở đề gốc':'Xem kho đề')+' ↗</a></article>').join('');
}
function renderExam() {
  state.page='exam';
  state.quiz=null;
  setNav('exam');
  const grade=state.user.grade, chapters=group(grade).chapters;
  if(!chapters.some(chapter=>chapter.id===learningOptions.chapter))learningOptions.chapter=chapters[0].id;
  const active=state.dashboard.active;
  $('#main').innerHTML='<div class="learn-cover exam-cover"><div><h1>Luyện thi Toán '+grade+'</h1>'+
    '<p>Tạo bài theo chương, bài học hoặc chọn kỳ kiểm tra.</p></div>'+gradeField(grade,'examGrade')+'</div>'+
    '<div class="exam-tools"><div class="exam-switch" role="group" aria-label="Chế độ luyện thi">'+
    '<button type="button" data-mode="custom">Theo chương và bài</button><button type="button" data-mode="semester">Giữa kỳ và cuối kỳ</button></div>'+
    '<div class="exam-links"><button type="button" id="examMistakes">Sổ lỗi</button><button type="button" id="examHistory">Kết quả</button></div></div>'+
    (active.length?'<details class="exam-saved"><summary>Bài đang làm ('+active.length+')</summary>'+
      active.map(run=>'<button type="button" data-exam-resume="'+esc(run.id)+'">'+esc(run.title)+' · '+run.count+' câu '+icon('arrow')+'</button>').join('')+'</details>':'')+
    '<div id="examContent"></div>';
  $('#examGrade').onchange=e=>changeLearningGrade(e.target.value,'exam');
  $('#examMistakes').onclick=()=>navigate('mistakes');
  $('#examHistory').onclick=()=>navigate('history');
  $$('[data-exam-resume]').forEach(b=>b.onclick=()=>resume(b.dataset.examResume));
  $$('[data-mode]').forEach(b=>b.onclick=()=>{learningOptions.mode=b.dataset.mode;renderExamOptions(chapters);});
  renderExamOptions(chapters);
}
function renderExamOptions(chapters) {
  const semester=learningOptions.mode==='semester';
  $$('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===learningOptions.mode)));
  const chapter=chapters.find(c=>c.id===learningOptions.chapter);
  const lessons=lessonCatalog[chapter.id];
  const lesson=lessons.find(item=>item.id===learningOptions.lesson);
  const levels=Object.entries(practiceLevels).map(([key,name])=>
    '<label><input type="checkbox" name="level" value="'+key+'" '+(state.levels.includes(key)?'checked':'')+'>'+name+'</label>').join('');
  const source=examSources(state.user.grade,learningOptions.period);
  $('#examContent').innerHTML='<div class="exam-columns"><form class="exam-form" id="examForm"><h2>'+
    (semester?'Đề mô phỏng':'Tạo bài luyện')+'</h2>'+
    (semester?'<label class="learn-field">Kỳ kiểm tra<select id="examPeriod">'+Object.entries(examKinds).map(([key,name])=>
      '<option value="'+key+'" '+(key===learningOptions.period?'selected':'')+'>'+name+'</option>').join('')+
      '</select></label><fieldset><legend>Chương có trong đề</legend><div class="exam-chapters">'+chapters.map(ch=>
      '<label><input type="checkbox" name="chapter" value="'+ch.id+'" '+(learningOptions.selected?.includes(ch.id)?'checked':'')+'>'+esc(ch.title)+'</label>'
      ).join('')+'</div></fieldset>':'<label class="learn-field">Chương<select id="examChapter">'+chapterOptions(state.user.grade,chapter.id)+
      '</select></label><label class="learn-field">Bài học<select id="examLesson"><option value="">Toàn chương</option>'+
      lessons.map(item=>'<option value="'+esc(item.id)+'" '+(item===lesson?'selected':'')+'>'+esc(item.title)+'</option>').join('')+'</select></label>')+
    '<label class="learn-field">Hình thức<select id="examFormat">'+Object.entries(typeNames).map(([key,name])=>
      '<option value="'+key+'" '+(key===state.format?'selected':'')+'>'+name+'</option>').join('')+'</select></label>'+
    '<fieldset><legend>Mức độ</legend><div class="exam-levels">'+levels+'</div></fieldset>'+
    '<div class="exam-number"><label class="learn-field">Số câu<select id="examCount"></select></label>'+
    (semester?'<label class="learn-field">Thời gian<select id="examTime"><option value="30">30 phút</option><option value="45" selected>45 phút</option><option value="60">60 phút</option><option value="90">90 phút</option></select></label>':'')+
    '</div><p id="examAvailable" class="sub" role="status"></p><button class="btn" id="examStart" type="submit">Bắt đầu làm bài '+icon('arrow')+'</button></form>'+
    (semester?'<section class="exam-original"><h2>Đề gốc · '+esc(examKinds[learningOptions.period])+'</h2>'+
      (source||'<p>Kho đề gốc hiện có cho các lớp 6–12.</p>')+'</section>':'')+'</div>';
  const form=$('#examForm');
  function selectedChapters() {
    return semester?[...form.querySelectorAll('[name=chapter]:checked')].map(el=>el.value):[chapter.id];
  }
  function counts() {
    const key=Object.keys(practiceLevels).filter(t=>state.levels.includes(t)).join('|');
    const pool=semester?chapters.filter(c=>selectedChapters().includes(c.id)):[lesson||chapter];
    const available=pool.reduce((sum,item)=>sum+(key?item.formats.levels[key]?.[state.format]||0:item.formats[state.format]||0),0);
    const max=Math.min(20,available);
    const select=$('#examCount');
    if(max&&!Array.from({length:max},(_,i)=>i+1).includes(state.count))state.count=max;
    select.innerHTML=Array.from({length:max},(_,i)=>'<option '+(i+1===state.count?'selected':'')+'>'+(i+1)+'</option>').join('');
    $('#examStart').disabled=!available;
    $('#examAvailable').textContent=available?available+' câu phù hợp':semester&&!pool.length?'Chọn chương để tạo đề.':'Hãy đổi hình thức hoặc mức độ.';
  }
  form.onchange=e=>{
    const target=e.target;
    if(target.id==='examChapter'){learningOptions.chapter=target.value;learningOptions.lesson='';renderExamOptions(chapters);return;}
    if(target.id==='examLesson'){learningOptions.lesson=target.value;renderExamOptions(chapters);return;}
    if(target.id==='examPeriod'){learningOptions.period=target.value;learningOptions.selected=null;renderExamOptions(chapters);return;}
    if(target.name==='chapter')learningOptions.selected=selectedChapters();
    if(target.name==='level')state.levels=[...form.querySelectorAll('[name=level]:checked')].map(el=>el.value);
    if(target.id==='examFormat')state.format=target.value;
    if(target.id==='examCount')state.count=Number(target.value);
    counts();
  };
  form.onsubmit=async event=>{
    event.preventDefault();
    if(state.opening)return;
    state.opening=true;
    try {
      await busy($('#examStart'),'Đang mở đề…',async()=>{
        const scope=selectedChapters(), common={count:state.count,type:state.format,levels:state.levels};
        const quiz=semester?await rpc('startSemester',state.token,{...common,chapters:scope,period:learningOptions.period,minutes:Number($('#examTime').value)}):
          await rpc('startQuiz',state.token,{...common,chapterId:chapter.id,lessonId:lesson?.id||'',mode:'practice'});
        if(state.page==='exam')openQuiz(quiz);
      });
    } finally {state.opening=false;}
  };
  counts();
}

function publicStudyPreference() {
  return 'bu_share_study_'+state.token;
}
async function updatePublicStudy(share, report=false) {
  if(!buClassApi.base||!state.user||state.role!=='student')return false;
  const key=state.token, user=state.user, dashboard=state.dashboard;
  try {
    await buClassApi.request('study/profile',share?{key,share:true,name:user.name,grade:user.grade,
      accuracy:dashboard.accuracy,chapters:dashboard.chapters.map(({id,done})=>({id,done}))}:{key,share:false});
    if(report)toast(share?'Đã chia sẻ tiến độ với Host.':'Đã dừng chia sẻ tiến độ.');
    return true;
  } catch(error) {
    if(report)toast(error.message);
    return false;
  }
}
function refreshSharedStudy() {
  if(storage.get(publicStudyPreference())==='1')updatePublicStudy(true);
}
function bindSharing() {
  const control=$('#shareStudy');
  if(!control)return;
  control.checked=storage.get(publicStudyPreference())==='1';
  control.onchange=async()=>{
    const key=publicStudyPreference(), wanted=control.checked;
    control.disabled=true;
    if(await updatePublicStudy(wanted,true)) {
      if(wanted)storage.set(key,'1');else storage.remove(key);
    } else control.checked=!wanted;
    control.disabled=false;
  };
}
