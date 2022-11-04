import * as THREE from 'three';

const SCENE = {
  texture: `./3d/scenes-textures/scene-0.png`,
  isTextureWithBubbles: false,
  canvas: document.getElementById(`scene-intro`)
};

export default class SceneIntro {
  constructor() {
    this.texture = SCENE.texture;
    this.isTextureWithBubbles = SCENE.isTextureWithBubbles;
    this.canvas = SCENE.canvas;
  }

}
