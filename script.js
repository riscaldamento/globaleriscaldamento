/**
 * script.js — smooth reveal + subtle parallax of hero + performance-minded
 * Works on GitHub Pages, no libs, accessible and lightweight.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1) Smooth reveal using IntersectionObserver
  const revealOpts = { threshold: 0.12 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        revealObserver.unobserve(e.target); // one-time reveal
      }
    });
  }, revealOpts);
  document.querySelectorAll('.hidden').forEach(el => revealObserver.observe(el));

  // 2) Hero parallax subtle (moves background layer with pointer/scroll)
  const bg = document.querySelector('.bg-anim');
  const hero = document.querySelector('.hero');
  if (bg && hero) {
    // subtle movement on mousemove (desktop)
    window.addEventListener('mousemove', (ev) => {
      const mx = (ev.clientX / window.innerWidth) - 0.5;
      const my = (ev.clientY / window.innerHeight) - 0.5;
      // small transform for depth
      const tx = mx * 8; // px
      const ty = my * 6;
      bg.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.03)`;
    }, { passive: true });

    // subtle vertical parallax on scroll
    window.addEventListener('scroll', () => {
      const sc = window.scrollY;
      bg.style.transform = `translate3d(0, ${sc * -0.02}px, 0) scale(1.03)`;
    }, { passive: true });
  }

  // 3) Improve focus outlines for keyboard users
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('show-focus');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

  // 4) Tiny performance tweak: enable prefers-reduced-motion respect
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) {
    // disable animations by quickly showing elements
    document.querySelectorAll('.hidden').forEach(el => { el.classList.add('show'); });
    bg.style.animation = 'none';
  }
});
