// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/br661thv9m
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Update ScrollTrigger on scroll
lenis.on('scroll', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.update();
    }
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integrate with GSAP ScrollTrigger if available
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        fixedMarkers: true
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.raf());
    ScrollTrigger.refresh();
}

// Force layout recalculation to fix ghost space
window.addEventListener('load', () => {
    setTimeout(() => {
        lenis.resize();
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 500);
});

console.log('Lenis Smooth Scroll Initialized');
