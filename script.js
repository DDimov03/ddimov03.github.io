document.addEventListener('DOMContentLoaded', () => {
    const sideNav = document.querySelector('.side-nav');
    const mainContent = document.querySelector('.main-content');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    document.body.appendChild(hamburger);

    hamburger.addEventListener('click', () => {
        sideNav.classList.toggle('active');
        hamburger.classList.toggle('active');
        mainContent.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            sideNav.classList.remove('active');
            hamburger.classList.remove('active');
            mainContent.classList.remove('menu-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && !hamburger.contains(e.target)) {
            sideNav.classList.remove('active');
            hamburger.classList.remove('active');
            mainContent.classList.remove('menu-open');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px'
    });

    // Observe all sections and cards
    document.querySelectorAll('.section, .experience-card, .certificate-card, .education-card').forEach(element => {
        observer.observe(element);
    });

    // Theme Toggle Functionality
    function toggleDarkMode() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem("darkMode", !isDark);
        
        const themeButton = document.getElementById('theme-toggle-btn');
        const homeSection = document.getElementById('home');
        const allSections = document.querySelectorAll('.section.animate, .section, .main-content, .experience-card, .certificate-card, .education-card, .contact-section, #certificates, #experience, #education, #contact');
        
        if (!isDark) {
            themeButton.innerHTML = '☀️ Light Mode';
            document.body.style.backgroundColor = '#2c3e50';
            if (homeSection) {
                homeSection.style.backgroundColor = '#2c3e50';
            }
            // Update all sections and containers
            allSections.forEach(section => {
                section.style.backgroundColor = '#2c3e50';
            });
        } else {
            themeButton.innerHTML = '🌙 Dark Mode';
            document.body.style.backgroundColor = '#ffffff';
            if (homeSection) {
                homeSection.style.backgroundColor = '#ffffff';
            }
            // Update all sections and containers
            allSections.forEach(section => {
                section.style.backgroundColor = '#ffffff';
            });
        }
    }

    // Check for saved theme preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('theme-toggle-btn').innerHTML = '☀️ Light Mode';
        document.body.style.backgroundColor = '#2c3e50';
        const homeSection = document.getElementById('home');
        const allSections = document.querySelectorAll('.section.animate, .section, .main-content, .experience-card, .certificate-card, .education-card, .contact-section, #certificates, #experience, #education, #contact');
        if (homeSection) {
            homeSection.style.backgroundColor = '#2c3e50';
        }
        // Update all sections and containers
        allSections.forEach(section => {
            section.style.backgroundColor = '#2c3e50';
        });
    }
    
    // Add click event listener to theme toggle button
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleDarkMode);

    // Custom cursor implementation
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    // Set initial theme
    document.documentElement.setAttribute('data-theme', 'light');

    // Cache DOM elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Cursor functionality
    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;

    function updateCursor() {
        cursorX = targetX;
        cursorY = targetY;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(updateCursor);
    }

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.classList.add('hidden');
    });

    document.addEventListener('mouseenter', () => {
        cursor.classList.remove('hidden');
    });

    // Handle touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }

    // Start cursor animation
    updateCursor();

    // Email functionality
    function sendEmail(e) {
        e.preventDefault();
        
        submitBtn.classList.add('loading');
        
        const formData = new FormData(contactForm);
        const data = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        emailjs.send('service_id', 'template_id', data)
            .then(() => {
                successMessage.style.display = 'block';
                contactForm.reset();
            })
            .catch(() => {
                errorMessage.style.display = 'block';
            })
            .finally(() => {
                submitBtn.classList.remove('loading');
            });
    }

    contactForm.addEventListener('submit', sendEmail);

    // Initialize EmailJS
    emailjs.init('user_id');

    // Remove right-click protection
    // document.addEventListener('contextmenu', (e) => {
    //     e.preventDefault();
    // });

    document.addEventListener('copy', (e) => {
        e.preventDefault();
    });
});

// Add input animations
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Add typing animation
        input.addEventListener('input', () => {
            if (input.value) {
                input.classList.add('has-content');
            } else {
                input.classList.remove('has-content');
            }
        });
    });
});

// Prevent keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Prevent Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, Ctrl+S
    if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'a' || e.key === 's')) {
        e.preventDefault();
        return false;
    }
    // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Alt+Tab
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u') ||
        (e.altKey && e.key === 'Tab')
    ) {
        e.preventDefault();
        return false;
    }
});

// Prevent drag and drop
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// Prevent text selection
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// Prevent copy through clipboard API
document.addEventListener('copy', function(e) {
    e.preventDefault();
    return false;
});

// Prevent paste through clipboard API
document.addEventListener('paste', function(e) {
    e.preventDefault();
    return false;
});

// Prevent cut through clipboard API
document.addEventListener('cut', function(e) {
    e.preventDefault();
    return false;
}); 