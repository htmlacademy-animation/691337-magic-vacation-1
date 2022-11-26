import * as THREE from 'three';
import {getRadiansFromDegrees} from '../utils.js';
import Snowman from './models/snowman.js';
// development only
// import GUI from 'lil-gui';
// const gui = new GUI();

export default class SceneStory3 extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-story`);
    this.texture = `./3d/scenes-textures/scene-3.png`;
    this.isTextureWithBubbles = false;

    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });
    this.constructChildren();
  }

  constructChildren() {
    this.addRoad();
    this.addSnowman();
  }

  getLatheGeometry(radius, width, height, segments, startAngle, endAngle) {
    const angle = endAngle - startAngle;
    const coords = [[radius, 0], [radius + width, 0], [radius + width, height], [radius, height]];
    const points = coords.map(([a, b]) => new THREE.Vector2(a, b));
    const phiStart = THREE.MathUtils.degToRad(startAngle);
    const phiLength = THREE.MathUtils.degToRad(angle);

    const geometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
    return geometry;
  }

  addRoad() {
    const geometry = this.getLatheGeometry(732, 160, 3, 32, 0, 90);
    const material = new THREE.MeshBasicMaterial({color: 0x626978});
    const road = new THREE.Mesh(geometry, material);
    road.position.set(0, -135, -200);
    road.rotation.set(0, -0.78, 0);
    road.scale.set(0.6, 0.6, 0.6);

    // development only
    // gui.add(road.position, `x`, -300, 300, 1).name(`posX`);
    // gui.add(road.position, `y`, -300, 300, 1).name(`posY`);
    // gui.add(road.position, `z`, -700, 700, 1).name(`posZ`);
    // gui.add(road.rotation, `x`, -5, 5, 0.01).name(`rotX`);
    // gui.add(road.rotation, `y`, -5, 5, 0.01).name(`rotY`);
    // gui.add(road.rotation, `z`, -5, 5, 0.01).name(`rotZ`);
    // gui.add(road.scale, `x`, -3, 3, 0.01).name(`scaleX`);
    // gui.add(road.scale, `y`, -3, 3, 0.01).name(`scaleY`);
    // gui.add(road.scale, `z`, -3, 3, 0.01).name(`scaleZ`);

    this.add(road);
  }

  addSnowman() {
    const snowman = new Snowman();
    snowman.position.set(240, -100, 0);
    snowman.rotation.y = getRadiansFromDegrees(-45);

    this.add(snowman);
  }
}
