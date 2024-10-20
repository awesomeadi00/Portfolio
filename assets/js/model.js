import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Set the object to render
let objToRender = "darksword";

// Create a Three.JS Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

// Initialize renderer
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha allows for transparency
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Add lighting
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(100, 100, 200);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

// Load the 3D model
const loader = new GLTFLoader();
let object; // Store the loaded model globally

loader.load(
  `assets/models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;

    // Position the model to the right side of the container
    adjustModelPositionScale(); // Adjust initial position based on screen size

    // Set an initial rotation along the Z-axis
    object.rotation.z = THREE.MathUtils.degToRad(180);

    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);

// Set camera position slightly off-center to the left
camera.position.set(2, 1, 5); // Adjust to get the right angle and view

// OrbitControls for rotating the model
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zooming
controls.enablePan = false;  // Disable panning
controls.enableDamping = true; // Smooth dragging
controls.dampingFactor = 0.05;
controls.autoRotate = false; // Disable auto-rotation with mouse inactivity

// Animation loop to continuously rotate the model
function animate() {
  requestAnimationFrame(animate);

  if (object) {
    object.rotation.y += 0.01; // Slow continuous rotation along Y-axis
  }

  controls.update(); // Update controls
  renderer.render(scene, camera);
}

// Adjust model position based on screen size
function adjustModelPositionScale() {
  if (!object) return; // Ensure the model is loaded

  const width = window.innerWidth;

  // Detect if it's iPad Pro in portrait mode
  const isIpadProPortrait = window.matchMedia(
    "(device-width: 1024px) and (device-height: 1366px) and (orientation: portrait)"
  ).matches;

  if (isIpadProPortrait) {
    object.position.set(0, -0.6, 0);
    object.scale.set(0.0014, 0.0014, 0.0014); 
  }

  // iPhone 12
  else if (width <= 844) { 
    object.position.set(0, -1, 0);
    object.scale.set(0.0012, 0.0012, 0.0012); 
  } 
  
  // iPad Pro (Landscape)
  else if (width <= 1200) { 
    object.position.set(2.2, 0.9, 0);
    object.scale.set(0.0015, 0.0015, 0.0015); 
  } 
  
  // Macbook
  else if (width <= 1600) { 
    object.position.set(2.6, 0.9, 0);
    object.scale.set(0.002, 0.002, 0.002); 
  } 
  
  else { // Default for larger screens
    object.position.set(2.8, 0.9, 0);
    object.scale.set(0.002, 0.002, 0.002); 

  }
}

// Ensure model position is adjusted after resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (object) adjustModelPositionScale(); // Recalculate model position only if loaded
});

// Trigger initial adjustments
window.addEventListener("load", adjustModelPositionScale);

// Start the rendering loop
animate();