import * as THREE from 'three';
import Stats from 'stats.js';
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer, startTime, torusKnot, stats;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.25, 16);
    camera.position.set(0, 1.3, 3);

    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xcccccc));

    const spotLight = new THREE.SpotLight(0xffffff, 60);
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.2;
    spotLight.position.set(2, 3, 3);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 3;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);

    const dirLight = new THREE.DirectionalLight(0x55505a, 3);
    dirLight.position.set(0, 3, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.left = -1;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = -1;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.8);
    const globalPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.1);

    const material = new THREE.MeshPhongMaterial({
        color: 0x80ee10,
        shininess: 100,
        side: THREE.DoubleSide,
        clippingPlanes: [localPlane],
        clipShadows: true,
        alphaToCoverage: true,
    });

    const geometry = new THREE.TorusKnotGeometry(0.4, 0.08, 95, 20);
    torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.castShadow = true;
    scene.add(torusKnot);

    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(9, 9, 1, 1),
        new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 150 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', onWindowResize);
    document.body.appendChild(renderer.domElement);

    renderer.clippingPlanes = [];
    renderer.localClippingEnabled = true;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    startTime = Date.now();
}

function animate() {
    requestAnimationFrame(animate);
    const currentTime = Date.now();
    const time = (currentTime - startTime) / 1000;

    torusKnot.position.y = 0.8;
    torusKnot.rotation.x = time * 0.5;
    torusKnot.rotation.y = time * 0.2;
    torusKnot.scale.setScalar(Math.cos(time) * 0.125 + 0.875);

    stats.begin();
    renderer.render(scene, camera);
    stats.end();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
