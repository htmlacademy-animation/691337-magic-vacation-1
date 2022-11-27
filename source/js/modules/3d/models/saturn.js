import * as THREE from 'three';
import {getRadiansFromDegrees} from '../../utils.js';

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
    //this.addSphere();
    //this.addRing();
  }

  getLatheGeometry(radius, width, height, segments, startAngle, endAngle) {
    const angle = endAngle - startAngle;
    const coords = [[radius, 0], [radius + width, 0], [radius + width, height], [radius, height]];
    const points = coords.map(([a, b]) => new THREE.Vector2(a, b));
    const phiStart = THREE.MathUtils.degToRad(startAngle);
    const phiLength = THREE.MathUtils.degToRad(angle);

    const geometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
    return geometry;
  }

  addSaturn() {
    const group = new THREE.Group();
    group.add(this.addSphere(), this.addRing());

    this.add(group);
  }

  addSphere() {
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(60, 12, 12), this.planetMaterial);
    return sphere;
    //this.add(sphere);
  }

  addRing() {
    const innerRadius = 80;
    const outRadius = 120;
    const height = 2;
    const segments = 32;
    const rotAngleDeg = 18;
    const coords = [[innerRadius, 0], [outRadius, 0], [outRadius, height], [innerRadius, height]];
    const points = coords.map(([a, b]) => new THREE.Vector2(a, b));
    const ring = new THREE.Mesh(new THREE.LatheGeometry(points, segments), this.defaultMaterial);
    ring.rotation.x = THREE.MathUtils.degToRad(rotAngleDeg);
    ring.rotation.z = THREE.MathUtils.degToRad(rotAngleDeg);

    return ring;
    //this.add(ring);
  }
}
