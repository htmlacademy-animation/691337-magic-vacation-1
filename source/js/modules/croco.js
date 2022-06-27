import Animation from './animation.js';
import Scene2D from './scene-2d.js';
import {timingFunctions} from './utils.js';

const IMG_PATH = `./img/module-4/lose-images`;

const ANIM_DURATION_S = 200;
const ANIM_DURATION_M = 600;
const ANIM_DURATION_L = 1200;
const DELAY_S = 100;
const DELAY_L = 300;
const DROP_CYCLES = 3;

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
  drop: {
    imageId: `drop`,
    x: 46,
    y: 65,
    size: 0,
    opacity: 1,
    transforms: {
      translateY: 2
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

const LOCALS = Object.freeze({
  crocoMask: {
    centerX: 50,
    centerY: 50,
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

    this.initLocals();

    this.afterInit = () => {
      this.objects.croco.after = this.drawCrocoMask.bind(this);
    };
  }

  init() {
    this.initEventListeners();
    this.initObjects(OBJECTS);
    this.start();
    this.updateSize();
  }

  initLocals() {
    this.locals = {
      crocoMask: {
        centerX: LOCALS.crocoMask.centerX,
        centerY: LOCALS.crocoMask.centerY,
      }
    };
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
    this.initDropAnimations();
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
      duration: ANIM_DURATION_S,
      delay: DELAY_S,
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
      duration: ANIM_DURATION_M,
      delay: ANIM_DURATION_M + DELAY_L,
      easing: timingFunctions.easeInCubic
    }));
  }

  initDropAnimations() {
    for (let i = 0; i < DROP_CYCLES; i++) {
      const delay = i * ANIM_DURATION_L * 2;

      this.animations.push(new Animation({
        func: (progress) => {
          if (progress <= 0.5) {
            this.objects.drop.opacity = 1;
            this.objects.drop.size = progress * 10;
            this.objects.drop.transforms.translateY = progress * 4;
          }
          if (progress > 0.5 && progress <= 0.8) {
            this.objects.drop.transforms.translateY = progress * 9;
          }
          if (progress > 0.8) {
            this.objects.drop.opacity = 5 * (1 - progress);
            this.objects.drop.size = (1 - progress) * 25 < 3 ? 3 : (1 - progress) * 25;
          }
        },
        duration: ANIM_DURATION_L,
        delay: delay + DELAY_L + ANIM_DURATION_M * 2,
        easing: timingFunctions.easeInCubic
      }));
    }
  }

  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.size = progress * 20;
        this.objects.flamingo.transforms.rotate = (1 - progress) * 40;
        this.objects.flamingo.transforms.translateX = progress * -25;
      },
      duration: ANIM_DURATION_M,
      delay: DELAY_L,
      easing: timingFunctions.easeOutExpo
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.transforms.translateY = progress * 60;
      },
      duration: ANIM_DURATION_M,
      delay: ANIM_DURATION_M + DELAY_L,
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
      duration: ANIM_DURATION_M,
      delay: DELAY_L,
      easing: timingFunctions.easeOutExpo
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.transforms.translateY = 25 + progress * 40;
      },
      duration: ANIM_DURATION_M,
      delay: ANIM_DURATION_M + DELAY_L,
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
      duration: ANIM_DURATION_M,
      delay: DELAY_L,
      easing: timingFunctions.easeOutExpo
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.transforms.translateY = -10 + progress * 70;
      },
      duration: ANIM_DURATION_M,
      delay: ANIM_DURATION_M + DELAY_L,
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
      duration: ANIM_DURATION_M,
      delay: DELAY_L,
      easing: timingFunctions.easeOutExpo
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.transforms.translateY = 10 + progress * 50;
      },
      duration: ANIM_DURATION_M,
      delay: ANIM_DURATION_M + DELAY_L,
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
      duration: ANIM_DURATION_M,
      delay: DELAY_L,
      easing: timingFunctions.easeOutExpo
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.transforms.translateY = 25 + progress * 30;
      },
      duration: ANIM_DURATION_M,
      delay: ANIM_DURATION_M + DELAY_L,
      easing: timingFunctions.easeInCubic
    }));
  }

  drawCrocoMask() {
    const factor = this.size / 100;
    const step = 12.5;
    const x = this.locals.crocoMask.centerX;
    const y = this.locals.crocoMask.centerY;
    const pointX1 = x * factor;
    const pointY1 = (y - step) * factor;
    const pointX2 = (x + step / 2) * factor;
    const pointY2 = (y + 5.5) * factor;
    const pointX3 = (x + step) * factor;
    const pointX4 = (x + step) * factor;
    const pointY4 = (y - 10) * factor;

    this.ctx.save();
    this.ctx.fillStyle = `#5f458c`;

    this.ctx.beginPath();

    this.ctx.moveTo(pointX1, pointY1);
    this.ctx.lineTo(pointX1 + this.size / 2, pointY1);
    this.ctx.lineTo(pointX1 + this.size / 2, pointY1 * 2.2);
    this.ctx.lineTo(pointX3, pointY1 * 2.2);
    this.ctx.lineTo(pointX2, pointY2);
    this.ctx.bezierCurveTo(pointX4, pointX1, pointX4, pointY4, pointX1, pointY1);
    this.ctx.fill();
  }
}
