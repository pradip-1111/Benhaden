import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('globe-container');

if (container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Cinematic Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Moderate ambient for base visibility
    scene.add(ambientLight);

    // Strong Top-Down Light (The "Glow" source)
    const topLight = new THREE.PointLight(0xffffff, 15, 100);
    topLight.position.set(0, 10, 2);
    scene.add(topLight);

    // Key Directional Light for definition
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Rim Light (Edge Highlight)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    // Renderer Post-Processing Simulation
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.5; // High exposure for that "bloomed" look
    renderer.outputEncoding = THREE.sRGBEncoding;

    let globe;

    const loader = new GLTFLoader();
    loader.load(
        'assets/earth.glb',
        function (gltf) {
            globe = gltf.scene;
            globe.scale.set(1.0, 1.0, 1.0); // Adjust scale as needed
            scene.add(globe);

            // Center the globe
            const box = new THREE.Box3().setFromObject(globe);
            const center = box.getCenter(new THREE.Vector3());
            globe.position.sub(center);

            // Initial position
            globe.rotation.y = Math.PI / 2;
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    camera.position.z = 2.4; // Optimized for two-column layout

    // Mouse interaction restoration
    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    const animate = function () {
        requestAnimationFrame(animate);

        if (globe) {
            globe.rotation.y += 0.003; // Smooth auto rotation

            // Subtle interactive rotation (smoothed)
            globe.rotation.x += (mouseY * 0.0001 - globe.rotation.x) * 0.05;
            globe.rotation.y += (mouseX * 0.0001);
        }

        renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        if (container) {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
    });
}
