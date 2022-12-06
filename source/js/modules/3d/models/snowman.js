import * as THREE from 'three';
import {createMaterial, MATERIAL_REFLECTION, MATERIAL_COLOR} from '../utils-scenes.js';

export default class Snowman extends THREE.Group {
  constructor() {
    super();

    this.spheresMaterial = MATERIAL_REFLECTION.strong;
    this.carrotMaterial = MATERIAL_REFLECTION.soft;
    this.spheresColor = MATERIAL_COLOR.snowColor;
    this.carrotColor = MATERIAL_COLOR.orange;

    this.constructChildren();
  }

  constructChildren() {
    this.addSpheres();
    this.addCarrot();
  }

  addSpheres() {
    const bottomSphere = new THREE.Mesh(new THREE.SphereGeometry(75, 12, 12),
        createMaterial(this.spheresMaterial, this.spheresColor));
    this.add(bottomSphere);

    const topSphere = new THREE.Mesh(new THREE.SphereGeometry(44, 12, 12),
        createMaterial(this.spheresMaterial, this.spheresColor));

    topSphere.position.set(0, 110, 0);
    this.add(topSphere);
  }

  addCarrot() {
    const carrot = new THREE.Mesh(new THREE.ConeGeometry(18, 75, 12),
        createMaterial(this.carrotMaterial, this.carrotColor));
    carrot.position.set(38, 110, 0);
    carrot.rotation.z = THREE.MathUtils.degToRad(-90);
    this.add(carrot);
  }
}
