/* ============ ALMAS BEAUTY — script.js ============ */
'use strict';

/* ---------- Config ---------- */
const WHATSAPP_NUMBER = '923108627237';
const SALE_DURATION_DAYS = 15; // countdown duration
const WA_SVG = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

/* ---------- Products (updated prices) ---------- */
const products = [
  {
    id: 1,
    name: 'Face & Neck Cream',
    sub: 'Intensive Whitening · 50g',
    desc: 'A featherlight herbal cream that fades dark spots and evens tone on the face, neck and jawline.',
    tag: 'Best Seller',
    orig: 1200,   // Original Price PKR
    sale: 800,    // Sale Price PKR
    img: 'face.jpg'
  },
  {
    id: 2,
    name: 'Hand & Foot Cream',
    sub: 'Deep Repair · 100g',
    desc: 'Rich, cushioning moisture that targets knuckles, heels and elbows for visibly softer, brighter skin.',
    tag: 'Customer Favourite',
    orig: 1700,   // Original Price PKR
    sale: 1200,   // Sale Price PKR
    img: 'feet.jpg'
  },
  {
  
    id: 3,
    name: 'Herbal Intensive Whitening Cream Combo',
    sub: 'Face, Neck, Hands & Feet Kit',
    desc: 'Complete whitening care kit featuring Face & Neck Whitening Cream and Feet & Hands Whitening Cream for complete glow, spot correction, and deep nourishment.',
    tag: 'Bundle Offer',
    orig: 2900,
    sale: 2000,
    img: 'hero.png'
  
  }
];

/* ---------- Sample reviews ---------- */
const defaultReviews = [
  { stars: 5, text: 'My knuckles and heels have never looked this even. Two weeks in and I\'m completely converted.', who: 'Amira K.' },
  { stars: 5, text: 'The face cream gave me that lit-from-within glow by day five. It feels like silk, never greasy.', who: 'Sofia R.' },
  { stars: 5, text: 'Ordered on WhatsApp, arrived in three days with cash on delivery. The glow is real!', who: 'Mahnoor A.' },
  { stars: 5, text: 'Finally a whitening cream that doesn\'t sting. Gentle, herbal, and my dark spots are fading fast.', who: 'Lena M.' },
  { stars: 5, text: 'My neck and jawline look so much brighter. Almas is now a permanent part of my routine.', who: 'Hira T.' },
  { stars: 5, text: 'Visible difference within the first week — exactly as promised. Highly recommended!', who: 'Ayesha S.' }
];

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ---------- Mobile hamburger menu (responsive only) ---------- */
(function hamburgerMenu(){
  const burger = $('#hamburger');
  const links  = $('.nav-links');
  if (!burger || !links) return;
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));
})();

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg){
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ---------- Preloader ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    $('#preloader').classList.add('done');
    document.body.classList.remove('loading');
  }, 600);
});
setTimeout(() => { // safety fallback
  $('#preloader')?.classList.add('done');
  document.body.classList.remove('loading');
}, 4000);

/* ---------- Lenis smooth scroll (guarded) ---------- */
if (window.Lenis) {
  const lenis = new Lenis({ duration: 0.3, smoothWheel: true });
  function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target){ e.preventDefault(); lenis.scrollTo(target, { offset: -90 }); }
  }));
}

/* ---------- Render products → WhatsApp order buttons ---------- */
function waLink(p){
  const text = `Hi! I want to order ${p.name} priced at Rs. ${p.sale}. Please confirm my order.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function renderProducts(){
  $('#productGrid').innerHTML = products.map(p => `
    <article class="p-card reveal" data-tilt>
      <div class="p-img">
        <span class="p-tag">${p.tag}</span>
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="p-info">
        <h3 class="p-name">${p.name}</h3>
        <div class="p-sub">${p.sub}</div>
        <p class="p-desc">${p.desc}</p>
        <div class="p-row">
          <div class="p-price">
            <span class="sale">Rs. ${p.sale.toLocaleString()}</span>
            <span class="orig">Rs. ${p.orig.toLocaleString()}</span>
          </div>
          <a class="wa-btn" href="${waLink(p)}" target="_blank" rel="noopener">${WA_SVG} Order</a>
        </div>
      </div>
    </article>`).join('');
}
renderProducts();

/* ---------- 3D tilt micro-interaction on product cards ---------- */
if (matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('[data-tilt]');
    $$('[data-tilt]').forEach(c => { if (c !== card) c.style.transform = ''; });
    if (!card) return;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - .5) * -8;
    const ry = ((e.clientX - r.left) / r.width - .5) * 10;
    card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  document.addEventListener('mouseleave', () => $$('[data-tilt]').forEach(c => c.style.transform = ''), true);
}

/* ---------- Scroll reveal (Intersection Observer) ---------- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if (en.isIntersecting){
      setTimeout(() => en.target.classList.add('revealed'), (en.target.dataset.delay || 0));
      revealObs.unobserve(en.target);
    }
  });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 3) * 90; // subtle stagger
  revealObs.observe(el);
});

/* ---------- Stat counters ---------- */
const countObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, end = +el.dataset.count, span = el.querySelector('.count');
    const t0 = performance.now(), dur = 1600;
    (function tick(now){
      const p = Math.min((now - t0) / dur, 1);
      span.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    countObs.unobserve(el);
  });
}, { threshold: .6 });
$$('[data-count]').forEach(el => countObs.observe(el));

/* ---------- Sale countdown: 15 days (persisted) ---------- */
(function countdown(){
  const KEY = 'almasSaleEnd';
  let end = +localStorage.getItem(KEY);
  if (!end || end < Date.now()){
    end = Date.now() + SALE_DURATION_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(KEY, end);
  }
  const H = $('[data-h]'), M = $('[data-m]'), S = $('[data-s]');
  setInterval(() => {
    let d = Math.max(0, end - Date.now());
    const h = Math.floor(d / 3.6e6); d -= h * 3.6e6;
    const m = Math.floor(d / 6e4);   d -= m * 6e4;
    const s = Math.floor(d / 1e3);
    H.textContent = String(h).padStart(2,'0');
    M.textContent = String(m).padStart(2,'0');
    S.textContent = String(s).padStart(2,'0');
  }, 1000);
})();

/* ---------- Reviews: render + "Write a Review" form ---------- */
const stars = n => '★'.repeat(n) + '<span style="opacity:.35">' + '★'.repeat(5 - n) + '</span>';

function renderReviews(){
  const saved = JSON.parse(localStorage.getItem('almasReviews') || '[]');
  const all = [...saved, ...defaultReviews];
  $('#reviewsGrid').innerHTML = all.map(r => `
    <div class="review revealed">
      <div class="stars">${stars(r.stars)}</div>
      <p>"${r.text}"</p>
      <div class="who">— ${r.who}</div>
    </div>`).join('');
}
renderReviews();

$('#reviewForm').addEventListener('submit', e => {
  e.preventDefault();
  const name  = $('#rfName').value.trim();
  const text  = $('#rfText').value.trim();
  const rating = +document.querySelector('input[name="rating"]:checked').value;
  if (!name || !text || !rating) return;
  const saved = JSON.parse(localStorage.getItem('almasReviews') || '[]');
  saved.unshift({ stars: rating, text, who: name });
  localStorage.setItem('almasReviews', JSON.stringify(saved.slice(0, 20)));
  renderReviews();
  const grid = $('#reviewsGrid .review');
  grid[0]?.classList.add('new');
  e.target.reset();
  showToast('Thank you for your review ✦');
});

/* ---------- FAQ accordion ---------- */
$$('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    $$('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

/* ---------- Newsletter ---------- */
$('#newsForm').addEventListener('submit', e => {
  e.preventDefault();
  showToast('Welcome to the inner glow list ✦');
  e.target.reset();
});

/* ---------- Custom cursor ---------- */
if (matchMedia('(pointer:fine)').matches){
  const dot = $('#cursorDot'), ring = $('#cursorRing');
  let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function loop(){
    rx += (mx - rx) * .14; ry += (my - ry) * .14;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e => {
    ring.classList.toggle('grow', !!e.target.closest('a,button,.p-card,.faq-q'));
  });
}

/* ---------- Scroll progress + back-to-top ---------- */
const toTop = $('#toTop');
addEventListener('scroll', () => {
  const h = document.documentElement;
  $('#scrollProgress').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  toTop.classList.toggle('show', h.scrollTop > 600);
}, { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Hero orbs parallax ---------- */
addEventListener('mousemove', e => {
  const x = (e.clientX / innerWidth - .5), y = (e.clientY / innerHeight - .5);
  $('#orbA').style.transform = `translate(${x * 40}px, ${y * 40}px)`;
  $('#orbB').style.transform = `translate(${x * -30}px, ${y * -30}px)`;
});

/* ---------- Hero card tilt ---------- */
const heroCard = $('#heroCard');
if (heroCard && matchMedia('(pointer:fine)').matches){
  heroCard.addEventListener('mousemove', e => {
    const r = heroCard.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - .5) * -6;
    const ry = ((e.clientX - r.left) / r.width - .5) * 8;
    heroCard.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  heroCard.addEventListener('mouseleave', () => heroCard.style.transform = '');
}

/* ---------- Hero title entrance (GSAP, guarded) ---------- */
if (window.gsap){
  gsap.from('#heroTitle .line span', {
    yPercent: 110, duration: 1.2, stagger: .12, ease: 'power4.out', delay: 1.1
  });
  gsap.from('.hero-chip', { opacity: 0, y: 30, duration: 1, stagger: .2, delay: 1.6, ease: 'power3.out' });
}

/* ---------- Footer year ---------- */
$('#year').textContent = new Date().getFullYear();