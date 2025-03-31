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

    // Remove cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    // Remove cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Remove cursor effects on buttons
    document.querySelectorAll('button, a').forEach(button => {
        button.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%)';
        });
        
        button.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%)';
        });
    });

    // Set initial theme
    document.documentElement.setAttribute('data-theme', 'light');

    // Cache DOM elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

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

    // Language Switch Functionality
    const languageBtn = document.querySelector('.language-btn');
    let currentLang = 'EN';

    const translations = {
        en: {
            // Navigation
            home: 'Home',
            experience: 'Experience',
            certificates: 'Certificates',
            education: 'Education',
            contact: 'Contact',
            
            // Hero Section
            greeting: 'Hello, I am',
            name: 'Denis Dimov',
            downloadCV: '<i class="fas fa-download"></i> Download CV',
            
            // Experience Section
            myExperience: 'My Experience',
            keyResponsibilities: 'Key Responsibilities & Achievements:',
            whyWorkWithMe: 'Why Work With Me?',
            portfolioProjects: 'Portfolio Projects:',
            period: 'Present',
            experienceDescription: 'Experienced Technical Support Professional with a strong background in software, applications, and cloud solutions. Passionate about troubleshooting complex technical issues and delivering exceptional customer service in a fast-paced IT environment.',
            whyMeText: 'I combine deep technical knowledge with a customer-centric approach, ensuring that clients receive not just quick fixes but long-term solutions. My ability to adapt to new technologies and work in collaborative environments makes me a valuable asset to any IT support or cloud operations team.',
            webDevDescription: 'Experienced web developer specializing in website maintenance, optimization, and client relationship management. Focused on delivering exceptional results through innovative solutions and continuous expertise development.',

            // Certificates Section
            myCertificates: 'My Certificates',
            
            // Education Section
            myEducation: 'My Education',
            uniName: 'University of Telecommunications and Post',
            uniBachelor: 'Bachelor\'s degree, Cyber security',
            schoolName: 'PGAVT "Al. St. Popov"',
            schoolDiploma: 'High School Diploma, Microprocessor and microcontroller technology',
            periodPresent: 'Present',
            periodSchool: 'Sep 2017 - Jun 2022',
            periodUni: 'Sep 2023',
            periodCisco: 'Sep 2023',
            periodSoftUni: 'Mar 2021 - Jun 2023',
            
            // Contact Section
            contactMe: 'Contact Me',
            email: 'Email',
            phone: 'Phone',
            location: 'Location',
            sendMessage: 'Send Me a Message',
            yourName: 'Your Name',
            yourEmail: 'Your Email',
            subject: 'Subject',
            yourMessage: 'Your Message',
            send: '<i class="fas fa-paper-plane"></i> Send Message',
            successMessage: 'Message sent successfully!',
            errorMessage: 'Failed to send message. Please try again.',
            
            // Footer
            rights: '© 2025 All Rights Reserved by Denis Dimov',
            
            // Typing Text
            typingText: [
                'I', 'am', 'a', 'motivated', 'and', 'enthusiastic', 'professional',
                'with', 'a', 'strong', 'work', 'ethic,', 'dedicated', 'to',
                'continuous', 'growth', 'and', 'excellence', 'in', 'everything', 'I', 'do.'
            ],

            // Experience Bullet Points
            technicalSupportBullets: [
                'Provided high-level technical support for clients using custom software, applications, and <strong>AWS</strong>/<strong>Azure</strong> cloud solutions.',
                'Leveraged expertise in <strong>SQL</strong>, <strong>Linux</strong>, <strong>Bash</strong>, and <strong>AWS</strong>/<strong>Azure</strong> to diagnose and resolve critical issues efficiently.',
                'Collaborated closely with clients to understand their needs and deliver tailored solutions to optimize performance.',
                'Played an active role in software testing and maintenance, ensuring high reliability and seamless user experience.',
                'Contributed to team success by improving support processes and enhancing customer satisfaction.'
            ],
            webDevBullets: [
                'Successfully maintained and optimized clients\' websites, ensuring seamless functionality and enhanced user experience.',
                'Continuously expanded expertise and leveraged cutting-edge knowledge to drive innovation in web development.',
                'Fostered strong, supportive relationships with clients while introducing novel and creative solutions.',
                'Consistently delivered exceptional results, exceeding expectations and providing the highest level of service.'
            ]
        },
        bg: {
            // Navigation
            home: 'Начало',
            experience: 'Опит',
            certificates: 'Сертификати',
            education: 'Образование',
            contact: 'Контакти',
            
            // Hero Section
            greeting: 'Здравейте, аз съм',
            name: 'Денис Димов',
            downloadCV: '<i class="fas fa-download"></i> Изтегли CV',
            
            // Experience Section
            myExperience: 'Професионален опит',
            keyResponsibilities: 'Ключови отговорности и постижения:',
            whyWorkWithMe: 'Защо да работите с мен?',
            portfolioProjects: 'Портфолио проекти:',
            period: 'В момента',
            experienceDescription: 'Опитен специалист по техническа поддръжка със солиден опит в софтуер, приложения и облачни решения. Страстен към разрешаването на сложни технически проблеми и предоставянето на изключително обслужване на клиентите в динамична IT среда.',
            whyMeText: 'Съчетавам задълбочени технически познания с подход, ориентиран към клиента, гарантирайки, че клиентите получават не само бързи решения, но и дългосрочни резултати. Моята способност да се адаптирам към нови технологии и да работя в екип ме прави ценен актив за всеки IT екип.',
            webDevDescription: 'Опитен уеб разработчик, специализиран в поддръжката на уебсайтове, оптимизацията и управлението на взаимоотношенията с клиенти. Фокусиран върху постигането на изключителни резултати чрез иновативни решения и непрекъснато развитие на експертизата.',

            // Certificates Section
            myCertificates: 'Сертификати',
            
            // Education Section
            myEducation: 'Образование',
            uniName: 'Университет по телекомуникации и пощи',
            uniBachelor: 'Бакалавър, Киберсигурност',
            schoolName: 'ПГАВТ "Ал. Ст. Попов"',
            schoolDiploma: 'Диплома за средно образование, Микропроцесорна и микроконтролерна техника',
            periodPresent: 'В момента',
            periodSchool: 'Септ. 2017 - Юни 2022',
            periodUni: 'Септ. 2023',
            periodCisco: 'Септ. 2023',
            periodSoftUni: 'Март 2021 - Юни 2023',
            
            // Contact Section
            contactMe: 'Свържете се с мен',
            email: 'Имейл',
            phone: 'Телефон',
            location: 'Локация',
            sendMessage: 'Изпратете ми съобщение',
            yourName: 'Вашето име',
            yourEmail: 'Вашият имейл',
            subject: 'Тема',
            yourMessage: 'Вашето съобщение',
            send: '<i class="fas fa-paper-plane"></i> Изпрати',
            successMessage: 'Съобщението е изпратено успешно!',
            errorMessage: 'Грешка при изпращане. Моля, опитайте отново.',
            
            // Footer
            rights: '© 2025 Всички права запазени от Денис Димов',
            
            // Typing Text
            typingText: [
                'Аз', 'съм', 'мотивиран', 'и', 'ентусиазиран', 'професионалист',
                'със', 'силна', 'работна', 'етика,', 'отдаден', 'на',
                'непрекъснато', 'развитие', 'и', 'усъвършенстване', 'във', 'всичко,', 'което', 'правя.'
            ],

            // Experience Bullet Points
            technicalSupportBullets: [
                'Предоставях техническа поддръжка на високо ниво за клиенти, използващи персонализиран софтуер, приложения и облачни решения <strong>AWS</strong>/<strong>Azure</strong>.',
                'Използвах експертиза в <strong>SQL</strong>, <strong>Linux</strong>, <strong>Bash</strong> и <strong>AWS</strong>/<strong>Azure</strong> за ефективно диагностициране и решаване на критични проблеми.',
                'Работих в тясно сътрудничество с клиентите за разбиране на техните нужди и предоставяне на персонализирани решения за оптимизиране на производителността.',
                'Участвах активно в тестването и поддръжката на софтуер, осигурявайки висока надеждност и безпроблемно потребителско изживяване.',
                'Допринесох за успеха на екипа чрез подобряване на процесите за поддръжка и повишаване на удовлетвореността на клиентите.'
            ],
            webDevBullets: [
                'Успешно поддържах и оптимизирах уебсайтовете на клиентите, осигурявайки безпроблемна функционалност и подобрено потребителско изживяване.',
                'Непрекъснато разширявах експертизата си и използвах съвременни знания за стимулиране на иновациите в уеб разработката.',
                'Изградих силни и подкрепящи отношения с клиентите, като същевременно въведох нови и креативни решения.',
                'Постоянно постигах изключителни резултати, надминавайки очакванията и предоставяйки най-високо ниво на обслужване.'
            ]
        }
    };

    function updateContent(lang) {
        const t = translations[lang.toLowerCase()];
        
        // Update navigation
        const navLinks = {
            home: '<i class="fas fa-home"></i>',
            experience: '<i class="fas fa-briefcase"></i>',
            certificates: '<i class="fas fa-certificate"></i>',
            education: '<i class="fas fa-graduation-cap"></i>',
            contact: '<i class="fas fa-envelope"></i>'
        };

        document.querySelectorAll('.nav-links a').forEach(link => {
            const key = link.getAttribute('href').replace('#', '');
            if (t[key]) {
                link.innerHTML = `${navLinks[key]} ${t[key]}`;
            }
        });
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-content h1');
        if (lang === 'bg') {
            heroTitle.innerHTML = `${translations.bg.greeting}<br><span class="highlight">${translations.bg.name}</span>`;
        } else {
            heroTitle.innerHTML = `${translations.en.greeting} <span class="highlight">${translations.en.name}</span>`;
        }
        const downloadBtn = document.querySelector('.hero .download-btn:not(.language-btn)');
        if (downloadBtn) {
            downloadBtn.innerHTML = t.downloadCV;
        }
        
        // Update section titles
        document.querySelector('#experience .section-title').textContent = t.myExperience;
        document.querySelector('#certificates .section-title').textContent = t.myCertificates;
        document.querySelector('#education .section-title').textContent = t.myEducation;
        document.querySelector('#contact .section-title').textContent = t.contactMe;
        
        // Update experience section
        document.querySelectorAll('.experience-card').forEach(card => {
            const responsibilities = card.querySelector('.responsibilities h4');
            const whyMe = card.querySelector('.why-me h4');
            const portfolio = card.querySelector('.portfolio h4');
            
            if (responsibilities) responsibilities.textContent = t.keyResponsibilities;
            if (whyMe) whyMe.textContent = t.whyWorkWithMe;
            if (portfolio) portfolio.textContent = t.portfolioProjects;
            
            // Update descriptions
            const summaries = card.querySelectorAll('.summary');
            summaries.forEach(summary => {
                if (summary.textContent.includes('Technical Support Professional')) {
                    summary.textContent = t.experienceDescription;
                } else if (summary.textContent.includes('web developer')) {
                    summary.textContent = t.webDevDescription;
                }
            });
            
            if (card.querySelector('.why-me p')) {
                card.querySelector('.why-me p').textContent = t.whyMeText;
            }
        });
        
        // Update contact section
        document.querySelectorAll('.contact-details h3').forEach(heading => {
            const key = heading.textContent.toLowerCase();
            if (t[key]) heading.textContent = t[key];
        });
        
        // Update form
        document.querySelector('.contact-form h3').textContent = t.sendMessage;
        document.querySelector('#name').placeholder = t.yourName;
        document.querySelector('#email').placeholder = t.yourEmail;
        document.querySelector('#subject').placeholder = t.subject;
        document.querySelector('#message').placeholder = t.yourMessage;
        document.querySelector('.submit-btn').innerHTML = t.send;
        document.querySelector('#success-message').textContent = t.successMessage;
        document.querySelector('#error-message').textContent = t.errorMessage;
        
        // Update footer
        document.querySelector('.copyright').textContent = t.rights;
        
        // Update typing text
        const typingContainer = document.querySelector('.hero p');
        if (typingContainer) {
            // Clear existing content
            typingContainer.innerHTML = '';
            
            // Add new spans with translations
            t.typingText.forEach(word => {
                const span = document.createElement('span');
                span.className = 'typing';
                span.textContent = word;
                
                // Add bold class for specific words
                if (word === 'мотивиран' || word === 'ентусиазиран' ||
                    word === 'motivated' || word === 'enthusiastic') {
                    span.classList.add('bold');
                }
                
                typingContainer.appendChild(span);
                // Add a space after each word
                typingContainer.appendChild(document.createTextNode(' '));
            });
        }

        // Update experience bullet points
        const technicalSupportList = document.querySelector('.experience-card:first-of-type .responsibilities ul');
        const webDevList = document.querySelector('.experience-card:last-of-type .responsibilities ul');
        
        if (technicalSupportList) {
            technicalSupportList.innerHTML = t.technicalSupportBullets.map(bullet => `<li>${bullet}</li>`).join('');
        }
        
        if (webDevList) {
            webDevList.innerHTML = t.webDevBullets.map(bullet => `<li>${bullet}</li>`).join('');
        }

        // Update education section
        const educationCards = document.querySelectorAll('.education-card');
        educationCards.forEach(card => {
            // Update university name and degree
            const uniLink = card.querySelector('a[href="https://www.utp.bg/en/"]');
            if (uniLink) {
                uniLink.textContent = t.uniName;
                const degree = card.querySelector('.degree');
                if (degree) degree.textContent = t.uniBachelor;
            }
            
            // Update school name and diploma
            const schoolLink = card.querySelector('a[href="https://aspopov.bg/"]');
            if (schoolLink) {
                schoolLink.textContent = t.schoolName;
                const degree = card.querySelector('.degree');
                if (degree) degree.textContent = t.schoolDiploma;
            }
            
            // Update periods
            const period = card.querySelector('.period');
            if (period) {
                if (period.textContent.includes('2017')) {
                    period.textContent = t.periodSchool;
                } else if (period.textContent.includes('2021')) {
                    period.textContent = t.periodSoftUni;
                } else if (period.textContent === 'Sep 2023') {
                    period.textContent = t.periodUni;
                }
            }
        });
    }

    languageBtn.addEventListener('click', () => {
        const newLang = currentLang === 'EN' ? 'BG' : 'EN';
        languageBtn.innerHTML = `<i class="fas fa-language"></i><span>${newLang}</span>`;
        document.documentElement.lang = newLang.toLowerCase();
        updateContent(newLang.toLowerCase());
        currentLang = newLang;
    });

    // Handle hero section layout
    function adjustHeroLayout() {
        const heroContainer = document.querySelector('.hero-container');
        const heroImage = document.querySelector('.hero-image');
        const heroContent = document.querySelector('.hero-content');
        
        // Ensure the image maintains its position
        heroImage.style.position = 'relative';
        heroImage.style.zIndex = '1';
        
        // Adjust content position
        heroContent.style.position = 'relative';
        heroContent.style.zIndex = '2';
        
        // Reset container height if needed
        heroContainer.style.minHeight = '100vh';
    }

    // Call on page load and language change
    document.addEventListener('DOMContentLoaded', adjustHeroLayout);
    window.addEventListener('resize', adjustHeroLayout);
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
