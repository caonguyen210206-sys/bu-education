'use strict';

const examKinds = {mid1:'Giữa kỳ I', end1:'Cuối kỳ I', mid2:'Giữa kỳ II', end2:'Cuối kỳ II'};
const libraryKinds = {...examKinds,entrance:'Tuyển sinh lớp 10',graduation:'Tốt nghiệp THPT'};
const learningOptions = {chapter:'', lesson:'', period:'mid1', mode:'custom', selected:null};
const libraryFilters = {kind:'',period:'',year:'',query:''};
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
    libraryFilters.period='';
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
function datedToanMathArticle(url) {
  return /^https:\/\/(?:thcs\.)?toanmath\.com\/(?:202[4-9]|20[3-9]\d)\/\d{2}\/[\w-]+\.html$/u.test(url);
}
function sourceCard([title,url,date],kind,period='') {
  const metadata=[libraryKinds[period],date.split('-').reverse().join('/'),'TOANMATH'].filter(Boolean).join(' · ');
  return '<article class="exam-source"><div><strong>'+esc(title)+'</strong><small>'+esc(metadata)+'</small></div>'+
    '<a class="btn secondary" aria-label="'+esc('Mở trên TOANMATH · '+title)+'" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+
    (kind==='exam'?'Mở đề gốc':'Mở tài liệu')+' ↗</a></article>';
}
function renderExamLibrary(grade) {
  const exams=buExamSources[grade]||{};
  const sources=Object.entries(exams).flatMap(([period,items])=>items.map(item=>({item,period,kind:'exam'})))
    .concat((buReviewSources[grade]||[]).map(item=>({item,period:'',kind:'material'})))
    .sort((a,b)=>b.item[2].localeCompare(a.item[2]));
  if(!sources.length){
    $('#examContent').innerHTML='<section class="exam-original"><h2>Kho đề và tài liệu</h2><p>Kho TOANMATH hiện có cho lớp 6–12. Chọn khối lớp ở trên để xem.</p></section>';
    return;
  }
  const years=[...new Set(Object.values(buExamSources).flatMap(g=>Object.values(g).flat().map(item=>item[2].slice(0,4)))
    .concat(Object.values(buReviewSources).flat().map(item=>item[2].slice(0,4))))].sort().reverse();
  const options=(items,selected)=>items.map(([value,label])=>'<option value="'+esc(value)+'" '+
    (value===selected?'selected':'')+'>'+esc(label)+'</option>').join('');
  const periods=Object.keys(exams).map(key=>[key,libraryKinds[key]]);
  $('#examContent').innerHTML='<section class="exam-original exam-library" aria-labelledby="libraryTitle"><h2 id="libraryTitle">Kho Toán '+grade+'</h2>'+
    '<div class="library-filters"><label class="learn-field">Tìm kiếm<input type="search" id="librarySearch" placeholder="Tên trường, chuyên đề…" value="'+esc(libraryFilters.query)+'"></label>'+
    '<label class="learn-field">Loại<select id="libraryKind">'+options([['','Tất cả'],['exam','Đề thi'],['material','Tài liệu ôn tập']],libraryFilters.kind)+'</select></label>'+
    '<label class="learn-field">Kỳ thi<select id="libraryPeriod">'+options([['','Tất cả kỳ thi'],...periods],libraryFilters.period)+'</select></label>'+
    '<label class="learn-field">Năm đăng<select id="libraryYear">'+options([['','Từ 2024'],...years.map(y=>[y,y])],libraryFilters.year)+'</select></label></div>'+
    '<p class="sub library-count" id="libraryCount" role="status"></p><div id="libraryResults"></div></section>';
  const search=$('#librarySearch'), kind=$('#libraryKind'), period=$('#libraryPeriod'), year=$('#libraryYear');
  function update() {
    Object.assign(libraryFilters,{kind:kind.value,period:period.value,year:year.value,query:search.value});
    period.disabled=libraryFilters.kind==='material';
    const words=normalize(libraryFilters.query.trim()).split(/\s+/u).filter(Boolean);
    const visible=sources.filter(row=>{
      const [title,,date]=row.item;
      const haystack=normalize(title+' '+(libraryKinds[row.period]||''));
      return (!kind.value||kind.value===row.kind)&&
        (period.disabled||!period.value||period.value===row.period)&&date.startsWith(year.value)&&words.every(word=>haystack.includes(word));
    });
    $('#libraryCount').textContent=visible.length+' kết quả';
    $('#libraryResults').innerHTML=visible.map(row=>sourceCard(row.item,row.kind,row.period)).join('')||
      '<p>Không tìm thấy đề hoặc tài liệu phù hợp.</p>';
  }
  search.oninput=kind.onchange=period.onchange=year.onchange=update;
  update();
}
function renderExam() {
  state.page='exam';
  state.quiz=null;
  setNav('exam');
  const grade=state.user.grade, chapters=group(grade).chapters;
  if(learningOptions.chapter!=='all'&&!chapters.some(chapter=>chapter.id===learningOptions.chapter))learningOptions.chapter=chapters[0].id;
  const active=state.dashboard.active;
  $('#main').innerHTML='<div class="learn-cover exam-cover"><div><h1>Luyện thi Toán '+grade+'</h1>'+
    '<p>Tạo bài theo chương, bài học hoặc chọn kỳ kiểm tra.</p></div>'+gradeField(grade,'examGrade')+'</div>'+
    '<div class="exam-tools"><div class="exam-switch" role="group" aria-label="Chế độ luyện thi">'+
    '<button type="button" data-mode="custom">Theo chương và bài</button><button type="button" data-mode="semester">Giữa kỳ và cuối kỳ</button>'+
    '<button type="button" data-mode="papers">Đề theo trường</button><button type="button" data-mode="library">Kho đề và tài liệu</button></div>'+
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
function renderReferencePapers(grade) {
  const papers=buExamPapers.filter(p=>p.grade===grade);
  $('#examContent').innerHTML='<section class="exam-original exam-library"><h2>Đề thực hành theo trường</h2>'+
    (papers.length?papers.map(paper=>'<article class="reference-paper"><h3>'+esc(paper.title)+'</h3><p>'+esc(paper.scope)+'</p>'+
      '<small>'+paper.questions.length+' câu · '+paper.minutes+' phút · Câu hỏi biên soạn theo đề tham khảo</small>'+
      '<div class="reference-actions"><button class="btn" type="button" data-reference-paper="'+esc(paper.id)+'">Làm đề trên web '+icon('arrow')+'</button>'+
      '<a class="btn secondary" href="'+esc(paper.source)+'" target="_blank" rel="noopener noreferrer">Xem đề gốc TOANMATH ↗</a></div></article>').join(''):
      '<p>Đề theo trường hiện có cho lớp 6–12.</p>')+'</section>';
  $$('[data-reference-paper]').forEach(button=>button.onclick=async()=>{
    if(state.opening)return;
    state.opening=true;
    try {
      await busy(button,'Đang mở đề…',async()=>{
        const quiz=await rpc('startReferencePaper',state.token,button.dataset.referencePaper);
        if(state.page==='exam'&&button.isConnected)openQuiz(quiz);
      });
    } finally {state.opening=false;}
  });
}
function renderExamOptions(chapters) {
  const semester=learningOptions.mode==='semester';
  $$('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===learningOptions.mode)));
  if(learningOptions.mode==='library'){renderExamLibrary(state.user.grade);return;}
  if(learningOptions.mode==='papers'){renderReferencePapers(state.user.grade);return;}
  const chapter=chapters.find(c=>c.id===learningOptions.chapter);
  const lessons=chapter?lessonCatalog[chapter.id]:[];
  const lesson=lessons.find(item=>item.id===learningOptions.lesson);
  const levels=Object.entries(practiceLevels).map(([key,name])=>
    '<label><input type="checkbox" name="level" value="'+key+'" '+(state.levels.includes(key)?'checked':'')+'>'+name+'</label>').join('');
  const source=(buExamSources[state.user.grade]?.[learningOptions.period]||[]).slice(0,4).map(item=>sourceCard(item,'exam')).join('');
  $('#examContent').innerHTML='<div class="exam-columns"><form class="exam-form" id="examForm"><h2>'+
    (semester?'Đề mô phỏng':'Tạo bài luyện')+'</h2>'+
    (semester?'<label class="learn-field">Kỳ kiểm tra<select id="examPeriod">'+Object.entries(examKinds).map(([key,name])=>
      '<option value="'+key+'" '+(key===learningOptions.period?'selected':'')+'>'+name+'</option>').join('')+
      '</select></label><fieldset><legend>Chương có trong đề</legend><div class="exam-chapters">'+chapters.map(ch=>
      '<label><input type="checkbox" name="chapter" value="'+ch.id+'" '+(learningOptions.selected?.includes(ch.id)?'checked':'')+'>'+esc(ch.title)+'</label>'
      ).join('')+'</div></fieldset>':'<label class="learn-field">Chương<select id="examChapter"><option value="all" '+(!chapter?'selected':'')+'>Toàn bộ chương của lớp</option>'+
      chapterOptions(state.user.grade,chapter?.id)+'</select></label>'+(chapter?'<label class="learn-field">Bài học<select id="examLesson"><option value="">Toàn chương</option>'+
      lessons.map(item=>'<option value="'+esc(item.id)+'" '+(item===lesson?'selected':'')+'>'+esc(item.title)+'</option>').join('')+'</select></label>':''))+
    (semester?'<div class="exam-format-summary" aria-label="Cấu trúc đề">'+buExamFormat.map(part=>
      '<span><strong>'+part.count+'</strong> '+part.shortLabel+'</span>').join('')+'</div>'+
      '<label class="learn-field">Thời gian<select id="examTime"><option value="30">30 phút</option><option value="45" selected>45 phút</option><option value="60">60 phút</option><option value="90">90 phút</option></select></label>':
    '<label class="learn-field">Hình thức<select id="examFormat">'+Object.entries(typeNames).map(([key,name])=>
      '<option value="'+key+'" '+(key===state.format?'selected':'')+'>'+name+'</option>').join('')+'</select></label>'+
    '<fieldset><legend>Mức độ</legend><div class="exam-levels">'+levels+'</div></fieldset>'+
    '<label class="learn-field">Số câu<select id="examCount"></select></label>')+
    '<p id="examAvailable" class="sub" role="status"></p><button class="btn" id="examStart" type="submit">Bắt đầu làm bài '+icon('arrow')+'</button></form>'+
    (semester?'<section class="exam-original"><h2>Đề gốc · '+esc(examKinds[learningOptions.period])+'</h2>'+
      (source?source+'<button class="btn secondary" type="button" id="examAllSources">Xem tất cả đề kỳ này '+icon('arrow')+'</button>':
        '<p>Kho đề gốc hiện có cho các lớp 6–12.</p>')+'</section>':'')+'</div>';
  if($('#examAllSources'))$('#examAllSources').onclick=()=>{
    Object.assign(libraryFilters,{kind:'exam',period:learningOptions.period,year:'',query:''});
    learningOptions.mode='library';renderExamOptions(chapters);
  };
  const form=$('#examForm');
  function selectedChapters() {
    if(semester)return [...form.querySelectorAll('[name=chapter]:checked')].map(el=>el.value);
    return chapter?[chapter.id]:chapters.map(c=>c.id);
  }
  let countRequest=0;
  async function counts() {
    const request=++countRequest, scope=selectedChapters();
    const select=$('#examCount'), start=$('#examStart'), status=$('#examAvailable');
    start.disabled=true;
    if(select)select.disabled=true;
    if(!scope.length){status.textContent='Chọn chương để tạo đề.';return;}
    status.textContent='Đang kiểm tra số câu…';
    try {
      const available=semester?await rpc('semesterAvailability',state.token,scope):
        await rpc('exerciseAvailability',state.token,{chapters:scope,lessonId:lesson?.id||'',type:state.format,levels:state.levels});
      if(!form.isConnected||request!==countRequest)return;
      if(semester){
        const missing=buExamFormat.filter(({type,count})=>available[type]<count);
        start.disabled=missing.length>0;
        status.textContent=missing.length?'Chọn thêm chương để đủ đề. Còn thiếu '+missing.map(({type,shortLabel,count})=>
          (count-available[type])+' câu '+shortLabel.toLowerCase()).join(', ')+'.':'';
        return;
      }
      const max=Math.min(buPracticeLimit,available);
      const selected=Math.max(1,Math.min(max,state.count));
      select.innerHTML=Array.from({length:max},(_,i)=>'<option '+(i+1===selected?'selected':'')+'>'+(i+1)+'</option>').join('');
      start.disabled=select.disabled=!available;
      status.textContent=available?available+' câu phù hợp':'Hãy đổi hình thức hoặc mức độ.';
    } catch(error) {
      if(form.isConnected&&request===countRequest)status.textContent=error.message;
    }
  }
  form.onchange=e=>{
    const target=e.target;
    if(target.id==='examChapter'){learningOptions.chapter=target.value;learningOptions.lesson='';renderExamOptions(chapters);return;}
    if(target.id==='examLesson'){learningOptions.lesson=target.value;renderExamOptions(chapters);return;}
    if(target.id==='examPeriod'){learningOptions.period=target.value;learningOptions.selected=null;renderExamOptions(chapters);return;}
    if(target.name==='chapter')learningOptions.selected=selectedChapters();
    if(target.name==='level')state.levels=[...form.querySelectorAll('[name=level]:checked')].map(el=>el.value);
    if(target.id==='examFormat')state.format=target.value;
    if(target.id==='examCount'){state.count=Number(target.value);return;}
    counts();
  };
  form.onsubmit=async event=>{
    event.preventDefault();
    if(state.opening)return;
    state.opening=true;
    try {
      await busy($('#examStart'),'Đang mở đề…',async()=>{
        const quiz=semester?await rpc('startSemester',state.token,{chapters:selectedChapters(),period:learningOptions.period,minutes:Number($('#examTime').value)}):
          await rpc('startQuiz',state.token,{count:Number(form.querySelector('#examCount').value),type:state.format,levels:state.levels,
            chapterId:chapter?.id||'all',lessonId:lesson?.id||'',mode:'practice'});
        if(state.page==='exam'&&form.isConnected)openQuiz(quiz);
      });
    } finally {state.opening=false;}
  };
  counts();
}

function mountTimedPaper() {
  const quiz=state.quiz;
  const indexed=quiz.questions.map((question,index)=>({question,index}));
  const sections=buExamFormat.map(part=>({...part,items:indexed.filter(({question})=>question.type===part.type)}))
    .filter(part=>part.items.length);
  $('#main').innerHTML='<article class="timed-paper" aria-labelledby="paperTitle">'+
    '<header class="timed-heading"><h1 id="paperTitle" tabindex="-1">'+esc(quiz.title)+'</h1><p>'+quiz.questions.length+' câu · '+
    (quiz.paperId?'Đề biên soạn theo trường':'Đề mô phỏng')+'</p></header>'+
    '<div class="timed-toolbar"><button class="btn secondary" id="leaveQuiz" type="button">← Tạm dừng</button>'+
    '<div class="timed-status"><span id="paperProgress"></span><span id="saveStatus" class="save-status" role="status"></span></div>'+
    '<span id="quizCount" class="timer" role="timer" aria-label="Thời gian còn lại"></span>'+
    '<button class="btn" id="finishButton" type="button"><span id="finishLabel">Nộp bài</span></button></div>'+
    '<nav class="timed-parts" aria-label="Các phần trong đề">'+sections.map(part=>
      '<button type="button" data-paper-part="'+part.type+'">'+part.shortLabel+'</button>').join('')+'</nav>'+
    '<div id="paperQuestions">'+sections.map(part=>'<section class="timed-section" id="paper-'+part.type+'">'+
      '<header><h2>'+part.label+'</h2><span>'+part.items.length+' câu</span></header>'+
      part.items.map(({question,index})=>timedQuestionHTML(question,index)).join('')+'</section>').join('')+'</div>'+
    '<div class="timed-end"><button class="btn" type="button" id="finishPaperEnd">Nộp bài '+icon('arrow')+'</button></div></article>';
  $('#leaveQuiz').onclick=leaveQuiz;
  $('#finishButton').onclick=$('#finishPaperEnd').onclick=()=>finish();
  $$('[data-paper-part]').forEach(button=>button.onclick=()=>{
    const section=$('#paper-'+button.dataset.paperPart);
    section.scrollIntoView({block:'start'});
  });
  $('#paperQuestions').onchange=event=>{
    const control=event.target;
    if(control.type!=='radio'||quizLocked())return;
    const q=quiz.questions[Number(control.dataset.paperAnswer)];
    if(q.type==='mcq'){setDraft(q,Number(control.value));return;}
    const draft=Array.from({length:4},(_,i)=>state.drafts[q.id]?.[i]??null);
    draft[Number(control.dataset.statement)]=control.value==='true';
    setDraft(q,draft);
  };
  $('#paperQuestions').oninput=event=>{
    const control=event.target;
    if(control.type==='text'&&!quizLocked())setDraft(quiz.questions[Number(control.dataset.paperAnswer)],control.value);
  };
  updateTimedPaperControls();
}

function timedQuestionHTML(q,index) {
  const name='paper-q'+index, number=index+1, draft=state.feedback[q.id]?.selected??state.drafts[q.id];
  const radio=(group,value,label,selected,statement='')=>'<label class="timed-choice"><input type="radio" name="'+group+
    '" value="'+value+'" data-paper-answer="'+index+'" '+statement+(selected?' checked':'')+'><span>'+label+'</span></label>';
  let controls;
  if(q.type==='mcq') {
    controls='<div class="timed-options" role="group" aria-labelledby="'+name+'-prompt">'+q.options.map((option,i)=>
      radio(name,i,'<b>'+'ABCD'[i]+'.</b> '+quizMath(option),draft===i)).join('')+'</div>';
  } else if(q.type==='tf') {
    controls='<div class="timed-statements">'+q.statements.map((item,i)=>{
      const key=name+'-'+i;
      return '<div class="timed-statement"><div id="'+key+'-prompt"><b>'+'abcd'[i]+')</b> '+quizMath(item.text)+
        figureHTML(item.figure)+'</div><div class="timed-binary" role="group" aria-labelledby="'+key+'-prompt">'+
        [true,false].map(value=>radio(key,value,value?'Đúng':'Sai',draft?.[i]===value,'data-statement="'+i+'"')).join('')+'</div></div>';
    }).join('')+'</div>';
  } else {
    controls='<input class="short-input timed-short" type="text" inputmode="decimal" maxlength="48" autocomplete="off" '+
      'placeholder="Nhập đáp án" aria-label="Đáp án câu '+number+'" data-paper-answer="'+index+'" value="'+esc(draft??'')+'">';
  }
  return '<article class="timed-question"><div class="timed-prompt" id="'+name+'-prompt"><strong>Câu '+number+'.</strong> '+
    questionPrompt(q.prompt)+'</div>'+figureHTML(q.figure)+controls+'</article>';
}

function updateTimedPaperControls() {
  const locked=quizLocked();
  const filled=state.quiz.questions.filter(q=>state.feedback[q.id]?.complete||answerReady(q)).length;
  $('#paperProgress').textContent=filled+'/'+state.quiz.questions.length+' đã trả lời';
  $('#leaveQuiz').textContent=state.pausing?'Đang lưu…':'← Tạm dừng';
  $('#finishLabel').textContent=state.submitting?'Đang nộp…':'Nộp bài';
  $('#leaveQuiz').disabled=$('#finishButton').disabled=$('#finishPaperEnd').disabled=locked;
  $$('#paperQuestions input').forEach(control=>{
    control.disabled=locked||Boolean(state.feedback[state.quiz.questions[Number(control.dataset.paperAnswer)].id]);
  });
}

function examResultPoints(result) {
  if(!result.partScores)return '';
  return '<div class="exam-format-summary exam-part-scores" aria-label="Điểm từng phần">'+buExamFormat.map(({type,shortLabel,maxPoints})=>
    '<span>'+shortLabel+' <strong>'+result.partScores[type].toLocaleString('vi-VN')+'/'+maxPoints+'</strong></span>').join('')+'</div>';
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
