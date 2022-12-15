import * as THREE from 'three';
import Saturn from './models/saturn.js';
import {createLatheGeometry, MATERIAL_REFLECTION, MATERIAL_COLOR} from './utils-scenes.js';
import CarpetMaterial from './materials/carpetMaterial.js';
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
    this.addCarpet();
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

  addCarpet() {
    const innerRadius = 763;
    const width = 180;
    const height = 3;
    const outerRadius = innerRadius + width;
    const geometry = createLatheGeometry(innerRadius, outerRadius, height, 32, 16, 74);
    const material = new CarpetMaterial(
        {color1: new THREE.Color(MATERIAL_COLOR.shadowedLightPurple),
          color2: new THREE.Color(MATERIAL_COLOR.shadowedAdditionalPurple),
          reflection: MATERIAL_REFLECTION.soft});
    const carpet = new THREE.Mesh(geometry, material);
    carpet.position.set(0, 0, -430);
    carpet.rotation.set(0, -0.78, 0);
    carpet.scale.set(0.65, 0.65, 0.65);

    this.add(carpet);
  }
}
