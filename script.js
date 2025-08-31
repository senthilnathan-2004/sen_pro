// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const loadingScreen = document.getElementById('loadingScreen');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after animation completes
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Initialize animations after loading screen is hidden
            initScrollAnimations();
            initSkillBars();
            initTypingEffect();
        }, 500);
    }, 3000);

    // Initialize other components
    initNavigation();
    initContactForm();
    initSmoothScroll();
});

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            if (sectionTop <= 300 && sectionTop + sectionHeight > 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scroll functionality
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const texts = [
        'Full Stack Developer',
        'MERN Stack Developer',
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        typingElement.textContent = currentText;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add animation to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });

    // Add animation to individual elements
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .timeline-item, .stat, .certification-item'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Contact form functionality
function initContactForm() {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            showNotification('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button state
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
                  type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : 
                  '<i class="fas fa-info-circle"></i>'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        max-width: 400px;
        padding: 1rem;
        background: ${type === 'success' ? 'var(--primary-color)' : 
                     type === 'error' ? 'var(--accent-color)' : 'var(--secondary-color)'};
        color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        animation: slideInRight 0.3s ease-out;
        transition: var(--transition);
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-icon {
            font-size: 1.2rem;
        }
        
        .notification-message {
            flex: 1;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 50%;
            transition: background 0.2s ease;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Close notification functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }
    }, 5000);
}

// Utility functions
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

// Add scroll-triggered animations for better performance
const animateOnScroll = debounce(() => {
    const elements = document.querySelectorAll('[data-animate]:not(.animate)');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}, 20);

window.addEventListener('scroll', animateOnScroll);

// Add data-animate attributes to elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    const animatedSelectors = [
        '.project-card',
        '.skill-category', 
        '.timeline-item',
        '.stat',
        '.certification-item',
        '.contact-item'
    ];
    
    animatedSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.setAttribute('data-animate', '');
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        transition: top 0.3s;
        z-index: 10001;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Performance optimization: Lazy load images if any are added
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add error handling for failed resources
window.addEventListener('error', (e) => {
    console.error('Resource failed to load:', e.target.src || e.target.href);
}, true);

// Handle offline/online status
window.addEventListener('online', () => {
    showNotification('Connection restored!', 'success');
});

window.addEventListener('offline', () => {
    showNotification('You are currently offline. Some features may not work.', 'error');
});

//get current year for footer
const today = new Date();

const formattedDate = today.getFullYear();

document.getElementById("date").textContent = formattedDate;


//send mail
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const contactForm = document.getElementById("contactForm");
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  // Show loading state
  btnText.style.display = 'none';
  btnLoading.style.display = 'block';
  submitBtn.disabled = true;

  // Get form data
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Collect validation errors
  let error = "";
  if (!name) error = "Please enter your name";
  else if (!email) error = "Please enter your email";
  else if (!emailRegex.test(email)) error = "Please enter a valid email address";
  else if (!subject) error = "Please enter your subject";
  else if (!message) error = "Please enter your message";


  // If validation failed
  if (error) {
    showNotification(error, "error");

    // reset button state so user can try again
    btnText.style.display = "block";
    btnLoading.style.display = "none";
    submitBtn.disabled = false;
    return; // stop here, but form will work again next time
  }

  const data = { name, email, subject, message };

  try {
    const res = await fetch("https://pro-backend-uumi.onrender.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      showNotification(result.message || "Message sent successfully!", "success");
      return contactForm.reset(); // clears all inputs
    } else {
      showNotification(result.error || "Failed to send message.", "error");
    }
  } catch (error) {
    console.error(error);
    showNotification("Failed to send message. Please try again.", "error");
  } finally {
    // Always reset button state
    btnText.style.display = "block";
    btnLoading.style.display = "none";
    submitBtn.disabled = false;
  }
});
