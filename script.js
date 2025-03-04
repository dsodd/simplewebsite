let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 20; // Minimum scroll amount before toggling navbar

// dis do scroll even handle
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

// checks for scrolling
window.addEventListener('scroll', handleScroll, { passive: true });

// highlithing nav button based on position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // if at bot of page, higlights "Contact" nav button
    const bottomOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100;
    if (bottomOfPage) {
        currentSection = 'contact';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkTarget = link.getAttribute('href').substring(1); // Remove the # from href
        if (linkTarget === currentSection) {
            link.classList.add('active');
        }
    });
}

// calls on scroll
window.addEventListener('scroll', updateActiveNavigation);
window.addEventListener('load', updateActiveNavigation);

// smoothen out scrolling for anchor link presses
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // checks if user client has reduced motion enabled
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (prefersReducedMotion) {
                // jump to target if reduced motion is enabled
                targetElement.scrollIntoView();
            } else {
                // smooth scroll to target if reduced motion is not enabled
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// sets current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// adds tabindex to project cards for better keyboard navigation
document.querySelectorAll('.project-card').forEach(card => {
    if (!card.getAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
    }
});

// loading screen
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Start entrance animations for content after loading
            document.querySelectorAll('.animate-on-load').forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animated');
                }, index * 150);
            });
        }, 1000); // 1 second delay to show the loader
    }
});

// scrolling animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// checks for elements to animate
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// init skill bars with target width
document.addEventListener('DOMContentLoaded', () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        // gets the percentage from the inline style or text content
        const width = level.style.width || level.textContent.trim();
        // stores the target width as a CSS variable
        level.style.setProperty('--target-width', width);
        // resets the initial width to 0 for animation
        level.style.width = '0';
    });
});

// add hover sound effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (window.hoverSound) {
            window.hoverSound.currentTime = 0;
            window.hoverSound.play().catch(e => {
                // Ignore errors - sound may not be allowed without user interaction
            });
        }
    });
});

// adds hover sound effects (not 100% sure if this works on all devices)
function initSoundEffects() {
    window.hoverSound = new Audio();
    window.hoverSound.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAFAAAGngCFhYWFhYWFhYWFhYWFhYWFhYWFusrKysrKysrKysrKysrKysrKysr/////////////////////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQDQAAAAAAAAIYeYzSxAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
    window.hoverSound.load();
    window.hoverSound.volume = 0.2;
}

// run when dom is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSoundEffects();
});
