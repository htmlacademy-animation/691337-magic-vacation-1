import * as THREE from 'three';

export default class CarpetMaterial extends THREE.MeshStandardMaterial {
  constructor(params) {
    super();

    this.color1 = params.color1;
    this.color2 = params.color2;
    this.metalness = params.reflection.metalness;
    this.roughness = params.reflection.roughness;
  }

  onBeforeCompile(shader) {

    shader.uniforms.color1 = {value: this.color1};
    shader.uniforms.color2 = {value: this.color2};
    shader.uniforms.metalness = {value: this.metalness};
    shader.uniforms.roughness = {value: this.roughness};

    shader.vertexShader = shader.vertexShader.replace(
        `#include <uv_pars_vertex>`,
        `varying vec2 vUv;`
    );

    shader.vertexShader = shader.vertexShader.replace(
        `#include <uv_vertex>`,
        `vUv = uv;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `varying vec3 vViewPosition;`,
        `varying vec3 vViewPosition;
        varying vec2 vUv;
        uniform vec3 color1;
        uniform vec3 color2;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <map_fragment>`,
        `float strength = mod(vUv.x * 3.5, 1.0);
        strength = step(0.5, strength);
        vec3 color = strength < 0.5 ? color1 : color2;
        diffuseColor = vec4(color, vUv);`
    );
  }
}
