import * as THREE from 'three';
import {getLegFromHypotenuse} from '../utils.js';
import Lantern from './models/lantern.js';
import {createMaterial, MATERIAL_REFLECTION, MATERIAL_COLOR} from './utils-scenes.js';
// development only
// import GUI from 'lil-gui';
// const gui = new GUI();

export default class SceneStory2 extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-story`);
    this.texture = `./3d/scenes-textures/scene-2.png`;
    this.isTextureWithBubbles = true;

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0x2369d9
    });
    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
    this.addLantern();
  }

  addPyramid() {
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(getLegFromHypotenuse(250), 280, 4),
        createMaterial(MATERIAL_REFLECTION.soft, MATERIAL_COLOR.blue));
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
}
