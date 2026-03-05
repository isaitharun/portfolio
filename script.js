// Set Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Observers only once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Carousel Logic for Mini Games Collection
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.carousel-dots');
    
    // We already statically created dots, but verify they match slides length
    let dots = Array.from(dotsNav.children);
    
    let currentSlideIndex = 0;

    const updateCarousel = (index) => {
        // Handle limits
        if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlideIndex = 0;
        } else {
            currentSlideIndex = index;
        }

        // Update slides classes
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlideIndex].classList.add('active');

        // Update dots
        if(dots.length === slides.length) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlideIndex].classList.add('active');
        }
    };

    // Auto-advance carousel
    let carouselInterval = setInterval(() => {
        updateCarousel(currentSlideIndex + 1);
    }, 4000);

    // Stop auto-advance on interaction
    const stopAutoAdvance = () => {
        clearInterval(carouselInterval);
        // Optional: restart after a delay
        // setTimeout(() => { carouselInterval = setInterval(() => updateCarousel(currentSlideIndex + 1), 4000); }, 10000);
    };

    nextButton.addEventListener('click', () => {
        stopAutoAdvance();
        updateCarousel(currentSlideIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        stopAutoAdvance();
        updateCarousel(currentSlideIndex - 1);
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('.dot');
        if (!targetDot) return;
        
        stopAutoAdvance();
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        updateCarousel(targetIndex);
    });
}
