// Variables globales
const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

// Mobile Menu Toggle con animación mejorada
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('header');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking a link with animación
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Header scroll efecto con transparencia dinámica
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const opacity = Math.min(0.98, 0.9 + scrollPosition / 1000);
    
    if (scrollPosition > 0) {
        header.classList.add('scrolled');
        header.style.backgroundColor = `rgba(29, 53, 87, ${opacity})`;
    } else {
        header.classList.remove('scrolled');
        header.style.backgroundColor = 'rgba(29, 53, 87, 0.9)';
    }

    // Scroll to top button con animación
    const scrollTop = document.querySelector('.scroll-top');
    scrollTop.classList.toggle('active', scrollPosition > 500);
});

// Scroll to top con animación suave
document.querySelector('.scroll-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling para enlaces con offset dinámico
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculamos el offset basado en la altura del header
            const headerHeight = document.querySelector('header').offsetHeight;
            const offset = headerHeight + 20;
            
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efectos de hover mejorados para elementos de contacto
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.querySelector('.contact-icon').style.transform = 'scale(1.2) rotate(10deg)';
    });

    link.addEventListener('mouseleave', function() {
        this.querySelector('.contact-icon').style.transform = 'scale(1) rotate(0)';
    });
});

// Animación para el botón de reserva
const reserveButton = document.querySelector('.btn-reserve');
if (reserveButton) {
    reserveButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });

    reserveButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
}

// IntersectionObserver para animaciones al hacer scroll
const createObserver = (elements, options, callback) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Animación para los elementos de servicio
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
});

createObserver(serviceItems, { threshold: 0.2 }, (target) => {
    target.style.opacity = '1';
    target.style.transform = 'translateY(0)';
});

// Animación para los elementos de menú
const menuHighlights = document.querySelectorAll('.menu-highlight');
menuHighlights.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
});

createObserver(menuHighlights, { threshold: 0.2 }, (target) => {
    target.style.opacity = '1';
    target.style.transform = 'translateY(0)';
});

// Animación para los elementos de galería
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
});

createObserver(galleryItems, { threshold: 0.2 }, (target) => {
    target.style.opacity = '1';
    target.style.transform = 'translateY(0)';
});

// Animación para los elementos de texto
const textElements = document.querySelectorAll('.section-title, .about-text, .experience-text, .contact-info');
textElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

createObserver(textElements, { threshold: 0.2 }, (target) => {
    target.style.opacity = '1';
    target.style.transform = 'translateY(0)';
});

// Animación para imágenes
const images = document.querySelectorAll('.about-img, .experience-img, .contact-map');
images.forEach(image => {
    image.style.opacity = '0';
    image.style.transform = 'translateX(50px)';
    image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

createObserver(images, { threshold: 0.2 }, (target) => {
    target.style.opacity = '1';
    target.style.transform = 'translateX(0)';
});

// Efecto de paralaje mejorado
const parallaxElements = document.querySelectorAll('.hero, .about, .menu, .experience, .contact');

function updateParallax() {
    if (isTouchDevice) return;
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementPosition = element.offsetTop;
        const distance = scrollPosition - elementPosition;
        
        if (Math.abs(distance) < window.innerHeight * 1.5) {
            const speed = element.classList.contains('hero') ? 0.5 : 0.2;
            const yValue = distance * speed;
            
            if (element.classList.contains('hero')) {
                element.style.backgroundPositionY = `calc(50% + ${yValue}px)`;
            } else if (element.classList.contains('about') || element.classList.contains('experience')) {
                const images = element.querySelectorAll('img');
                images.forEach(img => {
                    img.style.transform = `translateY(${yValue * 0.1}px)`;
                });
            }
        }
    });
}

// Solo aplicar paralelaje en equipos no táctiles
if (!isTouchDevice) {
    window.addEventListener('scroll', updateParallax);
    updateParallax();
}

// Animación para el logo
const logoImage = document.querySelector('.header-logo');
if (logoImage) {
    // Pequeña animación al cargar la página
    setTimeout(() => {
        logoImage.style.transform = 'rotate(8deg) scale(1.1)';
        setTimeout(() => {
            logoImage.style.transform = 'rotate(0deg) scale(1)';
        }, 400);
    }, 1000);

    // Efecto suave al pasar el cursor
    const logoContainer = document.querySelector('.logo-container');
    logoContainer.addEventListener('mouseenter', () => {
        logoImage.style.transform = 'rotate(8deg) scale(1.1)';
    });

    logoContainer.addEventListener('mouseleave', () => {
        logoImage.style.transform = 'rotate(0deg) scale(1)';
    });
}

// Efecto de hover para botones
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
});

// Efecto para el texto del logo
const logoText = document.querySelector('.logo-text');
if (logoText) {
    logoText.addEventListener('mouseenter', function() {
        this.style.color = 'var(--secondary-color)';
        this.style.textShadow = '0 0 15px rgba(255, 153, 51, 0.3)';
        
        // Animación de la línea inferior
        const afterElem = document.createElement('style');
        afterElem.textContent = `.logo-text:after { width: 100%; }`;
        document.head.appendChild(afterElem);
        
        this.dataset.styleElem = document.head.childElementCount - 1;
    });

    logoText.addEventListener('mouseleave', function() {
        this.style.color = '';
        this.style.textShadow = '';
        
        // Eliminar el estilo temporal
        if (this.dataset.styleElem) {
            const styleElem = document.head.children[this.dataset.styleElem];
            if (styleElem) {
                document.head.removeChild(styleElem);
            }
        }
    });
}

// Inicializar elementos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada para el hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        }, 300);
    }
    
    // Comprobar si hay hash en la URL para scroll a esa sección
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offset = headerHeight + 20;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }

    // Verificar si estamos en scroll para aplicar estilo al header
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
        const opacity = Math.min(0.98, 0.9 + window.scrollY / 1000);
        header.style.backgroundColor = `rgba(29, 53, 87, ${opacity})`;
    }

    // Activar botón scroll-to-top si ya estamos en scroll
    if (window.scrollY > 500) {
        document.querySelector('.scroll-top').classList.add('active');
    }
});

// Mejorar accesibilidad para elementos interactivos
document.querySelectorAll('.service-item, .menu-highlight, .gallery-item, .contact-link, .social-link, .btn')
    .forEach(item => {
        // Asegurar que elementos interactivos pueden recibir foco
        if (!item.getAttribute('tabindex')) {
            item.setAttribute('tabindex', '0');
        }

        // Permitir activación con teclado
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (this.tagName === 'A' || this.tagName === 'BUTTON') {
                    this.click();
                } else {
                    const link = this.querySelector('a');
                    if (link) link.click();
                }
            }
        });
    });

// Mejora del efecto de imágenes en hover
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.gallery-overlay');
        const text = this.querySelector('.gallery-text');
        
        overlay.style.height = '100%';
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }, 200);
    });

    item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.gallery-overlay');
        const text = this.querySelector('.gallery-text');
        
        text.style.opacity = '0';
        text.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            overlay.style.height = '0';
        }, 100);
    });
});

// Efecto de carga al enviar el formulario de newsletter
const newsletterForm = document.querySelector('.newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button');
        const input = this.querySelector('input');
        const originalText = button.textContent;
        
        if (!input.value.trim()) return;
        
        button.textContent = 'Enviando...';
        button.disabled = true;
        
        // Simulamos el envío
        setTimeout(() => {
            button.textContent = '¡Gracias!';
            input.value = '';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }, 1500);
    });
}