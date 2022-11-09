import * as THREE from 'three';
import {getRadiansFromDegrees} from '../utils.js';
import Snowman from './models/snowman.js';

export default class SceneStory3 extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-story`);
    this.texture = `./3d/scenes-textures/scene-3.png`;
    this.isTextureWithBubbles = false;

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });
    this.constructChildren();
  }

  constructChildren() {
    this.addSnowman();
  }

  addSnowman() {
    const snowman = new Snowman();
    snowman.position.set(240, -100, 0);
    snowman.rotation.y = getRadiansFromDegrees(-45);

    this.add(snowman);
  }
}
