'use strict';

const bookVolumeBreak = {6:5,7:5,8:5,9:5,10:5,11:5,12:3};
const bookNoteMethods = {
  'g8-c1':'Lập đa thức từ hình',
  'g11-c1':'Giải phương trình a sin x + b cos x = c',
  'g11-c4':'Chứng minh đường thẳng song song với mặt phẳng',
  'g12-c4':'Tính diện tích giữa hai đồ thị khi chúng đổi vị trí',
  'g12-c6':'Tính xác suất toàn phần trước khi dùng Bayes'
};
const bookLessonTitles = ['Kiến thức cần nhớ','Phương pháp và các dạng toán','Bài tập tự luyện'];
const bookTitleFixes = {
  'g6-b18':'Bài 18. Hình tam giác đều. Hình vuông. Hình lục giác đều',
  'g6-b19':'Bài 19. Hình chữ nhật. Hình thoi. Hình bình hành. Hình thang cân'
};

function workbookLessons(chapter) {
  const topics=chapterReading[chapter.id]||[];
  const map=buLessonMap[chapter.id];
  if(!map) return [{id:'',title:formatChapter(chapter),topics}];
  const lessons=lessonCatalog[chapter.id].filter(l=>!/^Luyện tập chung|^Bài tập cuối|^Bài tập ôn/iu.test(l.title));
  return lessons.map((lesson,index)=>({
    id:lesson.id,title:bookTitleFixes[lesson.id]||lesson.title.replace(/^Bài (\d+):/u,'Bài $1.'),topics:topics.filter((_,i)=>map[i]===index),extra:buLessonExtras[lesson.id]
  }));
}
function bookContentsRow(chapter,index) {
  const lessons=workbookLessons(chapter);
  const done=progress(chapter.id).completion;
  return '<button class="book-contents-row" type="button" data-book="'+esc(chapter.id)+'">'+
    '<span class="contents-number">'+String(index+1).padStart(2,'0')+'</span><span class="contents-label">'+
    '<strong>'+esc(formatChapter(chapter))+'</strong>'+
    (chapter.id.match(/^g(?:[6-9]|1[0-2])-/)?'<small>'+lessons.length+' bài học</small>':'')+'</span>'+
    '<span class="contents-progress" aria-label="'+done+' phần trăm đã luyện"><span aria-hidden="true"><i style="width:'+done+'%"></i></span>'+done+'%</span>'+
    icon('arrow')+'</button>';
}
function renderBookShelf() {
  state.page='study';
  state.quiz=null;
  setNav('study');
  const grade=state.user.grade, chapters=group(grade).chapters;
  const split=bookVolumeBreak[grade];
  const sections=split?[chapters.slice(0,split),chapters.slice(split)]:[chapters];
  $('#main').innerHTML='<header class="learn-cover book-cover"><div><h1>Sách Toán '+grade+'</h1>'+
    '<p>Kết nối tri thức với cuộc sống</p></div>'+gradeField(grade,'bookGrade')+'</header>'+
    '<section class="book-library book-contents" aria-labelledby="chapterListTitle"><div class="chapter-list-head"><h2 id="chapterListTitle">Mục lục</h2>'+
    '<label class="chapter-search">'+icon('search')+'<input id="bookSearch" type="search" placeholder="Tìm chương" aria-label="Tìm chương"></label></div>'+
    sections.map((items,index)=>'<div class="book-volume">'+(split?'<h3>Tập '+(index+1)+'</h3>':'')+
      items.map((chapter,i)=>bookContentsRow(chapter,i+(index?split:0))).join('')+'</div>').join('')+
    '<p id="bookEmpty" hidden>Không tìm thấy chương phù hợp.</p></section>'+
    (buClassApi.base?'<label class="study-share"><input type="checkbox" id="shareStudy"> Chia sẻ tên, lớp và tiến độ với Host</label>':'');
  bindSharing();
  $('#bookGrade').onchange=e=>changeLearningGrade(e.target.value,'study');
  $('#bookSearch').oninput=e=>{
    const query=normalize(e.target.value.trim());
    for(const row of $$('[data-book]')) row.hidden=!normalize(row.textContent).includes(query);
    for(const volume of $$('.book-volume')) volume.hidden=!volume.querySelector('[data-book]:not([hidden])');
    $('#bookEmpty').hidden=!!$('[data-book]:not([hidden])');
  };
  $$('[data-book]').forEach(button=>button.onclick=()=>openBookChapter(button.dataset.book));
}
function bookLessonKey(lesson,index) { return 'book-lesson-'+(lesson.id||index+1); }
function bookLink(target,label) { return '<a href="#'+esc(target)+'" data-book-link>'+esc(label)+'</a>'; }
function bookTopic(topic,figures) {
  const seen=new Set(), known=new Set();
  const facts=items=>factsHTML(items.filter(text=>{
    const key=normalize(text).replace(/\s+/g,' ').replace(/\.$/,'');
    if(!key||known.has(key))return false;
    known.add(key);return true;
  }));
  const intro=facts(factsFrom(topic.intro));
  const core=(topic.core||[]).map(([name,items,formula])=>formulaGroupHTML(name,
    facts(items)+outlineFormula(formula,seen))).join('');
  const notes=(topic.notes||[]).map(([category,name,definition,formula])=>formulaGroupHTML(name||category,
    facts(factsFrom(definition))+outlineFormula(formula,seen))).join('');
  const illustration=(topic.diagrams||[]).map(studyFigure).join('')+(topic.visuals||[]).map(i=>figures[i]||'').join('');
  const contents=intro+outlineFormula(topic.formulas,seen)+outlineTable(topic.table||[])+core+notes+
    (topic.short?'<div class="outline-inline-example"><strong>Ví dụ nhanh</strong>'+theoryParagraphs(topic.short)+'</div>':'');
  return '<section class="book-topic"><h4>'+theoryFormula(topic.title)+'</h4>'+paperBody(contents,illustration)+'</section>';
}
function noteAsExample(note) {
  const [title,,,prompt,solution,answer,trap]=note;
  return outlineExample([title,prompt,solution,answer,trap],true);
}
function bookMethod(method,topic,index,chapter,figures,scope) {
  const {title,lead='',steps=[],example,worked=[],tip,diagram,practice}=method;
  const matched=(topic.notes||[]).find(([,name])=>name===title||name&&title.includes(name));
  const related=matched?.[3]||topic.formula||topic.formulas||'';
  const figure=diagram?studyFigure(diagram):(topic.diagrams?.length===1?studyFigure(topic.diagrams[0]):
    topic.visuals?.length===1?figures[topic.visuals[0]]||'':'');
  const extra=bookNoteMethods[chapter.id]===title?noteAsExample(buBookNotes[chapter.id]):'';
  return '<details class="workbook-method" id="'+scope+'-method-'+index+'"><summary><span>Dạng '+index+'</span><strong>'+theoryFormula(title)+'</strong></summary>'+
    '<div class="method-detail">'+paperBody(
      (lead?theoryParagraphs(lead):'')+
      (related?formulaGroupHTML('Công thức và điều kiện',outlineFormula(related,new Set())):'')+
      (steps.length?'<h5>Phương pháp giải</h5><ol class="paper-steps">'+steps.map(step=>'<li>'+theoryFormula(step)+'</li>').join('')+'</ol>':'')+
      (tip?'<div class="outline-caution"><strong>Lỗi dễ gặp</strong>'+theoryParagraphs(tip)+'</div>':'')+
      (example?'<div class="outline-example"><h5>Ví dụ</h5>'+theoryParagraphs(example)+'</div>':'')+
      worked.map(item=>outlineExample(item,worked.length>1)).join('')+extra+(practice?practiceHTML(practice):''),figure)+
    '</div></details>';
}
function lessonSectionHeading(letter,title,id) {
  return '<h3 class="workbook-section-heading" id="'+esc(id)+'"><span>'+letter+'</span>'+esc(title)+'</h3>';
}
function getBookMethods(lesson) {
  const methods=lesson.topics.flatMap(topic=>topic.methods.map(method=>({topic,method})));
  if(lesson.extra)methods.push({topic:lesson.extra,method:lesson.extra.method});
  return methods;
}
function bookLessonMarkup(lesson,index,chapter,figures) {
  const key=bookLessonKey(lesson,index);
  const topics=lesson.topics.map(topic=>bookTopic(topic,figures)).join('');
  const extra=lesson.extra;
  const supplemental=extra?'<section class="book-topic"><h4>'+theoryFormula(extra.title)+'</h4>'+
    factsHTML(extra.facts)+outlineFormula(extra.formula,new Set())+'</section>':'';
  const methods=getBookMethods(lesson);
  return '<section class="workbook-lesson" id="'+key+'"><h2>'+theoryFormula(lesson.title)+'</h2>'+
    '<div class="workbook-part">'+lessonSectionHeading('A',bookLessonTitles[0],key+'-a')+topics+supplemental+'</div>'+
    (methods.length||lesson.id?'<div class="workbook-part">'+lessonSectionHeading('B',bookLessonTitles[1],key+'-b')+
      methods.map(({topic,method},i)=>bookMethod(method,topic,i+1,chapter,figures,key)).join('')+
      (lesson.id?'<div data-workbook-model="'+esc(lesson.id)+'"></div>':'')+'</div>':'')+
    (lesson.id?'<div class="workbook-part">'+lessonSectionHeading('C',bookLessonTitles[2],key+'-c')+
      '<div data-workbook-scope="'+esc(lesson.id)+'"></div></div>':'')+'</section>';
}
function sourceFooter(chapter) {
  const grade=state.user.grade, index=group(grade).chapters.findIndex(c=>c.id===chapter.id);
  const pdf=buBookPDFs[grade]?.[index>=(bookVolumeBreak[grade]||Infinity)?1:0];
  const references=chapterSources[chapter.id]||[];
  if(!pdf&&!references.length)return '';
  return '<details class="workbook-sources"><summary>Tài liệu tham khảo</summary><ul>'+
    (pdf?'<li><a href="'+esc(pdf[1])+'" target="_blank" rel="noopener noreferrer">'+esc(pdf[0])+' · PDF ↗</a></li>':'')+
    references.map(([title,url])=>'<li><a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(title)+' ↗</a></li>').join('')+
    '</ul></details>';
}
function openBookChapter(id) {
  if(!state.token||!state.user)return;
  const chapters=group(state.user.grade).chapters;
  const index=chapters.findIndex(chapter=>chapter.id===id);
  if(index<0)return;
  const chapter=chapters[index], lessons=workbookLessons(chapter), figures=chapterVisuals(id);
  const title=chapter.title.replace(/^(Chương|Chủ đề)\s*(\d+)\s*[:.]\s*/u,'$1 $2. ');
  const toc=lessons.map((lesson,i)=>{
    const key=bookLessonKey(lesson,i);
    const methods=getBookMethods(lesson);
    return '<li><details '+(i===0?'open':'')+'><summary>'+esc(lesson.title)+'</summary><ul><li>'+
      bookLink(key+'-a','A. '+bookLessonTitles[0])+'</li>'+
      (methods.length||lesson.id?'<li>'+bookLink(key+'-b','B. '+bookLessonTitles[1])+'</li>':'')+
      methods.map(({method},j)=>'<li class="toc-method">'+bookLink(key+'-method-'+(j+1),'Dạng '+(j+1)+'. '+method.title)+'</li>').join('')+
      (lesson.id?'<li>'+bookLink(key+'-c','C. '+bookLessonTitles[2])+'</li>':'')+'</ul></details></li>';
  }).join('');
  const note=buBookNotes[id];
  state.page='book';state.chapter=id;
  setNav('study');
  $('#main').innerHTML='<div class="document-header"><button type="button" class="reader-back" id="bookIndex">← Mục lục Toán '+state.user.grade+'</button>'+
    '<h1>'+theoryFormula(title)+'</h1></div><div class="document-layout">'+
    '<aside class="document-toc"><nav aria-label="Mục lục chương"><h2>Mục lục chương</h2><ol>'+toc+
    '</ol>'+bookLink('book-final','Ôn tập cuối chương')+'</nav></aside><article class="workbook-paper" aria-label="'+esc(title)+'">'+
    lessons.map((lesson,i)=>bookLessonMarkup(lesson,i,chapter,figures)).join('')+
    '<section class="workbook-lesson final-workbook" id="book-final"><h2>Ôn tập cuối chương</h2>'+
    (note&&!bookNoteMethods[id]?'<details class="workbook-method"><summary><span>Bài mẫu</span><strong>'+theoryFormula(note[0])+'</strong></summary>'+
      '<div class="method-detail">'+outlineFormula(note[1],new Set())+
      '<h5>Phương pháp giải</h5><ol class="paper-steps">'+note[2].map(step=>'<li>'+theoryFormula(step)+'</li>').join('')+'</ol>'+
      noteAsExample(note)+'</div></details>':'')+
    '<div data-workbook-scope=""></div><button type="button" class="btn" id="bookToPractice">Luyện thêm chương này '+icon('arrow')+'</button>'+
    sourceFooter(chapter)+'</section>'+
    '<nav class="reader-pages" aria-label="Chuyển chương">'+
    (chapters[index-1]?'<button class="btn secondary" id="previousChapter">← Chương trước</button>':'<span></span>')+
    (chapters[index+1]?'<button class="btn secondary" id="nextChapter">Chương tiếp →</button>':'')+'</nav></article></div>';
  for(const link of $$('[data-book-link]'))link.onclick=event=>{
    event.preventDefault();
    const target=$(link.getAttribute('href'));
    if(target?.tagName==='DETAILS')target.open=true;
    target?.scrollIntoView({block:'start'});
  };
  $('#bookIndex').onclick=async()=>{await refreshDashboard().catch(fail);if(state.page==='book'&&state.chapter===id){renderBookShelf();window.scrollTo(0,0);}};
  if($('#previousChapter'))$('#previousChapter').onclick=()=>openBookChapter(chapters[index-1].id);
  if($('#nextChapter'))$('#nextChapter').onclick=()=>openBookChapter(chapters[index+1].id);
  $('#bookToPractice').onclick=()=>{
    learningOptions.chapter=id;learningOptions.lesson='';learningOptions.mode='custom';
    navigate('exam');window.scrollTo(0,0);
  };
  mountBookWorksheets(id);
  window.scrollTo(0,0);
}
function workbookQuestionControls(q) {
  if(q.type==='short')return '<label class="book-short">Đáp án<input name="answer" maxlength="48" inputmode="decimal" required autocomplete="off"></label>';
  if(q.type==='tf')return '<ol class="book-tf" type="a">'+q.statements.map((statement,i)=>
    '<li><fieldset><legend>'+quizMath(statement.text)+'</legend>'+figureHTML(statement.figure)+
    '<div class="book-tf-picks">'+['true','false'].map(value=>'<label><input type="radio" required name="part'+i+'" value="'+value+'"> '+
      (value==='true'?'Đúng':'Sai')+'</label>').join('')+'</div></fieldset></li>').join('')+'</ol>';
  return '<div class="book-choices">'+q.options.map((option,i)=>'<label><input type="radio" name="answer" value="'+i+
    '" required><span><b>'+'ABCD'[i]+'.</b> '+quizMath(option)+'</span></label>').join('')+'</div>';
}
function workbookAnswer(q,mark) {
  const selected=q.type==='mcq'?'ABCD'[mark.answer]:mark.answer;
  const heading=mark.allCorrect?'Đúng rồi':q.type==='tf'?mark.correct+'/'+mark.units+' ý đúng':'Chưa đúng';
  const explanation=q.type==='tf'?'<ol type="a">'+mark.parts.map(part=>'<li><strong>'+(part.answer?'Đúng':'Sai')+'</strong> · '+
    quizMath(part.explanation)+'</li>').join('')+'</ol>':'<p><strong>Đáp án</strong> '+quizMath(selected)+'</p>'+theoryParagraphs(mark.explanation);
  return '<div class="book-feedback '+(mark.allCorrect?'right':'review')+'"><strong>'+heading+'</strong>'+explanation+'</div>';
}
function mountBookQuestion(container,item,index,chapter,lessonId) {
  const q=item.question, mark=item.feedback;
  container.innerHTML='<div class="exercise-line"><strong>Bài '+(index+1)+'</strong><span>'+esc(typeNames[q.type])+'</span></div>'+
    '<div class="book-question-text">'+questionPrompt(q.prompt)+'</div>'+figureHTML(q.figure)+
    (mark?workbookAnswer(q,mark)+'<button class="btn secondary" type="button" data-book-retry>Làm lại</button>':
    '<form><fieldset class="book-fields" aria-label="Câu trả lời">'+workbookQuestionControls(q)+'</fieldset>'+
    '<div class="book-exercise-actions"><button class="btn" type="submit">Kiểm tra</button>'+
      (item.hint?'<details class="book-hint"><summary>Gợi ý</summary>'+theoryParagraphs(item.hint)+'</details>':'')+
    '</div><p class="book-error" role="alert"></p></form>');
  if(mark){
    container.querySelector('[data-book-retry]').onclick=()=>{
      mountBookQuestion(container,{...item,feedback:null},index,chapter,lessonId);
      container.querySelector('input')?.focus();
    };
    return;
  }
  const form=container.querySelector('form');
  form.onsubmit=async event=>{
    event.preventDefault();
    const submit=form.querySelector('button');
    submit.disabled=true;
    form.querySelector('.book-error').textContent='';
    const data=new FormData(form), response=q.type==='tf'?q.statements.map((_,i)=>data.get('part'+i)==='true'):
      q.type==='mcq'?Number(data.get('answer')):data.get('answer');
    try {
      const feedback=await rpc('checkBookExercise',state.token,chapter,lessonId,q.id,response,!!form.querySelector('details')?.open);
      if(form.isConnected){
        mountBookQuestion(container,{...item,feedback},index,chapter,lessonId);
        const notice=container.querySelector('.book-feedback');
        notice.tabIndex=-1;notice.focus({preventScroll:true});
      }
    } catch(error) {form.querySelector('.book-error').textContent=error.message;}
    finally {submit.disabled=false;}
  };
}
async function mountBookWorksheets(chapter) {
  const panels=$$('[data-workbook-scope]'), models=$$('[data-workbook-model]');
  panels.forEach(panel=>{panel.textContent='Đang mở bài tập…';});
  try {
    const items=await rpc('bookWorksheet',state.token,chapter);
    for(const model of models){
      const sample=items.examples[model.dataset.workbookModel];
      if(!model.isConnected||!sample)continue;
      const q=sample.question;
      const answer=q.type==='mcq'?q.options[sample.answer]:sample.answer;
      model.innerHTML='<details class="workbook-model"><summary>Ví dụ có lời giải</summary>'+
        '<div>'+questionPrompt(q.prompt)+'</div>'+figureHTML(q.figure)+
        '<div class="outline-example"><h5>Lời giải</h5>'+theoryParagraphs(sample.explanation)+
        '<p><strong>Kết quả</strong> '+quizMath(answer)+'</p></div></details>';
    }
    for(const panel of panels) {
      if(!panel.isConnected)continue;
      const id=panel.dataset.workbookScope;
      const set=id?items.lessons[id]||[]:items.end;
      if(!set.length){panel.textContent='Bài luyện của mục này nằm ở phần ôn tập cuối chương.';continue;}
      panel.replaceChildren(...set.map((item,i)=>{
        const container=document.createElement('div');
        container.className='workbook-exercise';
        mountBookQuestion(container,item,i,chapter,id);
        return container;
      }));
    }
  } catch(error) {for(const panel of panels)if(panel.isConnected)panel.textContent=error.message;}
}
