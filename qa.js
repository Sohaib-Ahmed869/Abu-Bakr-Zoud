'use strict';
(()=>{
 const $=s=>document.querySelector(s);
 const STORE='abz-qa-submissions';
 const normalise=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ'’‘]/g,'').trim();
 const formatDate=d=>new Date(d+(d.length===10?'T00:00:00':'')).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
 const categories=['Charity','Ethics and Morality','Family','Fasting','Financial and Business Matters','General Guidance','Islamic Beliefs','Marriage and Family','New Muslims','Pilgrimage','Prayer','Social Issues',"Women's Issues",'Youth and Education','Other'];
 let category='All';

 function makeEntry(entry){
  const item=document.createElement('details');item.className='qa-item';item.id=entry.id;
  const summary=document.createElement('summary');
  const meta=document.createElement('span');meta.className='qa-meta';meta.textContent=entry.category;
  const q=document.createElement('span');q.className='qa-question';q.textContent=entry.question;
  const icon=document.createElement('span');icon.className='qa-icon';icon.setAttribute('aria-hidden','true');
  summary.append(meta,q,icon);
  const body=document.createElement('div');body.className='qa-answer';
  const label=document.createElement('span');label.className='preview-label';label.textContent='Editorial sample · Pending review';
  body.append(label,...entry.answer.map(text=>{const p=document.createElement('p');p.textContent=text;return p;}));
  const source=document.createElement('p');source.className='qa-source';source.textContent=entry.reference+' · '+formatDate(entry.date)+'. Not attributed to the Shaykh.';
  body.append(source);item.append(summary,body);
  item.addEventListener('toggle',()=>{if(item.open)history.replaceState(null,'','#'+entry.id);});
  return item;
 }

 const items=QA_ENTRIES.map(entry=>({entry,el:makeEntry(entry)}));
 $('#qa-list').replaceChildren(...items.map(i=>i.el));

 const used=['All',...categories.filter(c=>QA_ENTRIES.some(e=>e.category===c))];
 $('#qa-filters').replaceChildren(...used.map(c=>{const b=document.createElement('button');b.type='button';b.className='blog-filter'+(c==='All'?' active':'');b.dataset.qaCategory=c;b.setAttribute('aria-pressed',String(c==='All'));b.textContent=c==='All'?'All questions':c;return b;}));
 $('#qa-filters').addEventListener('click',e=>{const b=e.target.closest('[data-qa-category]');if(!b)return;category=b.dataset.qaCategory;$('#qa-filters').querySelectorAll('button').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});filter();});

 function filter(){
  const term=normalise($('#qa-search').value);let count=0;
  items.forEach(({entry,el})=>{const show=(category==='All'||entry.category===category)&&normalise(entry.question+' '+entry.answer.join(' ')+' '+entry.category).includes(term);el.hidden=!show;if(show)count++;});
  $('#qa-count').textContent=count+' '+(count===1?'question':'questions');$('#qa-empty').hidden=count>0;
 }
 $('#qa-search').addEventListener('input',filter);
 filter();

 const target=location.hash?document.getElementById(decodeURIComponent(location.hash.slice(1))):null;
 if(target?.classList.contains('qa-item')){target.open=true;target.scrollIntoView();}

 $('#qa-category').append(...categories.map(c=>new Option(c,c)));

 function load(){try{return JSON.parse(localStorage.getItem(STORE))||[];}catch{return [];}}
 function save(list){try{localStorage.setItem(STORE,JSON.stringify(list));return true;}catch{return false;}}
 function renderMine(){
  const list=load();$('#qa-mine').hidden=!list.length;
  $('#qa-mine-list').replaceChildren(...list.map((s,i)=>{
   const li=document.createElement('li');
   const meta=document.createElement('span');meta.className='qa-meta';meta.textContent=s.category+' · Awaiting answer';
   const q=document.createElement('p');q.textContent=s.question;
   const remove=document.createElement('button');remove.type='button';remove.className='text-link';remove.textContent='Remove';
   remove.addEventListener('click',()=>{const next=load();next.splice(i,1);save(next);renderMine();$('#qa-status').textContent='Question removed from this device.';});
   li.append(meta,q,remove);return li;
  }));
 }
 renderMine();

 $('#qa-form').addEventListener('input',()=>{$('#qa-status').textContent='';});
 $('#qa-form').addEventListener('submit',e=>{
  e.preventDefault();const form=e.currentTarget;const data=Object.fromEntries(new FormData(form));
  data.question=data.question.trim();
  if(!data.question){$('#qa-status').textContent='Please write your question.';return;}
  const stored=save([{...data,submitted:new Date().toISOString()},...load()]);
  form.reset();renderMine();
  $('#qa-status').textContent=stored?'Thank you. Your question is saved on this device and will be sent once submissions open.':'Your browser blocked saving. Please copy your question and try again later.';
 });
})();
