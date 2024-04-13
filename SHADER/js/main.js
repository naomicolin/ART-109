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

// ~~~~~~~~~~~~~~~~Position Camera~~~~~~~~~~~~~~~~
camera.position.z = 50;

// DEFINE UNIFORM DATA
const uniformData = {
    u_time: {
        type: 'f',
        value: 0, // Initialize with default value
    },
};

function render() {
    uniformData.u_time.value += 0.1; // Increment time value
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// ~~~~~~~~~~ Create Geometry ~~~~~~~~~~~~~~~~

const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 20, 20, 20); // with 32 segmented faces along each side of the box
const boxMaterial = new THREE.ShaderMaterial({
    wireframe: true,
    uniforms: uniformData,
    vertexShader: `
        varying vec3 pos;
        uniform float u_time;

        void main() {
            // vec4 mvPosition = modelViewMatrix * vec4(position.x, position.y, position.z + sin(u_time), 1.0);
            // gl_Position = projectionMatrix * mvPosition;

            /////OR 2D SINE WAVE
            // vec4 mvPosition = modelViewMatrix * vec4(position.x, sin(position.z + u_time), position.z, 1.0);
            // gl_Position = projectionMatrix * mvPosition;

            /////OR WAVEY BOX
            // vec4 mvPosition = modelViewMatrix * vec4(position.x, sin(position.z + u_time) + position.y, position.z, 1.0);
            // gl_Position = projectionMatrix * mvPosition;

            /////ADDING TIME WAVEY BOX
            // vec4 mvPosition = modelViewMatrix * vec4(position.x, sin((position.z)/2.0 + u_time) + position.y, position.z, 1.0);
            // gl_Position = projectionMatrix * mvPosition;


            /////ADDING TIME WAVEY BOX + AMP
            vec4 mvPosition = modelViewMatrix * vec4(position.x, 4.0*sin((position.z)/2.0 + u_time) + position.y, position.z, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            pos = position;




        }
    `,
    fragmentShader:
     `

     varying vec3 pos;
     uniform float u_time;

        void main() {
            // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);

            // gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0);


            /////NEWWWWW
            // if (pos.z > 0.0) {
            //     gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            // } else {
            //     gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
            // }


            /////NEWWWWW WITH TIME
            if (pos.z > 0.0) {
                gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0);
            } else {
                gl_FragColor = vec4(0.0, abs(cos(u_time)), 0.0, 1.0);
            }




        }
    `,
}); 

const cube = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(cube);

// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~

render(); // Start the rendering loop
