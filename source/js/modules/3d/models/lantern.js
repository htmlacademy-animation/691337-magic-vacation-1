import * as THREE from 'three';
import {getLegFromHypotenuse} from '../../utils.js';
import {createMaterial, MATERIAL_REFLECTION, MATERIAL_COLOR} from '../utils-scenes.js';

export default class Lantern extends THREE.Group {
  constructor() {
    super();

    this.material = MATERIAL_REFLECTION.soft;
    this.materialColor = MATERIAL_COLOR.blue;
    this.materialColorLight = MATERIAL_COLOR.lightBlue;

    this.constructChildren();
  }

  constructChildren() {
    this.addPillar();
    this.addLamp();
  }

  addPillar() {
    const material = createMaterial(this.material, this.materialColor);
    const bottomCylinder = new THREE.Mesh(new THREE.CylinderGeometry(16, 16, 120, 12), material);
    this.add(bottomCylinder);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(16, 12, 12), material);
    sphere.position.set(0, 60, 0);
    this.add(sphere);

    const topCylinder = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 230, 12), material);
    topCylinder.position.set(0, 175, 0);
    this.add(topCylinder);
  }

  addLamp() {
    const material = createMaterial(this.material, this.materialColor);
    const materialLight = createMaterial(this.material, this.materialColorLight);
    const bottomPart = new THREE.Mesh(new THREE.CylinderGeometry(getLegFromHypotenuse(37), getLegFromHypotenuse(37), 4, 4), material);
    bottomPart.position.set(0, 292, 0);
    this.add(bottomPart);

    const centralPart = new THREE.Mesh(new THREE.CylinderGeometry(getLegFromHypotenuse(42), getLegFromHypotenuse(34), 60, 4), materialLight);
    centralPart.position.set(0, 324, 0);
    this.add(centralPart);

    const topPart = new THREE.Mesh(new THREE.CylinderGeometry(getLegFromHypotenuse(45), getLegFromHypotenuse(57), 6, 4), material);
    topPart.position.set(0, 351, 0);
    this.add(topPart);
  }
}
