import * as THREE from 'three';

const materials = {
  shell: new THREE.MeshStandardMaterial({ color: 0x323a3f, metalness: 0.62, roughness: 0.34 }),
  shellLight: new THREE.MeshStandardMaterial({ color: 0x596267, metalness: 0.58, roughness: 0.38 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x111619, metalness: 0.38, roughness: 0.43 }),
  carbon: new THREE.MeshStandardMaterial({ color: 0x171c1f, metalness: 0.4, roughness: 0.56 }),
  metal: new THREE.MeshStandardMaterial({ color: 0x87908f, metalness: 0.78, roughness: 0.28 }),
  lens: new THREE.MeshPhysicalMaterial({ color: 0x81aab0, metalness: 0.55, roughness: 0.16, transparent: true, opacity: 0.82, clearcoat: 1 }),
  orange: new THREE.MeshStandardMaterial({ color: 0xf2683f, metalness: 0.35, roughness: 0.35, emissive: 0x5c1e10, emissiveIntensity: 0.45 }),
  prop: new THREE.MeshStandardMaterial({ color: 0x22282b, metalness: 0.23, roughness: 0.63 }),
  board: new THREE.MeshStandardMaterial({ color: 0x526250, metalness: 0.18, roughness: 0.62 }),
};

const vector = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function addMesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material, position: THREE.Vector3, rotation?: THREE.Euler, scale?: THREE.Vector3) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  if (rotation) mesh.rotation.copy(rotation);
  if (scale) mesh.scale.copy(scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addBeam(parent: THREE.Object3D, start: THREE.Vector3, end: THREE.Vector3, radius: number, material: THREE.Material, radialSegments = 10) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.82, radius, direction.length(), radialSegments), material);
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(vector(0, 1, 0), direction.normalize());
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addLathedBody(parent: THREE.Object3D, profile: [number, number][], material = materials.shell) {
  const points = profile.map(([radius, height]) => new THREE.Vector2(radius, height));
  const geometry = new THREE.LatheGeometry(points, 32);
  geometry.computeVertexNormals();
  return addMesh(parent, geometry, material, vector(0, 0, 0), new THREE.Euler(Math.PI / 2, 0, 0));
}

function addWing(parent: THREE.Object3D, sign: -1 | 1, material = materials.shell) {
  const shape = new THREE.Shape();
  const pts: [number, number][] = [
    [sign * 0.15, 0.58],
    [sign * 2.08, 0.11],
    [sign * 2.16, -0.34],
    [sign * 0.18, -0.12],
  ];
  shape.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i += 1) shape.lineTo(pts[i][0], pts[i][1]);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.09, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.025, bevelThickness: 0.018 });
  geometry.rotateX(Math.PI / 2);
  const wing = addMesh(parent, geometry, material, vector(0, 0.06, 0));
  wing.castShadow = true;
  return wing;
}

function addBlade(parent: THREE.Object3D, radius: number, angle: number, material = materials.prop) {
  const blade = new THREE.Mesh(new THREE.BoxGeometry(radius * 2, 0.025, 0.075), material);
  blade.position.y = 0.21;
  blade.rotation.y = angle;
  blade.castShadow = true;
  parent.add(blade);
  const tip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.028, 0.08), materials.orange);
  tip.position.set(radius * 0.88 * Math.cos(angle), 0.21, radius * 0.88 * Math.sin(angle));
  tip.castShadow = true;
  parent.add(tip);
}

function addRotor(parent: THREE.Object3D, x: number, y: number, z: number, radius = 0.42, bladeAngle = 0) {
  const rotor = new THREE.Group();
  rotor.position.set(x, y, z);
  parent.add(rotor);
  addMesh(rotor, new THREE.CylinderGeometry(0.105, 0.12, 0.2, 18), materials.dark, vector(0, 0.06, 0));
  addMesh(rotor, new THREE.CylinderGeometry(0.065, 0.08, 0.08, 16), materials.metal, vector(0, 0.17, 0));
  addMesh(rotor, new THREE.CylinderGeometry(0.042, 0.042, 0.035, 16), materials.orange, vector(0, 0.225, 0));
  addBlade(rotor, radius, bladeAngle);
  addBlade(rotor, radius, bladeAngle + Math.PI);
  return rotor;
}

function addCamera(parent: THREE.Object3D, x: number, y: number, z: number, scale = 1) {
  const camera = new THREE.Group();
  camera.position.set(x, y, z);
  camera.scale.setScalar(scale);
  parent.add(camera);
  addMesh(camera, new THREE.BoxGeometry(0.35, 0.23, 0.28), materials.dark, vector(0, 0, 0));
  addMesh(camera, new THREE.BoxGeometry(0.11, 0.14, 0.14), materials.shellLight, vector(0, -0.18, 0.01));
  addMesh(camera, new THREE.SphereGeometry(0.095, 20, 16), materials.lens, vector(0, 0.015, 0.16), undefined, vector(1, 0.8, 0.7));
  addMesh(camera, new THREE.SphereGeometry(0.038, 16, 12), materials.dark, vector(0, 0.015, 0.22));
  return camera;
}

function addCable(parent: THREE.Object3D, points: THREE.Vector3[], radius = 0.012, material = materials.orange) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 20, radius, 5, false);
  addMesh(parent, geometry, material, vector(0, 0, 0));
}

function createPrintedAirframe() {
  const root = new THREE.Group();
  addLathedBody(root, [[0.01, -2.0], [0.09, -1.84], [0.18, -1.55], [0.22, -0.8], [0.21, 0.35], [0.16, 1.2], [0.09, 1.65], [0.015, 1.82]]);

  for (const sign of [-1, 1] as const) {
    addWing(root, sign);
    addBeam(root, vector(sign * 0.28, 0.04, 0.3), vector(sign * 2.08, 0.11, -0.08), 0.045, materials.shellLight, 8);
    addBeam(root, vector(sign * 0.25, 0.02, -0.12), vector(sign * 2.06, 0.12, -0.36), 0.036, materials.dark, 8);

    const horizontalTail = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.06, 0.32), materials.shell);
    horizontalTail.position.set(sign * 0.3, 0.08, -1.45);
    horizontalTail.rotation.y = sign * -0.12;
    root.add(horizontalTail);
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.38, 0.35), materials.shellLight);
    fin.position.set(sign * 0.32, 0.22, -1.48);
    fin.rotation.z = sign * -0.09;
    root.add(fin);
  }

  const seam = new THREE.Mesh(new THREE.TorusGeometry(0.214, 0.015, 9, 36), materials.metal);
  seam.position.z = -0.05;
  root.add(seam);
  const sensorRim = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.022, 8, 22), materials.shellLight);
  sensorRim.position.set(0, 0.02, 1.67);
  root.add(sensorRim);
  addMesh(root, new THREE.SphereGeometry(0.095, 20, 16), materials.lens, vector(0, 0.02, 1.68), undefined, vector(1, 0.82, 0.8));
  addMesh(root, new THREE.SphereGeometry(0.041, 16, 12), materials.dark, vector(0, 0.02, 1.74));

  for (const x of [-2.02, 2.02]) {
    for (const z of [-0.22, 0.27]) {
      addBeam(root, vector(x * 0.86, 0.06, z * 0.75), vector(x, 0.09, z), 0.035, materials.metal, 8);
      addRotor(root, x, 0.06, z, 0.31, z > 0 ? 0.16 : -0.1);
    }
  }

  addBeam(root, vector(0, -0.15, -0.7), vector(0, -0.15, -1.45), 0.028, materials.orange, 8);
  addMesh(root, new THREE.BoxGeometry(0.12, 0.035, 0.33), materials.orange, vector(0, -0.08, 0.72));
  return root;
}

function createSprintConcept() {
  const root = new THREE.Group();
  addLathedBody(root, [[0.01, -1.1], [0.12, -0.9], [0.19, -0.5], [0.2, 0.25], [0.14, 0.82], [0.045, 1.08]]);
  addMesh(root, new THREE.BoxGeometry(0.48, 0.18, 0.8), materials.shell, vector(0, -0.02, -0.2));
  addMesh(root, new THREE.SphereGeometry(0.11, 18, 14), materials.lens, vector(0, 0.02, 0.94), undefined, vector(1, 0.78, 0.85));

  const motorPoints: [number, number, number][] = [[-1.22, 0.04, -0.76], [1.22, 0.04, -0.76], [-1.22, 0.04, 0.68], [1.22, 0.04, 0.68]];
  for (const [x, y, z] of motorPoints) {
    addBeam(root, vector(0, 0.02, z * 0.42), vector(x, y, z), 0.055, materials.shellLight, 8);
    addBeam(root, vector(x * 0.8, -0.02, z), vector(x, -0.02, z), 0.026, materials.orange, 7);
    addRotor(root, x, y, z, 0.38, x < 0 ? 0.1 : -0.1);
  }

  // The open frame is an abstract visual cue for the PDF's capture-first role, not a working effector.
  const captureRing = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.025, 8, 40), materials.orange);
  captureRing.rotation.x = Math.PI / 2;
  captureRing.position.set(0, -0.63, 0.13);
  root.add(captureRing);
  for (let i = 0; i < 4; i += 1) {
    const angle = (Math.PI * 2 * i) / 4;
    const px = Math.cos(angle) * 0.45;
    const pz = 0.13 + Math.sin(angle) * 0.45;
    addBeam(root, vector(px * 0.78, -0.2, pz * 0.78), vector(px, -0.63, pz), 0.018, materials.shellLight, 6);
  }
  addMesh(root, new THREE.BoxGeometry(0.18, 0.05, 0.28), materials.orange, vector(0, 0.19, -0.63));
  return root;
}

function createPicketConcept() {
  const root = new THREE.Group();
  addLathedBody(root, [[0.012, -1.36], [0.11, -1.1], [0.16, -0.55], [0.18, 0.48], [0.12, 1.15], [0.04, 1.36]]);
  addMesh(root, new THREE.BoxGeometry(0.42, 0.2, 1.15), materials.shell, vector(0, -0.08, -0.25));
  addMesh(root, new THREE.BoxGeometry(0.3, 0.08, 0.82), materials.dark, vector(0, -0.21, -0.18));

  const motorPoints: [number, number, number][] = [[-1.62, 0.02, -0.79], [1.62, 0.02, -0.79], [-1.62, 0.02, 0.79], [1.62, 0.02, 0.79]];
  for (const [x, y, z] of motorPoints) {
    const sign = x < 0 ? -1 : 1;
    addBeam(root, vector(sign * 0.18, 0, z * 0.52), vector(x, y, z), 0.048, materials.shellLight, 8);
    addBeam(root, vector(sign * 0.28, -0.1, z * 0.42), vector(x * 0.96, -0.03, z * 0.92), 0.023, materials.metal, 7);
    addRotor(root, x, y, z, 0.5, sign * 0.11);
  }

  // A gimballed sensor and open, longer-span frame distinguish this illustrative role form.
  addBeam(root, vector(0, -0.18, 0.85), vector(0, -0.48, 1.02), 0.028, materials.metal, 8);
  addCamera(root, 0, -0.58, 1.06, 0.82);
  addMesh(root, new THREE.BoxGeometry(0.23, 0.035, 0.12), materials.orange, vector(0, 0.18, -0.85));
  return root;
}

function createDetectionTestbed() {
  const root = new THREE.Group();
  const motors: [number, number, number][] = [[-1.65, 0, -1.2], [1.65, 0, -1.2], [-1.65, 0, 1.2], [1.65, 0, 1.2]];
  for (const [x, y, z] of motors) {
    addBeam(root, vector(0, -0.03, 0), vector(x, y, z), 0.06, materials.carbon, 9);
    addBeam(root, vector(0, 0.015, -0.11), vector(x * 0.82, 0.015, z * 0.82), 0.018, materials.orange, 6);
    addRotor(root, x, 0.02, z, 0.54, x > 0 ? 0.18 : -0.18);
  }

  addMesh(root, new THREE.BoxGeometry(0.94, 0.11, 0.72), materials.carbon, vector(0, -0.02, 0));
  addMesh(root, new THREE.BoxGeometry(0.76, 0.1, 0.56), materials.shellLight, vector(0, 0.09, 0));
  addMesh(root, new THREE.BoxGeometry(0.55, 0.18, 0.42), materials.dark, vector(0, 0.23, -0.1));
  addMesh(root, new THREE.BoxGeometry(0.32, 0.055, 0.25), materials.board, vector(0.1, 0.355, -0.13));
  addMesh(root, new THREE.BoxGeometry(0.12, 0.045, 0.09), materials.metal, vector(-0.1, 0.37, -0.12));
  addMesh(root, new THREE.CylinderGeometry(0.09, 0.1, 0.12, 14), materials.dark, vector(0.1, 0.43, 0.16));

  // Open landing legs and the elevated EO camera mast mirror the documented lab testbed layout.
  for (const x of [-0.78, 0.78]) {
    for (const z of [-0.52, 0.52]) {
      addBeam(root, vector(x * 0.72, -0.14, z * 0.72), vector(x, -0.78, z), 0.035, materials.carbon, 8);
      addBeam(root, vector(x * 0.82, -0.78, z * 0.82), vector(x * 1.14, -0.78, z * 1.14), 0.032, materials.shellLight, 8);
    }
  }
  addBeam(root, vector(0, 0.35, 0.17), vector(0, 1.16, 0.17), 0.03, materials.metal, 8);
  addBeam(root, vector(0, 0.45, 0.17), vector(0.02, 1.1, 0.17), 0.014, materials.orange, 6);
  addCamera(root, 0, 1.28, 0.18, 0.95);

  // Small cable runs keep the testbed's open-bench construction visible without implying flight readiness.
  addCable(root, [vector(-0.22, 0.32, 0.12), vector(-0.4, 0.27, -0.05), vector(-0.72, 0.12, -0.46)], 0.012, materials.orange);
  addCable(root, [vector(0.2, 0.35, -0.16), vector(0.4, 0.24, -0.28), vector(0.79, 0.12, -0.69)], 0.01, materials.metal);
  return root;
}

export type DroneModelKey = 'airframe' | 'sprint' | 'picket' | 'testbed';

export function createDroneModel(key: DroneModelKey): THREE.Group {
  switch (key) {
    case 'airframe': return createPrintedAirframe();
    case 'sprint': return createSprintConcept();
    case 'picket': return createPicketConcept();
    case 'testbed': return createDetectionTestbed();
  }
}
