import * as THREE from 'three';
import {MATERIAL_COLOR, MATERIAL_REFLECTION} from './utils-scenes.js';
import getModelGltf from './loaders/gltfLoader.js';
import getModelObj from './loaders/objLoader.js';


// development only
// import GUI from 'lil-gui';
// const gui = new GUI();

export default class SceneExercise extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-exercise`);
    // this.texture = `./3d/scenes-textures/scene-2.png`;
    // this.isTextureWithBubbles = false;

    this.constructChildren();
  }

  async constructChildren() {
    await this.addWatermelon();
    await this.addSuitcase();
    await this.addAirplane();
  }

  async addAirplane() {
    const airplane = await getModelObj(`./3d/scenes-models/airplane.obj`,
        MATERIAL_REFLECTION.basic, MATERIAL_COLOR.white);
    airplane.position.set(150, 0, 0);
    this.add(airplane);
  }

  async addWatermelon() {
    const watermelon = await getModelGltf(`./3d/scenes-models/watermelon.gltf`);
    this.add(watermelon);
  }

  async addSuitcase() {
    const suitcase = await getModelGltf(`./3d/scenes-models/suitcase.gltf`);
    suitcase.position.set(-150, 0, 0);
    suitcase.scale.set(0.3, 0.3, 0.3);
    this.add(suitcase);
  }
}
