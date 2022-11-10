import * as THREE from 'three';
import {getLegFromHypotenuse} from '../../utils.js';

export default class Lantern extends THREE.Group {
  constructor() {
    super();

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0x345ad4,
    });

    this.constructChildren();
  }

  constructChildren() {
    this.addPillar();
    this.addLamp();
  }

  addPillar() {
    const bottomCylinder = new THREE.Mesh(new THREE.CylinderGeometry(16, 16, 120, 12), this.defaultMaterial);
    this.add(bottomCylinder);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(16, 12, 12), this.defaultMaterial);
    sphere.position.set(0, 60, 0);
    this.add(sphere);

    const topCylinder = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 230, 12), this.defaultMaterial);
    topCylinder.position.set(0, 175, 0);
    this.add(topCylinder);
  }

  addLamp() {
    const bottomPart = new THREE.Mesh(new THREE.CylinderGeometry(getLegFromHypotenuse(37), getLegFromHypotenuse(37), 4, 4), this.defaultMaterial);
    bottomPart.position.set(0, 292, 0);
    this.add(bottomPart);

    const centralPart = new THREE.Mesh(new THREE.CylinderGeometry(getLegFromHypotenuse(42), getLegFromHypotenuse(34), 60, 4), new THREE.MeshStandardMaterial({color: 0x9eb3eb}));
    centralPart.position.set(0, 324, 0);
    this.add(centralPart);

    const topPart = new THREE.Mesh(new THREE.CylinderGeometry(getLegFromHypotenuse(45), getLegFromHypotenuse(57), 6, 4), this.defaultMaterial);
    topPart.position.set(0, 351, 0);
    this.add(topPart);
  }
}
