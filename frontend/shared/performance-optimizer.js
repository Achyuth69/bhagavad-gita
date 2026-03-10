// ================= PERFORMANCE OPTIMIZATION SCRIPT =================

// Initialize performance optimizations
(function() {
    'use strict';

    // Debounce function for performance
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

    // Throttle function for scroll events
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

    // Lazy Load Images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
            });
        }
    }

    // Optimize Scroll Performance
    function optimizeScroll() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Your scroll logic here
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Reduce Canvas Particle Count on Mobile
    function optimizeCanvas() {
        const canvas = document.getElementById('dustCanvas');
        if (!canvas) return;

        const isMobile = window.innerWidth <= 768;
        const isLowEnd = navigator.hardwareConcurrency <= 4;

        if (isMobile || isLowEnd) {
            // Reduce particle count or disable canvas
            canvas.style.display = 'none';
        }
    }

    // Optimize Animations Based on Device
    function optimizeAnimations() {
        const isMobile = window.innerWidth <= 768;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isMobile || prefersReducedMotion) {
            // Reduce animation complexity
            const chakra = document.querySelector('.chakra-layer');
            if (chakra) {
                chakra.style.animationDuration = '300s';
            }
        }
    }

    // Preload Critical Resources
    function preloadCriticalResources() {
        const criticalImages = [
            'galaxy.jpg',
            'scroll.png',
            'chakra.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Optimize Video Loading
    function optimizeVideo() {
        const video = document.querySelector('.hero-video');
        if (!video) return;

        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Reduce video quality on mobile
            video.setAttribute('preload', 'metadata');
            
            // Pause video when not in viewport
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.5 });

            videoObserver.observe(video);
        }
    }

    // Optimize Touch Events
    function optimizeTouchEvents() {
        // Use passive listeners for better scroll performance
        const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
        
        passiveEvents.forEach(event => {
            document.addEventListener(event, () => {}, { passive: true });
        });
    }

    // Reduce Repaints and Reflows
    function batchDOMUpdates(updates) {
        requestAnimationFrame(() => {
            updates.forEach(update => update());
        });
    }

    // Optimize Font Loading
    function optimizeFonts() {
        if ('fonts' in document) {
            // Preload critical fonts
            const fonts = [
                new FontFace('Cinzel', 'url(https://fonts.gstatic.com/...)', { weight: '400' }),
                new FontFace('Playfair Display', 'url(https://fonts.gstatic.com/...)', { weight: '600' })
            ];

            fonts.forEach(font => {
                font.load().then(loadedFont => {
                    document.fonts.add(loadedFont);
                }).catch(() => {});
            });
        }
    }

    // Memory Management
    function cleanupUnusedResources() {
        // Remove event listeners from elements no longer in DOM
        const observer = new MutationObserver(throttle(() => {
            // Cleanup logic
        }, 1000));

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Optimize for Low-End Devices
    function detectDeviceCapability() {
        const isLowEnd = 
            navigator.hardwareConcurrency <= 4 ||
            navigator.deviceMemory <= 4 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isLowEnd) {
            document.body.classList.add('low-end-device');
            
            // Disable heavy animations
            const style = document.createElement('style');
            style.textContent = `
                .low-end-device .chakra-layer {
                    animation: none !important;
                }
                .low-end-device #dustCanvas {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Optimize Intersection Observer
    function optimizeIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation to save resources
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        document.querySelectorAll('.fade-in-section').forEach(el => {
            observer.observe(el);
        });
    }

    // Prefetch Next Page
    function prefetchNextPage() {
        const links = document.querySelectorAll('a[href]');
        const prefetched = new Set();

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const href = link.getAttribute('href');
                if (href && !prefetched.has(href) && !href.startsWith('#')) {
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = href;
                    document.head.appendChild(prefetchLink);
                    prefetched.add(href);
                }
            }, { once: true });
        });
    }

    // Initialize all optimizations
    function init() {
        // Run on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runOptimizations);
        } else {
            runOptimizations();
        }
    }

    function runOptimizations() {
        detectDeviceCapability();
        lazyLoadImages();
        optimizeScroll();
        optimizeCanvas();
        optimizeAnimations();
        optimizeVideo();
        optimizeTouchEvents();
        optimizeIntersectionObserver();
        prefetchNextPage();
        
        // Cleanup after page load
        window.addEventListener('load', () => {
            cleanupUnusedResources();
        });
    }

    // Start optimization
    init();

    // Expose utilities globally
    window.performanceUtils = {
        debounce,
        throttle,
        batchDOMUpdates
    };

})();

// Service Worker Registration for Offline Support (Optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}

// Monitor Performance
if (window.PerformanceObserver) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            // Log slow operations in development
            if (entry.duration > 50) {
                console.warn('Slow operation detected:', entry.name, entry.duration);
            }
        }
    });

    perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
}
