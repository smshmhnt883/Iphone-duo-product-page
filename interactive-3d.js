/**
 * iPhone 18 Duo - Interactive 3D Studio Engine
 * Procedurally generated CAD-precision model with Apple Pro camera plateau,
 * tandem OLED dual displays, Dynamic Island, titanium micro-hinge,
 * interactive fold angle controls, and natural breathing levitation loop.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

(function initInteractive3D() {
  const container = document.getElementById('interactive3dViewport');
  const canvas = document.getElementById('interactive3dCanvas');
  const loaderEl = document.getElementById('interactive3dLoader');
  const hintEl = document.querySelector('.interactive-3d__hint');
  const hintText = hintEl?.querySelector('span');

  if (!container || !canvas) return;

  if (hintText && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 860)) {
    hintText.textContent = 'Drag to rotate 360°';
  }

  // 1. Scene & Renderer Setup
  const scene = new THREE.Scene();

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
  renderer.toneMappingExposure = 1.35;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // 2. Studio Environment Map for Authentic PBR Reflections
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const roomEnv = new RoomEnvironment();
  scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;

  // 3. Camera Setup
  const camera = new THREE.PerspectiveCamera(30, getWidth() / getHeight(), 0.1, 100);
  camera.position.set(0, 0.2, 4.2);

  // 4. Orbit Controls (Zoom & pan disabled to protect page scroll)
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minPolarAngle = Math.PI * 0.22;
  controls.maxPolarAngle = Math.PI * 0.78;
  controls.rotateSpeed = 0.85;

  // 5. Studio Lighting Rig
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(5, 6, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xa5c5ee, 2.0);
  fillLight.position.set(-5, 1, 4);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xbddcff, 4.2);
  rimLight.position.set(0, 5, -5);
  scene.add(rimLight);

  const bottomLight = new THREE.DirectionalLight(0x304058, 1.8);
  bottomLight.position.set(0, -5, 0);
  scene.add(bottomLight);

  // 6. PROCEDURAL IPHONE 18 DUO 3D BUILDER
  function buildIPhone18Duo() {
    const root = new THREE.Group();

    // High-End PBR Materials
    const titaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x4a4f59, // Natural Liquid Titanium
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.45,
      clearcoatRoughness: 0.12
    });

    const titaniumBezelMat = new THREE.MeshPhysicalMaterial({
      color: 0x8a92a2, // High-polish chamfers
      metalness: 0.96,
      roughness: 0.12,
      clearcoat: 0.9
    });

    const glassBackMat = new THREE.MeshPhysicalMaterial({
      color: 0x22262e, // Matte Velvet Back Glass
      metalness: 0.4,
      roughness: 0.32,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1
    });

    const lensGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050914,
      metalness: 0.85,
      roughness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.98
    });

    // High-Resolution OLED Wallpaper Texture
    function createScreenTexture(isRight) {
      const wpCanvas = document.createElement('canvas');
      wpCanvas.width = 720;
      wpCanvas.height = 1520;
      const ctx = wpCanvas.getContext('2d');

      const bgGrad = ctx.createRadialGradient(360, 760, 50, 360, 760, 900);
      bgGrad.addColorStop(0, '#101626');
      bgGrad.addColorStop(0.45, '#080a12');
      bgGrad.addColorStop(1, '#020306');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 720, 1520);

      // Fluid Titanium Ribbon Waves
      ctx.save();
      ctx.translate(isRight ? 180 : 540, 760);
      ctx.rotate(isRight ? -Math.PI / 7 : Math.PI / 7);

      // Outer glow ribbon
      ctx.beginPath();
      ctx.ellipse(0, 0, 260, 480, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 114, 224, 0.45)';
      ctx.lineWidth = 28;
      ctx.shadowColor = '#2563eb';
      ctx.shadowBlur = 60;
      ctx.stroke();

      // Core ribbon
      ctx.beginPath();
      ctx.ellipse(0, 0, 220, 420, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.75)';
      ctx.lineWidth = 12;
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 40;
      ctx.stroke();

      // Cyan specular spine
      ctx.beginPath();
      ctx.ellipse(0, 0, 200, 380, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(219, 234, 254, 0.95)';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#93c5fd';
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.restore();

      // iOS Lock Screen Typographic Header
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.font = '600 84px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('9:41', 360, 260);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
      ctx.fillText('Wednesday, September 16', 360, 160);

      // Home Indicator Bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.roundRect(260, 1480, 200, 8, 4);
      ctx.fill();

      const tex = new THREE.CanvasTexture(wpCanvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    const leftScreenMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: createScreenTexture(false),
      roughness: 0.08,
      metalness: 0.08,
      clearcoat: 0.95,
      clearcoatRoughness: 0.04
    });

    const rightScreenMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: createScreenTexture(true),
      roughness: 0.08,
      metalness: 0.08,
      clearcoat: 0.95,
      clearcoatRoughness: 0.04
    });

    const W = 0.74;      // Width of each half
    const H = 1.56;      // Height
    const D = 0.064;     // Thickness (ultra-slim profile)
    const R = 0.11;      // Outer corner radius

    function createChassisShape(isLeft) {
      const shape = new THREE.Shape();
      if (isLeft) {
        shape.moveTo(W, -H / 2);
        shape.lineTo(R, -H / 2);
        shape.quadraticCurveTo(0, -H / 2, 0, -H / 2 + R);
        shape.lineTo(0, H / 2 - R);
        shape.quadraticCurveTo(0, H / 2, R, H / 2);
        shape.lineTo(W, H / 2);
        shape.lineTo(W, -H / 2);
      } else {
        shape.moveTo(0, -H / 2);
        shape.lineTo(W - R, -H / 2);
        shape.quadraticCurveTo(W, -H / 2, W, -H / 2 + R);
        shape.lineTo(W, H / 2 - R);
        shape.quadraticCurveTo(W, H / 2, W - R, H / 2);
        shape.lineTo(0, H / 2);
        shape.lineTo(0, -H / 2);
      }
      return shape;
    }

    const extrudeSettings = {
      steps: 1,
      depth: D,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 4
    };

    // LEFT WING (Back Camera Plateau & Apple Logo)
    const leftWing = new THREE.Group();
    leftWing.position.x = 0;

    const leftShape = createChassisShape(true);
    const leftGeo = new THREE.ExtrudeGeometry(leftShape, extrudeSettings);
    leftGeo.translate(-W, 0, -D / 2);
    const leftBody = new THREE.Mesh(leftGeo, titaniumMat);
    leftWing.add(leftBody);

    // Left Back Glass Inset
    const leftBackGlassGeo = new THREE.PlaneGeometry(W * 0.94, H * 0.94);
    const leftBackGlass = new THREE.Mesh(leftBackGlassGeo, glassBackMat);
    leftBackGlass.position.set(-W / 2, 0, -D / 2 - 0.0085);
    leftBackGlass.rotation.y = Math.PI;
    leftWing.add(leftBackGlass);

    // Precise Apple Logo (Drawn via SVG Path)
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 512;
    logoCanvas.height = 512;
    const lCtx = logoCanvas.getContext('2d');
    lCtx.clearRect(0, 0, 512, 512);
    lCtx.save();
    lCtx.translate(100, 70);
    lCtx.scale(1.8, 1.8);
    const appleSvgPath = new Path2D("M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.99-6.3-9.77-11.28-20.91-14.94-33.41-3.66-12.5-5.5-24.32-5.5-35.47 0-14.15 3.49-26.05 10.46-35.7 6.98-9.66 15.82-14.56 26.54-14.7 4.58 0 9.87 1.25 15.87 3.76 6 2.5 10.12 3.81 12.35 3.92 1.9-.11 6.13-1.47 12.69-4.08 6.56-2.61 12.08-3.78 16.56-3.52 12.63.65 22.84 5.38 30.64 14.18-11.09 6.74-16.51 16.14-16.27 28.2.22 9.57 3.97 17.51 11.25 23.82 7.28 6.31 15.87 10.06 25.77 11.25-2.07 6.42-4.59 13.06-7.57 19.92zM119.22 31.84c0-7.39 2.66-14.46 7.99-21.21 5.33-6.75 12.01-10.63 20.04-11.63.22 1.19.33 2.28.33 3.26 0 7.39-2.77 14.57-8.31 21.54-5.54 6.96-12.34 10.76-20.39 11.41-.11-1.19-.22-2.17-.22-3.37z");
    lCtx.fillStyle = '#b8c0cc';
    lCtx.fill(appleSvgPath);
    lCtx.restore();

    const logoTex = new THREE.CanvasTexture(logoCanvas);
    logoTex.colorSpace = THREE.SRGBColorSpace;
    const logoMat = new THREE.MeshPhysicalMaterial({
      map: logoTex,
      transparent: true,
      metalness: 0.96,
      roughness: 0.1,
      clearcoat: 1.0,
      opacity: 0.95
    });
    const logoMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.24), logoMat);
    logoMesh.position.set(-W / 2, -0.04, -D / 2 - 0.0092);
    logoMesh.rotation.y = Math.PI;
    leftWing.add(logoMesh);

    // Apple Pro Camera Plateau
    const camPlateauGroup = new THREE.Group();
    camPlateauGroup.position.set(-W * 0.62, H * 0.28, -D / 2 - 0.008);
    camPlateauGroup.rotation.y = Math.PI;

    const camShape = new THREE.Shape();
    const cW = 0.38, cH = 0.40, cR = 0.08;
    camShape.moveTo(-cW/2 + cR, -cH/2);
    camShape.lineTo(cW/2 - cR, -cH/2);
    camShape.quadraticCurveTo(cW/2, -cH/2, cW/2, -cH/2 + cR);
    camShape.lineTo(cW/2, cH/2 - cR);
    camShape.quadraticCurveTo(cW/2, cH/2, cW/2 - cR, cH/2);
    camShape.lineTo(-cW/2 + cR, cH/2);
    camShape.quadraticCurveTo(-cW/2, cH/2, -cW/2, cH/2 - cR);
    camShape.lineTo(-cW/2, -cH/2 + cR);
    camShape.quadraticCurveTo(-cW/2, -cH/2, -cW/2 + cR, -cH/2);

    const camBaseGeo = new THREE.ExtrudeGeometry(camShape, {
      steps: 1,
      depth: 0.024,
      bevelEnabled: true,
      bevelThickness: 0.007,
      bevelSize: 0.007,
      bevelSegments: 4
    });
    const camBaseMesh = new THREE.Mesh(camBaseGeo, glassBackMat);
    camPlateauGroup.add(camBaseMesh);

    // 3 Sapphire Camera Lenses in Triangle
    const lensPositions = [
      { x: -0.095, y: 0.095 },
      { x: -0.095, y: -0.095 },
      { x: 0.095, y: 0.0 }
    ];

    lensPositions.forEach((pos) => {
      const ringGeo = new THREE.CylinderGeometry(0.072, 0.072, 0.030, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, titaniumBezelMat);
      ringMesh.position.set(pos.x, pos.y, 0.024);
      camPlateauGroup.add(ringMesh);

      const lensGeo = new THREE.CylinderGeometry(0.058, 0.058, 0.032, 32);
      lensGeo.rotateX(Math.PI / 2);
      const lensMesh = new THREE.Mesh(lensGeo, lensGlassMat);
      lensMesh.position.set(pos.x, pos.y, 0.025);
      camPlateauGroup.add(lensMesh);

      // Core optical sensor with anti-reflective optical sheen
      const irisGeo = new THREE.CircleGeometry(0.032, 24);
      const irisMat = new THREE.MeshPhysicalMaterial({
        color: 0x0a1226,
        metalness: 0.9,
        roughness: 0.05,
        clearcoat: 1.0,
        sheen: 1.0,
        sheenColor: 0x6080ff
      });
      const irisMesh = new THREE.Mesh(irisGeo, irisMat);
      irisMesh.position.set(pos.x, pos.y, 0.0415);
      camPlateauGroup.add(irisMesh);
    });

    // True Tone Flash
    const flashGeo = new THREE.CircleGeometry(0.026, 24);
    const flashMat = new THREE.MeshStandardMaterial({
      color: 0xfff6ea,
      emissive: 0xffe2a4,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const flashMesh = new THREE.Mesh(flashGeo, flashMat);
    flashMesh.position.set(0.095, 0.115, 0.032);
    camPlateauGroup.add(flashMesh);

    // LiDAR Sensor Dot
    const lidarGeo = new THREE.CircleGeometry(0.018, 24);
    const lidarMat = new THREE.MeshBasicMaterial({ color: 0x020305 });
    const lidarMesh = new THREE.Mesh(lidarGeo, lidarMat);
    lidarMesh.position.set(0.095, -0.115, 0.032);
    camPlateauGroup.add(lidarMesh);

    leftWing.add(camPlateauGroup);

    // Left Front OLED Screen
    const leftScreenGeo = new THREE.PlaneGeometry(W * 0.93, H * 0.94);
    const leftScreen = new THREE.Mesh(leftScreenGeo, leftScreenMat);
    leftScreen.position.set(-W / 2, 0, D / 2 + 0.0085);
    leftWing.add(leftScreen);

    // Tactile Buttons on Left Rail
    const btnMat = titaniumBezelMat;
    const actionBtnGeo = new THREE.BoxGeometry(0.012, 0.07, 0.022);
    const actionBtn = new THREE.Mesh(actionBtnGeo, btnMat);
    actionBtn.position.set(-W - 0.008, H * 0.26, 0);
    leftWing.add(actionBtn);

    const volUp = new THREE.Mesh(actionBtnGeo, btnMat);
    volUp.position.set(-W - 0.008, H * 0.14, 0);
    leftWing.add(volUp);

    const volDown = new THREE.Mesh(actionBtnGeo, btnMat);
    volDown.position.set(-W - 0.008, H * 0.02, 0);
    leftWing.add(volDown);

    // RIGHT WING (Front Screen & Dynamic Island)
    const rightWing = new THREE.Group();
    rightWing.position.x = 0;

    const rightShape = createChassisShape(false);
    const rightGeo = new THREE.ExtrudeGeometry(rightShape, extrudeSettings);
    rightGeo.translate(0, 0, -D / 2);
    const rightBody = new THREE.Mesh(rightGeo, titaniumMat);
    rightWing.add(rightBody);

    // Right Back Glass Inset
    const rightBackGlass = new THREE.Mesh(leftBackGlassGeo, glassBackMat);
    rightBackGlass.position.set(W / 2, 0, -D / 2 - 0.0085);
    rightBackGlass.rotation.y = Math.PI;
    rightWing.add(rightBackGlass);

    // Right Front OLED Screen
    const rightScreen = new THREE.Mesh(leftScreenGeo, rightScreenMat);
    rightScreen.position.set(W / 2, 0, D / 2 + 0.0085);
    rightWing.add(rightScreen);

    // Dynamic Island Pill Cutout
    const pillShape = new THREE.Shape();
    const pW = 0.16, pH = 0.046, pR = 0.023;
    pillShape.moveTo(-pW/2 + pR, -pH/2);
    pillShape.lineTo(pW/2 - pR, -pH/2);
    pillShape.quadraticCurveTo(pW/2, -pH/2, pW/2, -pH/2 + pR);
    pillShape.lineTo(pW/2, pH/2 - pR);
    pillShape.quadraticCurveTo(pW/2, pH/2, pW/2 - pR, pH/2);
    pillShape.lineTo(-pW/2 + pR, pH/2);
    pillShape.quadraticCurveTo(-pW/2, pH/2, -pW/2, pH/2 - pR);
    pillShape.lineTo(-pW/2, -pH/2 + pR);
    pillShape.quadraticCurveTo(-pW/2, -pH/2, -pW/2 + pR, -pH/2);

    const pillGeo = new THREE.ShapeGeometry(pillShape);
    const pillMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pillMesh = new THREE.Mesh(pillGeo, pillMat);
    pillMesh.position.set(W / 2, H * 0.41, D / 2 + 0.009);
    rightWing.add(pillMesh);

    // Camera Sensor Dot inside Dynamic Island
    const sensorGeo = new THREE.CircleGeometry(0.009, 16);
    const sensorMat = new THREE.MeshBasicMaterial({ color: 0x142036 });
    const sensorMesh = new THREE.Mesh(sensorGeo, sensorMat);
    sensorMesh.position.set(W / 2 + 0.04, H * 0.41, D / 2 + 0.0092);
    rightWing.add(sensorMesh);

    // Power / Siri Button on Right Rail
    const powerBtnGeo = new THREE.BoxGeometry(0.012, 0.11, 0.022);
    const powerBtn = new THREE.Mesh(powerBtnGeo, btnMat);
    powerBtn.position.set(W + 0.008, H * 0.18, 0);
    rightWing.add(powerBtn);

    // USB-C Port Cutout on bottom rail
    const portGeo = new THREE.BoxGeometry(0.06, 0.016, 0.025);
    const portMat = new THREE.MeshBasicMaterial({ color: 0x080a0e });
    const portMesh = new THREE.Mesh(portGeo, portMat);
    portMesh.position.set(-W * 0.35, -H / 2 - 0.007, 0);
    leftWing.add(portMesh);

    // TITANIUM MICRO-HINGE SPINE (Center)
    const hingeGeo = new THREE.CylinderGeometry(D * 0.58, D * 0.58, H * 0.98, 32);
    const hingeMat = new THREE.MeshPhysicalMaterial({
      color: 0x424650,
      metalness: 0.94,
      roughness: 0.18,
      clearcoat: 0.6
    });
    const hinge = new THREE.Mesh(hingeGeo, hingeMat);
    hinge.position.set(0, 0, -D * 0.08);
    root.add(hinge);

    // Micro-grooved rings on hinge
    for (let i = -6; i <= 6; i++) {
      const ringGeo = new THREE.TorusGeometry(D * 0.59, 0.0025, 8, 32);
      const ring = new THREE.Mesh(ringGeo, titaniumBezelMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, (i / 7) * (H * 0.46), -D * 0.08);
      root.add(ring);
    }

    root.add(leftWing);
    root.add(rightWing);

    // Normalized scale for responsive display
    const targetDim = window.innerWidth <= 860 ? 1.6 : 2.0;
    root.scale.setScalar(targetDim / 1.7);

    // Initial presentation angle
    root.rotation.x = 0.16;
    root.rotation.y = -0.42;

    // Fold Controller State
    let currentFoldAngle = 125;
    let targetFoldAngle = 125;

    root.userData = {
      leftWing,
      rightWing,
      setFoldAngle: (deg) => {
        targetFoldAngle = deg;
      },
      updateFold: () => {
        currentFoldAngle += (targetFoldAngle - currentFoldAngle) * 0.08;
        const rad = THREE.MathUtils.degToRad((180 - currentFoldAngle) / 2);
        leftWing.rotation.y = rad;
        rightWing.rotation.y = -rad;
      }
    };

    return root;
  }

  // 7. Initialize Model
  const model = buildIPhone18Duo();
  scene.add(model);

  // Fade out loader
  if (loaderEl) {
    loaderEl.style.opacity = '0';
    setTimeout(() => (loaderEl.style.display = 'none'), 300);
  }
  canvas.style.opacity = '1';

  // 8. Fold Mode Selector Pills
  const foldPills = document.querySelectorAll('.fold-pill');
  foldPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      foldPills.forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      const deg = parseFloat(pill.dataset.fold || '125');
      model.userData.setFoldAngle(deg);
      lastInteractionTime = performance.now();
    });
  });

  // 9. User Interaction Tracking
  let isUserInteracting = false;
  let lastInteractionTime = performance.now();
  let mouseX = 0;
  let mouseY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let isVisible = false;
  let rafId = null;
  const clock = new THREE.Clock();

  controls.addEventListener('start', () => {
    isUserInteracting = true;
    if (hintEl) hintEl.style.opacity = '0.3';
  });

  controls.addEventListener('end', () => {
    isUserInteracting = false;
    lastInteractionTime = performance.now();
    if (hintEl) hintEl.style.opacity = '0.85';
  });

  window.addEventListener('mousemove', (e) => {
    if (isUserInteracting || window.innerWidth <= 860) return;
    const rect = container.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetTiltY = mouseX * 0.16;
      targetTiltX = -mouseY * 0.10;
    }
  }, { passive: true });

  // 10. The "After Loop" (Breathing Levitation Loop + Automatic Drift)
  function animate() {
    if (!isVisible) return;
    rafId = requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    controls.update();

    if (model) {
      // Smooth fold angle transition
      model.userData.updateFold();

      const now = performance.now();
      const idleTime = now - lastInteractionTime;

      // Natural zero-gravity breathing float
      const floatY = Math.sin(elapsedTime * 1.3) * 0.04;
      const floatTiltZ = Math.cos(elapsedTime * 0.9) * 0.012;
      const floatTiltX = Math.sin(elapsedTime * 1.1) * 0.015;

      model.position.y = floatY;
      model.rotation.z = floatTiltZ;

      if (!isUserInteracting) {
        if (idleTime > 1000) {
          // Automatic gentle yaw drift when left idle
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.92;

          model.rotation.x += (floatTiltX + targetTiltX - model.rotation.x) * 0.05;
        } else {
          controls.autoRotate = false;
        }
      } else {
        controls.autoRotate = false;
      }
    }

    renderer.render(scene, camera);
  }

  // 11. Intersection Observer (0% GPU when out of view)
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

  // 12. Responsive Resizing
  function onResize() {
    const w = getWidth();
    const h = getHeight();
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);

    if (model) {
      const targetDim = window.innerWidth <= 860 ? 1.6 : 2.0;
      model.scale.setScalar(targetDim / 1.7);
    }
  }

  window.addEventListener('resize', onResize, { passive: true });
})();
