import SceneBasic from './scene-basic.js';

export default class SceneStory4 extends SceneBasic {
  constructor() {
    const canvas = document.getElementById(`scene-story`);
    const texture = `./3d/scenes-textures/scene-4.png`;

    super({
      canvas,
      texture,
    });

  }

  init() {
    this.createScene();
  }
}
