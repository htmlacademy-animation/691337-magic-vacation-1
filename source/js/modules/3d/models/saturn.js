import * as THREE from 'three';
import {createLatheGeometry, createMaterial} from '../utils-scenes.js';


export default class Saturn extends THREE.Group {
  constructor(materialReflection, planetColor, ringColor, isWithHanger = false, hangerColor) {
    super();

    this.defaultColor = `rgb(255, 255, 255)`;
    this.reflection = materialReflection;
    this.planetColor = planetColor;
    this.ringColor = ringColor;
    this.hangerColor = hangerColor || this.defaultColor;
    this.isWithHanger = isWithHanger;

    this.constructChildren();
  }

  constructChildren() {
    this.addSaturn();
  }

  addSaturn() {
    const group = new THREE.Group();
    if (this.isWithHanger) {
      group.add(this.addPlanet(), this.addRing(), this.addHanger());
    } else {
      group.add(this.addPlanet(), this.addRing());
    }

    this.add(group);
  }

  addPlanet() {
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(60, 12, 12),
        createMaterial(this.reflection, this.planetColor));
    return sphere;
  }

  addRing() {
    const innerRadius = 80;
    const outerRadius = 120;
    const height = 2;
    const segments = 32;
    const rotAngleDeg = 18;
    const ring = new THREE.Mesh(createLatheGeometry(innerRadius, outerRadius, height, segments, 0, 360),
        createMaterial(this.reflection, this.ringColor));
    ring.rotation.x = THREE.MathUtils.degToRad(rotAngleDeg);
    ring.rotation.z = THREE.MathUtils.degToRad(rotAngleDeg);
    return ring;
  }

  addHanger() {
    const hangerGroup = new THREE.Group();
    hangerGroup.position.set(0, 100, 0);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 12, 12),
        createMaterial(this.reflection, this.ringColor));

    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1000, 16, 16),
        createMaterial(this.reflection, this.hangerColor));
    cylinder.position.set(0, 430, 0);

    hangerGroup.add(sphere, cylinder);

    return hangerGroup;
  }
}
