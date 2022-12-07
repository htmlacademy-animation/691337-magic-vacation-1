import * as THREE from 'three';
import {MATERIAL_COLOR, MATERIAL_REFLECTION, createMaterial} from './utils-scenes.js';
import ExtrudeShapes from './shapes/extrudeShapes.js';
import {getLegFromHypotenuse} from '../utils.js';
import getShapes from './shapes/shapeLoader.js';
import Saturn from './models/saturn.js';
import Snowman from './models/snowman.js';
import Lantern from './models/lantern.js';

// development only
// import GUI from 'lil-gui';
// const gui = new GUI();

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
    this.addSaturnScene4();
    this.addSaturnScene1();
    this.addSnowman();
    this.addPyramid();
    this.addLantern();
    this.addFlamingo();
    this.addKeyhole();
    this.addLeaf();
    this.addQuestion();
    this.addSnowflake();
  }

  addSaturnScene4() {
    const saturn = new Saturn(
        MATERIAL_REFLECTION.soft,
        MATERIAL_COLOR.shadowedDominantRed,
        MATERIAL_COLOR.shadowedBrightPurple,
        true,
        MATERIAL_COLOR.metalGrey
    );

    saturn.scale.set(0.6, 0.6, 0.6);
    saturn.position.set(70, 120, 0);

    this.add(saturn);
  }

  addSaturnScene1() {
    const saturn = new Saturn(
        MATERIAL_REFLECTION.soft,
        MATERIAL_COLOR.dominantRed,
        MATERIAL_COLOR.brightPurple,
        true,
        MATERIAL_COLOR.metalGrey
    );

    saturn.scale.set(0.6, 0.6, 0.6);
    saturn.position.set(-70, 120, 0);

    this.add(saturn);
  }

  addSnowman() {
    const snowman = new Snowman();
    snowman.position.set(350, -100, 0);
    snowman.rotation.y = THREE.MathUtils.degToRad(-45);

    this.add(snowman);
  }

  addPyramid() {
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(getLegFromHypotenuse(250), 280, 4),
        createMaterial(MATERIAL_REFLECTION.soft, MATERIAL_COLOR.blue));
    mesh.position.set(100, 0, -100);
    mesh.scale.set(0.6, 0.6, 0.6);

    this.add(mesh);
  }

  addLantern() {
    const lantern = new Lantern();
    lantern.position.set(-400, -160, 0);
    lantern.rotation.y = -0.57;

    this.add(lantern);
  }

  addFlamingo() {
    const flamingo = new ExtrudeShapes(this.mapOfShapes, `flamingo`);
    flamingo.position.set(-275, 200, 12);
    flamingo.rotation.set(0.08, 0.08, 3.5);
    flamingo.scale.set(1.23, 1.38, 0.42);

    this.add(flamingo);
  }

  addKeyhole() {
    const group = new THREE.Group();
    const keyhole = new ExtrudeShapes(this.mapOfShapes, `keyhole`);
    keyhole.position.set(700, 800, -250);
    keyhole.rotation.z = THREE.MathUtils.degToRad(180);
    keyhole.scale.set(0.8, 0.8, 1);

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500),
        createMaterial(MATERIAL_REFLECTION.basic, MATERIAL_COLOR.purple));
    plane.position.z = keyhole.position.z;
    group.add(keyhole, plane);

    this.add(group);
  }

  addLeaf() {
    const leaf = new ExtrudeShapes(this.mapOfShapes, `leaf`);
    leaf.position.set(228, 226, 40);
    leaf.rotation.set(-0.04, -3.73, -2.01);
    leaf.scale.set(1, 1, 0.8);

    this.add(leaf);
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
}
