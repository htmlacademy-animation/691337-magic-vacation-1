precision mediump float;

uniform sampler2D uTexture;
uniform bool uTextureWithBubbles;
uniform vec2 uResolution;
uniform float uHue;
uniform float uTime;

const float borderWidth = 0.007;
const vec4 borderColor = vec4(1.0, 1.0, 1.0, 0.15);

varying vec2 vUv;

struct circle {
  vec2 centerCoord;
  float radius;
};

circle bubble1 = circle(vec2(1.25, 1.35), 0.11);
//circle bubble2 = circle(vec2(0.7, 0.9), 0.09);
circle bubble2 = circle(vec2(0.7, 1.1), 0.09);
circle bubble3 = circle(vec2(1.34, 0.65), 0.04);

vec4 renderBubble(circle bubble, vec4 texture) {
  float aspectRatio = uResolution.x / uResolution.y;
  vec2 pixelPosition = gl_FragCoord.xy / uResolution.y;
  vec2 bubblePosition = vec2(bubble.centerCoord);
  //bubblePosition += vec2(sin(uTime) / 2.0, cos(uTime) / 2.0);
  float bubbleRadius = bubble.radius;
  float glareRadius = bubble.radius - 0.02;

  vec2 delta = bubblePosition - pixelPosition;
  float distanceFromBubbleCenter = length(delta);

  bool isInBubble = distanceFromBubbleCenter < bubbleRadius;
  bool isBubbleBorder = distanceFromBubbleCenter >= bubbleRadius && distanceFromBubbleCenter <= bubbleRadius + borderWidth;
  bool isBubbleGlare = distanceFromBubbleCenter >= glareRadius
                        && distanceFromBubbleCenter <= glareRadius + borderWidth
                        && pixelPosition.x < bubblePosition.x - bubbleRadius * 0.25
                        && pixelPosition.y > bubblePosition.y + bubbleRadius * 0.25;

  if (isInBubble) {
    float distanceToBorder = bubbleRadius - length(delta);
    delta = distanceToBorder * delta;
    texture = texture2D(uTexture, vUv + delta * 2.5);
  }

  if (isBubbleBorder) {
    texture = vec4(mix(borderColor.rgb, texture.rgb, 0.8), texture.a);
  }

  if (isBubbleGlare) {
    texture = vec4(mix(borderColor.rgb, texture.rgb, 0.8), texture.a);
  }

  return texture;
}

vec3 hueShift(vec3 color, float hue) {
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(hue);
    return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);

  if (uTextureWithBubbles) {
    textureColor = renderBubble(bubble1, textureColor);
    textureColor = renderBubble(bubble2, textureColor);
    textureColor = renderBubble(bubble3, textureColor);

    float hue = sin(uHue + uTime) * 0.3;
    vec3 hueShiftedTexture = hueShift(textureColor.rgb, hue);
    vec4 textureColorChanged = vec4(hueShiftedTexture, 1);

    gl_FragColor = textureColorChanged;
  } else  {
    gl_FragColor = textureColor;
  }
}
