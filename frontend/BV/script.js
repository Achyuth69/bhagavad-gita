document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('divineForm');
    const outputSection = document.getElementById('outputSection');
    const outputText = document.getElementById('outputText');

    let currentMessage = "";
    let portalMode = false;

    // Multiverse flash layer
    const flash = document.createElement("div");
    flash.className = "multiverse-flash";
    document.body.appendChild(flash);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('userName').value;
        const lang = document.getElementById('userLanguage').value || 'english';

        let data = null;

        try {
            const response = await fetch(`${API_BASE_URL}/get-meaning`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    shloka: name,
                    language: lang
                })
            });

            data = await response.json();

            if (data.text) {
                currentMessage = data.text;
            }

        } catch (err) {
            console.error("API error:", err);
            currentMessage = "Unable to fetch translation. Please check your connection.";
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
        const count = window.innerWidth < 768 ? 40 : 80;

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

});
