import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import Lantern from './models/lantern.js';
//only for development
import GUI from 'lil-gui';

//pyramid color 1e60c9 2369d9 1d60c8    3a6ed8 345ad4 9eb3eb

const gui = new GUI();

export default class SceneStory2 extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-story`);
    this.texture = `./3d/scenes-textures/scene-2.png`;
    this.isTextureWithBubbles = true;

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.5
    });
    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
    this.addLantern();
  }

  addPyramid() {
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(250, 280, 4), new THREE.MeshStandardMaterial({color: 0x2369d9}));
    mesh.scale.set(0.41, 0.5, 0.73);
    mesh.position.set(-13, -38, 0);

    //development only
    gui.add(mesh.scale, `x`, 0, 1, 0.01).name(`scaleX`);
    gui.add(mesh.scale, `y`, 0, 1, 0.01).name(`scaleY`);
    gui.add(mesh.scale, `z`, 0, 1, 0.01).name(`scaleZ`);
    gui.add(mesh.position, `x`, -100, 100, 1).name(`posX`);
    gui.add(mesh.position, `y`, -100, 100, 1).name(`posY`);

    this.add(mesh);
  }

  addLantern() {
    const lantern = new Lantern();
    lantern.position.set(200, -160, 0);
    lantern.scale.set(0.71, 0.6, 0.71);
    lantern.position.set(241, -120, 0);
    lantern.rotation.set(0, -0.04, -0.04);
    //y = -137


    //development only
    /* gui.add(lantern.scale, `x`, 0, 1, 0.01).name(`scaleX`);
    gui.add(lantern.scale, `y`, 0, 1, 0.01).name(`scaleY`);
    gui.add(lantern.scale, `z`, 0, 1, 0.01).name(`scaleZ`);
    gui.add(lantern.position, `x`, -300, 300, 1).name(`posX`);
    gui.add(lantern.position, `y`, -200, 200, 1).name(`posY`);
    gui.add(lantern.rotation, `y`, -1, 1, 0.01).name(`rotY`);
    gui.add(lantern.rotation, `z`, -1, 1, 0.01).name(`rotZ`); */

    this.add(lantern);
  }
}
