import * as THREE from "three";

export const ditherMaterial = {
  uniforms: {
    uColor: { value: new THREE.Color("#c38b76") },
    uIntensity: { value: 1.0 },
  },

  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;

    uniform vec3 uColor;

    float bayerDither(vec2 pos) {
      int x = int(mod(pos.x, 4.0));
      int y = int(mod(pos.y, 4.0));

      int index = x + y * 4;

      float matrix[16];
      matrix[0] = 0.0; matrix[1] = 8.0; matrix[2] = 2.0; matrix[3] = 10.0;
      matrix[4] = 12.0; matrix[5] = 4.0; matrix[6] = 14.0; matrix[7] = 6.0;
      matrix[8] = 3.0; matrix[9] = 11.0; matrix[10] = 1.0; matrix[11] = 9.0;
      matrix[12] = 15.0; matrix[13] = 7.0; matrix[14] = 13.0; matrix[15] = 5.0;

      return matrix[index] / 16.0;
    }

    void main() {
      float light = dot(normalize(vNormal), vec3(0.3, 0.6, 0.7));
      light = light * 0.5 + 0.5;

      float dither = bayerDither(gl_FragCoord.xy * 0.5);

      float finalLight = step(dither, light);

      vec3 color = uColor * finalLight;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
};
