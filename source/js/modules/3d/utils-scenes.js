import * as THREE from 'three';

export const createLatheGeometry = (innerRadius, outerRadius, height, segments, startAngle, endAngle) => {
  const angle = endAngle - startAngle;
  const coords = [[innerRadius, 0], [outerRadius, 0], [outerRadius, height], [innerRadius, height]];
  const points = coords.map(([a, b]) => new THREE.Vector2(a, b));
  const phiStart = THREE.MathUtils.degToRad(startAngle);
  const phiLength = THREE.MathUtils.degToRad(angle);

  const geometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
  return geometry;
};

export const createSphereGeometry = (radius, segmentsWidth, segmentsHeight) => {
  const geometry = new THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight);
  return geometry;
};

export const createCylinderGeometry = (radiusTop, radiusBottom, height, radialSegments, heightSegments) => {
  const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments);
  return geometry;
};
