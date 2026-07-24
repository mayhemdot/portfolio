// import React from "react";
// import { useGLTF } from "@react-three/drei";
// import { useControls } from "leva";
// import * as THREE from "three";
// import { ditherMaterial } from "./ditcher-shader";

// export function ArchModelTest(props: any) {
//   const { nodes } = useGLTF("/arka_glow_without_draco.glb");

//   const { color1, color2 } = useControls("Shader", {
//     color1: "#ff5533",
//     color2: "#999999",
//   });

//   return (
//     <group {...props} dispose={null}>
//       <group position={[0, 6.798, 0]} scale={1.087}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube.geometry}
//         >
//           <shaderMaterial
//             vertexShader={ditherMaterial.vertexShader}
//             fragmentShader={ditherMaterial.fragmentShader}
//             uniforms={{
//               uColor: { value: new THREE.Color(color1) },
//             }}
//           />
//         </mesh>

//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Cube_1.geometry}
//         >
//           <shaderMaterial
//             vertexShader={ditherMaterial.vertexShader}
//             fragmentShader={ditherMaterial.fragmentShader}
//             uniforms={{
//               uColor: { value: new THREE.Color(color2) },
//             }}
//           />
//         </mesh>
//       </group>
//     </group>
//   );
// }