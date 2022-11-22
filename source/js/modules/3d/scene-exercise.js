import * as THREE from 'three';
import {getRadiansFromDegrees} from '../utils.js';
import getShapes from './shapes/shapeLoader.js';
import ExtrudeShapes from './shapes/extrudeShapes.js';

export default class SceneExercise extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-exercise`);
    // this.texture = `./3d/scenes-textures/scene-2.png`;
    // this.isTextureWithBubbles = false;

    this.mapOfShapes = [];
    this.constructChildren();
  }

  async constructChildren() {
    this.mapOfShapes = await getShapes();
    this.addFlamingo();
    this.addQuestion();
    this.addSnowflake();
    this.addLeaf();
    this.addKeyhole();
    this.addFlower();
  }

  addFlamingo() {
    const flamingo = new ExtrudeShapes(this.mapOfShapes, `flamingo`);
    flamingo.position.set(-275, 200, 16);
    flamingo.rotation.set(0.08, 0.08, 3.5);
    flamingo.scale.set(1.23, 1.38, 0.42);

    this.add(flamingo);
  }

  addQuestion() {
    const question = new ExtrudeShapes(this.mapOfShapes, `question`);
    question.position.set(100, -157, 16);
    question.rotation.set(2.3, 0.08, -0.29);
    question.scale.set(0.93, 1, 1.08);

    this.add(question);
  }

  addSnowflake() {
    const snowflake = new ExtrudeShapes(this.mapOfShapes, `snowflake`);
    snowflake.position.set(-150, 0, 20);
    snowflake.rotation.set(0.08, 0.81, 1.31);
    snowflake.scale.set(0.93, 0.93, 0.64);

    this.add(snowflake);
  }

  addLeaf() {
    const leaf = new ExtrudeShapes(this.mapOfShapes, `leaf`);
    leaf.position.set(228, 210, 55);
    leaf.rotation.set(-0.04, -3.73, -2.01);
    leaf.scale.set(1, 1, 0.8);

    this.add(leaf);
  }

  addKeyhole() {
    const keyhole = new ExtrudeShapes(this.mapOfShapes, `keyhole`);
    keyhole.position.set(800, 800, 0);
    keyhole.rotation.z = getRadiansFromDegrees(180);
    keyhole.scale.set(0.8, 0.8, 1);

    this.add(keyhole);
  }

  addFlower() {
    const flower = new ExtrudeShapes(this.mapOfShapes, `flower`);
    flower.position.set(0, 211, 15);
    flower.rotation.set(0.13, 0.77, 3.14);
    flower.scale.set(0.5, 0.5, 0.3);

    this.add(flower);
  }
}
