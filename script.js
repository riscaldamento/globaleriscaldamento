// --- Scroll Reveal semplice e leggero ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));


// --- Gradient animato nello sfondo ---
let deg = 0;
function animateGradient() {
    deg = (deg + 0.1) % 360;
    document.documentElement.style.setProperty('--grad-rotate', deg + 'deg');
    requestAnimationFrame(animateGradient);
}
animateGradient();
