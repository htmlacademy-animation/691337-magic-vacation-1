import * as THREE from 'three';
import {getLegFromHypotenuse, getRadiansFromDegrees} from '../utils.js';
import Lantern from './models/lantern.js';
import Snowman from './models/snowman.js';
// development only
// import GUI from 'lil-gui';
// const gui = new GUI();

export default class SceneExercise extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-exercise`);
    // this.texture = `./3d/scenes-textures/scene-2.png`;
    // this.isTextureWithBubbles = false;

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0x2369d9
    });
    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
    this.addLantern();
    this.addSnowman();
  }

  addPyramid() {
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(getLegFromHypotenuse(250), 280, 4), this.defaultMaterial);
    mesh.position.set(-53, -38, 0);

    // development only
    /*
    gui.add(mesh.position, `x`, -100, 100, 1).name(`posX`);
    gui.add(mesh.position, `y`, -100, 100, 1).name(`posY`);
 */
    this.add(mesh);
  }

  addLantern() {
    const lantern = new Lantern();
    lantern.position.set(240, -160, 0);
    lantern.rotation.y = -0.57;

    this.add(lantern);
  }

  addSnowman() {
    const snowman = new Snowman();
    snowman.position.set(-320, -120, 0);
    snowman.rotation.y = getRadiansFromDegrees(-45);

    this.add(snowman);
  }
}
