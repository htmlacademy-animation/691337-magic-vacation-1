import * as THREE from 'three';
import SceneBasic from './scene-basic.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

export default class SceneExercise extends SceneBasic {
  constructor() {
    const canvas = document.getElementById(`scene-exercise`);

    super({
      canvas,
    });

  }

  init() {
    this.canvas.style.zIndex = `10`;
    this.addMesh();
    this.createLight();
    this.renderer.render(this.scene, this.camera);
  }

  addMesh() {
    this.camera.position.z = 750;

    this.geometry = new THREE.SphereGeometry(200, 32, 32);
    this.material = new THREE.MeshStandardMaterial();
    this.material.roughness = 0.4;
    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.sphere, this.camera);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;


    const tick = () => {

      this.controls.update();

      this.renderer.render(this.scene, this.camera);

      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
