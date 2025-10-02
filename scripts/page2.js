// Vertical navigation scroll + section observer
const navCircles = document.querySelectorAll('.nav-circle');
const sections = document.querySelectorAll('.section');

navCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    const idx = parseInt(circle.getAttribute('data-section') || '0', 10);
    const target = document.querySelector(`.section[data-section="${idx}"]`);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const idx = entry.target.getAttribute('data-section');
      navCircles.forEach(c => c.classList.remove('active'));
      const active = document.querySelector(`.nav-circle[data-section="${idx}"]`);
      active?.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));



