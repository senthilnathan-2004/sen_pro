// Mouse follower animation
document.addEventListener('DOMContentLoaded', function() {
    const mouseFollower = document.querySelector('.mouse-follower');
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    // Update mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth follower animation
    function animateFollower() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;
        
        followerX += distX * 0.1;
        followerY += distY * 0.1;
        
        mouseFollower.style.left = followerX + 'px';
        mouseFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();

    // Header scroll effect
    const header = document.getElementById('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for project items
                if (entry.target.classList.contains('project')) {
                    const projects = entry.target.parentElement.children;
                    Array.from(projects).forEach((project, index) => {
                        setTimeout(() => {
                            project.style.animationDelay = `${index * 0.2}s`;
                            project.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all scroll sections
    const scrollSections = document.querySelectorAll('.scroll-section');
    scrollSections.forEach(section => {
        observer.observe(section);
    });

    // Observe project items
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        observer.observe(project);
    });

    // Parallax effect for hero particles
    const heroParticles = document.querySelectorAll('.hero-particle');
    
    window.addEventListener('mousemove', function(e) {
        const mouseXPercent = e.clientX / window.innerWidth;
        const mouseYPercent = e.clientY / window.innerHeight;
        
        heroParticles.forEach(particle => {
            const speed = parseFloat(particle.dataset.speed) || 0.5;
            const x = (mouseXPercent - 0.5) * speed * 100;
            const y = (mouseYPercent - 0.5) * speed * 100;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const nav = document.getElementById('nav');
                nav.classList.remove('nav-open');
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('headerSvg');
    const nav = document.getElementById('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('nav-open');
        }
    });

    // Enhanced hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.items, .project, .contact-item, .hero-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            mouseFollower.style.transform = 'translate(-50%, -50%) scale(2)';
            mouseFollower.style.background = 'rgba(0, 123, 255, 0.6)';
        });
        
        element.addEventListener('mouseleave', function() {
            mouseFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            mouseFollower.style.background = 'rgba(0, 123, 255, 0.3)';
        });
    });

    // Typing animation for hero code block
    const codeLines = document.querySelectorAll('.code-line');
    
    function animateCode() {
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '0';
                line.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
            }, 1000 + (index * 200));
        });
    }
    
    // Start code animation after hero section is visible
    setTimeout(animateCode, 2000);

    // Add scroll-triggered animations for skill items
    const skillItems = document.querySelectorAll('.items');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.parentElement.children;
                Array.from(items).forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateY(0) scale(1)';
                        item.style.opacity = '1';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (skillItems.length > 0) {
        skillObserver.observe(skillItems[0].parentElement);
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.hero-line, .hero-name, .hero-subtitle, .hero-description, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Performance optimization for scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Update parallax effects here if needed
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
});

// Utility functions for external links
function openlinkedin(link) {
    window.open(`https://www.linkedin.com/posts/${link}`, '_blank');
}

function opengithub(link) {
    window.open(`https://github.com/senthilnathan-2004/${link}`, '_blank');
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const nav = document.getElementById('nav');
    if (window.innerWidth > 768) {
        nav.classList.remove('nav-open');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initScrollAnimations();
    initCounterAnimations();
    initProgressBars();
    initTimelineAnimations();
    initHoverEffects();
});

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe education items
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
        observer.observe(item);
    });

    // Observe stats
    const statsSection = document.querySelector('.education-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Counter animations for stats
function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalCount = parseInt(target.getAttribute('data-count'));
                animateCounter(target, finalCount);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const duration = 2000; // 2 seconds
    const frameTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, frameTime);
}

// Progress bar animations
function initProgressBars() {
    const progressBars = document.querySelectorAll('.grade-progress');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = `${progress}%`;
                }, 500);
                
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Timeline reveal animation
function initTimelineAnimations() {
    const timeline = document.querySelector('.timeline-line');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timeline.classList.add('timeline-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (timeline) {
        observer.observe(timeline);
    }
}

// Enhanced hover effects
function initHoverEffects() {
    const educationCards = document.querySelectorAll('.education-card');
    
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Add floating animation to skill tags
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                tag.style.transform = `translateY(-${Math.random() * 10 + 5}px)`;
                tag.style.transition = 'transform 0.3s ease';
            });

            // Enhance icon animation
            const icon = this.querySelector('.icon-emoji');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            // Reset skill tags
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
            });

            // Reset icon
            const icon = this.querySelector('.icon-emoji');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });

        // Add 3D tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // Floating background elements interaction
    const bgElements = document.querySelectorAll('.bg-element');
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        bgElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add entrance animations when section becomes visible
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.2
});

const educationSection = document.querySelector('.education-section');
if (educationSection) {
    sectionObserver.observe(educationSection);
}

// Performance optimization: Pause animations when not visible
document.addEventListener('visibilitychange', function() {
    const animatedElements = document.querySelectorAll('.education-card, .bg-element, .timeline-dot');
    
    if (document.hidden) {
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Skills Showcase Animation Controller
class SkillsShowcase {
    constructor() {
        this.skillCards = document.querySelectorAll('.skill-card');
        this.sectionHeader = document.querySelector('.section-header');
        this.summaryCards = document.querySelectorAll('.summary-card');
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.percentages = document.querySelectorAll('.skill-percentage');
        
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.createIntersectionObserver();
        this.addEventListeners();
        this.preloadAnimations();
    }
    
    createIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Observe all animatable elements
        this.observer.observe(this.sectionHeader);
        this.skillCards.forEach(card => this.observer.observe(card));
        this.summaryCards.forEach(card => this.observer.observe(card));
    }
    
    animateElement(element) {
        if (element.classList.contains('section-header')) {
            this.animateHeader();
        } else if (element.classList.contains('skill-card')) {
            this.animateSkillCard(element);
        } else if (element.classList.contains('summary-card')) {
            this.animateSummaryCard(element);
        }
    }
    
    animateHeader() {
        if (this.sectionHeader.classList.contains('animate')) return;
        
        this.sectionHeader.classList.add('animate');
        
        // Create ripple effect
        this.createRippleEffect(this.sectionHeader);
    }
    
    animateSkillCard(card) {
        if (card.classList.contains('animate')) return;
        
        const index = Array.from(this.skillCards).indexOf(card);
        const delay = index * 100; // Stagger animation
        
        setTimeout(() => {
            card.classList.add('animate');
            this.animateSkillBar(card);
            this.animatePercentage(card);
            this.addParticleEffect(card);
        }, delay);
    }
    
    animateSkillBar(card) {
        const progressBar = card.querySelector('.skill-progress');
        const targetWidth = progressBar.dataset.width;
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, 300);
    }
    
    animatePercentage(card) {
        const percentageElement = card.querySelector('.skill-percentage');
        const targetPercentage = parseInt(card.dataset.level);
        const duration = 2000; // 2 seconds
        const increment = targetPercentage / (duration / 16); // 60fps
        
        let currentPercentage = 0;
        
        const animateNumber = () => {
            if (currentPercentage < targetPercentage) {
                currentPercentage += increment;
                if (currentPercentage > targetPercentage) {
                    currentPercentage = targetPercentage;
                }
                percentageElement.textContent = Math.floor(currentPercentage) + '%';
                requestAnimationFrame(animateNumber);
            }
        };
        
        setTimeout(animateNumber, 500);
    }
    
    animateSummaryCard(card) {
        if (card.classList.contains('animate')) return;
        
        const index = Array.from(this.summaryCards).indexOf(card);
        const delay = index * 200;
        
        setTimeout(() => {
            card.classList.add('animate');
        }, delay);
    }
    
    addEventListeners() {
        // Enhanced hover effects for skill cards
        this.skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.enhanceHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetHoverEffect(card);
            });
        });
        
        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
        
        // Resize handler for responsive animations
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }
    
    enhanceHoverEffect(card) {
        const icon = card.querySelector('.skill-icon');
        const glow = card.querySelector('.skill-glow');
        
        // Add magnetic effect
        card.addEventListener('mousemove', this.magneticEffect.bind(this, card));
        
        // Enhance glow
        if (glow) {
            glow.style.opacity = '0.4';
            glow.style.transform = 'scale(1.05)';
        }
        
        // Add subtle rotation to icon
        if (icon) {
            icon.style.transform = 'scale(1.15) rotate(10deg)';
        }
    }
    
    resetHoverEffect(card) {
        const icon = card.querySelector('.skill-icon');
        const glow = card.querySelector('.skill-glow');
        
        // Remove magnetic effect
        card.removeEventListener('mousemove', this.magneticEffect);
        card.style.transform = '';
        
        // Reset glow
        if (glow) {
            glow.style.opacity = '';
            glow.style.transform = '';
        }
        
        // Reset icon
        if (icon) {
            icon.style.transform = '';
        }
    }
    
    magneticEffect(card, e) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        const maxDistance = 20;
        const distance = Math.min(maxDistance, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
        const strength = distance / maxDistance;
        
        const moveX = (deltaX / rect.width) * strength * 8;
        const moveY = (deltaY / rect.height) * strength * 8;
        
        card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
    }
    
    addParticleEffect(card) {
        const particles = [];
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-blue);
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                z-index: 100;
            `;
            
            card.appendChild(particle);
            
            // Animate particle
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const duration = 1000 + Math.random() * 500;
            
            particle.animate([
                {
                    opacity: 1,
                    transform: `translate(${Math.cos(angle) * 20}px, ${Math.sin(angle) * 20}px) scale(0.5)`
                },
                {
                    opacity: 0,
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).addEventListener('finish', () => {
                particle.remove();
            });
        }
    }
    
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(0, 123, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 0;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        ripple.animate([
            {
                width: '0px',
                height: '0px',
                opacity: 1
            },
            {
                width: '300px',
                height: '300px',
                opacity: 0
            }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).addEventListener('finish', () => {
            ripple.remove();
        });
    }
    
    handleTabNavigation(e) {
        // Enhance accessibility for keyboard users
        const focusableElements = document.querySelectorAll(
            '.skill-card, .summary-card, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        
        if (e.shiftKey) {
            // Shift + Tab (backwards)
            if (currentIndex > 0) {
                focusableElements[currentIndex - 1].focus();
                e.preventDefault();
            }
        } else {
            // Tab (forwards)
            if (currentIndex < focusableElements.length - 1) {
                focusableElements[currentIndex + 1].focus();
                e.preventDefault();
            }
        }
    }
    
    handleResize() {
        // Recalculate animations for new screen size
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Reduce animation complexity on mobile
            this.skillCards.forEach(card => {
                card.style.transform = '';
            });
        }
    }
    
    preloadAnimations() {
        // Preload critical animations to prevent jank
        const testElement = document.createElement('div');
        testElement.style.cssText = `
            position: absolute;
            top: -9999px;
            left: -9999px;
            width: 100px;
            height: 100px;
            background: var(--gradient-1);
            transform: translateY(50px);
            opacity: 0;
        `;
        
        document.body.appendChild(testElement);
        
        // Force a reflow to preload transforms
        testElement.offsetHeight;
        
        testElement.style.transform = 'translateY(0)';
        testElement.style.opacity = '1';
        
        setTimeout(() => {
            document.body.removeChild(testElement);
        }, 100);
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.metrics = {
            animations: 0,
            renders: 0
        };
    }
    
    logMetric(type) {
        this.metrics[type]++;
    }
    
    getReport() {
        const endTime = performance.now();
        const duration = endTime - this.startTime;
        
        return {
            duration: duration,
            fps: this.metrics.renders / (duration / 1000),
            animationsPerSecond: this.metrics.animations / (duration / 1000)
        };
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check for browser support
    if ('IntersectionObserver' in window && 'animate' in HTMLElement.prototype) {
        const skillsShowcase = new SkillsShowcase();
        const performanceMonitor = new PerformanceMonitor();
        
        // Optional: Log performance metrics
        if (window.location.hash === '#debug') {
            setTimeout(() => {
                console.log('Skills Showcase Performance:', performanceMonitor.getReport());
            }, 5000);
        }
    } else {
        // Fallback for older browsers
        console.warn('Skills Showcase: Browser does not support required features. Falling back to static display.');
        document.querySelectorAll('.skill-card, .section-header, .summary-card').forEach(el => {
            el.classList.add('animate');
            const progressBar = el.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.width = progressBar.dataset.width;
            }
        });
    }
});

// Add CSS for particles and enhanced effects
const additionalStyles = `
    .skill-card:focus {
        outline: 2px solid var(--primary-blue);
        outline-offset: 4px;
    }
    
    .particle {
        animation: particle-fade 1s ease-out forwards;
    }
    
    @keyframes particle-fade {
        0% {
            opacity: 1;
            transform: scale(0.5);
        }
        100% {
            opacity: 0;
            transform: scale(1);
        }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .skill-card {
            border: 2px solid var(--text-dark);
        }
        
        .skill-progress {
            border: 1px solid var(--text-dark);
        }
    }
`;

// Inject additional styles
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement);


      function opengithub(link){
             window.location.href=`https://github.com/senthilnathan-2004/${link}`
             }




class PortfolioAnimator {
    constructor() {
        this.letterItems = document.querySelectorAll('.letter-item');
        this.replayBtn = document.getElementById('replayAnimation');
        this.animationDelay = 200; // Delay between each letter animation in ms
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        // Start initial animation after page load
        this.startInitialAnimation();
        
        // Add event listeners
        this.addEventListeners();
        
        // Add intersection observer for scroll-based animations
        this.setupIntersectionObserver();
    }
    
    startInitialAnimation() {
        // Wait for page to fully load
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.animateLetters();
            }, 1000);
        });
    }
    
    addEventListeners() {
        // Replay button
        this.replayBtn.addEventListener('click', () => {
            this.replayAnimation();
        });
        
        // Add hover effects for individual letters
        this.letterItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                this.addHoverEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removeHoverEffect(item);
            });
            
            // Add click effect for mobile
            item.addEventListener('click', () => {
                this.addClickEffect(item);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' || e.key === 'R') {
                this.replayAnimation();
            }
        });
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    // Trigger animation when section comes into view
                    setTimeout(() => {
                        this.animateLetters();
                    }, 500);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(document.querySelector('.animated-portfolio'));
    }
    
    async animateLetters() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.updateReplayButton(true);
        
        // Reset all animations
        this.resetAnimations();
        
        // Animate each letter with staggered timing
        for (let i = 0; i < this.letterItems.length; i++) {
            await this.animateLetter(this.letterItems[i], i);
        }
        
        this.isAnimating = false;
        this.updateReplayButton(false);
    }
    
    animateLetter(letterItem, index) {
        return new Promise((resolve) => {
            setTimeout(() => {
                letterItem.classList.add('animate');
                
                // Add sequential reveal effect
                letterItem.style.animationDelay = '0s';
                
                // Resolve after animation completes
                setTimeout(resolve, 800);
            }, index * this.animationDelay);
        });
    }
    
    resetAnimations() {
        this.letterItems.forEach(item => {
            item.classList.remove('animate');
            item.style.transform = '';
            item.style.opacity = '';
        });
    }
    
    async replayAnimation() {
        if (this.isAnimating) return;
        
        // Add replay effect
        this.replayBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.replayBtn.style.transform = '';
        }, 150);
        
        await this.animateLetters();
    }
    
    addHoverEffect(item) {
        if (!item.classList.contains('animate')) return;
        
        const letter = item.querySelector('.letter');
        const description = item.querySelector('.description');
        
        // Enhanced hover effects
        letter.style.transform = 'scale(1.1) rotateY(5deg)';
        description.style.color = 'var(--primary-blue)';
        description.style.fontWeight = '700';
    }
    
    removeHoverEffect(item) {
        const letter = item.querySelector('.letter');
        const description = item.querySelector('.description');
        
        letter.style.transform = '';
        description.style.color = '';
        description.style.fontWeight = '';
    }
    
    addClickEffect(item) {
        // Mobile click effect
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 150);
        
        // Create ripple effect
        this.createRippleEffect(item);
    }
    
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 123, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.marginLeft = -size / 2 + 'px';
        ripple.style.marginTop = -size / 2 + 'px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    updateReplayButton(isAnimating) {
        const btnText = this.replayBtn.querySelector('.btn-text');
        const btnIcon = this.replayBtn.querySelector('.btn-icon');
        
        if (isAnimating) {
            btnText.textContent = 'Animating...';
            btnIcon.style.animation = 'spin 1s linear infinite';
            this.replayBtn.disabled = true;
            this.replayBtn.style.opacity = '0.7';
        } else {
            btnText.textContent = 'Replay Animation';
            btnIcon.style.animation = '';
            this.replayBtn.disabled = false;
            this.replayBtn.style.opacity = '1';
        }
    }
    
    // Performance optimization
    debounce(func, wait) {
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
}

// Additional utility functions
class AnimationUtils {
    static createStaggeredAnimation(elements, animationClass, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * delay);
        });
    }
    
    static createParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.letter');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
            });
        });
    }
    
    static addParticleEffect() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Simple particle system for enhanced visual appeal
        // Implementation would go here for advanced effects
    }
}

// CSS Animation Keyframes (added dynamically)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .pulse-animation {
        animation: pulse 2s ease-in-out infinite;
    }
`;
document.head.appendChild(styleSheet);

// Initialize the portfolio animator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const portfolioAnimator = new PortfolioAnimator();
    
    // Add performance monitoring
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            console.log('Portfolio animation system initialized');
        });
    }
    
    // Add touch support for mobile devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioAnimator, AnimationUtils };
}


    const today = new Date();

    const formattedDate = today.getFullYear();

    
    document.getElementById("date").textContent = formattedDate;