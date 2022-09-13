precision mediump float;

uniform sampler2D uTexture;
uniform bool uTextureColorChange;
uniform vec2 uResolution;
uniform float uHue;
uniform float uTime;

const float borderWidth = 0.007;
const vec4 borderColor = vec4(1.0, 1.0, 1.0, 0.2);

varying vec2 vUv;

struct circle {
  vec2 centerCoord;
  float radius;
};

circle bubble1 = circle(vec2(1.25, 1.35), 0.11);
circle bubble2 = circle(vec2(0.7, 0.9), 0.09);
circle bubble3 = circle(vec2(1.35, 0.65), 0.05);

vec2 distort(vec2 p) {
  float theta = atan(p.y, p.x);
  float radius = length(p);
  radius = pow(radius, 1.2);
  p.x = radius * cos(theta);
  p.y = radius * sin(theta);
  return 0.5 * (p + 1.0);
}

vec3 hueShift(vec3 color, float hue) {
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(hue);
    return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);

  if (uTextureColorChange) {
    vec2 st = gl_FragCoord.xy / uResolution.y;
    float dist1 = distance(st, bubble1.centerCoord);
    float dist2 = distance(st, bubble2.centerCoord);
    float dist3 = distance(st, bubble3.centerCoord);

    if ((dist1 >= bubble1.radius && dist1 <= bubble1.radius + borderWidth) ||
        (dist2 >= bubble2.radius && dist2 <= bubble2.radius + borderWidth) ||
        (dist3 >= bubble3.radius && dist3 <= bubble3.radius + borderWidth)) {
      vec3 color = mix(borderColor.rgb, textureColor.rgb, 0.8);
      textureColor = vec4(color, textureColor.a);
    }

    if (dist1 < bubble1.radius || dist2 < bubble2.radius || dist3 < bubble3.radius) {
      vec2 xy = 2.0 * vUv - 1.0;
      float d = length(xy);
      vec2 uv = distort(xy);
      textureColor = texture2D(uTexture, uv);
    }

    float hue = sin(uHue + uTime) * 0.3;
    vec3 hueShiftedTexture = hueShift(textureColor.rgb, hue);
    vec4 textureColorChanged = vec4(hueShiftedTexture, 1);

    gl_FragColor = textureColorChanged;
  }

  else {
    gl_FragColor = textureColor;
  }
}
