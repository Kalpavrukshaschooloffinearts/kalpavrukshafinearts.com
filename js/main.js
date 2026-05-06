/* ============================================================
   KALPAVRUKSHA SCHOOL OF FINE ARTS — SHARED JS
   ============================================================ */

(function () {
  'use strict';

  // ── NAV SCROLL EFFECT ──────────────────────────────────────
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── HAMBURGER MENU ─────────────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── ACTIVE NAV LINK ────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── WA FLOAT TOOLTIP ──────────────────────────────────────
  // Already handled via CSS animation

  // ── SIMPLE SCROLL-REVEAL ──────────────────────────────────
  if ('IntersectionObserver' in window) {
    const observed = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !observed.has(entry.target)) {
          observed.add(entry.target);
          entry.target.style.animationPlayState = 'running';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = '0';
      el.style.animationPlayState = 'paused';
      io.observe(el);
    });
  }

  // ── FAQ ACCORDION ─────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open);
      const ans = item.querySelector('.faq-a');
      if (ans) {
        ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0';
      }
    });
  });

  // ── ENQUIRY FORM ──────────────────────────────────────────
  const form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const name = form.querySelector('[name="name"]')?.value || '';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const course = form.querySelector('[name="course"]')?.value || '';
      const msg = `Hello, I am ${name}. I am interested in ${course || 'learning Bharatanatyam'} at Kalpavruksha School of Fine Arts. My phone: ${phone}. Please share more details.`;
      const waURL = `https://wa.me/917200095585?text=${encodeURIComponent(msg)}`;
      // Show success state
      if (btn) {
        btn.textContent = 'Redirecting to WhatsApp…';
        btn.disabled = true;
      }
      setTimeout(() => window.open(waURL, '_blank'), 600);
    });
  }

  // ── GALLERY LIGHTBOX (minimal) ─────────────────────────────
  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(28,20,16,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';
      const big = document.createElement('img');
      big.src = img.dataset.lightbox || img.src;
      big.alt = img.alt;
      big.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:2px';
      overlay.appendChild(big);
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => overlay.remove());
    });
  });

})();
