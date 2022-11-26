import * as THREE from 'three';

export default class SceneExercise extends THREE.Group {
  constructor() {
    super();

    this.canvas = document.getElementById(`scene-exercise`);
    // this.texture = `./3d/scenes-textures/scene-2.png`;
    // this.isTextureWithBubbles = false;

    this.constructChildren();
  }

  constructChildren() {
    this.addCarpet();
    this.addRoad();
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

    this.add(carpet);
  }

  addRoad() {
    const geometry = this.getLatheGeometry(732, 160, 3, 32, 0, 90);
    const material = new THREE.MeshBasicMaterial({color: 0x626978});
    const road = new THREE.Mesh(geometry, material);
    road.position.set(0, -135, -200);
    road.rotation.set(0, -0.78, 0);
    road.scale.set(0.6, 0.6, 0.6);

    this.add(road);
  }
}
