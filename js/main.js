/* ===========================================
   LOUBI ARABI — PORTFOLIO JS
=========================================== */

/* ---- THEME TOGGLE ---- */
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  // Respect system preference, default dark
  let theme = 'dark';
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    theme = 'light';
  }
  html.setAttribute('data-theme', theme);
  updateIcon(theme);

  if (btn) {
    btn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', theme);
      updateIcon(theme);
    });
  }

  function updateIcon(t) {
    if (!icon) return;
    icon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
})();

/* ---- NAVBAR: scroll class + active section highlight ---- */
(function () {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.btn-nav-resume)');
  const sections = document.querySelectorAll('section[id]');

  // Scrolled class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightNav();
  }, { passive: true });

  function highlightNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  highlightNav();
})();

/* ---- HAMBURGER MENU ---- */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ---- SCROLL REVEAL ---- */
(function () {
  const elements = document.querySelectorAll(
    '.section-header, .about-grid, .skill-group, .project-card, .cert-card, .contact-container, .stat-card'
  );

  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ---- PROJECT FILTERS ---- */
(function () {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('#projects-grid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide cards
      cards.forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('hidden', !show);
        // Re-trigger reveal animation
        if (show) {
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 20);
        }
      });
    });
  });
})();

/* ---- CERTIFICATE FILTERS ---- */
(function () {
  const filterBtns = document.querySelectorAll('[data-cert-filter]');
  const cards = document.querySelectorAll('#certs-grid .cert-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.certFilter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const issuer = card.dataset.certIssuer || '';
        const show = filter === 'all' || issuer === filter;
        card.classList.toggle('hidden', !show);
        if (show) {
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 20);
        }
      });
    });
  });
})();

/* ---- CURSOR BLINK (hero) already in CSS ---- */

/* ---- STATS COUNTER ANIMATION ---- */
(function () {
  const stats = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.textContent.replace('+', ''), 10);
      const hasPlusSign = el.textContent.includes('+');
      let current = 0;
      const step = Math.ceil(target / 30);
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (hasPlusSign ? '+' : '');
        if (current >= target) clearInterval(interval);
      }, 40);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
})();

/* ---- SMOOTH SCROLL for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
