// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);

    // Scroll to top button
    const scrollTop = document.querySelector('.scroll-top');
    scrollTop.classList.toggle('active', window.scrollY > 500);
});

// Scroll to top
document.querySelector('.scroll-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto hover para elementos de contacto
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.querySelector('.contact-icon').style.transform = 'scale(1.1)';
    });

    link.addEventListener('mouseleave', function() {
        this.querySelector('.contact-icon').style.transform = 'scale(1)';
    });
});

// Animación para el botón de reserva
const reserveButton = document.querySelector('.btn-reserve');
if (reserveButton) {
    reserveButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    reserveButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}

// Detectar cuando los elementos entran en la vista
const fadeInElements = document.querySelectorAll('.service-item, .menu-highlight, .gallery-item');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeInObserver.observe(element);
});

// Animación del logo
const logoImage = document.querySelector('.header-logo');
if (logoImage) {
    // Pequeña animación al cargar la página
    setTimeout(() => {
        logoImage.style.transform = 'rotate(5deg)';
        setTimeout(() => {
            logoImage.style.transform = 'rotate(0deg)';
        }, 300);
    }, 1000);

    // Efecto suave al pasar el cursor
    const logoContainer = document.querySelector('.logo-container');
    logoContainer.addEventListener('mouseenter', () => {
        logoImage.style.transform = 'rotate(5deg) scale(1.1)';
    });

    logoContainer.addEventListener('mouseleave', () => {
        logoImage.style.transform = 'rotate(0deg) scale(1)';
    });
}

// Cambio de color suave para el nombre del establecimiento
const logoText = document.querySelector('.logo-text');
if (logoText) {
    logoText.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px rgba(249, 168, 38, 0.5)';
    });

    logoText.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
}

// Animación para el footer logo
const footerLogo = document.querySelector('.footer-logo-img');
if (footerLogo) {
    const footerLogoContainer = document.querySelector('.footer-logo');
    footerLogoContainer.addEventListener('mouseenter', () => {
        footerLogo.style.transform = 'rotate(5deg)';
    });

    footerLogoContainer.addEventListener('mouseleave', () => {
        footerLogo.style.transform = 'rotate(0deg)';
    });
}

// Efecto parallax para secciones con imagen de fondo
let isMobile = window.matchMedia("(max-width: 768px)").matches;
const parallaxEffect = () => {
    const scrollPosition = window.pageYOffset;

    // Parallax para hero section (solo en desktop)
    if (!isMobile) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.5}px)`;
        }

        // Parallax para menu section
        const menuSection = document.querySelector('.menu');
        if (menuSection) {
            menuSection.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.2}px)`;
        }
    }
};

// Aplicar parallax solo en dispositivos de escritorio
if (!isMobile) {
    window.addEventListener('scroll', parallaxEffect);
}

// Actualizar estado de isMobile al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        window.removeEventListener('scroll', parallaxEffect);
    } else {
        window.addEventListener('scroll', parallaxEffect);
    }
});

// Animaciones para imágenes de galería
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.gallery-overlay');
        overlay.style.height = '100%';
    });

    item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.gallery-overlay');
        overlay.style.height = '0';
    });
});

// Inicializar todos los elementos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Comprobar si hay hash en la URL para scroll a esa sección
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }

    // Verificar si estamos en scroll para aplicar estilo al header
    if (window.scrollY > 0) {
        document.querySelector('header').classList.add('scrolled');
    }

    // Activar botón scroll-to-top si ya estamos en scroll
    if (window.scrollY > 500) {
        document.querySelector('.scroll-top').classList.add('active');
    }

    // Iniciar efecto parallax
    if (!isMobile) {
        parallaxEffect();
    }
});

// Mejorar accesibilidad de elementos interactivos
document.querySelectorAll('.service-item, .menu-highlight, .gallery-item, .contact-link, .social-link')
    .forEach(item => {
        item.setAttribute('tabindex', '0');

        // Permitir activación con teclado
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });