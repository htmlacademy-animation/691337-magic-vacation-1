precision mediump float;

uniform sampler2D uTexture;
uniform bool uTextureColorChange;
uniform vec2 uResolution;
uniform float uHue;
uniform float uTime;

const vec2 circle_center = vec2(1.06, 0.63);
const float circle_radius = 0.11;
const float border_width = 0.007;
const vec4 border_color = vec4(1.0, 1.0, 1.0, 0.2);
//const float PI = 3.1415;

varying vec2 vUv;

vec2 distort(vec2 p) {
  float theta = atan(p.y, p.x);
  float radius = length(p);
  radius = pow(radius, 1.3);
  p.x = radius * cos(theta);
  p.y = radius * sin(theta);
  return 0.46 * (p + 1.0);
  //return 0.5 * (p + 1.0);
}

vec3 hueShift(vec3 color, float hue) {
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(hue);
    return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}



void main() {
  vec4 textureColor = texture2D(uTexture, vUv);

  vec2 st = gl_FragCoord.xy / uResolution.y;
  float dist = distance(st, circle_center);

  /*float aperture = 178.0;
    float apertureHalf = 0.5 * aperture * (PI / 180.0);
    float maxFactor = sin(apertureHalf);

    vec2 uvv;
    vec2 xy = 2.0 * vUv.xy - 1.0;
    float d = length(xy);
    d = length(xy * maxFactor);
    float z = sqrt(1.0 - d * d);
    float r = atan(d, z) / PI;
    float phi = atan(xy.y, xy.x);
    uvv.x = r * cos(phi) + 0.5;
    //uV_v.x = r * cos(phi) + 0.457;
    uvv.y = r * sin(phi) + 0.5;
    */

  if (dist >= circle_radius && dist <= circle_radius + border_width) {
    vec3 color = mix(border_color.rgb, textureColor.rgb, 0.8);
    gl_FragColor = vec4(color, textureColor.a);
  }

  else if (dist < circle_radius) {
    vec2 xy = 2.0 * vUv - 1.0;
    float d = length(xy);
    vec2 uv = distort(xy);
    gl_FragColor = texture2D(uTexture, uv);
  }

  else {
    gl_FragColor = textureColor;
  }

  float hue = sin(uHue + uTime) * 0.3;
  vec3 hueShiftedTexture = hueShift(textureColor.rgb, hue);
  vec4 textureColorChanged = vec4(hueShiftedTexture, 1);
  //gl_FragColor = uTextureColorChange ? textureColorChanged : textureColor;
}
