import * as THREE from 'three';
import {createSphereGeometry, createCylinderGeometry} from './utils-scenes.js';
import Saturn from './models/saturn.js';
// development only
import GUI from 'lil-gui';
const gui = new GUI();

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
    // saturn.position.set(57, 157, 0);
    saturn.scale.set(0.6, 0.6, 0.6);

    // development only
    gui.add(saturn.position, `x`, -300, 300, 1).name(`posX`);
    gui.add(saturn.position, `y`, -300, 300, 1).name(`posY`);
    gui.add(saturn.position, `z`, -50, 50, 1).name(`posZ`);
    gui.add(saturn.rotation, `x`, -5, 5, 0.01).name(`rotX`);
    gui.add(saturn.rotation, `y`, -5, 5, 0.01).name(`rotY`);
    gui.add(saturn.rotation, `z`, -5, 5, 0.01).name(`rotZ`);
    gui.add(saturn.scale, `x`, -3, 3, 0.01).name(`scaleX`);
    gui.add(saturn.scale, `y`, -3, 3, 0.01).name(`scaleY`);
    gui.add(saturn.scale, `z`, -3, 3, 0.01).name(`scaleZ`);

    const hangerGroup = new THREE.Group();
    hangerGroup.position.set(0, 65, 0);

    const sphere = new THREE.Mesh(createSphereGeometry(10, 12, 12), this.defaultMaterial);
    const cylinder = new THREE.Mesh(createCylinderGeometry(1, 1, 1000, 16, 16), this.defaultMaterial);
    cylinder.position.set(0, 430, 0);

    hangerGroup.add(sphere, cylinder);
    hangerGroup.scale.set(0.6, 0.6, 0.6);

    lampGroup.add(hangerGroup, saturn);

    this.add(lampGroup);
  }
}
