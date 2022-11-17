import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import SceneIntro from './scene-intro.js';
import SceneStory1 from './scene-story1.js';
import SceneStory2 from './scene-story2.js';
import SceneStory3 from './scene-story3.js';
import SceneStory4 from './scene-story4.js';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
import SceneExercise from './scene-exercise.js';

const HUE_MIN = -0.2;
const HUE_MAX = -0.5;
const width = window.innerWidth;
const height = window.innerHeight;

const body = document.querySelector(`body`);
const screenIntro = document.getElementById(`top`);

const switchScene = () => {
  //let scene = new SceneExercise();
  let scene = new SceneIntro();
  const isIntroHidden = screenIntro.classList.contains(`screen--hidden`);

  if (isIntroHidden) {
    const story = Array.from(body.classList).filter((it) => it.includes(`story`))[0] || ``;
    switch (story) {
      case `story-1`:
        scene = new SceneStory1();
        break;
      case `story-2`:
        scene = new SceneStory2();
        break;
      case `story-3`:
        scene = new SceneStory3();
        break;
      case `story-4`:
        scene = new SceneStory4();
        break;
      default:
        scene = new SceneStory1();
    }
  }

  return scene;
};

const createInfrastructure = (canvas) => {
  const cameraParams = {
    fov: 35,
    aspect: width / height,
    near: 0.1,
    far: 1000
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(cameraParams.fov, cameraParams.aspect,
      cameraParams.near, cameraParams.far);

  canvas.style.zIndex = `10`;

  const renderer = new THREE.WebGLRenderer({
    canvas
  });

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  const infrastructure = {
    scene,
    camera,
    renderer
  };

  return infrastructure;
};

const getRandomHue = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getTextureMaterial = (scene) => {
  const isTextureWithBubbles = scene.isTextureWithBubbles;
  const loader = new THREE.TextureLoader();
  const textureUrl = loader.load(scene.texture);

  const textureMaterial = new THREE.RawShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTexture: {value: textureUrl},
      uTextureWithBubbles: {value: isTextureWithBubbles},
      uResolution: {value: new THREE.Vector2(width, height)},
      uHue: {value: getRandomHue(HUE_MAX, HUE_MIN)},
      uTime: {value: 0},
    }
  });

  return textureMaterial;
};

const addTexture = (textureMaterial) => {
  const textureGeometry = new THREE.PlaneGeometry(width, height);
  const texture = new THREE.Mesh(textureGeometry, textureMaterial);
  return texture;
};

const createLight = (target) => {
  const light = new THREE.Group();

  const directionalLight = new THREE.DirectionalLight(new THREE.Color(`rgb(255, 255, 255)`), 0.84);
  directionalLight.target = target;
  light.add(directionalLight);

  const pointLight1 = new THREE.PointLight(new THREE.Color(`rgb(246, 242, 255)`), 0.60, 0, 2);
  pointLight1.position.set(-785, -350, -710);
  light.add(pointLight1);

  const pointLight2 = new THREE.PointLight(new THREE.Color(`rgb(245, 254, 255)`), 0.95, 0, 2);
  pointLight2.position.set(940, 800, -985);
  light.add(pointLight2);

  return light;
};

const init = () => {
  const activeScene = switchScene();
  const infrastructure = createInfrastructure(activeScene.canvas);
  const {scene, camera, renderer} = infrastructure;

  camera.position.z = 750;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, activeScene.canvas);
  controls.enableDamping = true;

  // const textureMaterial = getTextureMaterial(activeScene);
  // const texture = addTexture(textureMaterial);
  // scene.add(texture);
  scene.add(activeScene);

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // textureMaterial.uniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };

  tick();

  const lightTarget = new THREE.Object3D();
  lightTarget.position.y = camera.position.z * Math.tan(15 * Math.PI / 180);
  scene.add(lightTarget);

  const light = createLight(lightTarget);
  light.position.z = camera.position.z;

  scene.add(light);

  renderer.render(scene, camera);
};

export default init;
