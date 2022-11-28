import * as THREE from 'three';
import {createLatheGeometry, createSphereGeometry} from '../utils-scenes.js';

export default class Saturn extends THREE.Group {
  constructor() {
    super();

    this.planetMaterial = new THREE.MeshStandardMaterial({
      color: 0x6c2231,
    });

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0x6a45c8,
    });

    this.constructChildren();
  }

  constructChildren() {
    this.addSaturn();
  }

  addSaturn() {
    const group = new THREE.Group();
    group.add(this.addSphere(), this.addRing());

    this.add(group);
  }

  addSphere() {
    const sphere = new THREE.Mesh(createSphereGeometry(60, 12, 12), this.planetMaterial);
    return sphere;
  }

  addRing() {
    const innerRadius = 80;
    const outerRadius = 120;
    const height = 2;
    const segments = 32;
    const rotAngleDeg = 18;
    const ring = new THREE.Mesh(createLatheGeometry(innerRadius, outerRadius, height, segments, 0, 360), this.defaultMaterial);
    ring.rotation.x = THREE.MathUtils.degToRad(rotAngleDeg);
    ring.rotation.z = THREE.MathUtils.degToRad(rotAngleDeg);
    return ring;
  }
}
