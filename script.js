// Variables globales
const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

// Mobile Menu Toggle con animación mejorada
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('header');

// Asegurarnos que el header tiene la altura correcta al cargar la página
function updateHeaderHeight() {
    if (header) {
        document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }
}

// Ejecutar al cargar
updateHeaderHeight();

// Asegurar que los elementos del hero son visibles siempre
function ensureHeroContentVisibility() {
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroContent) heroContent.style.opacity = '1';
    if (heroTitle) heroTitle.style.display = 'block';
    if (heroText) heroText.style.display = 'block';
    if (heroButtons) {
        heroButtons.style.visibility = 'visible';
        heroButtons.style.opacity = '1';
    }
}

// Ejecutar al cargar
ensureHeroContentVisibility();

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Prevenir scroll cuando el menú móvil está abierto
document.body.addEventListener('touchmove', function(e) {
    if (document.body.classList.contains('menu-open')) {
        e.preventDefault();
    }
}, { passive: false });

// Close mobile menu when clicking a link con animación
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Cerrar el menú también cuando se hace clic fuera
document.addEventListener('click', (e) => {
    const isMenuOpen = navMenu.classList.contains('active');
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (isMenuOpen && !isClickInsideMenu && !isClickOnHamburger) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
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
    if (scrollTop) {
        scrollTop.classList.toggle('active', scrollPosition > 500);
    }
});

// Scroll to top con animación suave
const scrollTopButton = document.querySelector('.scroll-top');
if (scrollTopButton) {
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

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

// Optimización de efectos según el dispositivo
if (!isTouchDevice) {
    // Efectos de hover mejorados para elementos de contacto (solo en desktop)
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.querySelector('.contact-icon').style.transform = 'scale(1.2) rotate(10deg)';
        });

        link.addEventListener('mouseleave', function() {
            this.querySelector('.contact-icon').style.transform = 'scale(1) rotate(0)';
        });
    });

    // Animación para el botón de reserva (solo en desktop)
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
    
    // Animación para el logo (solo en desktop)
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

    // Efecto de hover para botones (solo en desktop)
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
}

// IntersectionObserver para animaciones al hacer scroll (funciona en todos los dispositivos)
const createObserver = (elements, options, callback) => {
    if (!elements || elements.length === 0) return;
    
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
if (serviceItems.length > 0) {
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    createObserver(serviceItems, { threshold: 0.1 }, (target) => {
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
    });
}

// Animación para los elementos de menú
const menuHighlights = document.querySelectorAll('.menu-highlight');
if (menuHighlights.length > 0) {
    menuHighlights.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    createObserver(menuHighlights, { threshold: 0.1 }, (target) => {
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
    });
}

// Animación para los elementos de galería
const galleryItems = document.querySelectorAll('.gallery-item');
if (galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    createObserver(galleryItems, { threshold: 0.1 }, (target) => {
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
    });
}

// Animación para los elementos de texto
const textElements = document.querySelectorAll('.section-title, .about-text, .experience-text, .contact-info');
if (textElements.length > 0) {
    textElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    createObserver(textElements, { threshold: 0.1 }, (target) => {
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
    });
}

// Animación para imágenes
const images = document.querySelectorAll('.about-img, .experience-img, .contact-map');
if (images.length > 0) {
    images.forEach(image => {
        image.style.opacity = '0';
        image.style.transform = 'translateX(50px)';
        image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    createObserver(images, { threshold: 0.1 }, (target) => {
        target.style.opacity = '1';
        target.style.transform = 'translateX(0)';
    });
}

// Efecto de paralaje mejorado SOLO para desktop
const parallaxElements = document.querySelectorAll('.hero, .about, .menu, .experience, .contact');

function updateParallax() {
    if (isTouchDevice || window.innerWidth < 992) return;
    
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

// Solo aplicar paralelaje en equipos no táctiles y pantallas grandes
if (!isTouchDevice && window.innerWidth >= 992) {
    window.addEventListener('scroll', updateParallax);
    updateParallax();
}

// Manejo de carga de imágenes para mejorar rendimiento
document.addEventListener('DOMContentLoaded', () => {
    // Actualizar altura del header
    updateHeaderHeight();
    
    // Asegurar que el hero section está correctamente posicionado
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.marginTop = '0';
    }
    
    // Asegurar que los elementos del hero son visibles
    ensureHeroContentVisibility();
    
    // Resto del código de carga de imágenes...
    const lazyImages = document.querySelectorAll('img');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Si el navegador soporta lazy loading nativo
        lazyImages.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading nativo
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.removeAttribute('data-src');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                }
            });
        });

        lazyImages.forEach(lazyImage => {
            if (lazyImage.dataset.src) {
                lazyImageObserver.observe(lazyImage);
            }
        });
    }
});

// Detectar cambios de orientación y reajustar elementos
window.addEventListener('orientationchange', () => {
    // Pequeño retraso para asegurar que los elementos se reajusten correctamente
    setTimeout(() => {
        if (document.body.classList.contains('menu-open')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
        
        // Forzar recálculo de altura de elementos en caso de cambios de orientación
        updateHeaderHeight();
    }, 300);
});

// Asegurar que la página se recalcula al cambiar tamaño de ventana
window.addEventListener('resize', () => {
    updateHeaderHeight();
});