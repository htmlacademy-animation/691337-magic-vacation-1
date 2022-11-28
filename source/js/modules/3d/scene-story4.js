import * as THREE from 'three';
import {createSphereGeometry, createCylinderGeometry} from './utils-scenes.js';
import Saturn from './models/saturn.js';
// development only
// import GUI from 'lil-gui';
// const gui = new GUI();

export default class SceneStory4 extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-story`);
    this.texture = `./3d/scenes-textures/scene-4.png`;
    this.isTextureWithBubbles = false;

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0x6a45c8,
    });
    this.constructChildren();
  }

  constructChildren() {
    this.addSaturn();
  }

  addSaturn() {
    const lampGroup = new THREE.Group();
    const saturn = new Saturn();
    saturn.scale.set(0.6, 0.6, 0.6);

    const hangerGroup = new THREE.Group();
    hangerGroup.position.set(0, 65, 0);

    const sphere = new THREE.Mesh(createSphereGeometry(10, 12, 12), this.defaultMaterial);
    const cylinder = new THREE.Mesh(createCylinderGeometry(1, 1, 1000, 16, 16), new THREE.MeshStandardMaterial({
      color: 0x7d8a9f,
    }));
    cylinder.position.set(0, 430, 0);

    hangerGroup.add(sphere, cylinder);
    hangerGroup.scale.set(0.6, 0.6, 0.6);

    lampGroup.add(hangerGroup, saturn);
    lampGroup.position.set(57, 157, 0);

    this.add(lampGroup);
  }
}
