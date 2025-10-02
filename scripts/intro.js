// Build tiles grid dynamically for smoother transition
const tilesRoot = document.getElementById('tiles');
if (tilesRoot) {
  const cols = 10, rows = 6;
  for (let i = 0; i < cols * rows; i += 1) {
    const d = document.createElement('div');
    d.style.animationDelay = `${Math.min(i % cols, 10) * 0.05}s`;
    tilesRoot.appendChild(d);
  }
}

// Orchestrate intro: after dismantle, ripple + show first page + reveal header items
setTimeout(() => {
  const introScreen = document.getElementById('introScreen');
  const firstPage = document.getElementById('firstPage');
  const ripple = document.getElementById('ripple');
  const headerStar = document.getElementById('headerStar');
  const headerLine = document.querySelector('.header-line');
  const sideTexts = document.querySelectorAll('.side-text');
  const mainTitle = document.getElementById('mainTitle');

  // wait slightly longer for dismantle
  ripple?.classList.add('active');

  setTimeout(() => {
    // remove ripple layer and hide intro container to expose page
    introScreen?.classList.add('hide');
    ripple?.parentElement?.removeChild(ripple);
    firstPage?.classList.add('show');

    // reveal header and texts
    setTimeout(() => {
      headerStar && (headerStar.style.opacity = '1');
      headerLine && (headerLine.style.opacity = '1');
      sideTexts.forEach(el => (el.style.opacity = '1'));
      mainTitle && (mainTitle.style.opacity = '1');
    }, 800);
  }, 1000);
}, 3600);


