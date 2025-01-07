import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */

//textures

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("loading started");
};
loadingManager.onLoad = () => {
  console.log("loading finished");
};
loadingManager.onProgress = () => {
  console.log("in progress");
};
loadingManager.onError = (url) => {
  console.log("an error on" + url);
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const ambientTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
colorTexture.colorSpace = THREE.SRGBColorSpace;
const heightTexture = textureLoader.load("textures/door/height.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const gradientOne = textureLoader.load("/textures/gradients/3.jpg");
const gradientTwo = textureLoader.load("/textures/gradients/5.jpg");

const matcapOne = textureLoader.load("/textures/matcaps/1.png");
matcapOne.colorSpace = THREE.SRGBColorSpace;

//material

const material = new THREE.MeshBasicMaterial();
material.map = colorTexture;

//Mesh

const plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), material);
const sphere = new THREE.Mesh(new THREE.SphereGeometry(7.5, 16, 8), material);
const torus = new THREE.Mesh(new THREE.TorusGeometry(5, 1.5, 8, 50), material);

sphere.position.x = -20;
torus.position.x = 20;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene

const scene = new THREE.Scene();
scene.add(plane, torus, sphere);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.01,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 55;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
