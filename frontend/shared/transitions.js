// ================= SMOOTH PAGE TRANSITIONS SCRIPT =================

// Initialize page transitions
document.addEventListener('DOMContentLoaded', function() {
    initPageTransitions();
    initScrollAnimations();
    hidePageLoader();
});

// Hide page loader after content loads
function hidePageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 300);
    }
}

// Initialize smooth page transitions for all links
function initPageTransitions() {
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a hash link or external
            if (!href || href.startsWith('#') || href.startsWith('http')) {
                return;
            }
            
            e.preventDefault();
            
            // Show loading bar
            showLoadingBar();
            
            // Add exit animation
            document.body.classList.add('page-exit');
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
}

// Show loading bar
function showLoadingBar() {
    let bar = document.querySelector('.loading-bar');
    
    if (!bar) {
        bar = document.createElement('div');
        bar.className = 'loading-bar';
        document.body.appendChild(bar);
    }
    
    bar.classList.add('active');
    
    setTimeout(() => {
        bar.style.width = '100%';
    }, 50);
}

// Initialize scroll animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section, .card, .team-card, .chapter-card');
    
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.matches('button, .btn, .glow-btn')) {
        const ripple = document.createElement('span');
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        target.style.position = 'relative';
        target.style.overflow = 'hidden';
        target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Smooth scroll for hash links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
