import Animation from './animation.js';
import Scene2D from './scene-2d.js';
import {timingFunctions} from './utils.js';

const IMG_PATH = `./img/module-4/lose-images`;

const MISHMASH_DURATION = 600;
const MISHMASH_DELAY = 300;

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
  key: {
    imageId: `key`,
    x: 50,
    y: 55,
    size: 15,
    opacity: 0,
    transforms: {}
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

    this.initKeyAnimations();
    this.initCrocoAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initLeafAnimations();
    this.initSnowflakeAnimations();
    this.initSaturnAnimations();
  }

  initKeyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.key.size = OBJECTS.key.size + progress * 5;
        this.objects.key.opacity = progress;
      },
      duration: 200,
      delay: 100,
      easing: timingFunctions.easeLinear
    }));
  }

  initCrocoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.croco.transforms.translateX = 40 * progressReversed;
        this.objects.croco.transforms.rotate = 30 * progressReversed;
        this.objects.croco.opacity = 1;
      },
      duration: 2000,
      delay: 1200,
      easing: timingFunctions.easeInCubic
    }));
  }

  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.size = progress * 20;
        this.objects.flamingo.transforms.rotate = (1 - progress) * 40;
        this.objects.flamingo.transforms.translateX = progress * -25;
      },
      duration: MISHMASH_DURATION,
      delay: MISHMASH_DELAY,
      easing: timingFunctions.easeOutExpo
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.transforms.translateY = progress * 60;
      },
      duration: MISHMASH_DURATION,
      delay: MISHMASH_DURATION + MISHMASH_DELAY,
      easing: timingFunctions.easeInCubic
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

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.transforms.translateY = 25 + progress * 40;
      },
      duration: MISHMASH_DURATION,
      delay: MISHMASH_DURATION + MISHMASH_DELAY,
      easing: timingFunctions.easeInCubic
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

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.transforms.translateY = -10 + progress * 70;
      },
      duration: MISHMASH_DURATION,
      delay: MISHMASH_DURATION + MISHMASH_DELAY,
      easing: timingFunctions.easeInCubic
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

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.transforms.translateY = 10 + progress * 50;
      },
      duration: MISHMASH_DURATION,
      delay: MISHMASH_DURATION + MISHMASH_DELAY,
      easing: timingFunctions.easeInCubic
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

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.transforms.translateY = 25 + progress * 30;
      },
      duration: MISHMASH_DURATION,
      delay: MISHMASH_DURATION + MISHMASH_DELAY,
      easing: timingFunctions.easeInCubic
    }));
  }
}
