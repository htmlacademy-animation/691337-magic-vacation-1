import * as THREE from 'three';
import Saturn from './models/saturn.js';
import {MATERIAL_REFLECTION, MATERIAL_COLOR} from './utils-scenes.js';
// development only
// import GUI from 'lil-gui';
// const gui = new GUI();

export default class SceneStory4 extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-story`);
    this.texture = `./3d/scenes-textures/scene-4.png`;
    this.isTextureWithBubbles = false;

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0x6a45c8,
    });
    this.constructChildren();
  }

  constructChildren() {
    this.addSaturn();
  }

  addSaturn() {
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
}
