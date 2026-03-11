/**
 * Universal Page Loader
 * Works on all devices and handles various loading scenarios
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        minDisplayTime: 500,        // Minimum time to show loader (ms)
        maxDisplayTime: 5000,       // Maximum time before force hide (ms)
        fadeOutDuration: 500,       // Fade out animation duration (ms)
        checkInterval: 100          // Interval to check loading status (ms)
    };

    let loaderStartTime = Date.now();
    let isLoaderHidden = false;

    /**
     * Hide the page loader
     */
    function hideLoader() {
        if (isLoaderHidden) return;

        const loader = document.querySelector('.page-loader');
        if (!loader) return;

        const elapsedTime = Date.now() - loaderStartTime;
        const remainingTime = Math.max(0, config.minDisplayTime - elapsedTime);

        setTimeout(() => {
            loader.classList.add('hidden');
            isLoaderHidden = true;

            // Remove from DOM after fade out
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, config.fadeOutDuration);
        }, remainingTime);
    }

    /**
     * Check if all critical resources are loaded
     */
    function checkResourcesLoaded() {
        // Check if DOM is ready
        if (document.readyState !== 'complete') {
            return false;
        }

        // Check if all images are loaded
        const images = document.querySelectorAll('img');
        for (let img of images) {
            if (!img.complete) {
                return false;
            }
        }

        // Check if all stylesheets are loaded
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        for (let link of stylesheets) {
            if (!link.sheet) {
                return false;
            }
        }

        return true;
    }

    /**
     * Initialize loader behavior
     */
    function initLoader() {
        // Hide loader when page is fully loaded
        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader);
        }

        // Fallback: Check periodically if resources are loaded
        const checkInterval = setInterval(() => {
            if (checkResourcesLoaded()) {
                clearInterval(checkInterval);
                hideLoader();
            }
        }, config.checkInterval);

        // Force hide after max display time
        setTimeout(() => {
            clearInterval(checkInterval);
            hideLoader();
        }, config.maxDisplayTime);

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && document.readyState === 'complete') {
                hideLoader();
            }
        });
    }

    /**
     * Handle errors gracefully
     */
    function handleErrors() {
        // Hide loader on critical errors
        window.addEventListener('error', (event) => {
            console.warn('Resource loading error:', event.message);
            // Don't hide immediately on error, let other resources load
        });

        // Hide loader if unhandled promise rejection
        window.addEventListener('unhandledrejection', (event) => {
            console.warn('Unhandled promise rejection:', event.reason);
        });
    }

    /**
     * Add progress indicator (optional)
     */
    function addProgressIndicator() {
        const loader = document.querySelector('.page-loader');
        if (!loader) return;

        // Check if progress bar already exists
        if (loader.querySelector('.loader-progress')) return;

        const progress = document.createElement('div');
        progress.className = 'loader-progress';
        loader.appendChild(progress);
    }

    /**
     * Update loader text based on loading stage
     */
    function updateLoaderText(text) {
        const loaderText = document.querySelector('.loader-text');
        if (loaderText) {
            loaderText.textContent = text;
        }
    }

    /**
     * Detect device type and adjust loader
     */
    function detectDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
        
        if (isMobile) {
            document.body.classList.add('mobile-device');
        } else if (isTablet) {
            document.body.classList.add('tablet-device');
        } else {
            document.body.classList.add('desktop-device');
        }
    }

    /**
     * Preload critical resources
     */
    function preloadCriticalResources() {
        // Get all preload links
        const preloadLinks = document.querySelectorAll('link[rel="preload"]');
        
        let loadedCount = 0;
        const totalCount = preloadLinks.length;

        if (totalCount === 0) return;

        preloadLinks.forEach(link => {
            // Check if already loaded
            if (link.as === 'image') {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    updateProgress(loadedCount, totalCount);
                };
                img.onerror = () => {
                    loadedCount++;
                    updateProgress(loadedCount, totalCount);
                };
                img.src = link.href;
            } else {
                loadedCount++;
                updateProgress(loadedCount, totalCount);
            }
        });
    }

    /**
     * Update loading progress
     */
    function updateProgress(loaded, total) {
        const percentage = Math.round((loaded / total) * 100);
        const loaderText = document.querySelector('.loader-text');
        
        if (loaderText && total > 0) {
            const originalText = loaderText.getAttribute('data-original-text') || loaderText.textContent;
            loaderText.setAttribute('data-original-text', originalText);
            loaderText.textContent = `${originalText} ${percentage}%`;
        }
    }

    /**
     * Initialize everything when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            detectDevice();
            addProgressIndicator();
            preloadCriticalResources();
            initLoader();
            handleErrors();
        });
    } else {
        detectDevice();
        addProgressIndicator();
        preloadCriticalResources();
        initLoader();
        handleErrors();
    }

    // Expose API for manual control
    window.pageLoader = {
        hide: hideLoader,
        updateText: updateLoaderText,
        show: function() {
            const loader = document.querySelector('.page-loader');
            if (loader) {
                loader.classList.remove('hidden');
                isLoaderHidden = false;
            }
        }
    };

})();
