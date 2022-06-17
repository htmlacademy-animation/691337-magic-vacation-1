import Animation from './animation.js';
import Scene2D from './scene-2d.js';
import {timingFunctions} from './utils.js';

const IMG_PATH = `./img/module-4/lose-images`;

const MISHMASH_DURATION = 8000;
const MISHMASH_DELAY = 500;

const IMAGES_URLS = Object.freeze({
  croco: `${IMG_PATH}/crocodile.png`,
  drop: `${IMG_PATH}/drop.png`,
  flamingo: `${IMG_PATH}/flamingo.png`,
  key: `${IMG_PATH}/key.png`,
  leaf: `${IMG_PATH}/leaf.png`,
  saturn: `${IMG_PATH}/saturn.png`,
  snowflake: `${IMG_PATH}/snowflake.png`,
  watermelon: `${IMG_PATH}/watermelon.png`
});

const MISHMASH_PROPS = {
  x: 50,
  y: 50,
  size: 0,
  opacity: 1,
  transforms: {}
};

const OBJECTS = Object.freeze({
  drop: {
    imageId: `drop`,
    x: 65,
    y: 62,
    size: 5,
    opacity: 0,
    transforms: {
      translateY: 30
    }
  },
  key: {
    imageId: `key`,
    x: 50,
    y: 55,
    size: 20,
    opacity: 0,
    transforms: {
      translateY: 30
    }
  },
  flamingo: {
    imageId: `flamingo`,
    ...MISHMASH_PROPS
  },
  leaf: {
    imageId: `leaf`,
    ...MISHMASH_PROPS
  },
  saturn: {
    imageId: `saturn`,
    ...MISHMASH_PROPS
  },
  snowflake: {
    imageId: `snowflake`,
    ...MISHMASH_PROPS
  },
  watermelon: {
    imageId: `watermelon`,
    ...MISHMASH_PROPS
  },
  croco: {
    imageId: `croco`,
    x: 49,
    y: 52,
    size: 90,
    opacity: 0,
    transforms: {
      translateY: 10
    }
  }
});

export default class Scene2DCroco extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`croco-scene`);

    super({
      canvas,
      objects: OBJECTS,
      imagesUrls: IMAGES_URLS,
    });
  }

  init() {
    this.initEventListeners();
    this.initObjects(OBJECTS);
    this.start();
    this.updateSize();
  }

  initEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }

  initAnimations() {
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));

    //this.initCrocoAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initLeafAnimations();
    this.initSnowflakeAnimations();
    this.initSaturnAnimations();

    this.initKeyAnimations();
  }

  /*initCrocoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        console.log(`croco anim`);
        this.objects.croco.transforms.translateX = 40 * progressReversed;
        this.objects.croco.transforms.rotate = 10 * progressReversed;
        this.objects.croco.opacity = progress;
      },
      duration: 2000,
      delay: 1200,
      easing: timingFunctions.easeInQuad
    }));
  }*/

  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.size = progress * 20;
        this.objects.flamingo.transforms.rotate = (1 - progress) * 40;
        this.objects.flamingo.transforms.translateX = progress * -25;
        //this.objects.flamingo.transforms.translateY = progress * -15;
      },
      duration: MISHMASH_DURATION,
      delay: MISHMASH_DELAY,
      easing: timingFunctions.easeOutExpo
    }));
  }

  initWatermelonAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.size = progress * 20;
        this.objects.watermelon.transforms.rotate = (1 - progress) * 40;
        this.objects.watermelon.transforms.translateX = progress * -40;
        this.objects.watermelon.transforms.translateY = progress * 25;

      },
      duration: MISHMASH_DURATION,
      delay: MISHMASH_DELAY,
      easing: timingFunctions.easeOutExpo
    }));
  }

  initLeafAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.size = progress * 20;
        this.objects.leaf.transforms.rotate = (1 - progress) * -40;
        this.objects.leaf.transforms.translateX = progress * 40;
        this.objects.leaf.transforms.translateY = progress * -10;
      },
      duration: MISHMASH_DURATION,
      delay: MISHMASH_DELAY,
      easing: timingFunctions.easeOutExpo
    }));
  }

  initSnowflakeAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.size = progress * 20;
        this.objects.snowflake.transforms.rotate = (1 - progress) * -40;
        this.objects.snowflake.transforms.translateX = progress * 25;
        this.objects.snowflake.transforms.translateY = progress * 10;
      },
      duration: MISHMASH_DURATION,
      delay: MISHMASH_DELAY,
      easing: timingFunctions.easeOutExpo
    }));
  }

  initSaturnAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.size = progress * 20;
        this.objects.saturn.transforms.rotate = (1 - progress) * 40;
        this.objects.saturn.transforms.translateX = progress * 40;
        this.objects.saturn.transforms.translateY = progress * 25;
      },
      duration: MISHMASH_DURATION,
      delay: MISHMASH_DELAY,
      easing: timingFunctions.easeOutExpo
    }));
  }

  initKeyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.key.transforms.translateY = 30 * (1 - progress);
        this.objects.key.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: timingFunctions.easeInQuad
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.key.transforms.translateY = 30 * (1 - progress);
        this.objects.key.opacity = progress;
      },
      duration: 500,
      delay: 1500,
      easing: timingFunctions.easeInQuad
    }));
  }


}
