"use client";
import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import { type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useMemo, useState } from "react";
import type * as THREE from "three";
import { REVISION } from "three";
import { DRACOLoader, GLTF, KTX2Loader } from "three-stdlib";

type Props = {
  pose?: "folded" | "unfolded";
};

export function KtxKnife2({ pose = "folded" }: Props) {
  const [currentPose, setCurrentPose] = useState(pose);
  const [currentRotate, setCurrentRotate] = useState<"normal" | "screwed">("screwed");
  const bladeRefs = React.useRef<THREE.Object3D>(null);
  const fixRef = React.useRef<THREE.Object3D>(null);
  const directionalRef = React.useRef<any>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".featuresBlock",
      start: "top top",
      end: `+=${window.innerHeight * 5}px`,
      scrub: 1,
      onUpdate: ({ progress }) => {
        if (progress < 0.1) {
          setCurrentPose("folded");
          gsap.to(directionalRef.current.rotation, {
            y: -Math.PI / 4,
            duration: 1.5,
            ease: "Power4.out",
            yoyo: true,
          });
          // setCurrentRotate("screwed");
          // directionalRef.current.rotation.y = -Math.PI / 4
        } else if (progress >= 0.1 && progress < 0.5) {
          setCurrentPose("unfolded");
          gsap.to(directionalRef.current.rotation, {
            y: -Math.PI / 6,
            duration: 1.5,
            ease: "Power4.out",
            yoyo: true,
          });
          // directionalRef.current.rotation.y = 0s
          // setCurrentRotate("normal");
        } else if (progress >= 0.5) {
          gsap.to(directionalRef.current.rotation, {
            y: -Math.PI / 20,
            z: 1,
            duration: 1.5,
            ease: "Power4.out",
            yoyo: true,
          });
        }
      },
    });

    // gsap.to(directionalRef.current.rotation, {
    //   scrollTrigger: {
    //     trigger: ".featuresBlock",
    //     start: "top top",
    //     end: `+=${window.innerHeight * 0.5}px`,
    //     scrub: 1,
    //   },
    //   y: -Math.PI / 4,
    //   duration: 1.5,
    //   ease: "Power4.out",
    //   yoyo: true,
    // });
  }, []);

  const position = useMemo(
    () =>
      ({
        folded: {
          rotationBladeY: Math.PI / 1.03,
          positionFixZ: -0.05,
          positionKnife: { x: -0.3, y: 0.3, z: 0.3 },
        },
        unfolded: {
          rotationBladeY: 0,
          positionFixZ: 0,
          positionKnife: { x: 0, y: 0, z: 0 },
        },
      }) as const,
    [currentPose],
  );

  const { nodes, materials } = useGLTFWithKTX2("/ktx2/knife17.gltf");

  useFrame((state, delta) => {
    if (directionalRef.current) {
      // delta — время между кадрами (в секундах), плавно независимо от FPS
      directionalRef.current.rotation.z += delta * 0.2; // 0.2 — скорость вращения
    }
  });

  useEffect(() => {
    if (!bladeRefs.current || !directionalRef.current || !fixRef.current) return;

    gsap.to(bladeRefs.current.rotation, {
      y: position[currentPose].rotationBladeY,
      duration: 1.5,
      ease: "Power4.out",
      yoyo: true,
    });

    gsap.to(fixRef.current.position, {
      z: position[currentPose].positionFixZ,
      duration: 1.5,
      ease: "Power4.out",
      yoyo: true,
    });

    gsap.to(directionalRef.current.position, {
      z: position[currentPose].positionKnife.z,
      y: position[currentPose].positionKnife.y,
      x: position[currentPose].positionKnife.x,
      duration: 2.6,
      ease: "Power4.out",
      yoyo: true,
    });
  }, [currentPose]);

  materials.Steel.depthWrite = true;
  function onClick(event: ThreeEvent<MouseEvent>) {
    // event.stopPropagation()
    setCurrentPose(currentPose === "folded" ? "unfolded" : "folded");
  }
  // const rotatedY = -Math.PI / 4;
  return (
    <group ref={directionalRef} rotation={[0, -Math.PI / 4, 0]} onClick={onClick}>
      <mesh
        position={[0, 0, 0]}
        name="middle"
        visible={false}
        onPointerOver={() => console.log("🔥 hovered")}
        onPointerOut={() => console.log("💨 unhovered")}
        onPointerDown={() => console.log("🖱️ clicked")}
      >
        <boxGeometry args={[0.35, 0.2, 0.4]} />
        <meshStandardMaterial color="#ffffff" visible={true} />
      </mesh>
      <group name="Knife" dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.CenterFixator.geometry}
          material={materials.Steel}
          position={[-0.002, 0.018, 0.016]}
          rotation={[-Math.PI, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ScrewRightTopLeftSide.geometry}
          material={materials.Steel}
          position={[-0.093, -0.012, -0.682]}
          scale={[0.022, 0.011, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ScrewRightTopRightSide.geometry}
          material={materials.Steel}
          position={[-0.094, 0.047, -0.683]}
          rotation={[-Math.PI, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FixatorMiddleTop.geometry}
          material={materials.Gold}
          position={[-0.092, 0.018, -0.683]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FixatorEnd.geometry}
          material={materials.Gold}
          position={[0.04, 0.018, -0.977]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ScrewEndLeftSide.geometry}
          material={materials.Steel}
          position={[0.039, -0.008, -0.976]}
          scale={[0.022, 0.011, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ScrewEndRightSide.geometry}
          material={materials.Steel}
          position={[0.038, 0.046, -0.977]}
          rotation={[-Math.PI, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ScrewCenterRightSide.geometry}
          material={materials.Steel}
          position={[-0.015, -0.012, -0.342]}
          scale={[0.022, 0.011, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ScrewCenterLeftSide.geometry}
          material={materials.Steel}
          position={[-0.015, 0.051, -0.344]}
          rotation={[-Math.PI, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ScrewStartTopRightSide.geometry}
          material={materials.Steel}
          position={[-0.103, -0.012, 0.073]}
          scale={[0.022, 0.011, 0.022]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ScrewStartTopLeftSide.geometry}
          material={materials.Steel}
          position={[-0.102, 0.048, 0.072]}
          rotation={[-Math.PI, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FixatorStartTop.geometry}
          material={materials.Gold}
          position={[-0.101, 0.018, 0.072]}
        />
        <group ref={fixRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.FixatorOpeners.geometry}
            material={materials.Steel}
            position={[-0.08, 0.018, -0.038]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Openers.geometry}
            material={materials.Steel}
            position={[-0.079, 0.019, -0.039]}
          />
        </group>

        <mesh
          ref={bladeRefs}
          castShadow
          receiveShadow
          geometry={nodes.Blade.geometry}
          material={materials.Steel}
          position={[0, 0.019, 0.016]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Blocker.geometry}
            material={materials["Gold.001"]}
            position={[-0.101, 0, 0.149]}
            scale={[0.03, 0.034, 0.03]}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Handle.geometry}
          material={materials.Micarta}
          position={[0, 0.019, -0.024]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Skillet.geometry}
          material={materials.Steel}
          position={[0.001, 0.018, -0.024]}
        />
      </group>
    </group>
  );
}

function useGLTFWithKTX2(url: string) {
  const gl = useThree((state) => state.gl);
  // const raycaster = useThree((state) => state.raycaster)

  return useGLTF(url, false, false, (loader) => {
    const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(`${THREE_PATH}/examples/jsm/libs/draco/`);
    loader.setDRACOLoader(dracoLoader);

    const ktx2Loader = new KTX2Loader();
    ktx2Loader.detectSupport(gl);
    ktx2Loader.setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`);
    loader.setKTX2Loader(ktx2Loader);
    // raycaster.layers.enable(1)
  });
}
