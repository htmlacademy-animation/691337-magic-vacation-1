import * as THREE from 'three';
import vertexShader from '../shaders/vertexShader-basis.glsl';
import fragmentShader from '../shaders/fragmentShader-basis.glsl';

export default class RoadMaterial extends THREE.ShaderMaterial {
  constructor(params) {
    super();

    this.color1 = params.color1;
    this.color2 = params.color2;
    this.metalness = params.reflection.metalness;
    this.roughness = params.reflection.roughness;
  }

  onBeforeCompile(shader) {
    shader.vertexShader = vertexShader;
    shader.fragmentShader = fragmentShader;

    shader.uniforms.uTime = {value: 0.0};
    shader.uniforms.color1 = {value: this.color1};
    shader.uniforms.color2 = {value: this.color2};
    shader.uniforms.metalness = {value: this.metalness};
    shader.uniforms.roughness = {value: this.roughness};

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
        varying vec2 vUv;
        uniform vec3 color1;
        uniform vec3 color2;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <map_fragment>`,
        `float strength = step(0.96, mod(vUv.y + 0.15, 1.0));
        strength *= step(0.6, mod(vUv.x * 4.0 + 0.4, 1.0));
        vec3 color = strength < 0.5 ? color1 : color2;
        diffuseColor = vec4(color, vUv);`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <output_fragment>`,
        `diffuseColor.a = 1.0;
        gl_FragColor = diffuseColor;`
    );
  }
}

