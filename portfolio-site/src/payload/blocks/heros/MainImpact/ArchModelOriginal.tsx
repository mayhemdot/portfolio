import { useGLTF } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import { ditherMaterial } from "./ditcher-shader";

export function ArchModel(props: any) {
	const { nodes, materials } = useGLTF("/arka_glow_without_draco.glb") as any;
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={(nodes.Floor as THREE.Mesh)?.geometry}
				material={materials.Floor}
				scale={23.492}
			>
				{/* <meshBasicMaterial color="#fff" /> */}
				<meshBasicMaterial color="#F5F3EF" />
			</mesh>
			<group position={[0, 6.798, 0]} scale={1.087}>
				<mesh
					castShadow
					receiveShadow
					geometry={(nodes.Cube as THREE.Mesh)?.geometry}
					material={materials.Material}
				>
					{/* <shaderMaterial
            vertexShader={ditherMaterial.vertexShader}
            fragmentShader={ditherMaterial.fragmentShader}
            uniforms={{
              uColor: { value: new THREE.Color('#fa4e14') },
            }}
          /> */}
					{/* <meshBasicMaterial color="#fa4e14" /> */}
					{/* <meshBasicMaterial color="#A8A8A8" /> */}
					<meshBasicMaterial color="#E6E1D9" />
					{/* #ff553 */}
				</mesh>
				<mesh
					castShadow
					receiveShadow
					geometry={(nodes.Cube_1 as THREE.Mesh)?.geometry}
					material={materials["Material.001"]}
				>
					{/* <shaderMaterial
            uniforms={{
              uColor: { value: new THREE.Color('#999999') },
            }}
            vertexShader={ditherMaterial.vertexShader}
            fragmentShader={ditherMaterial.fragmentShader}
          /> */}
					<shaderMaterial
						uniforms={{
							uColor: { value: new THREE.Color("#8C837A") },
						}}
						vertexShader={ditherMaterial.vertexShader}
						fragmentShader={ditherMaterial.fragmentShader}
					/>
				</mesh>
			</group>
		</group>
	);
}

useGLTF.preload("/arka_glow_without_draco.glb");
