import * as THREE from 'three';
import getShapes from './shapes/shapeLoader.js';
import ExtrudeShapes from './shapes/extrudeShapes.js';
// development only
// import GUI from 'lil-gui';
// const gui = new GUI();

export default class SceneStory1 extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-story`);
    this.texture = `./3d/scenes-textures/scene-1.png`;
    this.isTextureWithBubbles = false;

    this.mapOfShapes = [];
    this.constructChildren();
  }

  async constructChildren() {
    this.mapOfShapes = await getShapes();
    this.addFlower();
  }

  addFlower() {
    const flower = new ExtrudeShapes(this.mapOfShapes, `flower`);
    flower.position.set(0, 211, 15);
    flower.rotation.set(0.13, 0.77, 3.14);
    flower.scale.set(0.5, 0.5, 0.3);

    // development only
    // gui.add(flower.position, `x`, -300, 300, 1).name(`posX`);
    // gui.add(flower.position, `y`, -300, 300, 1).name(`posY`);
    // gui.add(flower.position, `z`, -50, 50, 1).name(`posZ`);
    // gui.add(flower.rotation, `x`, -5, 5, 0.01).name(`rotX`);
    // gui.add(flower.rotation, `y`, -5, 5, 0.01).name(`rotY`);
    // gui.add(flower.rotation, `z`, -5, 5, 0.01).name(`rotZ`);
    // gui.add(flower.scale, `x`, -3, 3, 0.01).name(`scaleX`);
    // gui.add(flower.scale, `y`, -3, 3, 0.01).name(`scaleY`);
    // gui.add(flower.scale, `z`, -3, 3, 0.01).name(`scaleZ`);

    this.add(flower);
  }


}