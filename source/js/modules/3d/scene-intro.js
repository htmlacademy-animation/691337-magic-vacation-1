import * as THREE from 'three';
import {getRadiansFromDegrees} from '../utils.js';
import getShapes from './shapes/shapeLoader.js';
import ExtrudeShapes from './shapes/extrudeShapes.js';
// development only
// import GUI from 'lil-gui';
// const gui = new GUI();

export default class SceneIntro extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-intro`);
    this.texture = `./3d/scenes-textures/scene-0.png`;
    this.isTextureWithBubbles = false;

    this.mapOfShapes = [];
    this.constructChildren();
  }

  async constructChildren() {
    this.mapOfShapes = await getShapes();
    this.addFlamingo();
    this.addLeaf();
    this.addQuestion();
    this.addSnowflake();
    this.addKeyhole();
    this.addSaturn();
  }

  addFlamingo() {
    const flamingo = new ExtrudeShapes(this.mapOfShapes, `flamingo`);
    flamingo.position.set(-275, 200, 12);
    flamingo.rotation.set(0.08, 0.08, 3.5);
    flamingo.scale.set(1.23, 1.38, 0.42);

    // development only
    // gui.add(flamingo.position, `x`, -300, 300, 1).name(`posX`);
    // gui.add(flamingo.position, `y`, -300, 300, 1).name(`posY`);
    // gui.add(flamingo.position, `z`, -50, 50, 1).name(`posZ`);
    // gui.add(flamingo.rotation, `x`, -5, 5, 0.01).name(`rotX`);
    // gui.add(flamingo.rotation, `y`, -5, 5, 0.01).name(`rotY`);
    // gui.add(flamingo.rotation, `z`, -5, 5, 0.01).name(`rotZ`);
    // gui.add(flamingo.scale, `x`, -3, 3, 0.01).name(`scaleX`);
    // gui.add(flamingo.scale, `y`, -3, 3, 0.01).name(`scaleY`);
    // gui.add(flamingo.scale, `z`, -3, 3, 0.01).name(`scaleZ`);

    this.add(flamingo);
  }

  addKeyhole() {
    const keyhole = new ExtrudeShapes(this.mapOfShapes, `keyhole`);
    keyhole.position.set(800, 800, 1);
    keyhole.rotation.z = getRadiansFromDegrees(180);
    keyhole.scale.set(0.8, 0.8, 1);

    // development only
    // gui.add(keyhole.position, `x`, -1000, 1000, 1).name(`posX`);
    // gui.add(keyhole.position, `y`, -900, 900, 1).name(`posY`);
    // gui.add(keyhole.position, `z`, -50, 50, 1).name(`posZ`);
    // gui.add(keyhole.rotation, `x`, -5, 5, 0.01).name(`rotX`);
    // gui.add(keyhole.rotation, `y`, -5, 5, 0.01).name(`rotY`);
    // gui.add(keyhole.rotation, `z`, -5, 5, 0.01).name(`rotZ`);
    // gui.add(keyhole.scale, `x`, -3, 3, 0.01).name(`scaleX`);
    // gui.add(keyhole.scale, `y`, -3, 3, 0.01).name(`scaleY`);
    // gui.add(keyhole.scale, `z`, -3, 3, 0.01).name(`scaleZ`);

    this.add(keyhole);
  }


  addLeaf() {
    const leaf = new ExtrudeShapes(this.mapOfShapes, `leaf`);
    leaf.position.set(228, 226, 40);
    leaf.rotation.set(-0.04, -3.73, -2.01);
    leaf.scale.set(1, 1, 0.8);

    // development only
    // gui.add(leaf.position, `x`, -300, 300, 1).name(`posX`);
    // gui.add(leaf.position, `y`, -300, 300, 1).name(`posY`);
    // gui.add(leaf.position, `z`, -50, 50, 1).name(`posZ`);
    // gui.add(leaf.rotation, `x`, -5, 5, 0.01).name(`rotX`);
    // gui.add(leaf.rotation, `y`, -5, 5, 0.01).name(`rotY`);
    // gui.add(leaf.rotation, `z`, -5, 5, 0.01).name(`rotZ`);
    // gui.add(leaf.scale, `x`, -3, 3, 0.01).name(`scaleX`);
    // gui.add(leaf.scale, `y`, -3, 3, 0.01).name(`scaleY`);
    // gui.add(leaf.scale, `z`, -3, 3, 0.01).name(`scaleZ`);

    this.add(leaf);
  }

  addQuestion() {
    const question = new ExtrudeShapes(this.mapOfShapes, `question`);
    question.position.set(100, -157, 16);
    question.rotation.set(2.3, 0.08, -0.29);
    question.scale.set(0.93, 1, 1.08);

    // development only
    // gui.add(question.position, `x`, -300, 300, 1).name(`posX`);
    // gui.add(question.position, `y`, -300, 300, 1).name(`posY`);
    // gui.add(question.position, `z`, -50, 50, 1).name(`posZ`);
    // gui.add(question.rotation, `x`, -5, 5, 0.01).name(`rotX`);
    // gui.add(question.rotation, `y`, -5, 5, 0.01).name(`rotY`);
    // gui.add(question.rotation, `z`, -5, 5, 0.01).name(`rotZ`);
    // gui.add(question.scale, `x`, -3, 3, 0.01).name(`scaleX`);
    // gui.add(question.scale, `y`, -3, 3, 0.01).name(`scaleY`);
    // gui.add(question.scale, `z`, -3, 3, 0.01).name(`scaleZ`);

    this.add(question);
  }

  addSnowflake() {
    const snowflake = new ExtrudeShapes(this.mapOfShapes, `snowflake`);
    snowflake.position.set(-150, 0, 20);
    snowflake.rotation.set(0.08, 0.81, 1.31);
    snowflake.scale.set(0.93, 0.93, 0.64);

    // development only
    // gui.add(snowflake.position, `x`, -300, 300, 1).name(`posX`);
    // gui.add(snowflake.position, `y`, -300, 300, 1).name(`posY`);
    // gui.add(snowflake.position, `z`, -50, 50, 1).name(`posZ`);
    // gui.add(snowflake.rotation, `x`, -5, 5, 0.01).name(`rotX`);
    // gui.add(snowflake.rotation, `y`, -5, 5, 0.01).name(`rotY`);
    // gui.add(snowflake.rotation, `z`, -5, 5, 0.01).name(`rotZ`);
    // gui.add(snowflake.scale, `x`, -3, 3, 0.01).name(`scaleX`);
    // gui.add(snowflake.scale, `y`, -3, 3, 0.01).name(`scaleY`);
    // gui.add(snowflake.scale, `z`, -3, 3, 0.01).name(`scaleZ`);

    this.add(snowflake);
  }
}
