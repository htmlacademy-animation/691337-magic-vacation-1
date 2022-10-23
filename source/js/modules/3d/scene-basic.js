import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';

export default class SceneBasic {
  constructor(options) {
    this.canvas = options.canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.cameraParams = {
      fov: 35,
      aspect: this.width / this.height,
      near: 0.1,
      far: 1000
    };
    this.HUE_MIN = -0.2;
    this.HUE_MAX = -0.5;
    this.infrastructure = this.createInfrastructure();
    this.scene = this.infrastructure.scene;
    this.camera = this.infrastructure.camera;
    this.renderer = this.infrastructure.renderer;

    this.createScene = this.createScene.bind(this);
  }

  getRandomHue(min, max) {
    return Math.random() * (max - min) + min;
  }

  createInfrastructure() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(this.cameraParams.fov, this.cameraParams.aspect,
        this.cameraParams.near, this.cameraParams.far);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const infrastructure = {
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer
    };

    return infrastructure;
  }

  createScene(scene) {
    this.textureGeometry = new THREE.PlaneGeometry(this.width, this.height);
    this.isTextureWithBubbles = scene.isTextureWithBubbles;

    const loader = new THREE.TextureLoader();
    this.texture = loader.load(scene.texture);

    if (this.texture) {
      this.material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: {value: this.texture},
          uTextureWithBubbles: {value: this.isTextureWithBubbles},
          uResolution: {value: new THREE.Vector2(this.width, this.height)},
          uHue: {value: this.getRandomHue(this.HUE_MAX, this.HUE_MIN)},
          uTime: {value: 0},
        }
      });


      this.mesh = new THREE.Mesh(this.textureGeometry, this.material);
      this.scene.add(this.mesh);
    }

    this.camera.position.z = 750;
    this.scene.add(this.camera);

    this.renderer.render(this.scene, this.camera);

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      this.material.uniforms.uTime.value = elapsedTime;

      this.renderer.render(this.scene, this.camera);

      window.requestAnimationFrame(tick);
    };

    tick();
  }

  createLights() {
    this.lightsGroup = new THREE.Group();

    this.directionalLight = new THREE.DirectionalLight(new THREE.Color(`rgb(255, 255, 255)`), 0.84);
    this.directionalLight.position.set(1, 0.25, 0);
    this.pointLight1 = new THREE.PointLight(new THREE.Color(`rgb(246, 242, 255)`), 0.60, 10, 2);
    this.pointLight1.position.set(0.5, -0.5, 1);
    this.pointLight2 = new THREE.PointLight(new THREE.Color(`rgb(246, 242, 255)`), 0.60, 6, 2);
    this.pointLight2.position.set(0, -0.5, 1);

    this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 0.2);
    this.pointLightHelper1 = new THREE.PointLightHelper(this.pointLight1, 0.2);
    this.pointLightHelper2 = new THREE.PointLightHelper(this.pointLight2, 0.2);

    this.lightsGroup.add(this.directionalLight, this.pointLight1, this.pointLight2);
    this.lightsGroup.add(this.directionalLightHelper, this.pointLightHelper1, this.pointLightHelper2);
    this.scene.add(this.lightsGroup);
  }
}
