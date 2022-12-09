import * as THREE from 'three';
import vertexShader from '../shaders/vertexShader-basis.glsl';
import fragmentShader from '../shaders/fragmentShader-basis.glsl';

export default class CarpetMaterial extends THREE.ShaderMaterial {
  constructor(params) {
    super();

    this.color = params.color;

  }

  onBeforeCompile(shader) {
    shader.vertexShader = vertexShader;
    shader.fragmentShader = fragmentShader;
    console.log(this.color);

    shader.uniforms.uTime = {value: 0.0};
    //shader.uniforms.diffuse = {value: new THREE.Vector3(0.0, 1.0, 0.0)};
    shader.uniforms.diffuse = {value: this.color};

    shader.vertexShader = shader.vertexShader.replace(
        `#include <uv_pars_vertex>`,
        `varying vec2 vUv;
        uniform float uTime;`
    );

    shader.vertexShader = shader.vertexShader.replace(
        `#include <uv_vertex>`,
        `vUv = uv;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `varying vec3 vViewPosition;`,
        `varying vec3 vViewPosition;
        varying vec2 vUv;`
    );

    console.log(shader);


    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <map_fragment>`,
        `diffuseColor = vec4(diffuse, vUv);`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <output_fragment>`,
        `gl_FragColor = diffuseColor;`
    );
  }
}

