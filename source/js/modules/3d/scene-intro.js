import * as THREE from 'three';
import getShapes from './shapes/shapeLoader.js';
import ExtrudeShapes from './shapes/extrudeShapes.js';

export default class SceneIntro extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-intro`);
    this.texture = `./3d/scenes-textures/scene-0.png`;
    this.isTextureWithBubbles = false;

    this.mapOfShapes = [];

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0x2369d9
    });
    this.constructChildren();
  }

  async constructChildren() {
    this.mapOfShapes = await getShapes();
    this.addFlamingo();
  }

  addFlamingo() {
    const flamingo = new ExtrudeShapes(this.mapOfShapes, `flamingo`);
    //console.log(flamingo);
    this.add(flamingo);
  }
}
