import SceneBasic from './scene-basic.js';

const SCENE = {
  texture: `./3d/scenes-textures/scene-0.png`,
  isTextureWithBubbles: false,
};

export default class SceneIntro extends SceneBasic {
  constructor() {
    const canvas = document.getElementById(`scene-intro`);

    super({
      canvas,
    });

  }

  init() {
    this.createScene(SCENE);
  }

}
