import * as THREE from 'three';

export default class Snowman extends THREE.Group {
  constructor() {
    super();

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });

    this.constructChildren();
  }

  constructChildren() {
    this.addSpheres();
    this.addCarrot();
  }

  addSpheres() {
    const bottomSphere = new THREE.Mesh(new THREE.SphereGeometry(75, 12, 12), this.defaultMaterial);
    this.add(bottomSphere);

    const topSphere = new THREE.Mesh(new THREE.SphereGeometry(44, 12, 12), this.defaultMaterial);
    topSphere.position.set(0, 110, 0);
    this.add(topSphere);
  }

  addCarrot() {
    const carrot = new THREE.Mesh(new THREE.ConeGeometry(18, 75, 12), new THREE.MeshStandardMaterial({color: 0xca4b1f}));
    carrot.position.set(38, 110, 0);
    carrot.rotation.z = -1.57;
    this.add(carrot);


  }
}
