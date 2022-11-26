import * as THREE from 'three';
import getShapes from './shapes/shapeLoader.js';
import ExtrudeShapes from './shapes/extrudeShapes.js';
// development only
// import GUI from 'lil-gui';
// const gui = new GUI();

export default class SceneStory1 extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-story`);
    this.texture = `./3d/scenes-textures/scene-1.png`;
    this.isTextureWithBubbles = false;

    this.mapOfShapes = [];
    this.constructChildren();
  }

  async constructChildren() {
    this.mapOfShapes = await getShapes();
    this.addFlower();
    this.addCarpet();
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

  addCarpet() {
    const geometry = this.getLatheGeometry(763, 180, 3, 32, 16, 74);
    const material = new THREE.MeshBasicMaterial({color: 0x66499f});
    const carpet = new THREE.Mesh(geometry, material);
    carpet.position.set(0, -200, -430);
    carpet.rotation.set(0, -0.78, 0);
    carpet.scale.set(0.65, 0.65, 0.65);

    // development only
    // gui.add(carpet.position, `x`, -300, 300, 1).name(`posX`);
    // gui.add(carpet.position, `y`, -300, 300, 1).name(`posY`);
    // gui.add(carpet.position, `z`, -700, 700, 1).name(`posZ`);
    // gui.add(carpet.rotation, `x`, -5, 5, 0.01).name(`rotX`);
    // gui.add(carpet.rotation, `y`, -5, 5, 0.01).name(`rotY`);
    // gui.add(carpet.rotation, `z`, -5, 5, 0.01).name(`rotZ`);
    // gui.add(carpet.scale, `x`, -3, 3, 0.01).name(`scaleX`);
    // gui.add(carpet.scale, `y`, -3, 3, 0.01).name(`scaleY`);
    // gui.add(carpet.scale, `z`, -3, 3, 0.01).name(`scaleZ`);

    this.add(carpet);
  }

  addFlower() {
    const flower = new ExtrudeShapes(this.mapOfShapes, `flower`);
    flower.position.set(0, 211, 15);
    flower.rotation.set(0.13, 0.77, 3.14);
    flower.scale.set(0.5, 0.5, 0.3);

    // development only
    // gui.add(flower.position, `x`, -300, 300, 1).name(`posX`);
    // gui.add(flower.position, `y`, -300, 300, 1).name(`posY`);
    // gui.add(flower.position, `z`, -50, 50, 1).name(`posZ`);
    // gui.add(flower.rotation, `x`, -5, 5, 0.01).name(`rotX`);
    // gui.add(flower.rotation, `y`, -5, 5, 0.01).name(`rotY`);
    // gui.add(flower.rotation, `z`, -5, 5, 0.01).name(`rotZ`);
    // gui.add(flower.scale, `x`, -3, 3, 0.01).name(`scaleX`);
    // gui.add(flower.scale, `y`, -3, 3, 0.01).name(`scaleY`);
    // gui.add(flower.scale, `z`, -3, 3, 0.01).name(`scaleZ`);

    this.add(flower);
  }
}
