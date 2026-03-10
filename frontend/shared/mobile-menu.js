// ================= MOBILE MENU FUNCTIONALITY =================

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    handleMobileResize();
});

function initMobileMenu() {
    // Create hamburger menu if it doesn't exist
    const navbar = document.querySelector('.navbar .nav-content');
    if (!navbar) return;

    // Check if hamburger already exists
    if (document.querySelector('.hamburger')) return;

    // Create hamburger button
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    // Create mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';

    // Insert hamburger before right-section
    const rightSection = navbar.querySelector('.right-section');
    if (rightSection) {
        navbar.insertBefore(hamburger, rightSection);
        document.body.appendChild(overlay);

        // Toggle menu
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            closeMobileMenu();
        });

        // Close menu when clicking a link
        const navLinks = rightSection.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const rightSection = document.querySelector('.right-section');
    const overlay = document.querySelector('.mobile-overlay');

    if (hamburger && rightSection && overlay) {
        hamburger.classList.toggle('active');
        rightSection.classList.toggle('active');
        overlay.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (rightSection.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const rightSection = document.querySelector('.right-section');
    const overlay = document.querySelector('.mobile-overlay');

    if (hamburger && rightSection && overlay) {
        hamburger.classList.remove('active');
        rightSection.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleMobileResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close menu if resized to desktop
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250);
    });
}

// Prevent menu from staying open on orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(closeMobileMenu, 100);
});

// Touch swipe to close menu
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    const rightSection = document.querySelector('.right-section');
    if (rightSection && rightSection.classList.contains('active')) {
        touchStartX = e.changedTouches[0].screenX;
    }
}, { passive: true });

document.addEventListener('touchend', function(e) {
    const rightSection = document.querySelector('.right-section');
    if (rightSection && rightSection.classList.contains('active')) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
}, { passive: true });

function handleSwipe() {
    // Swipe right to close menu
    if (touchEndX > touchStartX + 50) {
        closeMobileMenu();
    }
}
