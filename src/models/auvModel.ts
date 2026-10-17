import * as THREE from 'three';

interface PlanformStation {
  span: number;
  leading: number;
  chord: number;
  halfThickness: number;
}

const stations: PlanformStation[] = [
  { span: 0, leading: 1.42, chord: 2.4, halfThickness: 0.18 },
  { span: 0.16, leading: 1.37, chord: 2.31, halfThickness: 0.17 },
  { span: 0.34, leading: 1.24, chord: 2.02, halfThickness: 0.15 },
  { span: 0.52, leading: 1.03, chord: 1.62, halfThickness: 0.125 },
  { span: 0.69, leading: 0.78, chord: 1.18, halfThickness: 0.097 },
  { span: 0.83, leading: 0.57, chord: 0.79, halfThickness: 0.069 },
  { span: 0.94, leading: 0.39, chord: 0.53, halfThickness: 0.045 },
  { span: 1, leading: 0.28, chord: 0.42, halfThickness: 0.032 },
];

const materials = {
  upper: new THREE.MeshPhysicalMaterial({ color: 0xc4cec0, metalness: 0.28, roughness: 0.34, clearcoat: 0.44, clearcoatRoughness: 0.4, side: THREE.DoubleSide }),
  lower: new THREE.MeshStandardMaterial({ color: 0x526e6b, metalness: 0.46, roughness: 0.46, side: THREE.DoubleSide }),
  detail: new THREE.MeshStandardMaterial({ color: 0x324c4d, metalness: 0.62, roughness: 0.32 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x17282b, metalness: 0.56, roughness: 0.32 }),
  metal: new THREE.MeshStandardMaterial({ color: 0xabb4a8, metalness: 0.72, roughness: 0.26 }),
  accent: new THREE.MeshStandardMaterial({ color: 0xc45e40, metalness: 0.34, roughness: 0.36, emissive: 0x38170d, emissiveIntensity: 0.35 }),
  glass: new THREE.MeshPhysicalMaterial({ color: 0x65a4a5, metalness: 0.42, roughness: 0.15, clearcoat: 1, transparent: true, opacity: 0.92 }),
};

function lerpStation(span: number): PlanformStation {
  for (let i = 0; i < stations.length - 1; i += 1) {
    const left = stations[i];
    const right = stations[i + 1];
    if (span <= right.span) {
      const t = (span - left.span) / (right.span - left.span);
      return {
        span,
        leading: THREE.MathUtils.lerp(left.leading, right.leading, t),
        chord: THREE.MathUtils.lerp(left.chord, right.chord, t),
        halfThickness: THREE.MathUtils.lerp(left.halfThickness, right.halfThickness, t),
      };
    }
  }
  return stations[stations.length - 1];
}

function makePlanformSurface(side: 1 | -1): THREE.BufferGeometry {
  const spanSegments = 48;
  const chordSegments = 30;
  const positions: number[] = [];
  const indices: number[] = [];

  for (let spanIndex = 0; spanIndex <= spanSegments; spanIndex += 1) {
    const lateral = -1 + (2 * spanIndex) / spanSegments;
    const t = Math.abs(lateral);
    const station = lerpStation(t);
    const x = lateral * 2.4;
    for (let chordIndex = 0; chordIndex <= chordSegments; chordIndex += 1) {
      const u = chordIndex / chordSegments;
      const z = station.leading - station.chord * u;
      const airfoil = Math.pow(Math.max(0, Math.sin(Math.PI * u)), 0.78) * (0.88 + 0.12 * u);
      const halfHeight = station.halfThickness * airfoil;
      const camber = 0.012 * Math.sin(Math.PI * u) * (1 - t * 0.35);
      positions.push(x, camber + side * halfHeight, z);
    }
  }

  const rowLength = chordSegments + 1;
  for (let spanIndex = 0; spanIndex < spanSegments; spanIndex += 1) {
    for (let chordIndex = 0; chordIndex < chordSegments; chordIndex += 1) {
      const a = spanIndex * rowLength + chordIndex;
      const b = (spanIndex + 1) * rowLength + chordIndex;
      const c = a + 1;
      const d = b + 1;
      if (side === 1) indices.push(a, b, d, a, d, c);
      else indices.push(a, d, b, a, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function addMesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material, position: THREE.Vector3, rotation?: THREE.Euler, scale?: THREE.Vector3): THREE.Mesh {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  if (rotation) mesh.rotation.copy(rotation);
  if (scale) mesh.scale.copy(scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addBeam(parent: THREE.Object3D, from: THREE.Vector3, to: THREE.Vector3, radius: number, material: THREE.Material): void {
  const direction = new THREE.Vector3().subVectors(to, from);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.85, radius, direction.length(), 12), material);
  beam.position.copy(from).add(to).multiplyScalar(0.5);
  beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  beam.castShadow = true;
  parent.add(beam);
}

function makeWingtipThruster(parent: THREE.Object3D, side: -1 | 1): void {
  const pod = new THREE.Group();
  pod.position.set(side * 2.07, -0.005, 0.12);
  parent.add(pod);

  addMesh(pod, new THREE.CylinderGeometry(0.092, 0.115, 0.38, 22), materials.detail, new THREE.Vector3(0, 0, -0.02), new THREE.Euler(Math.PI / 2, 0, 0));
  addMesh(pod, new THREE.TorusGeometry(0.104, 0.018, 8, 24), materials.accent, new THREE.Vector3(0, 0, 0.04), new THREE.Euler(Math.PI / 2, 0, 0));
  addMesh(pod, new THREE.SphereGeometry(0.085, 18, 12), materials.metal, new THREE.Vector3(0, 0, -0.22), undefined, new THREE.Vector3(1, 0.8, 0.8));

  for (let bladeIndex = 0; bladeIndex < 3; bladeIndex += 1) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.018, 0.028), materials.dark);
    blade.position.z = -0.24;
    blade.rotation.z = (bladeIndex * Math.PI * 2) / 3;
    pod.add(blade);
  }
  addMesh(pod, new THREE.SphereGeometry(0.045, 14, 10), materials.accent, new THREE.Vector3(0, 0, -0.25));
  addBeam(parent, new THREE.Vector3(side * 1.72, 0.01, 0.09), new THREE.Vector3(side * 2.06, 0.01, 0.09), 0.035, materials.metal);
}

function addSurfaceDetails(parent: THREE.Object3D): void {
  const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x344e4d, metalness: 0.55, roughness: 0.38 });
  for (const side of [-1, 1] as const) {
    for (let index = 0; index < 3; index += 1) {
      const x = side * (0.28 + index * 0.16);
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.012, 0.58 - index * 0.12), panelMaterial);
      panel.position.set(x, 0.184 - index * 0.01, -0.02);
      panel.rotation.y = side * 0.08;
      parent.add(panel);
    }
    const sensor = new THREE.Mesh(new THREE.SphereGeometry(0.055, 18, 12), materials.glass);
    sensor.position.set(side * 0.12, 0.025, 1.27);
    sensor.scale.set(1.15, 0.78, 0.5);
    parent.add(sensor);
  }

  const centreline = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.012, 1.8), materials.accent);
  centreline.position.set(0, 0.187, 0.22);
  parent.add(centreline);
  const tailBeacon = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.045, 0.15, 16), materials.accent);
  tailBeacon.position.set(0, 0.45, -1.0);
  parent.add(tailBeacon);
}

export function createAuvModel(): THREE.Group {
  const root = new THREE.Group();
  addMesh(root, makePlanformSurface(1), materials.upper, new THREE.Vector3(0, 0, 0));
  addMesh(root, makePlanformSurface(-1), materials.lower, new THREE.Vector3(0, 0, 0));

  const centreHump = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 26), materials.upper);
  centreHump.position.set(0, 0.14, 0.1);
  centreHump.scale.set(0.52, 0.105, 0.86);
  centreHump.castShadow = true;
  root.add(centreHump);

  const payloadFairing = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.15, 0.86, 24), materials.dark);
  payloadFairing.rotation.x = Math.PI / 2;
  payloadFairing.position.set(0, -0.13, 0.02);
  payloadFairing.castShadow = true;
  root.add(payloadFairing);

  const tailPod = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.18, 0.76, 24), materials.detail);
  tailPod.rotation.x = Math.PI / 2;
  tailPod.position.set(0, 0.055, -1.08);
  tailPod.castShadow = true;
  root.add(tailPod);

  const tailFin = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.29, 0.4), materials.upper);
  tailFin.position.set(0, 0.22, -0.99);
  tailFin.castShadow = true;
  root.add(tailFin);
  const tailAntenna = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.035, 0.23, 14), materials.metal);
  tailAntenna.position.set(0, 0.39, -0.97);
  root.add(tailAntenna);
  addMesh(root, new THREE.SphereGeometry(0.055, 16, 12), materials.accent, new THREE.Vector3(0, 0.52, -0.97));

  makeWingtipThruster(root, -1);
  makeWingtipThruster(root, 1);
  addSurfaceDetails(root);
  return root;
}
