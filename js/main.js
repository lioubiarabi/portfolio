const header = document.getElementById('site-header');
const navLinks = document.getElementById('nav-links');
const menuToggle = document.getElementById('menu-toggle');
const themeToggle = document.getElementById('theme-toggle');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(!!isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
});

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  themeToggle.innerHTML = next === 'light'
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navAnchors.forEach((anchor) => {
    anchor.classList.toggle('active', anchor.getAttribute('href') === `#${current}`);
  });
});

const revealItems = document.querySelectorAll('.info-card, .project-card, .cert-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item, index) => {
  item.style.opacity = 0;
  item.style.transform = 'translateY(14px)';
  item.style.transition = `opacity .45s ease ${index * 0.018}s, transform .45s ease ${index * 0.018}s`;
  revealObserver.observe(item);
});

function bindFilter(buttonSelector, itemsSelector, dataKey) {
  const buttons = document.querySelectorAll(buttonSelector);
  const items = document.querySelectorAll(itemsSelector);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset[dataKey];
      buttons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      items.forEach((item) => {
        const target = item.dataset[dataKey] || '';
        const tags = item.dataset.tags || '';
        const isVisible = filter === 'all' || target === filter || tags.includes(filter);
        item.classList.toggle('hidden', !isVisible);
      });
    });
  });
}

bindFilter('.filter-btn[data-filter]', '#projects-grid .project-card', 'filter');
bindFilter('.filter-btn[data-cert-filter]', '#certs-grid .cert-card', 'certFilter');

const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const end = Number(el.dataset.counter || 0);
    const showPlus = (el.textContent || '').includes('+');
    let value = 0;
    const tick = Math.max(1, Math.ceil(end / 30));
    const timer = setInterval(() => {
      value = Math.min(end, value + tick);
      el.textContent = showPlus ? `${value}+` : String(value);
      if (value >= end) clearInterval(timer);
    }, 24);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));
