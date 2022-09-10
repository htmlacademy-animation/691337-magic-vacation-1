import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';

export default class SceneBasic {
  constructor(options) {
    this.canvas = options.canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.perspectiveAngle = 75;
    this.Z_MIN = 0.1;
    this.Z_MAX = 1000;
    this.HUE = -0.4;

    this.createScene = this.createScene.bind(this);
  }

  loadTexture(url) {
    return new Promise((resolve) => {
      const onLoad = function () {
        resolve(texture);
      };
      const onProgress = function () {};
      const onError = function () {
        resolve(false);
      };

      const loadingManager = new THREE.LoadingManager(onLoad, onProgress, onError);
      const loader = new THREE.TextureLoader(loadingManager);
      const texture = loader.load(url);
    });
  }

  async createScene(scene) {
    this.scene = new THREE.Scene();
    this.geometry = new THREE.PlaneGeometry(this.width, this.height);

    this.textureColorChange = scene.textureColorChange;
    this.texture = await this.loadTexture(scene.texture);

    if (this.texture) {
      this.material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: {value: this.texture},
          uTextureColorChange: {value: this.textureColorChange},
          uResolution: {value: new THREE.Vector2(this.width, this.height)},
          uHue: {value: this.HUE},
          uTime: {value: 0},
        }
      });

      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);
    }

    this.camera = new THREE.PerspectiveCamera(this.perspectiveAngle, this.width / this.height,
        this.Z_MIN, this.Z_MAX);
    this.camera.position.z = 450;
    this.scene.add(this.camera);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      this.material.uniforms.uTime.value = elapsedTime;
      this.renderer.render(this.scene, this.camera);

      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
