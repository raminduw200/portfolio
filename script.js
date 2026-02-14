// Theme Management
let getCurrentTheme, applyTheme;

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector('i');
    if (!themeIcon) return;

    getCurrentTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
    };

    applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
        localStorage.setItem('theme', theme);
    };

    const updateThemeIcon = (theme) => {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    themeToggle.addEventListener('click', () => {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    applyTheme(getCurrentTheme());

    // Mobile Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            navbar.style.boxShadow = currentScrollY > 10 ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none';
            navbar.style.transform = (currentScrollY > lastScrollY && currentScrollY > 100) ? 'translateY(-100%)' : 'translateY(0)';
            lastScrollY = currentScrollY;
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Initialize carousels
    initCarousels();

    // Typewriter Effect
    const typewriterText = document.querySelector('.typewriter-text');
    if (typewriterText) {
        const phrases = ['Data Scientist', 'Researcher', 'Innovator'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        };

        setTimeout(type, 1000);
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    console.log('%c Ramindu Walgama ', 'background: linear-gradient(135deg, #2563eb, #06b6d4); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
});

// Carousel Functionality - Fade Effect with Captions
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = track.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');

        if (slides.length === 0) return;

        let currentIndex = 0;
        let interval;

        // Shuffle slides
        const shuffle = () => {
            const arr = Array.from(slides);
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            arr.forEach(slide => track.appendChild(slide));
        };

        // Show slide with fade
        const showSlide = (index) => {
            track.querySelectorAll('.carousel-slide').forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        };

        const next = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        };

        const prev = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        };

        const startAutoPlay = () => {
            interval = setInterval(next, 5000);
        };

        const stopAutoPlay = () => {
            clearInterval(interval);
        };

        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoPlay();
                prev();
                startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoPlay();
                next();
                startAutoPlay();
            });
        }

        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Initialize
        shuffle();
        showSlide(currentIndex);
        startAutoPlay();
    });
}
