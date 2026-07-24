// Avinash Builders - Slider, Word Rotator, Reveal Animations
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Hero slider ---------- */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dots span');
  let idx = 0, timer;
  function show(i) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    if (slides[i]) slides[i].classList.add('active');
    if (dots[i]) dots[i].classList.add('active');
  }
  function next() { idx = (idx + 1) % slides.length; show(idx); }
  if (slides.length) {
    show(0);
    timer = setInterval(next, 5500);
    dots.forEach((d, i) => d.addEventListener('click', () => {
      idx = i; show(idx); clearInterval(timer); timer = setInterval(next, 5500);
    }));
  }

  /* ---------- Enhance hero slides: eyebrow + rotating word + CTAs ---------- */
  const rotatingWords = ['Dream Homes', 'Villas', 'Offices', 'Landmarks', 'Legacies'];
  slides.forEach((slide, i) => {
    const content = slide.querySelector('.slide-content');
    if (!content) return;
    // add eyebrow chip once
    if (!content.querySelector('.eyebrow')) {
      const eb = document.createElement('span');
      eb.className = 'eyebrow';
      eb.textContent = 'Avinash Builders • Madurai';
      content.insertBefore(eb, content.firstChild);
    }
    // add CTAs once
    if (!content.querySelector('.hero-cta')) {
      const cta = document.createElement('div');
      cta.className = 'hero-cta';
      cta.innerHTML = '<a class="btn-hero primary" href="contact.html">Get Free Quote</a>' +
                      '<a class="btn-hero ghost" href="projects.html">View Projects</a>';
      content.appendChild(cta);
    }
    // inject rotator into the FIRST slide's headline
    if (i === 0) {
      const h2 = content.querySelector('h2');
      if (h2 && !h2.querySelector('.rot-wrap')) {
        h2.innerHTML = 'We Build <span class="rot-wrap"><span class="rot-word">' + rotatingWords[0] + '</span></span>';
      }
    }
  });

  // Rotate the word in the first slide's headline every 2.2s
  const rotEl = document.querySelector('.slide .rot-word');
  if (rotEl) {
    let w = 0;
    setInterval(() => {
      w = (w + 1) % rotatingWords.length;
      const wrap = rotEl.parentElement;
      const fresh = document.createElement('span');
      fresh.className = 'rot-word';
      fresh.textContent = rotatingWords[w];
      wrap.innerHTML = '';
      wrap.appendChild(fresh);
    }, 2400);
  }

  /* ---------- Reveal on scroll ---------- */
  const targets = document.querySelectorAll('.anim-img, .card, .section-title');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(t => io.observe(t));
  } else {
    targets.forEach(t => t.classList.add('in-view'));
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for contacting Avinash Builders! Our team will call you shortly.');
      form.reset();
    });
  }

  /* ---------- Scroll to top ---------- */
  const btn = document.createElement('button');
  btn.className = 'to-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
