import * as THREE from 'three';

export default class ExtrudeShapes extends THREE.Group {
  constructor(mapOfShapes, shapeItem) {
    super();

    this.mapOfShapes = mapOfShapes;
    this.shapeItem = this.getShape(shapeItem);
    this.material = new THREE.MeshBasicMaterial({color: 0xff00000});

    this.constructChildren();
  }

  constructChildren() {
    this.createExtrudeGeometryShape();
  }

  getShape(name) {
    return this.mapOfShapes.find((it) => it.name === name);
  }

  createExtrudeGeometryShape() {
    this.shapeItem.shape.forEach((it) => {
      const geometry = new THREE.ExtrudeGeometry(it, {
        depth: this.shapeItem.depth,
        bevelEnabled: true,
        bevelThickness: this.shapeItem.cap,
      });

      const mesh = new THREE.Mesh(geometry, this.material);
      this.add(mesh);
    });
  }
}
