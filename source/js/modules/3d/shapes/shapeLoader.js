import * as THREE from 'three';
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';

//const SVG_URL = `.`

const SHAPES = {
  flamingo: {
    src: `./3d/SVG/flamingo.svg`,
    depth: 8,
    cap: 2,
  },
  flower: {
    src: `./3d/SVG/flower.svg`,
    depth: 8,
    cap: 2,
  },
  keyhole: {
    src: `./3d/SVG/keyhole.svg`,
    depth: 8,
    cap: 2,
  },
  leaf: {
    src: `./3d/SVG/leaf.svg`,
    depth: 8,
    cap: 2,
  },
  question: {
    src: `./3d/SVG/question.svg`,
    depth: 8,
    cap: 2,
  },
  snowflake: {
    src: `./3d/SVG/snowflake.svg`,
    depth: 8,
    cap: 2,
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
    const [name, depth, cap] = [key, value.depth, value.cap];
    const shape = await loadShapes(value.src);
    //console.log(name, depth, cap, shape);
    return {name, shape, depth, cap};
  }));

  console.log(mapOfShapes);
  return mapOfShapes;
};

export default getShapes;
