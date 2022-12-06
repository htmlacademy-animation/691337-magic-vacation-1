import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';
import {MATERIAL_REFLECTION, MATERIAL_COLOR} from '../utils-scenes.js';

const SVG_URL = `./3d/SVG`;

const SHAPES = {
  flamingo: {
    src: `${SVG_URL}/flamingo.svg`,
    depth: 8,
    cap: 2,
    color: MATERIAL_COLOR.lightDominantRed,
    reflection: MATERIAL_REFLECTION.soft,
  },
  flower: {
    src: `${SVG_URL}/flower.svg`,
    depth: 8,
    cap: 2,
    color: MATERIAL_COLOR.green,
    reflection: MATERIAL_REFLECTION.basic,
  },
  keyhole: {
    src: `${SVG_URL}/keyhole.svg`,
    depth: 8,
    cap: 2,
    color: MATERIAL_COLOR.darkPurple,
    reflection: MATERIAL_REFLECTION.soft,
  },
  leaf: {
    src: `${SVG_URL}/leaf.svg`,
    depth: 8,
    cap: 2,
    color: MATERIAL_COLOR.green,
    reflection: MATERIAL_REFLECTION.basic,
  },
  question: {
    src: `${SVG_URL}/question.svg`,
    depth: 8,
    cap: 2,
    color: MATERIAL_COLOR.blue,
    reflection: MATERIAL_REFLECTION.basic,
  },
  snowflake: {
    src: `${SVG_URL}/snowflake.svg`,
    depth: 8,
    cap: 2,
    color: MATERIAL_COLOR.blue,
    reflection: MATERIAL_REFLECTION.basic,
  }
};

const getShapes = async () => {
  const loader = new SVGLoader();

  const objectEntries = Object.entries(SHAPES);

  const pushElement = async (arr, el) => {
    await arr.push(el);
  };

  const loadShapes = async (src) => {
    const shape = new Promise((resolve) => {
      loader.load(src,
          (data) => {
            const shapePaths = data.paths;
            shapePaths.forEach((path) => {
              const shapes = SVGLoader.createShapes(path);
              const shapesList = [];
              shapes.forEach((it) => {
                pushElement(shapesList, it);
              });
              resolve(shapesList);
            });
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + `% loaded`);
          },
          (err) => {
            console.log(`An ${err} happened`);
          });
    }).then((value) => {
      return value;
    });

    return shape;
  };

  const mapOfShapes = await Promise.all(Array(objectEntries.length)
  .fill({})
  .map(async (it, index) => {
    const [key, value] = objectEntries[index];
    const [name, depth, cap, color, reflection] = [key, value.depth, value.cap, value.color, value.reflection];
    const shape = await loadShapes(value.src);
    return {name, shape, depth, cap, color, reflection};
  }));

  return mapOfShapes;
};

export default getShapes;
