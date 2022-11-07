import * as THREE from 'three';

export default class Lantern extends THREE.Group {
  constructor() {
    super();

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0x345ad4,
      transparent: true,
      opacity: 0.5,
      //wireframe: true
    });

    this.constructChildren();
  }

  constructChildren() {
    this.addBottomPart();
    this.addTopPart();
  }

  addBottomPart() {
    const cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(16, 16, 120, 12), this.defaultMaterial);
    this.add(cylinder1);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(16, 12, 12), this.defaultMaterial);
    sphere.position.set(0, 60, 0);
    this.add(sphere);

    const cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 230, 12), this.defaultMaterial);
    cylinder2.position.set(0, 170, 0);
    this.add(cylinder2);
  }

  addTopPart() {
    //const square = new THREE.Mesh(new THREE.BoxGeometry(74, 4, 74), this.defaultMaterial);
    const square = new THREE.Mesh(new THREE.CylinderGeometry(37, 37, 4, 4), this.defaultMaterial);
    square.position.set(0, 285, 0);
    square.rotation.y = 0.78;
    this.add(square);

    const cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(42, 34, 60, 4), new THREE.MeshStandardMaterial({color: 0x9eb3eb}));
    cylinder1.position.set(0, 317, 0);
    cylinder1.rotation.y = 0.78;
    this.add(cylinder1);

    const cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(45, 57, 6, 4), this.defaultMaterial);
    cylinder2.position.set(0, 350, 0);
    cylinder2.rotation.y = 0.78;
    this.add(cylinder2);
  }
}
