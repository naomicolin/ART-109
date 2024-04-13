// Import Three.js (also linked to as import map in the HTML)
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

// ~~~~~~~~~~~~~~~~Set up scene, camera, + renderer~~~~~~~~~~~~~~~~

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ~~~~~~~~~~~~~~~~ Add Lights ~~~~~~~~~~~~~~~~

// Ambient light which is for the whole scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional light - parallel sun rays
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 32, 64);
scene.add(directionalLight);

// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~

const controls = new OrbitControls(camera, renderer.domElement);

// Add axes helper to visualize x, y, and z coordinates
const axesHelper = new THREE.AxesHelper(16);
scene.add(axesHelper);

// ~~~~~~~~~~~~~~~~Position Camera~~~~~~~~~~~~~~~~
camera.position.z = 50;

// ~~~~~~~~~~ Create Geometry ~~~~~~~~~~~~~~~~

const boxGeometry = new THREE.BoxGeometry(16, 16, 16, 32, 32, 32); // with 32 segmented faces along each side of the box

const boxMaterial = new THREE.ShaderMaterial({
    wireframe: true,
    vertexShader: `
        void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `,
}); 

const cube = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(cube);

// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
