import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './styles.css';
import { createAuvModel } from './models/auvModel';
import { createInterceptorModel } from './models/interceptorModel';

type ModelFactory = () => THREE.Group;
type ViewerName = 'auv' | 'interceptor';

interface ViewerConfig {
  name: ViewerName;
  stageId: string;
  canvasId: string;
  statusId: string;
  makeModel: ModelFactory;
  cameraDirection: THREE.Vector3;
  rotationSpeed: number;
  lightColor: number;
  fillColor: number;
}

function mountViewer(config: ViewerConfig): void {
  const stage = document.getElementById(config.stageId);
  const canvas = document.getElementById(config.canvasId) as HTMLCanvasElement | null;
  const liveStatus = document.getElementById(config.statusId);
  if (!stage || !canvas || !liveStatus) return;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch (error) {
    stage.classList.add('viewer-failed');
    liveStatus.textContent = 'Interactive 3D is unavailable; the source illustration remains visible.';
    console.info(`${config.name} viewer unavailable; showing its static illustration.`, error);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.35 : 1.65));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = false;

  scene.add(new THREE.HemisphereLight(config.lightColor, 0x152326, 2.15));
  const keyLight = new THREE.DirectionalLight(0xf1efe3, 3.25);
  keyLight.position.set(-4.4, 7.2, 5.4);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(config.fillColor, 21, 18, 2);
  rimLight.position.set(4.2, 3.2, -3.4);
  scene.add(rimLight);
  const fillLight = new THREE.PointLight(0x81aaa6, 9, 16, 2);
  fillLight.position.set(-4, 1.4, 1.2);
  scene.add(fillLight);

  const model = config.makeModel();
  const bounds = new THREE.Box3().setFromObject(model);
  const center = bounds.getCenter(new THREE.Vector3());
  const sphere = bounds.getBoundingSphere(new THREE.Sphere());
  model.position.sub(center);
  scene.add(model);

  const floorY = bounds.min.y - center.y - Math.max(0.16, sphere.radius * 0.065);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ color: 0x132b2e, roughness: 0.92, metalness: 0.08, transparent: true, opacity: 0.43 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = floorY;
  scene.add(floor);

  const grid = new THREE.GridHelper(Math.max(10, sphere.radius * 5.5), 28, 0x9bb1a5, 0x667e78);
  grid.position.y = floorY + 0.01;
  const gridMaterial = grid.material as THREE.Material;
  gridMaterial.transparent = true;
  gridMaterial.opacity = 0.22;
  scene.add(grid);

  const cameraDistance = sphere.radius * 3.05;
  const direction = config.cameraDirection.clone().normalize();
  const homePosition = direction.multiplyScalar(cameraDistance);
  camera.position.copy(homePosition);
  camera.lookAt(0, 0, 0);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.minDistance = sphere.radius * 1.6;
  controls.maxDistance = sphere.radius * 4.8;
  controls.minPolarAngle = 0.25;
  controls.maxPolarAngle = Math.PI * 0.82;
  controls.target.set(0, 0, 0);
  controls.update();

  let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let inView = false;
  let dragging = false;
  let needsRender = true;
  let lastTime = 0;

  controls.addEventListener('change', () => { needsRender = true; });
  controls.addEventListener('start', () => { dragging = true; });
  controls.addEventListener('end', () => { dragging = false; });

  const resizeObserver = new ResizeObserver(() => {
    const rect = stage.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.35 : 1.65));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    needsRender = true;
  });
  resizeObserver.observe(stage);

  const visibilityObserver = new IntersectionObserver((entries) => {
    inView = entries.some((entry) => entry.isIntersecting);
    needsRender = true;
  }, { threshold: 0.05 });
  visibilityObserver.observe(stage);

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionPreference.addEventListener('change', (event) => {
    reducedMotion = event.matches;
    controls.enableDamping = !reducedMotion;
    lastTime = 0;
    needsRender = true;
    if (reducedMotion) model.rotation.y = 0;
  });

  const resetButton = document.querySelector<HTMLButtonElement>(`[data-view-reset="${config.name}"]`);
  resetButton?.addEventListener('click', () => {
    camera.position.copy(homePosition);
    controls.target.set(0, 0, 0);
    controls.update();
    model.rotation.set(0, 0, 0);
    liveStatus.textContent = 'View reset. Drag the model to rotate.';
    needsRender = true;
  });

  renderer.setAnimationLoop((time) => {
    if (!inView) return;
    const delta = lastTime === 0 ? 0 : Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    if (!reducedMotion) {
      if (!dragging) model.rotation.y += delta * config.rotationSpeed;
      controls.update();
      renderer.render(scene, camera);
      return;
    }
    if (needsRender) {
      controls.update();
      renderer.render(scene, camera);
      needsRender = false;
    }
  });

  stage.classList.add('viewer-ready');
  liveStatus.textContent = 'Illustrative model ready. Drag to rotate; use Reset view to return.';
}

function initialiseNavigation(): void {
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

function initialiseReveals(): void {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll<HTMLElement>('.auv-operating, .dual-role, .progress-block, .interceptor-roles, .air-evidence, .architecture-row, .vajra-proof, .company-copy');
  targets.forEach((target) => target.classList.add('reveal'));
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  targets.forEach((target) => observer.observe(target));
}

initialiseNavigation();
initialiseReveals();
mountViewer({
  name: 'auv',
  stageId: 'auv-stage',
  canvasId: 'auv-canvas',
  statusId: 'auv-view-status',
  makeModel: createAuvModel,
  cameraDirection: new THREE.Vector3(3.6, 2.8, 5.3),
  rotationSpeed: 0.055,
  lightColor: 0xc9ded5,
  fillColor: 0x4f9b97,
});
mountViewer({
  name: 'interceptor',
  stageId: 'interceptor-stage',
  canvasId: 'interceptor-canvas',
  statusId: 'interceptor-view-status',
  makeModel: createInterceptorModel,
  cameraDirection: new THREE.Vector3(4.2, 3.1, 5.1),
  rotationSpeed: 0.07,
  lightColor: 0xe2d6c4,
  fillColor: 0xd17a55,
});
