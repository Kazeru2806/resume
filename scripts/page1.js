// Title hover fill on explore button is handled via CSS sibling selector.

// After sphere settles, reveal CTA by listening for animationend instead of long timeout
const exploreBtn = document.getElementById('exploreBtn');
const sphere = document.getElementById('sphere');
if (sphere) {
  sphere.addEventListener('animationend', () => {
    if (exploreBtn) {
      exploreBtn.style.opacity = '1';
      exploreBtn.style.pointerEvents = 'auto';
    }
  }, { once: true });
}

// Explore → Tiles transition → navigate to page2.html
exploreBtn?.addEventListener('click', () => {
  const tiles = document.getElementById('tiles');
  if (!tiles) return;
  tiles.classList.add('active');
  // Navigate shortly after tiles animate
  setTimeout(() => {
    window.location.href = 'page2.html';
  }, 900);
});


