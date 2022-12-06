import * as THREE from 'three';

export const MATERIAL_COLOR = {
  blue: `rgb(51, 113, 235)`,
  brightBlue: `rgb(47, 58, 201)`,
  lightBlue:	`rgb(150, 176, 243)`,
  darkBlue:	`rgb(12, 49, 112)`,
  skyLightBlue:	`rgb(161, 200, 240)`,
  mountainBlue:	`rgb(101, 152, 219)`,
  dominantRed:	`rgb(255, 32, 66)`,
  lightDominantRed:	`rgb(255, 105, 120)`,
  shadowedDominantRed:	`rgb(124, 26, 48)`,
  purple:	`rgb(163, 118, 235)`,
  brightPurple:	`rgb(118, 76, 225)`,
  lightPurple:	`rgb(194, 153, 225)`,
  additionalPurple:	`rgb(119, 85, 189)`,
  darkPurple:	`rgb(76, 49, 121)`,
  shadowedPurple:	`rgb(75, 50, 116)`,
  shadowedBrightPurple:	`rgb(56, 37, 108)`,
  shadowedLightPurple:	`rgb(77, 53, 106)`,
  shadowedAdditionalPurple:	`rgb(55, 38, 89)`,
  shadowedDarkPurple:	`rgb(49, 42, 71)`,
  grey:	`rgb(118, 125, 143)`,
  metalGrey:	`rgb(126, 141, 164)`,
  orange:	`rgb(230, 80, 0)`,
  green:	`rgb(0, 210, 134)`,
  white:	`rgb(255, 255, 255)`,
  snowColor:	`rgb(182, 206, 240)`,
};

export const MATERIAL_REFLECTION = {
  soft: {
    metalness: 0.75,
    roughness: 0.95
  },
  basic: {
    metalness: 0.45,
    roughness: 0.65,
  },
  strong: {
    metalness: 0.1,
    roughness: 0.5,
  }
};

export const createLatheGeometry = (innerRadius, outerRadius, height, segments, startAngle, endAngle) => {
  const angle = endAngle - startAngle;
  const coords = [[innerRadius, 0], [outerRadius, 0], [outerRadius, height], [innerRadius, height]];
  const points = coords.map(([a, b]) => new THREE.Vector2(a, b));
  const phiStart = THREE.MathUtils.degToRad(startAngle);
  const phiLength = THREE.MathUtils.degToRad(angle);

  const geometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
  return geometry;
};

export const createMaterial = (materialType, color) => {
  const material = new THREE.MeshStandardMaterial({
    metalness: materialType.metalness,
    roughness: materialType.roughness
  });

  material.color.set(color);
  return material;
};
