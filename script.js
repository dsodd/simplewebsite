let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 20;

function handleScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(lastScrollTop - currentScrollTop) <= scrollThreshold) {
        return;
    }
    
    if (currentScrollTop > lastScrollTop && currentScrollTop > navbar.offsetHeight) {
        navbar.classList.add('navbar--hidden');
    } else if (currentScrollTop < lastScrollTop) {
        navbar.classList.remove('navbar--hidden');
    }
    
    lastScrollTop = currentScrollTop;
}

window.addEventListener('scroll', handleScroll, { passive: true });

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    const bottomOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100;
    if (bottomOfPage) {
        currentSection = 'contact';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkTarget = link.getAttribute('href').substring(1);
        if (linkTarget === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavigation);
window.addEventListener('load', updateActiveNavigation);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (prefersReducedMotion) {
                targetElement.scrollIntoView();
            } else {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.querySelectorAll('.animate-on-load').forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animated');
                }, index * 150);
            });
        }, 1000);
    }
});

// Adding dynamic tilt and depth effect to project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = card.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        // Reversing the tilt so it moves away from the cursor
        const rotateX = -(offsetY / height) * 15; // Tilt along X-axis (vertical) - Reversed
        const rotateY = (offsetX / width) * 15;  // Tilt along Y-axis (horizontal) - Reversed

        // Depth effect (translateZ) based on cursor proximity to the card edges
        const translateZ = (Math.abs(offsetX) + Math.abs(offsetY)) / 20;

        // Apply the dynamic 3D transform to the card
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
    });

    // Reset the card transform when the mouse leaves
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Ensure skill bars animate on page load
document.addEventListener('DOMContentLoaded', () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        const width = level.getAttribute('data-skill-width'); // Get the skill width from the data attribute
        level.style.width = '0%';  // Start from 0% width for animation
        
        // Trigger the transition to the correct value
        setTimeout(() => {
            level.style.width = width;  // Animate from 0% to the desired width
        }, 100); // 100ms delay for smooth animation
    });
});
