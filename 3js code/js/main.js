// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

// Import Three.js (also linked to as import map in HTML)
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

// Create scene here
let scene, camera, renderer, sphere;
const loader = new GLTFLoader(); // Initialize GLTFLoader here

function init() {
    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(1, 1, 5);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // SPHERE
    const geometry = new THREE.SphereGeometry(15, 32, 16);
    const texture = new THREE.TextureLoader().load('textures/lava.webp');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // LOADING 3D MODEL
    loader.load('3js code/assets/HAPPY.gltf', function (gltf) {
        const happy = gltf.scene;
        scene.add(happy);
        // happy.scale.set(0.1, 0.1, 0.1); // Adjust model scale
    });

    // Camera position
    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.02;
    sphere.rotation.y += 0.02;
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
