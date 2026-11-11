const buClassApi = (() => {
  let base='';
  try {
    const url=new URL(buSettings.classApi);
    if(url.protocol==='https:'||(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname))) base=url.origin;
  } catch {}
  async function request(path,data,token) {
    if(!base) throw Error('Chưa kết nối máy chủ lớp học.');
    const options={headers:{},referrerPolicy:'no-referrer',cache:'no-store'};
    if(token) options.headers.Authorization='Bearer '+token;
    if(data!==undefined) {
      options.method='POST';
      options.headers['Content-Type']='application/json';
      options.body=JSON.stringify(data);
    }
    const response=await fetch(base+'/api/'+path,options);
    const value=await response.json().catch(()=>null);
    if(!response.ok||!value) throw Error(value?.error||'Không kết nối được với máy chủ lớp.');
    return value;
  }
  return {base,request};
})();
