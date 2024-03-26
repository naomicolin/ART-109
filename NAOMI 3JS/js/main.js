// Basic Three.JS scene from documentation, importing Three.JS through a CDN
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

// Import Three.js (also linked to as import map in HTML)
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models




///////CREATE SCENE //////////////////
let scene, camera, renderer, sphere, cube;

function init () {
    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(1, 1, 5);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);




    //////SPHERE CODE ////////////////
    const sphereGeometry = new THREE.SphereGeometry(15, 32, 16);
    const sphereTexture = new THREE.TextureLoader().load('textures/lava.webp');
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: sphereTexture });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphere.position.x = -20; // Adjust x 
    ////////////////////////////////////////////////////////////////



   //////// CUBE CODE ////////////////////////////////
    const cubeGeometry = new THREE.BoxGeometry(30, 30, 30);
    const cubeTexture = new THREE.TextureLoader().load('textures/denim.jpg');
    const cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);
    cube.position.y = 5; // Adjust 
    cube.position.x = 20;

    ////////////////////////////////////////////////////////////////



    /////////CAMERA POSITION////////////////
    camera.position.z = 50;


}

function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.02;
    sphere.rotation.y += 0.02;

    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;

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


//////ADD ONS / 3D MODEL ////////////////
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models

loader.load('assets/HAPPY.gltf', function (gltf) {
    const happy = gltf.scene;
    scene.add(happy);

   
    happy.scale.set(2, 2, 2); //
    happy.position.z = 20; // Adjust x 
    happy.position.x = -20; // Adjust x 
    happy.position.y = -15; // Adjust x 
    camera.position.y += cameraY * 2; // adjust multiplier as needed
    



});
