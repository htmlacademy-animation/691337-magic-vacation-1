import * as THREE from 'three';
import {createLatheGeometry} from './utils-scenes.js';
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
    this.addRoad();
    this.addSnowman();
  }

  addRoad() {
    const innerRadius = 732;
    const width = 160;
    const height = 3;
    const outerRadius = innerRadius + width;
    const geometry = createLatheGeometry(innerRadius, outerRadius, height, 32, 0, 90);
    const material = new THREE.MeshBasicMaterial({color: 0x626978});
    const road = new THREE.Mesh(geometry, material);
    road.position.set(0, -135, -200);
    road.rotation.set(0, -0.78, 0);
    road.scale.set(0.6, 0.6, 0.6);

    this.add(road);
  }

  addSnowman() {
    const snowman = new Snowman();
    snowman.position.set(240, -100, 0);
    snowman.rotation.y = THREE.MathUtils.degToRad(-45);

    this.add(snowman);
  }
}
