import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

const gltfLoader = new GLTFLoader();

export default (src) => {
  const model = new Promise((resolve) => {
    gltfLoader.load(
        src,
        (gltf) => {
          const scene = gltf.scene;
          resolve(scene);
        }
    );
  }).then((value) => {
    return value;
  });

  return model;
};
