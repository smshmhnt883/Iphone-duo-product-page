/**
 * iPhone 18 Duo - Interactive 3D Studio Controller
 * Renders the optimized 3D liquid titanium model with real-time 360° inspection,
 * natural breathing levitation loop ("after loop"), mouse-follow tilt,
 * and zero-GPU performance management via IntersectionObserver.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

(function initInteractive3D() {
  const container = document.getElementById('interactive3dViewport');
  const canvas = document.getElementById('interactive3dCanvas');
  const loaderEl = document.getElementById('interactive3dLoader');
  const hintEl = document.querySelector('.interactive-3d__hint');
  const hintText = hintEl?.querySelector('span');
  if (hintText && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 860)) {
    hintText.textContent = 'Drag to rotate 360°';
  }

  if (!container || !canvas) return;

  // 1. Scene & Renderer setup
  const scene = new THREE.Scene();
  scene.background = null; // Transparent canvas blending into #050608

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });

  const getWidth = () => container.clientWidth || window.innerWidth;
  const getHeight = () => container.clientHeight || 600;

  renderer.setSize(getWidth(), getHeight(), false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // 2. Camera Setup
  const camera = new THREE.PerspectiveCamera(34, getWidth() / getHeight(), 0.1, 100);
  camera.position.set(0, 0.2, 4.2);

  // 3. Orbit Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false; // Prevent trapping page scroll
  controls.enablePan = false;
  controls.minPolarAngle = Math.PI * 0.22;
  controls.maxPolarAngle = Math.PI * 0.78;
  controls.rotateSpeed = 0.85;

  // 4. Cinematic Studio Lighting Rig (Liquid Titanium aesthetic)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
  scene.add(ambientLight);

  // Key light: Warm crisp studio top light
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  // Fill light: Soft cool blue/slate fill
  const fillLight = new THREE.DirectionalLight(0x7ea0c4, 1.4);
  fillLight.position.set(-4, -1, 3);
  scene.add(fillLight);

  // Rim light: High-contrast specular reflection on titanium chamfers
  const rimLight = new THREE.DirectionalLight(0xa5caff, 4.0);
  rimLight.position.set(0, 4, -4);
  scene.add(rimLight);

  // Subtle bottom bounce
  const bounceLight = new THREE.DirectionalLight(0x2a384c, 1.2);
  bounceLight.position.set(0, -4, 0);
  scene.add(bounceLight);

  // 5. Model Container & Idle Physics State
  const modelGroup = new THREE.Group();
  scene.add(modelGroup);

  let modelMesh = null;
  let isUserInteracting = false;
  let lastInteractionTime = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let isVisible = false;
  let rafId = null;
  const clock = new THREE.Clock();

  // 6. Load Optimized 3D Model
  const modelUrl = 'assets/iphone-18-duo-interactive.glb';
  const loader = new GLTFLoader();

  loader.load(
    modelUrl,
    (gltf) => {
      modelMesh = gltf.scene;

      // Center model geometry
      const box = new THREE.Box3().setFromObject(modelMesh);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      modelMesh.position.sub(center);

      // Normalize scale for both mobile and desktop
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetDim = window.innerWidth <= 860 ? 1.7 : 2.1;
      const scaleFactor = targetDim / (maxDim || 1);
      modelGroup.scale.setScalar(scaleFactor);

      // Initial flattering 3/4 hero presentation angle
      modelGroup.rotation.x = 0.18;
      modelGroup.rotation.y = -0.45;

      modelGroup.add(modelMesh);

      // Fade out loader & fade in canvas
      if (loaderEl) {
        loaderEl.style.opacity = '0';
        setTimeout(() => (loaderEl.style.display = 'none'), 400);
      }
      canvas.style.opacity = '1';

      lastInteractionTime = performance.now();
    },
    undefined,
    (err) => {
      console.warn('Could not load interactive 3D model:', err);
      if (loaderEl) loaderEl.style.display = 'none';
    }
  );

  // 7. User Interaction Tracking
  controls.addEventListener('start', () => {
    isUserInteracting = true;
    if (hintEl) {
      hintEl.style.opacity = '0.3';
    }
  });

  controls.addEventListener('end', () => {
    isUserInteracting = false;
    lastInteractionTime = performance.now();
    if (hintEl) {
      hintEl.style.opacity = '0.85';
    }
  });

  // Desktop Mouse Parallax
  window.addEventListener('mousemove', (e) => {
    if (isUserInteracting || window.innerWidth <= 860) return;
    const rect = container.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetTiltY = mouseX * 0.18;
      targetTiltX = -mouseY * 0.12;
    }
  }, { passive: true });

  // 8. The "After Loop" (Breathing Levitation Loop + Automatic Drift)
  function animate() {
    if (!isVisible) return;
    rafId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    if (modelMesh) {
      const now = performance.now();
      const idleTime = now - lastInteractionTime;

      // Natural Breathing Levitation Loop (always floats gracefully)
      const floatY = Math.sin(elapsedTime * 1.3) * 0.045;
      const floatTiltZ = Math.cos(elapsedTime * 0.9) * 0.015;
      const floatTiltX = Math.sin(elapsedTime * 1.1) * 0.02;

      modelMesh.position.y = floatY;
      modelMesh.rotation.z = floatTiltZ;

      if (!isUserInteracting) {
        if (idleTime > 1000) {
          // Automatic gentle yaw drift when left idle
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.95;

          // Smooth interpolation for subtle mouse parallax
          modelMesh.rotation.x += (floatTiltX + targetTiltX - modelMesh.rotation.x) * 0.05;
        } else {
          controls.autoRotate = false;
        }
      } else {
        controls.autoRotate = false;
      }
    }

    renderer.render(scene, camera);
  }

  // 9. Intersection Observer (0% GPU when out of view)
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      isVisible = entry.isIntersecting;
      if (isVisible) {
        clock.start();
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(rafId);
      }
    },
    { threshold: 0.05 }
  );

  observer.observe(container);

  // 10. Responsive Resizing
  function onResize() {
    const w = getWidth();
    const h = getHeight();
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);

    if (modelMesh) {
      const targetDim = window.innerWidth <= 860 ? 1.7 : 2.1;
      const box = new THREE.Box3().setFromObject(modelMesh);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        modelGroup.scale.setScalar(targetDim / maxDim);
      }
    }
  }

  window.addEventListener('resize', onResize, { passive: true });
})();
