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

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = card.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        const rotateX = -(offsetY / height) * 15; 
        const rotateY = (offsetX / width) * 15;  

        const translateZ = (Math.abs(offsetX) + Math.abs(offsetY)) / 20;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        const width = level.getAttribute('data-skill-width');
        level.style.width = '0%'; 
        
        setTimeout(() => {
            level.style.width = width;
        }, 100);
    });
});
