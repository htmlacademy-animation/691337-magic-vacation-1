import SceneBasic from './scene-basic.js';

export default class SceneIntro extends SceneBasic {
  constructor() {
    const canvas = document.getElementById(`scene-intro`);
    const texture = `./3d/scenes-textures/scene-0.png`;

    super({
      canvas,
      texture,
    });

  }

  init() {
    this.createScene();
  }
}
