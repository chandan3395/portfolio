const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

(function theme(){
  const saved = localStorage.getItem('cg-theme');
  if(saved === 'light') document.body.classList.add('light');
  $$('.theme-toggle').forEach(btn => btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('cg-theme', document.body.classList.contains('light') ? 'light' : 'dark');
    $$('.theme-icon').forEach(icon => icon.textContent = document.body.classList.contains('light') ? '☼' : '◐');
  }));
})();

(function mobileMenu(){
  const toggle = $('.menu-toggle'), menu = $('.mobile-menu');
  if(!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  }));
})();

(function activeNav(){
  const current = document.body.dataset.page;
  $$(`[data-page="${current}"]`).forEach(el => el.classList.add('active'));
})();

(function years(){
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();

(function reveals(){
  const items = $$('.reveal');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ items.forEach(el => el.classList.add('visible')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); }
  }), {threshold:.12, rootMargin:'0px 0px -40px'});
  items.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i * 18, 140)}ms`; io.observe(el); });
})();

(function anchors(){
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1), target = document.getElementById(id);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  }));
})();
