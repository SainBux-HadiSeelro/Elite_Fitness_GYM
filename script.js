// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navLinksItems = navLinks.querySelectorAll('a');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const testimonialTrack = document.getElementById('testimonialTrack');
const sliderDots = document.getElementById('sliderDots');
const testimonialCards = document.querySelectorAll('.testimonial-card');

// ============================================
// STICKY NAVBAR ON SCROLL
// ============================================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// MOBILE MENU TOGGLE
// ============================================
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
function handleBackToTopVisibility() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleBackToTopVisibility);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// ANIMATED COUNTERS
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;

    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
        countersAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ============================================
// TESTIMONIAL SLIDER
// ============================================
let currentSlide = 0;
const totalSlides = testimonialCards.length;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-dot');

function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

// Auto-slide
let autoSlideInterval = setInterval(nextSlide, 5000);

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Touch/Swipe support for testimonials
let touchStartX = 0;
let touchEndX = 0;

testimonialTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

testimonialTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        resetAutoSlide();
    }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT!';
        submitBtn.style.background = '#28a745';
        
        // Reset form
        contactForm.reset();

        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// ============================================
// NEWSLETTER FORM HANDLING
// ============================================
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const originalIcon = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-check"></i>';
    submitBtn.style.background = '#28a745';

    setTimeout(() => {
        emailInput.value = '';
        submitBtn.innerHTML = originalIcon;
        submitBtn.style.background = '';
    }, 2000);
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const revealElements = document.querySelectorAll(
    '.service-card, .pricing-card, .trainer-card, .contact-item, .feature, .about-text, .section-header'
);

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements as hidden
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============================================
// PARALLAX EFFECT FOR HERO (SUBTLE)
// ============================================
function heroParallax() {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;

    if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
}

window.addEventListener('scroll', heroParallax);

// ============================================
// KEYBOARD NAVIGATION FOR SLIDER
// ============================================
document.addEventListener('keydown', (e) => {
    const testimonialsSection = document.getElementById('testimonials');
    const rect = testimonialsSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isInView) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    }
});

// ============================================
// PRELOADER (OPTIONAL ENHANCEMENT)
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// PERFORMANCE: DEBOUNCE UTILITY
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handlers for better performance
const debouncedScrollHandlers = [
    handleNavbarScroll,
    highlightNavLink,
    handleBackToTopVisibility,
    revealOnScroll,
    heroParallax
];

// Replace individual listeners with single debounced listener
window.removeEventListener('scroll', handleNavbarScroll);
window.removeEventListener('scroll', highlightNavLink);
window.removeEventListener('scroll', handleBackToTopVisibility);
window.removeEventListener('scroll', revealOnScroll);
window.removeEventListener('scroll', heroParallax);

window.addEventListener('scroll', debounce(() => {
    debouncedScrollHandlers.forEach(handler => handler());
}, 10));

// ============================================
// INITIALIZE ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    handleNavbarScroll();
    highlightNavLink();
    animateCounters();
});
