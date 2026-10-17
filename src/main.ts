import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './styles.css';
import { createDroneModel, type DroneModelKey } from './models/droneModels';

const modelDetails: Record<DroneModelKey, { status: string; title: string; description: string; fallback: string; fallbackAlt: string; scale: number }> = {
  airframe: {
    status: 'Current prototype · illustrative 3D',
    title: 'Printed interceptor airframe',
    description: 'Tail-sitter layout with four wing-tip nacelles and a nose sensor aperture. Printed for structure and fit validation; not powered or flown.',
    fallback: '/assets/hardware/interceptor-airframe-top.jpg',
    fallbackAlt: 'Photograph of the printed interceptor airframe prototype on a laboratory table.',
    scale: 0.78,
  },
  sprint: {
    status: 'Concept role · illustrative 3D',
    title: 'Sprint',
    description: 'High-speed, short-endurance role described in the PDF. The model is an original visual interpretation, not a configured or tested aircraft.',
    fallback: '/assets/hardware/interceptor-airframe-top.jpg',
    fallbackAlt: 'The concept model is not a photograph; the source photograph below shows the printed airframe prototype.',
    scale: 0.88,
  },
  picket: {
    status: 'Concept role · illustrative 3D',
    title: 'Picket',
    description: 'Lower-speed, longer-endurance sector-hold role described in the PDF. Geometry is illustrative and not to scale.',
    fallback: '/assets/hardware/interceptor-airframe-angle.jpg',
    fallbackAlt: 'The concept model is not a photograph; the source photograph below shows the printed airframe prototype.',
    scale: 0.78,
  },
  testbed: {
    status: 'Current testbed · illustrative 3D',
    title: 'Multirotor EO detection testbed',
    description: 'The documented testbed carries an EO camera and onboard compute. The companion board runs detection; a manual RC link is retained.',
    fallback: '/assets/hardware/testbed-sensor-mast.jpg',
    fallbackAlt: 'Photograph of a multirotor EO-camera detection testbed with a sensor mast.',
    scale: 0.71,
  },
};

function initialiseModelViewer() {
  const canvas = document.querySelector<HTMLCanvasElement>('#drone-canvas');
  const stage = document.querySelector<HTMLElement>('#model-stage');
  const fallback = document.querySelector<HTMLImageElement>('#model-fallback');
  const title = document.querySelector<HTMLElement>('#model-title');
  const status = document.querySelector<HTMLElement>('#model-status');
  const description = document.querySelector<HTMLElement>('#model-description');
  const live = document.querySelector<HTMLElement>('#viewer-live');
  const modeLabel = document.querySelector<HTMLElement>('#viewer-mode-label');
  if (!canvas || !stage || !fallback || !title || !status || !description || !live || !modeLabel) return;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch (error) {
    stage.classList.add('viewer-failed');
    live.textContent = 'Interactive 3D is unavailable here; the source photograph remains visible.';
    modeLabel.textContent = 'Source photograph · current prototype';
    console.info('Three.js viewer unavailable; preserving the photographic fallback.', error);
    return;
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x101619, 11, 24);
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
  camera.position.set(5.1, 3.05, 6.8);
  camera.lookAt(0, 0, 0);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  scene.add(new THREE.HemisphereLight(0xd9e2dc, 0x202629, 2.05));
  const keyLight = new THREE.DirectionalLight(0xffeee3, 3.3);
  keyLight.position.set(-4.5, 7, 5.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(0xf2683f, 16, 15, 2);
  rimLight.position.set(4, 2.5, -3.5);
  scene.add(rimLight);
  const fillLight = new THREE.PointLight(0x8faeb0, 9, 13, 2);
  fillLight.position.set(-4, 1.6, -2.5);
  scene.add(fillLight);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 80),
    new THREE.MeshStandardMaterial({ color: 0x101517, metalness: 0.2, roughness: 0.92, transparent: true, opacity: 0.48 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.15;
  floor.receiveShadow = true;
  scene.add(floor);

  const grid = new THREE.GridHelper(18, 24, 0x58666a, 0x384348);
  grid.position.y = -1.13;
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  scene.add(grid);

  const guideRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.05, 0.009, 6, 128),
    new THREE.MeshBasicMaterial({ color: 0xe97852, transparent: true, opacity: 0.46 }),
  );
  guideRing.rotation.x = Math.PI / 2;
  guideRing.position.y = -1.105;
  scene.add(guideRing);

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = motionPreference.matches;
  let needsRender = true;

  const modelRoot = new THREE.Group();
  scene.add(modelRoot);
  const modelCache = new Map<DroneModelKey, THREE.Group>();
  const initialKey: DroneModelKey = 'airframe';
  let activeGroup = createDroneModel(initialKey);
  activeGroup.scale.setScalar(reducedMotion ? modelDetails[initialKey].scale : 0.001);
  modelRoot.add(activeGroup);
  modelCache.set(initialKey, activeGroup);
  let targetScale = modelDetails[initialKey].scale;
  let dragging = false;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = !reducedMotion;
  controls.dampingFactor = 0.055;
  controls.enablePan = false;
  controls.minDistance = 4.5;
  controls.maxDistance = 10;
  controls.minPolarAngle = 0.45;
  controls.maxPolarAngle = Math.PI * 0.79;
  controls.target.set(0, 0, 0);
  controls.addEventListener('change', () => { needsRender = true; });
  controls.addEventListener('start', () => { dragging = true; });
  controls.addEventListener('end', () => { dragging = false; });
  controls.update();

  const updateSize = () => {
    const bounds = stage.getBoundingClientRect();
    const width = Math.max(1, Math.round(bounds.width));
    const height = Math.max(1, Math.round(bounds.height));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.5 : 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    needsRender = true;
  };
  const resizeObserver = new ResizeObserver(updateSize);
  resizeObserver.observe(stage);
  updateSize();

  const setModel = (key: DroneModelKey) => {
    if (activeGroup === modelCache.get(key)) return;
    let next = modelCache.get(key);
    if (!next) {
      next = createDroneModel(key);
      modelCache.set(key, next);
      modelRoot.add(next);
    }
    activeGroup.visible = false;
    next.visible = true;
    next.rotation.set(0, 0, 0);
    next.scale.setScalar(reducedMotion ? modelDetails[key].scale : 0.001);
    activeGroup = next;
    targetScale = modelDetails[key].scale;
    needsRender = true;
    title.textContent = modelDetails[key].title;
    status.textContent = modelDetails[key].status;
    description.textContent = modelDetails[key].description;
    fallback.src = modelDetails[key].fallback;
    fallback.alt = modelDetails[key].fallbackAlt;
    stage.dataset.activeModel = key;
    live.textContent = `${modelDetails[key].title} selected. Drag to orbit; use the model buttons to switch.`;
    document.querySelectorAll<HTMLButtonElement>('[data-model]').forEach((button) => {
      const selected = button.dataset.model === key;
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
  };

  document.querySelectorAll<HTMLButtonElement>('[data-model]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.model as DroneModelKey | undefined;
      if (key && key in modelDetails) setModel(key);
    });
  });

  let previousTime = 0;
  motionPreference.addEventListener('change', (event) => {
    reducedMotion = event.matches;
    controls.enableDamping = !reducedMotion;
    if (reducedMotion) activeGroup.position.y = 0;
    previousTime = 0;
    needsRender = true;
  });
  renderer.setAnimationLoop((time) => {
    const delta = previousTime === 0 ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    if (!reducedMotion) {
      if (!dragging) activeGroup.rotation.y += delta * 0.055;
      const currentScale = activeGroup.scale.x;
      const easedScale = THREE.MathUtils.damp(currentScale, targetScale, 4.5, delta);
      activeGroup.scale.setScalar(easedScale);
      activeGroup.position.y = Math.sin(time * 0.00038) * 0.035;
      controls.update();
      renderer.render(scene, camera);
      return;
    }
    activeGroup.position.y = 0;
    if (needsRender) {
      controls.update();
      renderer.render(scene, camera);
      needsRender = false;
    }
  });

  stage.classList.add('viewer-ready');
  status.textContent = modelDetails[initialKey].status;
  modeLabel.textContent = 'Illustrative model · not to scale';
  live.textContent = 'Drag the model to orbit; choose a model to switch.';
}

function initialiseNavigation() {
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = document.querySelector<HTMLElement>('#mobile-nav');
  if (!toggle || !nav) return;
  const closeMenu = (restoreFocus = false) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    nav.hidden = true;
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.hidden = !open;
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu(true)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !nav.hidden) closeMenu(true);
  });
}

function initialiseReveals() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) return;
  const revealTargets = document.querySelectorAll<HTMLElement>('.section-heading, .architecture-row, .interceptor-card, .status-card, .hardware-card, .programme-card, .company-copy, .contact-copy');
  revealTargets.forEach((target) => target.classList.add('reveal'));
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  revealTargets.forEach((target) => observer.observe(target));
}

initialiseNavigation();
initialiseReveals();
initialiseModelViewer();
