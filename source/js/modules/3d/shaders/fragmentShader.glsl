precision mediump float;

uniform sampler2D uTexture;
uniform bool uTextureColorChange;
uniform float uHue;
uniform float uTime;

vec3 hueShift(vec3 color, float hue) {
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(hue);
    return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

varying vec2 vUv;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  float hue = sin(uHue + uTime) * 0.3;
  vec3 hueShiftedTexture = hueShift(textureColor.rgb, hue);
  vec4 textureColorChanged = vec4(hueShiftedTexture, 1);
  gl_FragColor = uTextureColorChange ? textureColorChanged : textureColor;
}
