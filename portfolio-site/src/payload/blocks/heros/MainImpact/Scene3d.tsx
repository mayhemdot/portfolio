"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type React from "react";
import { useRef } from "react";
import * as THREE from "three";
import { ArchModel } from "./ArchModelOriginal";

export interface CameraPose {
	x: number;
	y: number;
	z: number;
	rotX: number;
	rotY: number;
	rotZ: number;
	fov: number;
}

export interface CameraPathConfig {
	start: CameraPose;
	mid: CameraPose;
	end: CameraPose;
}
export const CAMERA_CONFIG: {
	desktop: CameraPathConfig;
	mobile: CameraPathConfig;
} = {
	desktop: {
		start: {
			x: -20,
			y: 6,
			z: 15,
			rotX: 0,
			rotY: 0,
			rotZ: 0,
			fov: 45,
		},
		mid: {
			x: -15,
			y: 4.5,
			z: 0,
			rotX: 0,
			rotY: -90,
			rotZ: 0,
			fov: 45,
		},
		end: {
			x: 4,
			y: 4,
			z: 0,
			rotX: 0,
			rotY: -90,
			rotZ: 0,
			fov: 45,
		},
	},
	mobile: {
		start: {
			x: -26,
			y: 6,
			z: 15.6,
			rotX: 0,
			rotY: 0,
			rotZ: 0,
			fov: 45,
		},
		mid: {
			x: -22,
			y: 5,
			z: 0,
			rotX: 0,
			rotY: -90,
			rotZ: 0,
			fov: 45,
		},
		end: {
			x: 0,
			y: 5,
			z: 0,
			rotX: 0,
			rotY: -90,
			rotZ: 0,
			fov: 45,
		},
	},
};

function ScrollCameraController({
	cameraStateRef,
}: {
	cameraStateRef: React.MutableRefObject<CameraPose>;
}) {
	const { camera } = useThree();

	useFrame(() => {
		const s = cameraStateRef.current;

		camera.position.set(s.x, s.y, s.z);
		camera.rotation.set(
			THREE.MathUtils.degToRad(s.rotX),
			THREE.MathUtils.degToRad(s.rotY),
			THREE.MathUtils.degToRad(s.rotZ),
		);

		if (camera instanceof THREE.PerspectiveCamera) {
			if (Math.abs(camera.fov - s.fov) > 0.01) {
				camera.fov = s.fov;
				camera.updateProjectionMatrix();
			}
		}
	});

	return null;
}

export function Scene({
	cameraStateRef,
}: {
	cameraStateRef?: React.MutableRefObject<CameraPose>;
}) {
	const fallbackRef = useRef<CameraPose>({
		...CAMERA_CONFIG.desktop.start,
	});

	const activeRef = cameraStateRef ?? fallbackRef;

	return (
    // h-[calc(100vh+80px)]! 
		<Canvas className="max-w-full h-full w-full absolute! -z-1">
			<PerspectiveCamera
				makeDefault
				position={[
					CAMERA_CONFIG.desktop.start.x,
					CAMERA_CONFIG.desktop.start.y,
					CAMERA_CONFIG.desktop.start.z,
				]}
				fov={CAMERA_CONFIG.desktop.start.fov}
			/>

			<ScrollCameraController cameraStateRef={activeRef} />

			<ambientLight intensity={1} />
			<directionalLight position={[5, 10, 5]} intensity={1} />

			<ArchModel />
		</Canvas>
	);
}
