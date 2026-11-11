const buClassroom = (() => {
  let token='',classGrade;
  function showError(panel,error) {
    const message=panel.querySelector('[data-class-status]');
    if(message) message.textContent=error.message;
  }
  function labelLink() {
    try {
      const url=new URL(buSettings.zaloUrl);
      if(url.protocol==='https:'&&url.hostname==='zalo.me') return '<a class="btn secondary" href="'+esc(url.href)+'" target="_blank" rel="noopener noreferrer">Đăng ký lớp qua Zalo</a>';
    } catch {}
    return '';
  }
  function renderAccess(panel,{portal=false,afterLogin}) {
    const credentialId=portal?'portalClassCredential':'classCredential';
    const registration=labelLink();
    panel.innerHTML='<section class="replay-card">'+(portal?'':'<h3>Xem lại buổi học</h3>')+
      '<p>Video, tài liệu và bài tập dành cho học viên đang học online.</p>'+
      (buClassApi.base?'<form class="class-login"><label for="'+credentialId+'">Mật khẩu lớp</label>'+
        '<input id="'+credentialId+'" name="password" type="password" autocomplete="current-password" required maxlength="180" placeholder="Nhập mật khẩu giáo viên đã cấp">'+
        '<button class="btn" type="submit">Mở tài liệu lớp</button></form>':
        '<p class="online-status" role="status">Kho tài liệu và bài tập của lớp đang chờ kết nối máy chủ.</p>')+
      (registration?'<div class="online-actions">'+registration+'</div>':'')+
      '<p class="login-error" data-class-status role="status"></p></section>';
    const form=panel.querySelector('form');
    if(!form) return;
    form.onsubmit=async event=>{
      event.preventDefault();
      const submit=form.querySelector('button');
      submit.disabled=true;
      try {
        const result=await buClassApi.request('login',{role:'student',password:new FormData(form).get('password')});
        token=result.token;
        classGrade=Number(result.grade);
        afterLogin();
      } catch(error) {showError(panel,error);}
      finally {submit.disabled=false;}
    };
  }
  function mountPortal(panel) {
    if(!token) {
      renderAccess(panel,{portal:true,afterLogin:()=>mountPortal(panel)});
      return;
    }
    const chapters=buCurriculum.find(group=>group.grade===classGrade)?.chapters||[];
    if(!chapters.length) {
      token='';
      mountPortal(panel);
      showError(panel,new Error('Lớp này chưa có danh mục chương.'));
      return;
    }
    panel.innerHTML='<div class="online-classbar"><label for="onlineChapter">Chương học · Toán '+classGrade+'</label>'+
      '<select id="onlineChapter">'+chapters.map(chapter=>'<option value="'+esc(chapter.id)+'">'+esc(chapter.title)+'</option>').join('')+
      '</select></div><div data-online-chapter></div>';
    const picker=panel.querySelector('#onlineChapter');
    const content=panel.querySelector('[data-online-chapter]');
    const showChapter=()=>mount(content,{id:picker.value,grade:classGrade},()=>mountPortal(panel));
    picker.onchange=showChapter;
    showChapter();
  }
  function mount(panel,chapter,onExit=()=>mount(panel,chapter)) {
    if(!token) {
      renderAccess(panel,{afterLogin:()=>mount(panel,chapter,onExit)});
      return;
    }
    const logout=()=>{token='';onExit();};
    if(chapter.grade!==classGrade) {
      panel.innerHTML='<section class="replay-card"><h3>Xem lại buổi học</h3><p>Tài khoản lớp thuộc Toán '+classGrade+'.</p><button class="btn secondary" data-class-exit>Đổi mật khẩu lớp</button></section>';
      panel.querySelector('[data-class-exit]').onclick=logout;
      return;
    }
    panel.innerHTML='<section class="replay-card"><p data-class-status role="status">Đang tải tài liệu lớp…</p><button class="btn secondary" data-class-exit>Thoát tài khoản lớp</button></section>';
    panel.querySelector('[data-class-exit]').onclick=logout;
    const marker=panel.firstElementChild;
    buClassApi.request('student/chapter',{chapter:chapter.id},token).then(data=>{
      if(!marker.isConnected||panel.firstElementChild!==marker||panel.hidden) return;
      const sessions=new Map();
      for(const item of data.materials) {
        if(!sessions.has(item.session)) sessions.set(item.session,[]);
        sessions.get(item.session).push(item);
      }
      panel.innerHTML='<section class="replay-card"><h3>'+esc(data.room)+'</h3>'+
        (sessions.size?[...sessions].map(([name,files])=>'<section class="class-session"><h4>'+esc(name)+'</h4>'+
          files.map(file=>'<button class="btn secondary" data-material="'+esc(file.id)+'">'+esc(file.kind+' · '+file.name)+'</button>').join('')+'</section>').join(''):
          '<p>Giáo viên chưa mở xem lại buổi học trong chương này.</p>')+
        '<h3>Bài được giao</h3>'+(data.assignments.length?data.assignments.map(a=>'<button class="btn secondary" data-assignment-open="'+esc(a.id)+'">'+esc(a.title)+
          ' · '+(a.result?esc(a.result.score+' điểm'):esc(a.questions+' câu'+(a.due?' · '+a.due:'')))+'</button>').join(''):'<p class="sub">Chương này chưa có bài được giao.</p>')+
        '<p class="login-error" data-class-status role="status"></p><button class="btn secondary" data-class-exit>Thoát tài khoản lớp</button></section>';
      panel.querySelector('[data-class-exit]').onclick=logout;
      panel.querySelectorAll('[data-material]').forEach(b=>b.onclick=async()=>{
        b.disabled=true;
        try {
          const r=await buClassApi.request('student/media',{id:b.dataset.material},token);
          const link=document.createElement('a');
          link.href=new URL(r.url,buClassApi.base).href;
          link.target='_blank';link.rel='noopener noreferrer';
          link.className='btn';link.textContent='Mở '+b.textContent;
          const prior=panel.querySelector('.class-open-file');
          if(prior) prior.remove();
          link.classList.add('class-open-file');b.after(link);link.focus();
        } catch(error) {showError(panel,error);}
        finally {b.disabled=false;}
      });
      panel.querySelectorAll('[data-assignment-open]').forEach(b=>b.onclick=()=>assignment(panel,b.dataset.assignmentOpen,()=>mount(panel,chapter,onExit)));
    }).catch(error=>{if(panel.firstElementChild===marker&&marker.isConnected)showError(panel,error);});
  }
  async function assignment(panel,id,goBack) {
    const marker=panel.firstElementChild;
    try {
      const data=await buClassApi.request('student/assignment',{id},token);
      if(panel.firstElementChild!==marker) return;
      const title=esc(data.title);
      const top='<button class="btn secondary" data-back-to-class>← Tài liệu lớp</button><h3>'+title+'</h3>';
      const showResult=result=>{
        panel.innerHTML='<section class="replay-card">'+top+'<p><strong>'+esc(result.score)+'/10</strong> · '+esc(result.correct)+'/'+esc(result.total)+' ý đúng</p>'+
          result.details.map((r,i)=>'<details><summary>Câu '+(i+1)+' · '+esc(r.correct+'/'+r.units)+' ý đúng</summary><p>'+quizMath(r.explanation)+'</p></details>').join('')+'</section>';
        panel.querySelector('[data-back-to-class]').onclick=goBack;
      };
      if(data.result) {showResult(data.result);return;}
      const options=(key,values)=>values.map((v,i)=>'<label><input type="radio" name="'+esc(key)+'" value="'+i+'"> '+quizMath(v)+'</label>').join('');
      panel.innerHTML='<section class="replay-card class-assignment">'+top+'<form>'+
        data.questions.map((q,i)=>'<fieldset><legend>Câu '+(i+1)+'</legend><p>'+questionPrompt(q.prompt)+'</p>'+figureHTML(q.figure)+
          (q.type==='mcq'?options(q.id,q.options):q.type==='tf'?q.statements.map((s,j)=>'<p>'+quizMath(s.text)+'</p>'+figureHTML(s.figure)+options(q.id+'-'+j,['Đúng','Sai'])).join(''):
            '<label>Đáp án <input name="'+esc(q.id)+'" inputmode="decimal" maxlength="48"></label>')+'</fieldset>').join('')+
        '<button type="submit" class="btn">Nộp bài được giao</button><p class="login-error" data-class-status role="status"></p></form></section>';
      panel.querySelector('[data-back-to-class]').onclick=goBack;
      const form=panel.querySelector('form');
      form.onsubmit=async e=>{
        e.preventDefault();
        const submit=form.querySelector('button[type=submit]');
        submit.disabled=true;
        const formData=new FormData(form), answers={};
        for(const q of data.questions) {
          const value=formData.get(q.id);
          answers[q.id]=q.type==='tf'?q.statements.map((_,j)=>{
            const option=formData.get(q.id+'-'+j);
            return option===null?null:option==='0';
          }):q.type==='mcq'?value===null?null:Number(value):value;
        }
        try {
          const result=await buClassApi.request('student/submit',{id,answers},token);
          if(form.isConnected)showResult(result);
        } catch(error){if(form.isConnected)showError(panel,error);}
        finally{submit.disabled=false;}
      };
    } catch(error) {showError(panel,error);}
  }
  return {mount,mountPortal};
})();
