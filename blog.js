'use strict';
(()=>{
 const cards=[...document.querySelectorAll('.archive-grid .story-card')];
 const search=document.querySelector('#blog-search');let category='All articles';
 const normalise=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f'’‘]/g,'').trim();
 function filter(){let count=0;const term=normalise(search?.value||'');cards.forEach(card=>{const show=(category==='All articles'||card.dataset.category===category)&&normalise(card.dataset.title).includes(term);card.hidden=!show;if(show)count++;});document.querySelector('#blog-count').textContent=count+' '+(count===1?'article':'articles');document.querySelector('#blog-empty').hidden=count>0;}
 document.querySelectorAll('[data-blog-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.blogCategory;document.querySelectorAll('[data-blog-category]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});filter();}));
 search?.addEventListener('input',filter);
 document.querySelector('.share-article')?.addEventListener('click',async()=>{const status=document.querySelector('#share-status');try{await navigator.clipboard.writeText(location.href);status.textContent='Link copied';}catch{status.textContent='Copy the address from your browser to share this article.';}});
})();
