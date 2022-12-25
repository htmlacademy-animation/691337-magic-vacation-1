import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {createMaterial} from '../utils-scenes.js';

const objLoader = new OBJLoader();

export default (src, reflection, color) => {
  const model = new Promise((resolve) => {
    objLoader.load(
        src,
        (obj) => {
          const material = createMaterial(reflection, color);
          obj.traverse((child) => {
            if (child.isMesh) {
              child.material = material;
            }
          });
          resolve(obj);
        }
    );
  }).then((value) => {
    return value;
  });

  return model;
};
