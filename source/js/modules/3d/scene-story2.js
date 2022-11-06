import * as THREE from 'three';
//only for development
import GUI from 'lil-gui';

//pyramid color 1e60c9

const gui = new GUI();

export default class SceneStory2 extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-story`);
    this.texture = `./3d/scenes-textures/scene-2.png`;
    this.isTextureWithBubbles = true;

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.5
    });
    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
  }

  addPyramid() {
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(250, 280, 4), this.defaultMaterial);
    mesh.scale.set(0.44, 0.57, 0.74);
    mesh.position.set(-15, -41, 0);

    //development only
    gui.add(mesh.scale, `x`, 0, 1, 0.01).name(`scaleX`);
    gui.add(mesh.scale, `y`, 0, 1, 0.01).name(`scaleY`);
    gui.add(mesh.scale, `z`, 0, 1, 0.01).name(`scaleZ`);
    gui.add(mesh.position, `x`, -100, 100, 1).name(`posX`);
    gui.add(mesh.position, `y`, -100, 100, 1).name(`posY`);

    this.add(mesh);
  }
}
