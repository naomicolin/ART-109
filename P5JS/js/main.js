///IMPORTS THE ENTIRE THREE.JS LIBRARY AND ASSIGNS IT TO VARIABLE
import * as THREE from 'three';
            ///IMPORTS THE STAT.JS LIBRARY FOR PERFORMANCE
			import Stats from 'three/addons/libs/stats.module.js';
            ///IMPORTS GUI MODULE
            import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
            ///IMPORTS ORBITCONTROLS MODULE FOR CAMERA CONTROL
			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

			
            /////DECLARING GLOBAL VARIABLES/////
            let camera, scene, renderer, startTime, object, stats;

            /////CALLING YOUR FUNCTIONS AND INITIALIZING THEM
			init();
			animate();


            //////INITIALIZATION FUNCTION, CREATES YOUR SCENE/////
			function init() {

				camera = new THREE.PerspectiveCamera( 36, window.innerWidth / window.innerHeight, 0.25, 16 );

				camera.position.set( 0, 1.3, 3 );

				scene = new THREE.Scene();

				// LIGHTS ////////

				scene.add( new THREE.AmbientLight( 0xcccccc ) );

				///ADDING SPOTLIGHT LIGHT/////
                const spotLight = new THREE.SpotLight( 0xffffff, 60 );
				spotLight.angle = Math.PI / 5;
				spotLight.penumbra = 0.2; ///PENUMBRA IS SHADED OUTER REGION OF A SHADOW CAST 
				spotLight.position.set( 2, 3, 3 );
				spotLight.castShadow = true;
				spotLight.shadow.camera.near = 3;
				spotLight.shadow.camera.far = 10;
				spotLight.shadow.mapSize.width = 1024;
				spotLight.shadow.mapSize.height = 1024;
				scene.add( spotLight );

				///ADDING DIRECTIONAL LIGHT/////
                const dirLight = new THREE.DirectionalLight( 0x55505a, 3 );
				dirLight.position.set( 0, 3, 0 );
				dirLight.castShadow = true;
				dirLight.shadow.camera.near = 1;
				dirLight.shadow.camera.far = 10;

				dirLight.shadow.camera.right = 1;
				dirLight.shadow.camera.left = - 1;
				dirLight.shadow.camera.top	= 1;
				dirLight.shadow.camera.bottom = - 1;

				dirLight.shadow.mapSize.width = 1024;
				dirLight.shadow.mapSize.height = 1024;
				scene.add( dirLight );



				// ***** Clipping planes: *****

				//////CLIPS GEOMETRY, ALLOWING YOU TO CONTROL WHICH PARTS OF THE GEOMETRY IS RENDERED/CLIPPED /////////
                const localPlane = new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0.8 );
				const globalPlane = new THREE.Plane( new THREE.Vector3( - 1, 0, 0 ), 0.1 );

				
                
                ///////GEOMETRY///////

                //////THIS SETUP CONFIGURES THE MATERIAL TO INTERACT WITH CLIPPING PLANES, CAST SHADOWS WHEN CLIPPED
				const material = new THREE.MeshPhongMaterial( { 
                    //MeshPhongMaterial is a type of material in THREE.js that simulates the appearance of surfaces with diffuse and specular reflection
					color: 0x80ee10,
					shininess: 100,
					side: THREE.DoubleSide,

					// ***** Clipping setup (material): *****
					clippingPlanes: [ localPlane ],
					clipShadows: true,

					alphaToCoverage: true, ////ENABLES THE ALPHA TO COVER THE MATERIAL

				} );



                ////CREATES A TORUS KNOT GEOMETRY
				const geometry = new THREE.TorusKnotGeometry( 0.4, 0.08, 95, 20 );

                /////CREATES A MESH WITH THE GEOMETRY AND MATERIAL
				object = new THREE.Mesh( geometry, material );
				
                ////ENABLES SHADOW CASTING
                object.castShadow = true;
				scene.add( object );

				//////// CREATE A GROUND MESH WITH SPECIFIC PROPERTIES
                const ground = new THREE.Mesh(
					new THREE.PlaneGeometry( 9, 9, 1, 1 ),
					new THREE.MeshPhongMaterial( { color: 0xa0adaf, shininess: 150 } )
				);




                //////ROTATES THE GROUND AND ADDS SHADOWS
				ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
				ground.receiveShadow = true;
				scene.add( ground );


				///////// CREATE A STATS OBJECT FOR PERFORMANCE MONITORING/////

				stats = new Stats();

                ////////ADD THE STATS DOM ELEMENT TO THE DOCUMENT/////////
				document.body.appendChild( stats.dom );




				////////// CREATE A WEBGL RENDERER WITH ANTIALIASING/////////

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				
                
                ///////ENABLE SHADOW MAPPING FOR THE RENDERER//////
                renderer.shadowMap.enabled = true;

                //////// SET THE PIXEL RATIO OF THE RENDERER/////
				renderer.setPixelRatio( window.devicePixelRatio );

                ////// SET THE SIZE OF THE RENDERER//////
				renderer.setSize( window.innerWidth, window.innerHeight );

                //////// ADD A RESIZE EVENT LISTENER///////
				window.addEventListener( 'resize', onWindowResize );

                ////// ADD THE RENDERER'S DOM ELEMENT TO THE DOCUMENT//////
				document.body.appendChild( renderer.domElement );

				
                
                /////// DEFINES GLOBAL CLIPPING PLANES AND AN EMPTY ARRAY/////
                // ***** Clipping setup (renderer): *****
				const globalPlanes = [ globalPlane ],
					Empty = Object.freeze( [] );

                ///// SET THE RENDERER'S CLIPPING PLANES TO EMPTY INITIALLY/////
				renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
				renderer.localClippingEnabled = true;

				// Controls

                /////// CREATE ORBITCONTROLS FOR CAMERA MANIPULATION/////
				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 1, 0 );
				controls.update();

				





                
                
                ////////////NO COMMENTS HERE////////////////////////////////
                
                // GUI

				const gui = new GUI(),
					props = {
						alphaToCoverage: true,
					},
					folderLocal = gui.addFolder( 'Local Clipping' ),
					propsLocal = {

						get 'Enabled'() {

							return renderer.localClippingEnabled;

						},
						set 'Enabled'( v ) {

							renderer.localClippingEnabled = v;

						},

						get 'Shadows'() {

							return material.clipShadows;

						},
						set 'Shadows'( v ) {

							material.clipShadows = v;

						},

						get 'Plane'() {

							return localPlane.constant;

						},
						set 'Plane'( v ) {

							localPlane.constant = v;

						}

					},
					folderGlobal = gui.addFolder( 'Global Clipping' ),
					propsGlobal = {

						get 'Enabled'() {

							return renderer.clippingPlanes !== Empty;

						},
						set 'Enabled'( v ) {

							renderer.clippingPlanes = v ? globalPlanes : Empty;

						},

						get 'Plane'() {

							return globalPlane.constant;

						},
						set 'Plane'( v ) {

							globalPlane.constant = v;

						}

					};

				gui.add( props, 'alphaToCoverage' ).onChange( function ( value ) {

					ground.material.alphaToCoverage = value;
					ground.material.needsUpdate = true;

					material.alphaToCoverage = value;
					material.needsUpdate = true;

				} );
				folderLocal.add( propsLocal, 'Enabled' );
				folderLocal.add( propsLocal, 'Shadows' );
				folderLocal.add( propsLocal, 'Plane', 0.3, 1.25 );

				folderGlobal.add( propsGlobal, 'Enabled' );
				folderGlobal.add( propsGlobal, 'Plane', - 0.4, 3 );

				// Start

				startTime = Date.now();

			}

            ////////////NO COMMENTS HERE////////////////////////////////







			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

            //////ANIMATE THE SCENE/////
			function animate() {

				const currentTime = Date.now();
				const time = ( currentTime - startTime ) / 1000;

				/////// REQUEST ANIMATION FRAME FOR SMOOTH RENDERING///////
                requestAnimationFrame( animate );

				object.position.y = 0.8;
				object.rotation.x = time * 0.5;
				object.rotation.y = time * 0.2;
				object.scale.setScalar( Math.cos( time ) * 0.125 + 0.875 );

				stats.begin();

                /////// RENDERS THE SCENE///////
				renderer.render( scene, camera );
				stats.end();

			}