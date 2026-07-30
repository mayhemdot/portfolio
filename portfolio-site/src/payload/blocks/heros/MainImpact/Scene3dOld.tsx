"use client";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { folder, useControls } from "leva";
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
		start: { x: -20, y: 6, z: 15, rotX: 0, rotY: 0, rotZ: 0, fov: 45 },
		mid: { x: -15, y: 5, z: 0, rotX: 0, rotY: -90, rotZ: 0, fov: 45 },
		//  start: { x: -22, y: 6.3, z: 33.5, rotX: 0, rotY: -5, rotZ: 0, fov: 45 },
		// start: { x: -22, y: 6.3, z: 15.6, rotX: 0, rotY: -35, rotZ: 0, fov: 45 },
		// end: { x: 0, y: 6.8, z: -15.0, rotX: 0, rotY: 0, rotZ: 0, fov: 50 },
		end: { x: 4, y: 4, z: 0, rotX: 0, rotY: -90, rotZ: 0, fov: 45 },
		// end: { x: 0, y: 6.8, z: -15.0, rotX: 0, rotY: 0, rotZ: 0, fov: 50 },
	},
	mobile: {
		start: { x: -26, y: 6, z: 15.6, rotX: 0, rotY: 0, rotZ: 0, fov: 45 },
		mid: { x: -22, y: 5, z: 0, rotX: 0, rotY: -90, rotZ: 0, fov: 45 },
		end: { x: -5, y: 5, z: 0, rotX: 0, rotY: 0, rotZ: 0, fov: 45 },
	},
};

function ScrollCameraController({
	cameraStateRef,
	debugMode,
	levaCamera,
}: {
	cameraStateRef: React.MutableRefObject<CameraPose>;
	debugMode: boolean;
	levaCamera: CameraPose;
}) {
	const { camera } = useThree();

	useFrame(() => {
		if (debugMode) {
			camera.position.set(levaCamera.x, levaCamera.y, levaCamera.z);
			camera.rotation.set(
				THREE.MathUtils.degToRad(levaCamera.rotX),
				THREE.MathUtils.degToRad(levaCamera.rotY),
				THREE.MathUtils.degToRad(levaCamera.rotZ),
			);
			if (camera instanceof THREE.PerspectiveCamera) {
				if (camera.fov !== levaCamera.fov) {
					camera.fov = levaCamera.fov;
					camera.updateProjectionMatrix();
				}
			}
		} else {
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
		}
	});

	return null;
}

export function Scene({
	cameraStateRef,
}: {
	cameraStateRef?: React.MutableRefObject<CameraPose>;
}) {
	const fallbackRef = useRef<CameraPose>({ ...CAMERA_CONFIG.desktop.start });
	const activeRef = cameraStateRef || fallbackRef;

	const { debugMode, ...levaCamera } = useControls({
		"Scroll Animation": folder({
			debugMode: {
				value: false,
				label: "Debug Mode (Manual Control)",
			},
		}),
		"Camera Manual Controls": folder({
			x: { value: -20, min: -100, max: 100, step: 0.1 },
			y: { value: 6.3, min: -100, max: 100, step: 0.1 },
			z: { value: 15.6, min: -100, max: 100, step: 0.1 },

			rotX: { value: 0, min: -180, max: 180, step: 1 },
			rotY: { value: -35, min: -180, max: 180, step: 1 },
			rotZ: { value: 0, min: -180, max: 180, step: 1 },

			fov: { value: 45, min: 10, max: 120, step: 1 },
		}),
	});

	return (
		<Canvas className="w-full h-[calc(100vh+80px)]! absolute! -mt-20 -z-1">
			<PerspectiveCamera makeDefault position={[-20, 6.3, 15.6]} fov={45} />

			<ScrollCameraController
				cameraStateRef={activeRef}
				debugMode={debugMode}
				levaCamera={levaCamera}
			/>

			<ambientLight intensity={1} />
			<directionalLight position={[5, 10, 5]} intensity={1} />

			<ArchModel />

			{debugMode && <OrbitControls makeDefault />}
		</Canvas>
	);
}
