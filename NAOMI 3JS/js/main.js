// Basic Three.JS scene from documentation, importing Three.JS through a CDN
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

// Import Three.js (also linked to as import map in HTML)
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

///////CREATE SCENE //////////////////
let scene, camera, renderer, sphere, cowboy, happy, clock;
let sceneContainer = document.querySelector("#scene-container");

let mixer;
let actionCowboy; // Define actionCowboy variable

// const clock = new THREE.Clock();

function init() {
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true }); ///THE VIEWPORT
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);

    /////ADDING LIGHTENING RIGHT
    const lightRight = new THREE.DirectionalLight(0xFF69B4, 3);
    lightRight.position.set(5, 10, 5); // Adjust position
    scene.add(lightRight);

    /////ADDING LIGHTENING LEFT
    const lightLeft = new THREE.DirectionalLight(0xFF69B4, 3);
    lightLeft.position.set(-5, 10, -5); // Adjust position
    scene.add(lightLeft);

    //////SPHERE CODE ////////////////
    const sphereGeometry = new THREE.SphereGeometry(15, 32, 16);
    const sphereTexture = new THREE.TextureLoader().load('textures/pink.jpg');
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: sphereTexture });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    // sphere.position.x = -20; // Adjust x 

    /////////CAMERA POSITION////////////////
    camera.position.z = 50;
}

////EVENT LISTENER //////
document.querySelector("header").addEventListener("mousedown", () => {
    actionCowboy.play();
    console.log("mousedown");
});

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Update the mixer with the delta time
    if (mixer) {
        mixer.update(delta);
    }

    sphere.rotation.x += 0.007;
    sphere.rotation.y += 0.007;

    sphere.position.x = Math.sin(Date.now() / 2000) * 4;
    sphere.position.y = Math.sin(Date.now() / 4000) * 4;
    sphere.position.z = Math.sin(Date.now() / 5000) * 4;

    if (happy) {
        happy.rotation.x += 0.007;
        happy.rotation.y += 0.007;
        happy.position.y = Math.sin(Date.now() / 500) * 0.5;
    }

    if (cowboy) {
        cowboy.position.y = -25;
        cowboy.position.x = -25;
    }

    if (mixer) {
        mixer.update(clock.getDelta()); // Update animations
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();

//////ADD ONS / 3D MODEL ////////////////
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models

loader.load('assets/HAPPY.gltf', function (gltf) {
    happy = gltf.scene;
    scene.add(happy);
    happy.scale.set(3, 3, 3);
});

/////COWBOY
loader.load('assets/COWBOY.gltf', function (gltf) {
    cowboy = gltf.scene;
    console.log(cowboy);
    scene.add(cowboy);
    cowboy.scale.set(5, 5, 5);

    mixer = new THREE.AnimationMixer(cowboy); 
    const clips = gltf.animations;
    
    clips.forEach(function (clip) {
        // console.log(clip);
        actionCowboy = mixer.clipAction(clip); // Assign actionCowboy
        actionCowboy.play(); // Start animation
        console.log(actionCowboy);
    });
}, undefined, function (error) {
    console.error(error);
});


document.querySelector("header").addEventListener("mousedown", () => {
    if (actionCowboy) {
        if (actionCowboy.paused) {
            actionCowboy.paused = false; // Resume the animation if it's paused
        } else {
            actionCowboy.paused = true; // Pause the animation if it's running
        }
    }
    console.log("mousedown");
});


