
/* ==========================================
   B. — PERSONAL PORTFOLIO
   MAIN JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       1. SCROLL REVEAL
    ======================================== */

    const sections = document.querySelectorAll("main section");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });

        sections.forEach((section) => {
            section.classList.add("reveal");
            revealObserver.observe(section);
        });

    } else {

        sections.forEach((section) => {
            section.classList.add("visible");
        });

    }


    /* ========================================
       2. CURSOR GLOW
    ======================================== */

    const glow = document.querySelector(".cursor-glow");

    if (glow) {

        window.addEventListener("mousemove", (event) => {
            glow.style.left = `${event.clientX}px`;
            glow.style.top = `${event.clientY}px`;
        });

    }


    /* ========================================
       3. LOCAL CLOCK
    ======================================== */

    const clock = document.getElementById("local-time");

    function updateClock() {

        if (!clock) return;

        clock.textContent = new Date().toLocaleTimeString("pt-BR", {
            hour12: false
        });

    }

    updateClock();

    if (clock) {
        setInterval(updateClock, 1000);
    }


    /* ========================================
       4. DYNAMIC TEXT
    ======================================== */

    const typingText = document.getElementById("typing-text");

    const interests = [
        "Artificial Intelligence",
        "Software Development",
        "Programming",
        "Technology"
    ];

    let interestIndex = 0;

    if (typingText) {

        setInterval(() => {

            typingText.classList.add("changing");

            setTimeout(() => {

                interestIndex = (interestIndex + 1) % interests.length;

                typingText.textContent = interests[interestIndex];

                typingText.classList.remove("changing");

            }, 300);

        }, 2500);

    }


    /* ========================================
       5. PARTICLE NETWORK BACKGROUND
    ======================================== */

    const canvas = document.getElementById("particles");
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {

        let particles = [];

        const particleCount = 65;
        const connectionDistance = 130;

        let animationFrame = null;

        function resizeCanvas() {

            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio;

            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

            createParticles();

        }


        class Particle {

            constructor() {

                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;

                this.size = Math.random() * 1.5 + 0.5;

                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;

            }

            update() {

                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > window.innerWidth) {
                    this.speedX *= -1;
                }

                if (this.y < 0 || this.y > window.innerHeight) {
                    this.speedY *= -1;
                }

            }

            draw() {

                ctx.beginPath();

                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                ctx.fill();

            }

        }


        function createParticles() {

            particles = [];

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

        }


        function connectParticles() {

            for (let i = 0; i < particles.length; i++) {

                for (let j = i + 1; j < particles.length; j++) {

                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;

                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {

                        const opacity = 1 - distance / connectionDistance;

                        ctx.beginPath();

                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);

                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                        ctx.lineWidth = 1;

                        ctx.stroke();

                    }

                }

            }

        }


        function animateParticles() {

            if (document.hidden) return;

            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            connectParticles();

            animationFrame = requestAnimationFrame(animateParticles);

        }


        function startParticles() {

            if (animationFrame !== null) return;

            animateParticles();

        }


        function stopParticles() {

            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }

        }


        resizeCanvas();
        startParticles();

        window.addEventListener("resize", resizeCanvas);

        document.addEventListener("visibilitychange", () => {

            if (document.hidden) {
                stopParticles();
            } else {
                startParticles();
            }

        });

    }


    /* ========================================
       6. ACTIVE NAVIGATION
    ======================================== */

    const navLinks = document.querySelectorAll(".nav-links a");

    const navSections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                        if (link.getAttribute("href") === `#${entry.target.id}`) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        }, {
            rootMargin: "-35% 0px -55% 0px"
        });

        navSections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }


    /* ========================================
       7. LOADING SCREEN
    ======================================== */

    const loaderElement = document.getElementById("loader");

    if (loaderElement) {

        console.log("Loader encontrado. Iniciando temporizador.");

        setTimeout(() => {

            loaderElement.classList.add("loaded");

            setTimeout(() => {
                loaderElement.remove();
            }, 700);

        }, 1500);

    } else {

        console.warn("Loader não encontrado no HTML.");

    }

});
