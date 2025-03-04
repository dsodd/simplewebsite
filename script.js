
// checks position for scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 20; // Minimum scroll amount before toggling navbar

// dis looks at scrolling fr
function handleScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(lastScrollTop - currentScrollTop) <= scrollThreshold) {
        return;
    }
    
    // scroll dw
    if (currentScrollTop > lastScrollTop && currentScrollTop > navbar.offsetHeight) {
        navbar.classList.add('navbar--hidden');
    } 
    // scroll up
    else if (currentScrollTop < lastScrollTop) {
        navbar.classList.remove('navbar--hidden');
    }
    
    lastScrollTop = currentScrollTop;
}

// checks if scrolling
window.addEventListener('scroll', handleScroll, { passive: true });
