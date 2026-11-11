(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const form=e=>Object.fromEntries(new FormData(e));
  const names={mcq:'Chọn đáp án',tf:'Đúng / Sai',short:'Trả lời ngắn',recognize:'Nhận biết',apply:'Vận dụng',trap:'Dễ sai'};
  const dataCache=new Map();
  const selection=new Set(), chosenFiles=new Set();
  let token='', data, currentBank, chapterKey='';
  const room=()=>data.rooms.find(r=>r.id===$('room').value);
  const chapter=()=>$('chapter').value;
  function tell(message){$('status').textContent=message;}
  function guard(action){
    return async (...args)=>{tell('');try{await action(...args);}catch(error){tell(error.message);}};
  }
  const call=(path,payload)=>buClassApi.request('admin/'+path,payload,token);
  const choice=(v,label)=>'<option value="'+esc(v)+'">'+esc(label)+'</option>';
  const sessionKey=()=>({roomId:room()?.id,chapter:chapter()});
  async function refresh(){
    data=await call('state');
    const old=$('room').value;
    const options=data.rooms.map(r=>choice(r.id,r.name)).join('');
    $('room').innerHTML=options;
    $('newStudent').elements.roomId.innerHTML=options;
    if(data.rooms.some(r=>r.id===old)) $('room').value=old;
    $('sync').disabled=!data.driveReady;
    $('syncStatus').textContent=data.driveReady?(data.syncedAt?'Cập nhật '+new Date(data.syncedAt).toLocaleString('vi-VN'):'Chưa đồng bộ'):'Chưa cấu hình thư mục Drive';
    renderStudyProfiles();
    await showRoom();
  }
  function renderStudyProfiles() {
    const query=$('hostStudySearch').value.trim().toLocaleLowerCase('vi');
    const grade=Number($('hostStudyGrade').value);
    const list=(data.studyProfiles||[]).filter(profile=>(!grade||grade===profile.grade)&&profile.name.toLocaleLowerCase('vi').includes(query))
      .sort((a,b)=>b.updated.localeCompare(a.updated));
    const chapterList=profile=>buCurriculum.find(group=>group.grade===profile.grade)?.chapters||[];
    const chapterTitle=(profile,id)=>chapterList(profile).find(c=>c.id===id)?.title||id;
    $('hostStudyList').innerHTML=list.length?'<table><thead><tr><th>Hồ sơ</th><th>Tiến độ</th><th>Hoạt động gần nhất</th><th>Đồng bộ</th></tr></thead><tbody>'+
      list.map(profile=>'<tr><td><strong>'+esc(profile.name)+'</strong><br>Lớp '+profile.grade+'</td>'+
      '<td><details><summary>'+profile.done+' câu · đúng '+profile.accuracy+'%</summary>'+
      profile.chapters.filter(c=>c.done).map(c=>'<div>'+esc(chapterTitle(profile,c.id))+' · '+c.done+'/'+c.total+'</div>').join('')+'</details></td>'+
      '<td>'+esc(new Date(profile.updated).toLocaleString('vi-VN'))+'</td><td><button type="button" data-study-block="'+esc(profile.id)+'" data-blocked="'+profile.blocked+'">'+
      (profile.blocked?'Mở lại':'Tắt đồng bộ')+'</button></td></tr>').join('')+'</tbody></table>':'<p>Chưa có hồ sơ tự học phù hợp.</p>';
    for(const button of $('hostStudyList').querySelectorAll('[data-study-block]'))button.onclick=guard(async()=>{
      await call('study-profile',{id:button.dataset.studyBlock,blocked:button.dataset.blocked!=='true'});
      await refresh();
    });
  }
  async function showRoom(){
    const r=room();
    $('roomWorkspace').hidden=!r;
    const students=data.students.filter(s=>s.roomId===r?.id);
    $('students').innerHTML=students.map(s=>'<div class="row"><strong>'+esc(s.name)+'</strong>'+
      (s.active?'<button data-revoke="'+esc(s.id)+'">Thu hồi mật khẩu</button>':'<span class="muted">Đã thu hồi</span>')+'</div>').join('');
    for(const b of $('students').querySelectorAll('[data-revoke]')) b.onclick=guard(async()=>{
      if(confirm('Thu hồi quyền lớp của học sinh này?')){await call('revoke',{id:b.dataset.revoke});await refresh();}
    });
    if(!r)return;
    $('newStudent').elements.roomId.value=r.id;
    const old=chapter(), oldStudent=$('assignmentStudent').value;
    const grade=buCurriculum.find(g=>g.grade===r.grade);
    $('chapter').innerHTML=grade.chapters.map(c=>choice(c.id,c.title)).join('');
    if(grade.chapters.some(c=>c.id===old)) $('chapter').value=old;
    $('assignmentStudent').innerHTML=choice('','Cả lớp')+students.filter(s=>s.active).map(s=>choice(s.id,s.name)).join('');
    if(students.some(s=>s.id===oldStudent&&s.active)) $('assignmentStudent').value=oldStudent;
    await showChapter();
  }
  function files(){
    const marked=new Set(data.placements.map(p=>p.fileId));
    const text=$('findFiles').value.toLocaleLowerCase('vi').trim();
    const kind=$('fileKind').value;
    $('files').innerHTML=data.files.filter(f=>(!$('unplaced').checked||!marked.has(f.id))&&
      (!kind||f.kind===kind)&&f.name.toLocaleLowerCase('vi').includes(text)).map(f=>
      '<label class="choice"><input type="checkbox" data-file="'+esc(f.id)+'" '+(chosenFiles.has(f.id)?'checked':'')+
      '><span>'+esc(f.name)+' <small class="muted">'+esc(f.kind)+'</small></span></label>').join('')||'<p class="muted">Chưa có tệp phù hợp.</p>';
  }
  function movePlacement(placement) {
    const picker=$('moveMaterial'), form=$('moveMaterialForm');
    form.elements.chapter.innerHTML=buCurriculum.find(group=>group.grade===room().grade).chapters.map(c=>choice(c.id,c.title)).join('');
    form.elements.chapter.value=placement.chapter;
    form.elements.session.value=placement.session;
    form.elements.order.value=placement.order;
    form.onsubmit=guard(async event=>{
      event.preventDefault();
      const values=formData(form);
      await call('material',{id:placement.id,...values});
      picker.close();
      await refresh();
      tell('Đã cập nhật vị trí tài liệu.');
    });
    picker.showModal();
  }
  const formData=form;
  $('cancelMove').onclick=()=>$('moveMaterial').close();
  function placements(){
    const found=new Map(), context=sessionKey();
    for(const p of data.placements.filter(p=>p.roomId===context.roomId&&p.chapter===context.chapter).sort((a,b)=>a.order-b.order)){
      if(!found.has(p.session))found.set(p.session,[]);
      found.get(p.session).push(p);
    }
    const byId=new Map(data.files.map(f=>[f.id,f]));
    $('placed').innerHTML=[...found].map(([name,list])=>'<details open><summary>'+esc(name)+'</summary>'+
      list.map(p=>'<div class="row"><label>Thứ tự <input type="number" min="1" max="999" value="'+p.order+'" data-order="'+esc(p.id)+'"></label><span>'+esc(byId.get(p.fileId)?.name||'File đã rời thư mục Drive')+'</span>'+
        '<small class="muted">'+(p.published?'Đã mở':'Bản nháp')+'</small><button data-move="'+esc(p.id)+'">Chuyển chương / buổi</button><button data-unplace="'+esc(p.id)+'">Bỏ xếp</button></div>').join('')+
      '<button data-open-session="'+esc(name)+'">Mở xem lại</button> <button data-close-session="'+esc(name)+'">Đóng xem lại</button></details>').join('')||
      '<p class="muted">Chưa xếp tài liệu vào chương này.</p>';
    for(const field of $('placed').querySelectorAll('[data-order]')) field.onchange=guard(async()=>{
      await call('material',{id:field.dataset.order,order:Number(field.value)});await refresh();
    });
    for(const b of $('placed').querySelectorAll('[data-move]')) b.onclick=()=>movePlacement(data.placements.find(p=>p.id===b.dataset.move));
    for(const b of $('placed').querySelectorAll('[data-unplace]')) b.onclick=guard(async()=>{
      await call('material',{id:b.dataset.unplace,remove:true});await refresh();
    });
    for(const b of $('placed').querySelectorAll('[data-open-session],[data-close-session]')) b.onclick=guard(async()=>{
      const session=b.dataset.openSession??b.dataset.closeSession, publish=b.hasAttribute('data-open-session');
      if(publish&&!confirm('Xác nhận đã dạy xong và mở tài liệu buổi này?'))return;
      await call('publish',{...context,session,publish});await refresh();
    });
  }
  function filtered(){
    if(!currentBank)return [];
    const tags=[...document.querySelectorAll('[data-level]:checked')].map(b=>b.value);
    const type=$('questionType').value;
    return currentBank.chapterIds.map(id=>currentBank.questions[id]).filter(q=>(!type||q.type===type)&&
      (!tags.length||tags.some(tag=>q.tags.includes(tag))));
  }
  function questions(){
    $('picked').textContent=selection.size+' câu đã chọn';
    $('bank').innerHTML=filtered().map(q=>'<label class="choice"><input type="checkbox" data-q="'+esc(q.id)+'" '+(selection.has(q.id)?'checked':'')+
      '><span><strong>'+esc(names[q.type])+'</strong> · '+esc(q.tags.map(t=>names[t]).join(' / '))+'<br>'+buMath.render(q.prompt).replace(/\n/g,'<br>')+'</span></label>').join('')||
      '<p class="muted">Hãy đổi bộ lọc để xem các câu khác.</p>';
  }
  function assignments(){
    const context=sessionKey();
    const names=new Map(data.students.map(s=>[s.id,s.name]));
    $('assignments').innerHTML=data.assignments.filter(a=>a.roomId===context.roomId&&a.chapter===context.chapter).map(a=>{
      const submitted=data.submissions.filter(s=>s.assignmentId===a.id);
      const counts=data.students.filter(s=>s.active&&s.roomId===a.roomId&&(!a.studentId||a.studentId===s.id)).length;
      return '<details><summary>'+esc(a.title)+' · '+esc(a.count)+' câu · '+submitted.length+'/'+counts+' đã nộp</summary>'+
        (submitted.length?submitted.map(s=>'<div><strong>'+esc(names.get(s.studentId)||'Học sinh')+'</strong> · '+esc(s.result.score)+'/10 · '+
          esc(s.result.correct+'/'+s.result.total)+' ý đúng</div>').join(''):'<p class="muted">Chưa có bài nộp.</p>')+'</details>';
    }).join('')||'<p class="muted">Chương này chưa có bài được giao.</p>';
  }
  async function showChapter(){
    const key=chapter();
    if(chapterKey!==key){chapterKey=key;selection.clear();}
    files();placements();assignments();
    if(!dataCache.has(key)){
      const r=await fetch('data/'+key+'.json');
      if(!r.ok)throw Error('Chưa tải được ngân hàng chương.');
      dataCache.set(key,await r.json());
    }
    if(chapter()!==key)return;
    currentBank=dataCache.get(key);
    questions();
  }
  $('newGrade').innerHTML=buCurriculum.map(g=>choice(g.grade,'Lớp '+g.grade)).join('');
  $('login').onsubmit=guard(async e=>{
    e.preventDefault();
    const response=await buClassApi.request('login',{...form(e.target),role:'teacher'});
    token=response.token;e.target.reset();
    await refresh();$('teacherLogin').hidden=true;$('workspace').hidden=false;
  });
  $('newRoom').onsubmit=guard(async e=>{e.preventDefault();await call('rooms',form(e.target));e.target.reset();await refresh();});
  $('newStudent').onsubmit=guard(async e=>{
    e.preventDefault();
    const response=await call('students',form(e.target));
    $('issued').textContent='Mật khẩu vừa cấp: '+response.password;
    e.target.elements.name.value='';
    await refresh();
  });
  $('hostStudyGrade').innerHTML=choice('','Tất cả')+buCurriculum.map(g=>choice(g.grade,'Lớp '+g.grade)).join('');
  $('hostStudySearch').oninput=$('hostStudyGrade').onchange=renderStudyProfiles;
  $('reloadStudy').onclick=guard(refresh);
  for(const button of document.querySelectorAll('[data-host-area]'))button.onclick=()=>{
    const study=button.dataset.hostArea==='study';
    $('hostClass').hidden=study;
    $('hostStudy').hidden=!study;
    for(const tab of document.querySelectorAll('[data-host-area]'))tab.setAttribute('aria-pressed',String(tab===button));
  };
  $('room').onchange=guard(showRoom);
  $('chapter').onchange=guard(showChapter);
  $('sync').onclick=guard(async()=>{
    $('sync').disabled=true;
    try {const result=await call('sync',{});await refresh();tell('Đã đồng bộ '+result.count+' tệp.');}
    finally {$('sync').disabled=!data.driveReady;}
  });
  $('findFiles').oninput=files;
  $('fileKind').onchange=$('unplaced').onchange=files;
  $('files').onchange=e=>{
    const id=e.target.dataset.file;
    if(id){if(e.target.checked)chosenFiles.add(id);else chosenFiles.delete(id);}
  };
  $('place').onsubmit=guard(async e=>{
    e.preventDefault();await call('place',{...sessionKey(),...form(e.target),fileIds:[...chosenFiles]});chosenFiles.clear();await refresh();
  });
  $('assignment').onchange=e=>{if(e.target.id==='questionType'||e.target.hasAttribute('data-level'))questions();};
  $('bank').onchange=e=>{
    const id=e.target.dataset.q;
    if(!id)return;
    if(e.target.checked&&selection.size>=20){e.target.checked=false;tell('Chọn tối đa 20 câu.');return;}
    if(e.target.checked)selection.add(id);else selection.delete(id);
    $('picked').textContent=selection.size+' câu đã chọn';
  };
  $('pick').onclick=()=>{
    const count=Math.min(20,Math.max(1,Number($('assignmentCount').value)||6));
    const pool=filtered().map(q=>({id:q.id,r:Math.random()})).sort((a,b)=>a.r-b.r);
    selection.clear();pool.slice(0,count).forEach(x=>selection.add(x.id));questions();
  };
  $('assignment').onsubmit=guard(async e=>{
    e.preventDefault();await call('assign',{...sessionKey(),...form(e.target),ids:[...selection]});
    selection.clear();e.target.elements.title.value='';await refresh();tell('Đã giao bài.');
  });
  if(!buClassApi.base){$('login').hidden=true;tell('Điền địa chỉ máy chủ lớp trong settings.js để mở Quản trị.');}
})();
