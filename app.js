'use strict';
const videos = [
 {id:'ps3yi8GGV6E',title:'Tafseer Surat Al-Mulk: The Kingdom',subtitle:'Ayaat 5–14 · Part 3 of 5',category:'quran',label:"Qur'an & Tafseer",keywords:'quran tafseer mulk kingdom verse revelation'},
 {id:'QmtslG9kI8s',title:'Calamities, is Allah against me?',subtitle:'A reminder from the channel',category:'heart',label:'Heart & soul',keywords:'patience calamities hardship hope heart trials'},
 {id:'-QeFZzJx3tI',title:"Staying motivated in seeking Allah’s forgiveness",subtitle:'A short reminder',category:'heart',label:'Heart & soul',keywords:'forgiveness repentance motivation hope soul'},
 {id:'KzlBxunTMSU',title:'The awrah of a man & woman',subtitle:'Everyday guidance',category:'daily',label:'Everyday faith',keywords:'modesty dress everyday faith worship'}
];
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const thumb = v => `assets/video-${v.id}.jpg`;
const videoURL = v => `https://www.youtube.com/watch?v=${v.id}`;
function makeCard(v, index){
 const a=document.createElement('a');a.className='video-card'+(index===0?' featured':'');a.href=videoURL(v);a.target='_blank';a.rel='noopener';
 const image=document.createElement('div');image.className='video-image';
 const img=document.createElement('img');img.src=thumb(v);img.alt='';img.width=1280;img.height=720;img.loading='lazy';
 const play=document.createElement('span');play.className='video-play';play.textContent='▶';play.setAttribute('aria-hidden','true');image.append(img,play);
 const text=document.createElement('div');text.className='video-content';
 const type=document.createElement('div');type.className='video-type';type.textContent=v.label;
 const h=document.createElement('h3');h.textContent=v.title;
 const action=document.createElement('div');action.className='video-action';action.append(document.createTextNode(v.subtitle+' '));
 const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');action.append(arrow);text.append(type,h,action);a.append(image,text);
 a.setAttribute('aria-label',`${v.title}. ${v.subtitle}. Watch on YouTube, opens in a new tab.`);return a;
}
function renderVideos(filter='all'){
 const selected=videos.filter(v=>filter==='all'||v.category===filter);const grid=$('#video-grid');grid.replaceChildren(...selected.map(makeCard));grid.classList.toggle('compact',selected.length<4);grid.classList.toggle('single',selected.length===1);$('#lecture-status').textContent=selected.length+' reminders shown';$('.no-results').hidden=selected.length>0;
}
if($('#video-grid'))renderVideos();
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 $$('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderVideos(button.dataset.filter);
}));
const nav=$('#navigation'),menu=$('.menu-toggle');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}
menu.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
$$('a',nav).forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
let dialogOpener=null;
function showDialog(selector,opener){closeMenu();dialogOpener=opener;const dialog=$(selector);dialog.showModal();document.body.style.overflow='hidden';}
$$('dialog').forEach(dialog=>{
 $('.dialog-close',dialog).addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
 dialog.addEventListener('close',()=>{document.body.style.overflow='';dialogOpener?.focus();});
});
$$('.contact-toggle').forEach(b=>b.addEventListener('click',()=>showDialog('#contact-dialog',b)));
$$('.privacy-toggle').forEach(b=>b.addEventListener('click',()=>showDialog('#privacy-dialog',b)));
function normaliseSearch(text){return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f'’‘]/g,'').trim();}
function searchVideos(){
 const term=normaliseSearch($('#search-input').value);const matches=videos.filter(v=>normaliseSearch(v.title+' '+v.keywords+' '+v.subtitle).includes(term));
 const elements=matches.map(v=>{const a=document.createElement('a');a.className='search-result';a.href=videoURL(v);a.target='_blank';a.rel='noopener';const img=document.createElement('img');img.src=thumb(v);img.alt='';img.width=90;img.height=51;const b=document.createElement('b');b.textContent=v.title;const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');a.append(img,b,arrow);return a;});
 const articleMatches=JOURNAL.filter(article=>normaliseSearch(article.title+' '+article.category+' '+article.excerpt+' '+article.reference).includes(term));
 articleMatches.forEach(article=>{const a=document.createElement('a');a.className='search-result';a.href=document.body.dataset.embedded==='true'?'#reflections':article.slug+'.html';const img=document.createElement('img');img.src=window.EMBEDDED_PHOTOS?.[article.image]||'assets/'+article.image;img.alt='';img.width=90;img.height=51;const b=document.createElement('b');b.textContent=article.title+' · Article';const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');a.append(img,b,arrow);if(document.body.dataset.embedded==='true')a.addEventListener('click',()=>$('#search-dialog').close());elements.push(a);});
 if(!elements.length){const p=document.createElement('p');p.className='search-empty';p.textContent='No matching lecture or article. Try Qur’an, hope, worship or forgiveness.';elements.push(p);}
 $('#search-results').replaceChildren(...elements);
}
$$('.search-toggle').forEach(b=>b.addEventListener('click',()=>{showDialog('#search-dialog',b);searchVideos();$('#search-input').focus();}));
$('#search-input').addEventListener('input',searchVideos);
const articles=Object.fromEntries(JOURNAL.map(entry=>[entry.id,entry]));
$$('[data-article]').forEach(link=>link.addEventListener('click',event=>{
 if(document.body.dataset.embedded!=='true')return;
 event.preventDefault();const article=articles[link.dataset.article];$('#article-title').textContent=article.title;
 const photo=document.createElement('img');photo.src=window.EMBEDDED_PHOTOS?.[article.image]||'assets/'+article.image;photo.alt=article.alt;photo.className='modal-article-photo';
 const ar=document.createElement('p');ar.className='article-ar';ar.lang='ar';ar.dir='rtl';ar.textContent=article.arabic;
 const nodes=article.body.map((text,i)=>{const el=document.createElement(i===3||i===5?'h3':'p');el.textContent=text;return el;});
 const source=document.createElement('p');source.className='source';source.textContent="Qur'an, "+article.reference+". Editorial preview pending review; not attributed to the Shaykh.";
 $('#article-body').replaceChildren(photo,ar,...nodes,source);showDialog('#article-dialog',link);
}));
$('#contact-form')?.addEventListener('input',()=>{$('#enquiry-draft').hidden=true;$('#copy-enquiry').hidden=true;$('#contact-status').textContent='';});
$('#contact-form')?.addEventListener('submit',e=>{
 e.preventDefault();const data=new FormData(e.currentTarget);const draft=`Enquiry: ${data.get('type')}\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nOrganisation: ${data.get('organisation')||'Not specified'}\nLocation: ${data.get('city')||'Not specified'}\n\n${data.get('message')}`;
 $('#contact-status').textContent='Your enquiry preview is below. Nothing has been sent.';$('#enquiry-draft').textContent=draft;$('#enquiry-draft').hidden=false;$('#copy-enquiry').hidden=false;
});
$('#copy-enquiry')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#enquiry-draft').textContent);$('#contact-status').textContent='Enquiry copied. Nothing has been sent.';}catch{$('#contact-status').textContent='Select the preview text below to copy it manually.';}});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal');observer.unobserve(entry.target);}}),{threshold:.08});
 $$('.section-heading,.about-copy,.quote-band h2,.listen-copy,.connect-top').forEach(el=>observer.observe(el));
}
