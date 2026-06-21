document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Preloader Screen (1 Second Minimum)
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('fade-out');
                // Remove preloader from document flow after transition completes
                preloader.addEventListener('transitionend', () => {
                    preloader.style.display = 'none';
                });
            }
        }, 1000); // 1-second timeout
    });

    // Fallback in case load event takes too long to fire
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    }, 3000);

    // 2. Parallax Effect on Hero Background
    const heroBg = document.querySelector('.hero-parallax-bg');
    const heroSection = document.getElementById('hero');
    
    if (heroBg && heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            
            // Apply translation only while hero section is in view
            if (scrollPos <= heroHeight) {
                const translateY = scrollPos * 0.4;
                heroBg.style.transform = `translate3d(0, ${translateY}px, 0)`;
            }
        });
    }

    // 3. Sticky Navbar with Backdrop Blur
    const navbar = document.getElementById('navbar');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check on page load

    // 4. Mobile Menu Hamburger Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navbar.classList.toggle('nav-open');
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navbar.classList.remove('nav-open');
            });
        });
    }

    // 5. Scroll-triggered Reveal Animations (IntersectionObserver)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once animated, stop observing this element
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, // viewport
            threshold: 0.1, // trigger when 10% is visible
            rootMargin: '0px 0px -50px 0px' // adjust activation point
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => {
            el.classList.add('visible');
        });
    }

    // 6. Custom Music Player Toggle
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const toggleText = musicToggle ? musicToggle.querySelector('.music-toggle-text') : null;
    let isMusicPlaying = false;

    if (musicToggle && bgMusic) {
        // Ensure volume is comfortable
        bgMusic.volume = 0.4;

        musicToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                // Pause music
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                if (toggleText) toggleText.textContent = 'Play music';
                isMusicPlaying = false;
            } else {
                // Play music (handle browser Autoplay policy restriction)
                bgMusic.play()
                    .then(() => {
                        musicToggle.classList.add('playing');
                        if (toggleText) toggleText.textContent = 'Pause music';
                        isMusicPlaying = true;
                    })
                    .catch(error => {
                        console.error('Audio playback failed: ', error);
                        alert('Не вдалося відтворити аудіо. Спробуйте ще раз.');
                    });
            }
        });
    }

    // 7. Scroll-to-Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
