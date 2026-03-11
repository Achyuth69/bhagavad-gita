/**
 * Performance Optimizer
 * Optimizes page performance by managing animations, lazy loading, and resource management
 */

(function() {
    'use strict';

    // Detect device capabilities
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;

    // Performance settings based on device
    const settings = {
        particleCount: isMobile ? 20 : (isLowEndDevice ? 30 : 50),
        enableBlur: !isMobile,
        enableShadows: !isLowEndDevice,
        animationQuality: isMobile ? 'low' : 'high'
    };

    /**
     * Lazy load images
     */
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /**
     * Debounce function for performance
     */
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

    /**
     * Throttle function for scroll events
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Optimize scroll performance
     */
    function optimizeScroll() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Your scroll handling code here
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Reduce animations on low-end devices
     */
    function optimizeAnimations() {
        if (isLowEndDevice) {
            document.body.classList.add('reduce-animations');
        }
    }

    /**
     * Preload critical resources
     */
    function preloadCriticalResources() {
        const criticalImages = [
            '/frontend/BV/galaxy.jpg',
            '/frontend/BV/chakra.png',
            '/frontend/BV/scroll.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    /**
     * Clean up unused resources
     */
    function cleanupResources() {
        // Remove unused event listeners
        window.addEventListener('beforeunload', () => {
            // Cleanup code here
        });
    }

    /**
     * Monitor performance
     */
    function monitorPerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn('Long task detected:', entry);
                    }
                }
            });
            
            observer.observe({ entryTypes: ['longtask'] });
        }
    }

    /**
     * Optimize canvas rendering
     */
    function optimizeCanvas() {
        const canvas = document.getElementById('dustCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d', {
            alpha: true,
            desynchronized: true,
            willReadFrequently: false
        });

        // Reduce particle count on mobile
        if (window.particleSystem) {
            window.particleSystem.setParticleCount(settings.particleCount);
        }
    }

    /**
     * Initialize all optimizations
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        lazyLoadImages();
        optimizeScroll();
        optimizeAnimations();
        preloadCriticalResources();
        cleanupResources();
        monitorPerformance();
        optimizeCanvas();

        // Expose settings
        window.performanceSettings = settings;
    }

    // Start optimization
    init();

})();
