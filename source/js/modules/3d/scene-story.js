import SceneBasic from './scene-basic.js';

const TEXTURE_PATH = `./3d/scenes-textures`;

const STORY_SCENES = {
  scene1: {
    texture: `${TEXTURE_PATH}/scene-1.png`,
    isTextureWithBubbles: false,
  },
  scene2: {
    texture: `${TEXTURE_PATH}/scene-2.png`,
    isTextureWithBubbles: true,
  },
  scene3: {
    texture: `${TEXTURE_PATH}/scene-3.png`,
    isTextureWithBubbles: false,
  },
  scene4: {
    texture: `${TEXTURE_PATH}/scene-4.png`,
    isTextureWithBubbles: false,
  },
};

export default class SceneStory extends SceneBasic {
  constructor() {
    const canvas = document.getElementById(`scene-story`);

    super({
      canvas,
    });

    this.canvas = document.getElementById(`scene-story`);
    this.story = STORY_SCENES.scene1;
    this.sliderElements = document.querySelectorAll(`.swiper-slide`);
    this.controls = document.querySelectorAll(`.slider__control`);

    this.switchScene = this.switchScene.bind(this);
  }

  init() {
    this.createScene(this.story);
    this.addListeners();
  }

  switchScene(evt) {
    evt.preventDefault();
    const currentIndex = Array.from(this.sliderElements).findIndex((it) => it.classList.contains(`swiper-slide-active`));
    switch (currentIndex) {
      case 0:
        this.story = STORY_SCENES.scene1;
        break;
      case 2:
        this.story = STORY_SCENES.scene2;
        break;
      case 4:
        this.story = STORY_SCENES.scene3;
        break;
      case 6:
        this.story = STORY_SCENES.scene4;
        break;
      default:
        this.story = STORY_SCENES.scene1;
    }

    this.createScene(this.story);
  }

  addListeners() {
    Array.from(this.controls).forEach((it) => {
      it.addEventListener(`click`, this.switchScene);
    });
  }
}
