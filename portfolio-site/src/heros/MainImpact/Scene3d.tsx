import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { ArchModel } from "./ArchModelOriginal";

export function Scene() {
  const {
    x,
    y,
    z,
    rotX,
    rotY,
    rotZ,
    fov,
  } = useControls("Camera", {
    x: { value: -20, min: -100, max: 100, step: 0.1 },
    y: { value: 6.3, min: -100, max: 100, step: 0.1 },
    z: { value: 15.6, min: -100, max: 100, step: 0.1 },

    rotX: { value: 0, min: -180, max: 180, step: 1 },
    rotY: { value: 0, min: -180, max: 180, step: 1 },
    rotZ: { value: 0, min: -180, max: 180, step: 1 },

    fov: { value: 45, min: 10, max: 120, step: 1 },
  });

  return (
    <Canvas className="w-full h-[calc(100vh+80px)]! absolute! -mt-[80px] -z-1">
      <PerspectiveCamera
        makeDefault
        position={[x, y, z]}
        rotation={[
          THREE.MathUtils.degToRad(rotX),
          THREE.MathUtils.degToRad(rotY),
          THREE.MathUtils.degToRad(rotZ),
        ]}
        fov={fov}
      />

      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <ArchModel />

      <OrbitControls />
    </Canvas>
  );
}

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
// import * as THREE from "three";
// import { ArchModel } from "./ArchModelOriginal";
// import { useEffect, useState } from "react";

// export function Scene() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();

//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);
//   const position = isMobile ? [-32, 16.3, 10.6] : [-20, 6.3, 15.6] as any;
//   return (
//     <Canvas className="w-full h-[calc(100vh+80px)]! absolute! -mt-[80px] -z-1">
//       <PerspectiveCamera
//         makeDefault
//         // [-20, 6.3, 15.6]}
//         position={position}
//         rotation={[
//           THREE.MathUtils.degToRad(86),
//           THREE.MathUtils.degToRad(0),
//           THREE.MathUtils.degToRad(-60),
//         ]}
//         fov={45}
//       />

//       <ambientLight intensity={1} />

//       <directionalLight
//         position={[20, 20, 20]}
//         intensity={2}
//         castShadow
//       />

//       <ArchModel/>

//       <OrbitControls
//         enableZoom={false}
//       />
//     </Canvas>
//   );
// }