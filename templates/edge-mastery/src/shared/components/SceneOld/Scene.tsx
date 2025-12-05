"use client";
import { Knife } from "@/shared/components/SceneOld/Knife";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { Environment, useHelper } from "@react-three/drei";
import { PointLightHelper, SpotLightHelper } from "three";
import * as THREE from "three";
import { PerfHeadless, Perf, usePerf } from "r3f-perf";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { getDevicePixelRatio } from "../../utils/getDevicePixelRatio";

const INITIAL_CAMERA_POSITION = [0, 1.6, 0.5] as const;

export function Scene() {
  if (typeof window === "undefined") return null;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const devicePixelRatio = getDevicePixelRatio(isMobile);
  return (
    <Canvas
      shadows
      dpr={devicePixelRatio}
      className="w-full h-full z-10"
      camera={{
        fov: 70,
        position: isMobile ? [0, 2.4, 0.8] : INITIAL_CAMERA_POSITION,
      }}
    >
      <Objects isMobile={isMobile} />
    </Canvas>
  );
}

export function Objects({ isMobile }: { isMobile: boolean }) {
  const pointLightRef = useRef<any>(null);

  // const { camera } = useThree();
  // useEffect(() => {
  //   if (isMobile) {
  //     camera.position.set(0, 2.4, 0.8);
  //   }
  // }, [isMobile]);
  // useHelper(pointLightRef, THREE.PointLightHelper, 1, "hotpink");
  // const {
  //   positionPointX,
  //   positionPointY,
  //   positionPointZ,
  //   rotationX,
  //   rotationY,
  //   rotationZ,
  // } = useControls({
  //   positionPointX: { value: 0, min: -2, max: 2 },
  //   positionPointY: { value: 0, min: -2, max: 2 },
  //   positionPointZ: { value: 0, min: -2, max: 2 },
  //   rotationX: { value: 0, min: -Math.PI, max: Math.PI },
  //   rotationY: { value: -Math.PI / 4, min: -Math.PI, max: Math.PI },
  //   rotationZ: { value: 0, min: -Math.PI, max: Math.PI },
  // });

  return (
    <>
      {/* <ambientLight intensity={3} /> */}
      <pointLight position={[0.4, 0.98, 0]} ref={pointLightRef} intensity={4} />
      {/* Блин над лезвием */}
      <pointLight position={[-0.44, 0.04, 0]} intensity={1} color="white" />

      {/* Острие */}
      <pointLight position={[-1.2, 0.92, 0.56]} intensity={1} color="white" />
      {/* Левый свет */}
      <pointLight position={[0.72, 0, -0.36]} intensity={1} color="white" />

      {/* <Environment preset="night" environmentIntensity={1} /> */}
      {/* Knife свет */}
      <Knife rotation={[0, -Math.PI / 4, 0]} />
      {/* <Perf /> */}
    </>
  );
}
