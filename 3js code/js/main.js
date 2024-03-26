// Basic Three.JS scene from documentation, importing Three.JS through a CDN
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

// Import Three.js (also linked to as import map in HTML)
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

// Create scene here
let scene, camera, renderer;

function init() {
    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(1, 1, 5);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();

// Initiate add-ons
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models

loader.load(
    '3js code/HAPPY.gltf',
    function (gltf) {
        console.log('Model loaded successfully:', gltf);
        const happy = gltf.scene;
        scene.add(happy);

        // Automatically adjust camera position based on model bounding box
        const box = new THREE.Box3().setFromObject(happy);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

        camera.position.copy(center);
        camera.position.z += cameraZ * 1.5; // adjust multiplier as needed
    },
    undefined, // Placeholder for progress callback
    function (error) {
        console.error('Error loading GLTF model:', error);
    }
);

// Follow next steps in tutorial: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
