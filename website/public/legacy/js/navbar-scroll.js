function updateNavbarStyle() {
    // 1. Select elements
    const navbar = document.querySelector('.navbar');
    const socials = document.querySelectorAll('.contactIcon');
    const heroSection = document.querySelector('.hero');
    
    // Safety check: ensure elements exist before running
    if (!navbar || !heroSection || !socials) return;

    const scrollPosition = window.scrollY;
    // Use offsetHeight to get the exact height of the hero
    const heroHeight = heroSection.offsetHeight; 

    // 2. The Logic
    // Since your projects section slides OVER the hero, 
    // we switch colors exactly when we've scrolled past the hero's height.
    if (scrollPosition > (heroHeight - 50)) { // "-50" creates a small buffer so it switches slightly early
        navbar.classList.add('dark-background');
        socials.classList.add('dark-background');
    } else {
        navbar.classList.remove('dark-background');
        socials.classList.remove('dark-background'); 
    }
}

window.addEventListener('scroll', updateNavbarStyle);
window.addEventListener('load', updateNavbarStyle); // Ensure it runs on page load too