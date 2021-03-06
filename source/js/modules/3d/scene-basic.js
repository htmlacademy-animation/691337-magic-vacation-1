import * as THREE from 'three';

export default class SceneBasic {
  constructor(options) {
    this.canvas = options.canvas;
    this.texture = options.texture;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.perspectiveAngle = 75;
    this.Z_MIN = 0.1;
    this.Z_MAX = 1000;

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

  async createScene() {
    this.scene = new THREE.Scene();
    this.geometry = new THREE.PlaneGeometry(this.width, this.height);

    this.texture = await this.loadTexture(this.texture);

    if (this.texture) {
      this.material = new THREE.MeshBasicMaterial({
        map: this.texture
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
    this.renderer.render(this.scene, this.camera);
  }
}
