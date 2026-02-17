// 2D Cartoon Portfolio Scripts

console.log("%c Hello! Welcome to Arshath Ahamed's Portfolio! ", "background: #FF6B6B; color: white; border: 2px solid black; padding: 5px; font-family: sans-serif;");

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Wiggle effect on click
const interactiveElements = document.querySelectorAll('.project-card, .skill-category, .about-card, .activity-card');
interactiveElements.forEach(el => {
    el.addEventListener('click', () => {
        el.style.transform = 'skewY(2deg) scale(0.98)';
        setTimeout(() => {
            el.style.transform = '';
        }, 150);
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once revealed? Or keep it? Let's keep it one-time for now to avoid distraction
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15 // Trigger when 15% of the element is visible
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});
