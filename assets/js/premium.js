// Premium Features: Custom Cursor, Mesh Gradient Animation, and Magnetic Effects

document.addEventListener('DOMContentLoaded', () => {
    // 1. Magnetic Effect for Buttons
    const magneticBtns = document.querySelectorAll('.btn, .logo');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // 4. Mesh Gradient Animation (Slow shift)
    gsap.to(':root', {
        '--mesh-grad': `radial-gradient(at 100% 100%, hsla(210, 100%, 15%, 1) 0, transparent 50%), 
                        radial-gradient(at 0% 100%, hsla(200, 100%, 10%, 1) 0, transparent 50%), 
                        radial-gradient(at 50% 100%, hsla(190, 100%, 15%, 1) 0, transparent 50%)`,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // 5. Scroll Integration (Handled by central smooth-scroll.js)
    if (typeof ScrollTrigger !== 'undefined') {
        window.addEventListener('scroll', ScrollTrigger.update);
    }

    // 4. Mesh Gradient Animation (Slow shift)
    const tiltItems = document.querySelectorAll('.feature-panel, .glass-card, .expertise-card, .value-card');
    tiltItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(item, {
                rotateY: x * 0.05,
                rotateX: -y * 0.05,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // 8. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
                gsap.from('.nav-links li', {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
});
