/* ===== NAV ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

/* ===== TYPEWRITER ===== */
const phrases = ['事業企画', '新規事業PM', 'プラットフォーム運営', 'コンテンツ戦略立案', '日韓の架け橋'];
let pi = 0, ci = 0, del = false;
const typeEl = document.querySelector('.type-text');

if (typeEl) {
  function type() {
    const phrase = phrases[pi];
    if (!del) {
      typeEl.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { del = true; setTimeout(type, 2000); return; }
    } else {
      typeEl.textContent = phrase.slice(0, --ci);
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, del ? 45 : 110);
  }
  setTimeout(type, 1000);
}

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('revealed'); ro.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => ro.observe(el));

/* ===== NUMBER COUNTER ===== */
function animateNum(el) {
  const target = parseInt(el.dataset.target, 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const dur = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.floor(ease * target).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + target.toLocaleString() + suffix;
  }
  requestAnimationFrame(tick);
}

const statsbar = document.getElementById('statsbar');
if (statsbar) {
  let done = false;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !done) {
      done = true;
      document.querySelectorAll('.sb-num').forEach(animateNum);
    }
  }, { threshold: 0.5 }).observe(statsbar);
}

/* ===== PROFIT CHART ANIMATION ===== */
const profitBlock = document.querySelector('.profit-block');
if (profitBlock) {
  let animated = false;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !animated) {
      animated = true;
      document.querySelectorAll('.pc-bar[data-height]').forEach(bar => {
        const h = bar.dataset.height;
        bar.style.height = '0px';
        setTimeout(() => { bar.style.height = h + 'px'; }, 100);
      });
    }
  }, { threshold: 0.3 }).observe(profitBlock);
}

/* ===== ACTIVE NAV ===== */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navAs.forEach(a => {
        const active = a.getAttribute('href') === `#${id}`;
        if (nav.classList.contains('scrolled')) {
          a.style.color = active ? 'var(--blue)' : '';
        }
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' }).observe(document.body);

sections.forEach(s => {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      navAs.forEach(a => {
        const active = a.getAttribute('href') === `#${s.id}`;
        if (nav.classList.contains('scrolled')) {
          a.style.color = active ? 'var(--blue)' : '';
        } else {
          a.style.color = active ? 'white' : '';
        }
      });
    }
  }, { rootMargin: '-30% 0px -60% 0px' }).observe(s);
});
