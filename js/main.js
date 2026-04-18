const header = document.getElementById('site-header');
const navLinks = document.getElementById('nav-links');
const menuToggle = document.getElementById('menu-toggle');
const themeToggle = document.getElementById('theme-toggle');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(!!isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
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


const revealItems = document.querySelectorAll('.service-card, .project-card, .info-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.16 });

revealItems.forEach((item, index) => {
  item.style.opacity = 0;
  item.style.transform = 'translateY(14px)';
  item.style.transition = `opacity 0.45s ease ${index * 0.05}s, transform 0.45s ease ${index * 0.05}s`;
  revealObserver.observe(item);
});

const style = document.createElement('style');
style.textContent = `.visible{opacity:1!important;transform:translateY(0)!important;}`;
document.head.appendChild(style);

const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('#projects-grid .project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    projects.forEach((project) => {
      const tags = project.dataset.tags || '';
      const isVisible = filter === 'all' || tags.includes(filter);
      project.classList.toggle('hidden', !isVisible);
    });
  });
});


const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navAnchors.forEach((anchor) => {
    anchor.classList.toggle('active', anchor.getAttribute('href') === `#${current}`);
  });
});

const counters = document.querySelectorAll('[data-counter]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const end = Number(el.dataset.counter || 0);
    let value = 0;
    const tick = Math.max(1, Math.ceil(end / 30));
    const timer = setInterval(() => {
      value = Math.min(end, value + tick);
      el.textContent = String(value);
      if (value >= end) clearInterval(timer);
    }, 24);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));
