"use client";
// import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { useFrame } from "@react-three/fiber";

export function Knife(props: { rotation: number[] }) {
  const ref = useRef<any | null>(null);

  // useEffect(() => {
  //   if (ref.current) {
  //     gsap.to(ref.current.rotation, {
  //       z: "+=2*Math.PI", // один оборот
  //       duration: 20, // медленно (можно увеличить для ещё медленнее)
  //       repeat: -1,
  //       ease: "none",
  //     });
  //   }
  // }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // delta — время между кадрами (в секундах), плавно независимо от FPS
      ref.current.rotation.z += delta * 0.05; // 0.2 — скорость вращения
    }
  });
  
  const { nodes, materials } = useGLTF("/3d/knife16.gltf");
  return (
    <group {...props} dispose={null} ref={ref} rotation={props.rotation as any}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Handle as any).geometry}
        material={materials.Micarta}
        position={[0, 0.019, -0.024]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Blade as any).geometry}
        material={materials.Steel}
        position={[0, 0.019, 0.016]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Blocker as any).geometry}
        material={materials["Gold.001"]}
        position={[-0.101, 0.019, 0.165]}
        scale={[0.03, 0.034, 0.03]}
      />
    </group>
  );
}

useGLTF.preload("/3d/knife16.gltf");
