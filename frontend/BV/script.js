document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('divineForm');
    const outputSection = document.getElementById('outputSection');
    const outputText = document.getElementById('outputText');
    const listenBtn = document.getElementById('listenBtn');

    let currentMessage = "";
    let currentShloka = "";
    let currentLanguage = "";
    let currentAudioUrl = "";
    let portalMode = false;

    // Multiverse flash layer
    const flash = document.createElement("div");
    flash.className = "multiverse-flash";
    document.body.appendChild(flash);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('userName').value.trim();
        const lang = document.getElementById('userLanguage').value || 'english';

        currentShloka = name;
        currentLanguage = lang;

        if (!name) {
            alert('Please enter a Sanskrit shloka');
            return;
        }

        let data = null;

        // Show loading state
        outputSection.style.visibility = 'visible';
        outputText.textContent = 'Translating...';
        listenBtn.style.display = 'none';

        try {
            console.log('Sending request to:', `${API_BASE_URL}/get-meaning`);
            console.log('Payload:', { shloka: name, language: lang });

            const response = await fetch(`${API_BASE_URL}/get-meaning`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    shloka: name,
                    language: lang
                })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            data = await response.json();
            console.log('Response data:', data);

            if (data && data.text) {
                currentMessage = data.text;
                currentAudioUrl = data.audio_url || "";
                
                // Show listen button if translation is successful
                listenBtn.style.display = 'block';
            } else if (data && data.error) {
                currentMessage = `Error: ${data.error}`;
                listenBtn.style.display = 'none';
            } else {
                currentMessage = "Translation not found. Please check the shloka text.";
                listenBtn.style.display = 'none';
            }

        } catch (err) {
            console.error("API error:", err);
            
            if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                currentMessage = `⚠️ BACKEND NOT RUNNING\n\n` +
                    `Cannot connect to: ${API_BASE_URL}\n\n` +
                    `TO FIX THIS:\n` +
                    `1. Open a terminal/command prompt\n` +
                    `2. Run: cd backend\n` +
                    `3. Run: uvicorn backend:app --reload\n\n` +
                    `OR double-click START_ALL.bat\n\n` +
                    `Then refresh this page and try again.`;
            } else if (err.message.includes('404')) {
                currentMessage = `⚠️ API ENDPOINT NOT FOUND (404)\n\n` +
                    `The endpoint ${API_BASE_URL}/get-meaning does not exist.\n\n` +
                    `This means the backend is running but the API route is wrong.\n` +
                    `Please check backend/backend.py`;
            } else {
                currentMessage = `⚠️ TRANSLATION ERROR\n\n` +
                    `${err.message}\n\n` +
                    `Check the browser console (F12) for details.`;
            }
        }

        outputSection.style.visibility = 'visible';

        // Multiverse activation
        const chakra = document.querySelector(".chakra-layer");
        const scroll = document.querySelector(".scroll-container");

        portalMode = true;

        document.body.classList.add("multiverse", "chromatic");
        chakra.classList.add("multiverse");
        scroll.classList.add("portal-active");
        flash.classList.add("active");

        setTimeout(() => {
            portalMode = false;
            document.body.classList.remove("multiverse", "chromatic");
            chakra.classList.remove("multiverse");
            scroll.classList.remove("portal-active");
            flash.classList.remove("active");
        }, 1200);

        // Reset reveal animation
        outputText.classList.remove("reveal");
        void outputText.offsetWidth;
        outputText.classList.add("reveal");

        assembleText(currentMessage, outputText);
    });

    // Cosmic text assembly
    function assembleText(text, element) {
        element.innerHTML = "";

        const fragment = document.createDocumentFragment();
        const words = text.split(" ");
        const maxWords = 100;

        words.slice(0, maxWords).forEach((word, index) => {
            const span = document.createElement("span");
            span.textContent = word + " ";
            span.style.cssText = `
                opacity:0;
                transform:translateY(20px);
                display:inline-block;
                transition:all 0.6s ease;
            `;

            fragment.appendChild(span);

            setTimeout(() => {
                span.style.opacity = 1;
                span.style.transform = "translateY(0)";
            }, index * 40);
        });

        element.appendChild(fragment);
    }

    // Particles
    const canvas = document.getElementById('dustCanvas');
    const ctx = canvas.getContext('2d');

    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.7 + 0.3;
        }

        update() {
            if (portalMode) {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;

                let dx = this.x - centerX;
                let dy = this.y - centerY;

                let distance = Math.sqrt(dx * dx + dy * dy);
                let angle = Math.atan2(dy, dx);

                angle += 0.2;
                distance *= 0.94;

                this.x = centerX + Math.cos(angle) * distance;
                this.y = centerY + Math.sin(angle) * distance;

                if (distance < 5) {
                    this.reset();
                }
            } else {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;

                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(212,175,55,${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = window.innerWidth < 768 ? 20 : 40;

        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    let resizeTimeout;

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 150);
    });

    // Initialize
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            resizeCanvas();
            animateParticles();
        });
    } else {
        resizeCanvas();
        animateParticles();
    }

    // Navbar scroll effect for translation page
    window.addEventListener("scroll", function() {
        const nav = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    // Listen button functionality
    listenBtn.addEventListener('click', async () => {
        if (!currentShloka || !currentLanguage) {
            alert('Please translate a shloka first');
            return;
        }

        listenBtn.disabled = true;
        listenBtn.textContent = '🔊 Playing...';

        try {
            // Step 1: Read the Sanskrit Shloka
            const shlokaAudio = await textToSpeech(currentShloka, 'hi'); // Sanskrit in Hindi voice
            await playAudio(shlokaAudio);

            // Step 2: Wait 2 seconds
            await sleep(2000);

            // Step 3: Read the translated meaning
            if (currentAudioUrl) {
                // Use backend-generated audio if available
                const meaningAudio = new Audio(`${API_BASE_URL}${currentAudioUrl}`);
                await playAudio(meaningAudio);
            } else {
                // Fallback to browser TTS
                const meaningAudio = await textToSpeech(currentMessage, currentLanguage);
                await playAudio(meaningAudio);
            }

        } catch (err) {
            console.error('Audio playback error:', err);
            alert('Error playing audio. Please try again.');
        } finally {
            listenBtn.disabled = false;
            listenBtn.textContent = '🔊 Listen';
        }
    });

    // Helper function to create audio from text using Web Speech API
    function textToSpeech(text, lang) {
        return new Promise((resolve, reject) => {
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                
                // Map language codes
                const langMap = {
                    'hindi': 'hi-IN',
                    'english': 'en-US',
                    'telugu': 'te-IN',
                    'tamil': 'ta-IN',
                    'kannada': 'kn-IN',
                    'malayalam': 'ml-IN',
                    'marathi': 'mr-IN',
                    'bengali': 'bn-IN',
                    'gujarati': 'gu-IN',
                    'urdu': 'ur-PK',
                    'spanish': 'es-ES',
                    'french': 'fr-FR',
                    'german': 'de-DE',
                    'italian': 'it-IT',
                    'portuguese': 'pt-PT',
                    'russian': 'ru-RU',
                    'chinese_simplified': 'zh-CN',
                    'japanese': 'ja-JP',
                    'korean': 'ko-KR',
                    'arabic': 'ar-SA'
                };

                utterance.lang = langMap[lang] || lang || 'en-US';
                utterance.rate = 0.9;
                utterance.pitch = 1;

                utterance.onend = () => resolve(utterance);
                utterance.onerror = (err) => reject(err);

                window.speechSynthesis.speak(utterance);
            } else {
                reject(new Error('Speech synthesis not supported'));
            }
        });
    }

    // Helper function to play audio element
    function playAudio(audio) {
        return new Promise((resolve, reject) => {
            if (audio instanceof Audio) {
                audio.onended = resolve;
                audio.onerror = reject;
                audio.play().catch(reject);
            } else {
                // For SpeechSynthesisUtterance, it's already playing
                resolve();
            }
        });
    }

    // Helper function to sleep
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

});