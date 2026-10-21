'use strict';
(() => {
 const $ = (s, root=document) => root.querySelector(s);
 const $$ = (s, root=document) => [...root.querySelectorAll(s)];
 const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const GROUPS = {
  tafseer: {label: 'Tafseer', text: 'Verse-by-verse Tafseer that slows down with each ayah, explaining its meaning, its context and how it speaks to life today.'},
  subjects: {label: 'Subject', text: 'Focused courses on one theme at a time, from the morning and evening adhkar to the stories of the Companions.'},
  seasons: {label: 'Seasons', text: 'Lectures and daily reminders to prepare the heart for Ramadan, Dhul Hijjah and the best days of the year.'}
 };
 const duration = minutes => `${String(Math.floor(minutes / 60)).padStart(2, '0')}h ${String(minutes % 60).padStart(2, '0')}m`;
 const hours = minutes => Math.round(minutes / 60);

 // Path card totals
 $$('[data-stats]').forEach(el => {
  const list = SERIES.filter(s => s.group === el.dataset.stats);
  const lessons = list.reduce((sum, s) => sum + s.lessons, 0);
  const minutes = list.reduce((sum, s) => sum + s.minutes, 0);
  el.textContent = `${list.length} series · ${lessons} lessons · ${hours(minutes)}h`;
 });

 // Series showcase
 const icon = path => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
 function tile(s) {
  const a = document.createElement('a');
  a.className = 'series-tile';
  a.href = `https://www.youtube.com/playlist?list=${s.playlist}`;
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', `${s.title}: ${s.lessons} lessons, ${duration(s.minutes)}. Opens the playlist on YouTube.`);
  a.innerHTML = `<div class="tile-image"><img src="assets/series/${s.id}.jpg" alt="" width="800" height="450" loading="lazy"></div>
<div class="tile-body"><h4></h4><div class="tile-meta"><span>${icon('M4 6h16v12H4zM10 9.5v5l4-2.5z')}${s.lessons} Lessons</span><span>${icon('M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z')}${duration(s.minutes)}</span></div>
<div class="tile-tags"><span>${GROUPS[s.group].label}</span><span></span></div></div>`;
  $('h4', a).textContent = s.title;
  $('.tile-tags span:last-child', a).textContent = s.tag;
  return a;
 }
 $$('[data-series-group]').forEach(grid => grid.replaceChildren(...SERIES.filter(s => s.group === grid.dataset.seriesGroup).map(tile)));
 const tabs = $$('.showcase-tabs [role="tab"]');
 const row = $('.showcase-row');
 function selectGroup(group, focus = false) {
  tabs.forEach(tab => {
   const on = tab.dataset.group === group;
   tab.setAttribute('aria-selected', String(on));
   tab.tabIndex = on ? 0 : -1;
   if (on) {
    $('#showcase-panel').setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus();
   }
  });
  $('.showcase-desc').textContent = GROUPS[group].text;
  row.replaceChildren(...SERIES.filter(s => s.group === group).map(tile));
  row.scrollLeft = 0;
 }
 if (row) {
  selectGroup('tafseer');
  tabs.forEach((tab, i) => {
   tab.addEventListener('click', () => selectGroup(tab.dataset.group));
   tab.addEventListener('keydown', e => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    selectGroup(tabs[(i + step + tabs.length) % tabs.length].dataset.group, true);
   });
  });
  $$('[data-scroll]').forEach(b => b.addEventListener('click', () => {
   row.scrollBy({left: Number(b.dataset.scroll) * row.clientWidth * .8, behavior: reduceMotion ? 'auto' : 'smooth'});
  }));
  $$('[data-path]').forEach(card => card.addEventListener('click', () => selectGroup(card.dataset.path)));
 }

 // Testimonials carousel
 const track = $('.testimonial-track');
 if (track) {
  const items = $$('.testimonial', track);
  const dots = $('.testimonial-dots');
  let index = 0, timer;
  const buttons = items.map((_, i) => {
   const b = document.createElement('button');
   b.type = 'button';
   b.setAttribute('aria-label', `Testimonial ${i + 1} of ${items.length}`);
   b.addEventListener('click', () => { go(i); restart(); });
   dots.append(b);
   return b;
  });
  function go(i) {
   index = (i + items.length) % items.length;
   const max = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
   track.style.transform = `translateX(${-Math.min(items[index].offsetLeft, max)}px)`;
   buttons.forEach((b, n) => b.setAttribute('aria-current', String(n === index)));
  }
  function restart() {
   clearInterval(timer);
   if (!reduceMotion) timer = setInterval(() => go(index + 1), 6000);
  }
  const box = $('.testimonials');
  box.addEventListener('mouseenter', () => clearInterval(timer));
  box.addEventListener('mouseleave', restart);
  box.addEventListener('focusin', () => clearInterval(timer));
  addEventListener('resize', () => go(index));
  go(0);
  restart();
 }
})();
