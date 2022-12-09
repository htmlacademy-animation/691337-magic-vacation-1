import * as THREE from 'three';
import {MATERIAL_COLOR, createLatheGeometry} from './utils-scenes.js';
import CarpetMaterial from './materials/carpetMaterial.js';

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

  constructChildren() {
    this.addCarpet();
    this.addRoad();
  }

  addCarpet() {
    const innerRadius = 763;
    const width = 180;
    const height = 3;
    const outerRadius = innerRadius + width;
    const geometry = createLatheGeometry(innerRadius, outerRadius, height, 32, 16, 74);
    //const material = new THREE.MeshBasicMaterial({color: 0x66499f});
    const material = new CarpetMaterial({color: new THREE.Color(MATERIAL_COLOR.lightPurple)});
    const carpet = new THREE.Mesh(geometry, material);
    carpet.position.set(0, -200, -430);
    carpet.rotation.set(0, -0.78, 0);
    carpet.scale.set(0.65, 0.65, 0.65);

    this.add(carpet);
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
}
