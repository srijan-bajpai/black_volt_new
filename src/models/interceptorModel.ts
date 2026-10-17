import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const materials = {
  housing: new THREE.MeshStandardMaterial({ color: 0x303735, metalness: 0.46, roughness: 0.48 }),
  housingTop: new THREE.MeshStandardMaterial({ color: 0x484f4b, metalness: 0.56, roughness: 0.38 }),
  panel: new THREE.MeshStandardMaterial({ color: 0x1a211f, metalness: 0.38, roughness: 0.5 }),
  carbon: new THREE.MeshStandardMaterial({ color: 0x222927, metalness: 0.32, roughness: 0.56 }),
  alloy: new THREE.MeshStandardMaterial({ color: 0x858d84, metalness: 0.7, roughness: 0.32 }),
  darkMetal: new THREE.MeshStandardMaterial({ color: 0x131918, metalness: 0.56, roughness: 0.4 }),
  propeller: new THREE.MeshStandardMaterial({ color: 0x747a73, metalness: 0.22, roughness: 0.52, side: THREE.DoubleSide }),
  accent: new THREE.MeshStandardMaterial({ color: 0xc45d3f, metalness: 0.35, roughness: 0.36, emissive: 0x341409, emissiveIntensity: 0.28 }),
};

function addBeam(parent: THREE.Object3D, from: THREE.Vector3, to: THREE.Vector3, radius: number, material: THREE.Material): THREE.Mesh {
  const direction = new THREE.Vector3().subVectors(to, from);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.82, radius, direction.length(), 14), material);
  beam.position.copy(from).add(to).multiplyScalar(0.5);
  beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  beam.castShadow = true;
  beam.receiveShadow = true;
  parent.add(beam);
  return beam;
}

function makeBrandTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 640;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D is unavailable for the interceptor brand mark.');

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = '#f4f1e8';
  context.font = '900 345px Arial, sans-serif';
  context.fillText('B', 256, 246);

  // A dark lightning cut makes the large B read like the mark shown in the reference.
  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.moveTo(282, 94);
  context.lineTo(220, 246);
  context.lineTo(268, 246);
  context.lineTo(231, 375);
  context.lineTo(317, 208);
  context.lineTo(270, 208);
  context.closePath();
  context.fill();
  context.globalCompositeOperation = 'source-over';

  context.fillStyle = '#f4f1e8';
  context.font = '700 52px Arial, sans-serif';
  context.fillText('BLACKVOLT', 256, 493);
  context.font = '600 30px Arial, sans-serif';
  context.fillText('TECHNOLOGIES', 256, 548);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function addBrandPlate(parent: THREE.Object3D): void {
  const plate = new THREE.Mesh(new RoundedBoxGeometry(0.61, 0.77, 0.045, 4, 0.035), materials.panel);
  plate.position.set(0, 0.16, 0.411);
  plate.castShadow = true;
  parent.add(plate);

  const brand = new THREE.Mesh(
    new THREE.PlaneGeometry(0.55, 0.69),
    new THREE.MeshBasicMaterial({ map: makeBrandTexture(), transparent: true, toneMapped: false, side: THREE.DoubleSide }),
  );
  brand.position.set(0, 0.15, 0.439);
  parent.add(brand);
}

function makeTwoBladeRotor(parent: THREE.Object3D, azimuth: number): void {
  const outline = new THREE.Shape();
  outline.moveTo(-0.94, -0.072);
  outline.lineTo(-0.82, -0.126);
  outline.lineTo(-0.16, -0.044);
  outline.lineTo(0.16, -0.044);
  outline.lineTo(0.82, -0.126);
  outline.lineTo(0.94, -0.072);
  outline.lineTo(0.90, 0.028);
  outline.lineTo(0.78, 0.105);
  outline.lineTo(0.16, 0.052);
  outline.lineTo(-0.16, 0.052);
  outline.lineTo(-0.78, 0.105);
  outline.lineTo(-0.90, 0.028);
  outline.closePath();

  const bladeGeometry = new THREE.ExtrudeGeometry(outline, {
    depth: 0.038,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.007,
    bevelThickness: 0.004,
    curveSegments: 3,
  });
  bladeGeometry.translate(0, 0, -0.019);
  bladeGeometry.rotateX(-Math.PI / 2);
  bladeGeometry.rotateY(azimuth);
  const blade = new THREE.Mesh(bladeGeometry, materials.propeller);
  blade.position.y = 0.305;
  blade.castShadow = true;
  parent.add(blade);

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.083, 0.09, 0.12, 20), materials.darkMetal);
  hub.position.y = 0.316;
  hub.castShadow = true;
  parent.add(hub);
  const hubCap = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.13, 18), materials.alloy);
  hubCap.position.y = 0.327;
  parent.add(hubCap);
}

function makeNacelle(parent: THREE.Object3D, x: number, z: number, azimuth: number): void {
  const nacelle = new THREE.Group();
  nacelle.position.set(x, 0, z);
  parent.add(nacelle);

  const foot = new THREE.Mesh(new RoundedBoxGeometry(0.37, 0.13, 0.34, 3, 0.045), materials.darkMetal);
  foot.position.y = 0.065;
  foot.castShadow = true;
  nacelle.add(foot);

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.12, 24), materials.housingTop);
  collar.position.y = 0.145;
  nacelle.add(collar);

  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.16, 1.17, 24, 1), materials.housing);
  column.position.y = 0.77;
  column.castShadow = true;
  column.receiveShadow = true;
  nacelle.add(column);

  const roundedCrown = new THREE.Mesh(new THREE.SphereGeometry(0.126, 24, 16), materials.housingTop);
  roundedCrown.position.y = 1.36;
  roundedCrown.scale.y = 0.55;
  roundedCrown.castShadow = true;
  nacelle.add(roundedCrown);

  for (const bandY of [0.23, 0.43, 1.05]) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.132, 0.013, 8, 24), bandY === 0.43 ? materials.accent : materials.alloy);
    band.position.y = bandY;
    band.rotation.x = Math.PI / 2;
    nacelle.add(band);
  }

  // These static blades are illustrative; they are not powered or flight-tested hardware.
  makeTwoBladeRotor(nacelle, azimuth);
}

function addHousingDetails(parent: THREE.Object3D): void {
  for (const zSide of [-1, 1] as const) {
    const grille = new THREE.Group();
    grille.position.set(0, 0.78, zSide * 0.398);
    for (let index = 0; index < 7; index += 1) {
      const fin = new THREE.Mesh(new RoundedBoxGeometry(0.51, 0.022, 0.024, 2, 0.009), materials.darkMetal);
      fin.position.y = index * 0.027;
      grille.add(fin);
    }
    if (zSide === -1) grille.rotation.y = Math.PI;
    parent.add(grille);

    for (const x of [-0.35, 0.35]) {
      const channel = new THREE.Mesh(new RoundedBoxGeometry(0.035, 0.56, 0.025, 2, 0.01), materials.darkMetal);
      channel.position.set(x, -0.31, zSide * 0.397);
      parent.add(channel);
    }
  }

  for (const side of [-1, 1] as const) {
    const sideRail = new THREE.Mesh(new RoundedBoxGeometry(0.04, 0.82, 0.055, 3, 0.015), materials.housingTop);
    sideRail.position.set(side * 0.42, 0.12, -0.04);
    parent.add(sideRail);

    const lowerPanel = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.44, 0.19, 3, 0.025), materials.panel);
    lowerPanel.position.set(side * 0.45, -0.46, -0.02);
    lowerPanel.castShadow = true;
    parent.add(lowerPanel);
  }
}

export function createInterceptorModel(): THREE.Group {
  const root = new THREE.Group();

  // Tall, compact central enclosure as shown in the user's quadcopter reference.
  const centralBody = new THREE.Mesh(new RoundedBoxGeometry(0.86, 1.63, 0.78, 5, 0.065), materials.housing);
  centralBody.position.set(0, 0.11, 0);
  centralBody.castShadow = true;
  centralBody.receiveShadow = true;
  root.add(centralBody);

  const topCap = new THREE.Mesh(new RoundedBoxGeometry(0.91, 0.16, 0.83, 4, 0.045), materials.housingTop);
  topCap.position.set(0, 0.98, 0);
  topCap.castShadow = true;
  root.add(topCap);

  const baseCap = new THREE.Mesh(new RoundedBoxGeometry(0.68, 0.15, 0.65, 4, 0.04), materials.darkMetal);
  baseCap.position.set(0, -0.77, 0);
  baseCap.castShadow = true;
  root.add(baseCap);

  addHousingDetails(root);
  addBrandPlate(root);

  const rotorPositions: [number, number][] = [
    [-1.48, -1.02],
    [-1.48, 1.02],
    [1.48, -1.02],
    [1.48, 1.02],
  ];

  for (const [x, z] of rotorPositions) {
    const sx = Math.sign(x);
    const sz = Math.sign(z);
    const motorBase = new THREE.Vector3(x, 0.23, z);
    const rotorAzimuth = Math.atan2(z, x) + Math.PI / 2;

    // Radial arms and lower triangulated braces form an open four-motor quadcopter frame.
    addBeam(root, new THREE.Vector3(sx * 0.39, 0.43, sz * 0.29), new THREE.Vector3(x * 0.91, 0.31, z * 0.91), 0.075, materials.carbon);
    addBeam(root, new THREE.Vector3(sx * 0.34, 0.02, sz * 0.25), new THREE.Vector3(x * 0.9, 0.04, z * 0.9), 0.047, materials.alloy);
    addBeam(root, new THREE.Vector3(sx * 0.34, -0.46, sz * 0.25), new THREE.Vector3(x * 0.94, -0.05, z * 0.94), 0.034, materials.housingTop);
    addBeam(root, new THREE.Vector3(x * 0.88, 0.16, z * 0.83), motorBase, 0.055, materials.housingTop);

    makeNacelle(root, x, z, rotorAzimuth);
  }

  // Perimeter rails echo the square cross-bracing visible in the reference.
  for (const z of [-1.02, 1.02]) {
    addBeam(root, new THREE.Vector3(-1.48, 0.08, z), new THREE.Vector3(1.48, 0.08, z), 0.035, materials.housingTop);
  }
  for (const x of [-1.48, 1.48]) {
    addBeam(root, new THREE.Vector3(x, 0.08, -1.02), new THREE.Vector3(x, 0.08, 1.02), 0.035, materials.housingTop);
  }

  // Two narrow landing rails sit below the central enclosure; they are not wings.
  for (const x of [-0.31, 0.31]) {
    addBeam(root, new THREE.Vector3(x, -0.89, -0.62), new THREE.Vector3(x, -0.89, 0.62), 0.055, materials.darkMetal);
    addBeam(root, new THREE.Vector3(x, -0.78, -0.45), new THREE.Vector3(x, -0.89, -0.62), 0.035, materials.alloy);
    addBeam(root, new THREE.Vector3(x, -0.78, 0.45), new THREE.Vector3(x, -0.89, 0.62), 0.035, materials.alloy);
  }

  return root;
}
