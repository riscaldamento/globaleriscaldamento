/**
 * script.js — premium interactions:
 *  - smooth reveal (IntersectionObserver)
 *  - subtle parallax on background by mouse + scroll
 *  - accessibility: show focus outlines on keyboard navigation
 *  - respects prefers-reduced-motion
 */

document.addEventListener('DOMContentLoaded', () => {
  // Respect reduced motion early
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) {
    document.querySelectorAll('.hidden').forEach(el => el.classList.add('show'));
    document.querySelector('.bg-layer')?.style?.setProperty('animation', 'none');
    return;
  }

  // 1) Reveal with IntersectionObserver (one-time)
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.hidden').forEach(el => io.observe(el));

  // 2) Parallax / subtle move for bg-layer
  const bg = document.querySelector('.bg-layer');
  let lastScroll = 0;
  if (bg) {
    // mouse move effect (desktop). gentle.
    window.addEventListener('mousemove', (e) => {
      const mx = (e.clientX / window.innerWidth) - 0.5;
      const my = (e.clientY / window.innerHeight) - 0.5;
      const tx = mx * 10; // px
      const ty = my * 8;
      bg.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.02)`;
    }, { passive: true });

    // scroll parallax (mobile + desktop)
    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      // smoother: easing interpolation
      lastScroll += (s - lastScroll) * 0.12;
      bg.style.transform = `translate3d(0, ${-lastScroll * 0.04}px, 0) scale(1.02)`;
    }, { passive: true });
  }

  // 3) Keyboard focus outlines: enable when user presses Tab
  function onFirstTab(e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('show-focus');
      window.removeEventListener('keydown', onFirstTab);
    }
  }
  window.addEventListener('keydown', onFirstTab);

  // 4) Micro-optimization: enable will-change only on visible transitions
  document.querySelectorAll('.bg-layer, .hero-svg').forEach(el => el.style.willChange = 'transform');
});
