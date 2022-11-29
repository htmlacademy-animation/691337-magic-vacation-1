import * as THREE from 'three';
import {createLatheGeometry, createSphereGeometry, createCylinderGeometry} from './utils-scenes.js';
import Saturn from './models/saturn.js';

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
    this.addSaturn();
  }

  addCarpet() {
    const innerRadius = 763;
    const width = 180;
    const height = 3;
    const outerRadius = innerRadius + width;
    const geometry = createLatheGeometry(innerRadius, outerRadius, height, 32, 16, 74);
    const material = new THREE.MeshBasicMaterial({color: 0x66499f});
    const carpet = new THREE.Mesh(geometry, material);
    carpet.position.set(0, -200, -430);
    carpet.rotation.set(0, -0.78, 0);
    carpet.scale.set(0.65, 0.65, 0.65);

    this.add(carpet);
  }

  addRoad() {
    const innerRadius = 732;
    const width = 160;
    const height = 3;
    const outerRadius = innerRadius + width;
    const geometry = createLatheGeometry(innerRadius, outerRadius, height, 32, 0, 90);
    const material = new THREE.MeshBasicMaterial({color: 0x626978});
    const road = new THREE.Mesh(geometry, material);
    road.position.set(0, -135, -200);
    road.rotation.set(0, -0.78, 0);
    road.scale.set(0.6, 0.6, 0.6);

    this.add(road);
  }

  addSaturn() {
    const lampGroup = new THREE.Group();
    const saturn = new Saturn();
    saturn.scale.set(0.6, 0.6, 0.6);

    const hangerGroup = new THREE.Group();
    hangerGroup.position.set(0, 65, 0);

    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x6a45c8,
    });
    const cylinderMaterial = new THREE.MeshStandardMaterial({
      color: 0x7d8a9f,
    });

    const sphere = new THREE.Mesh(createSphereGeometry(10, 12, 12), sphereMaterial);

    const cylinder = new THREE.Mesh(createCylinderGeometry(1, 1, 1000, 16, 16), cylinderMaterial);
    cylinder.position.set(0, 430, 0);

    hangerGroup.add(sphere, cylinder);
    hangerGroup.scale.set(0.6, 0.6, 0.6);

    lampGroup.add(hangerGroup, saturn);
    lampGroup.position.set(57, 157, 0);

    this.add(lampGroup);
  }
}
