import SceneBasic from './scene-basic.js';

export default class SceneStory2 extends SceneBasic {
  constructor() {
    const canvas = document.getElementById(`scene-story`);
    const texture = `./3d/scenes-textures/scene-2.png`;

    super({
      canvas,
      texture,
    });

  }

  init() {
    this.createScene();
  }
}
