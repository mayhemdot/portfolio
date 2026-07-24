import React, { JSX, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { ditherMaterial } from './ditcher-shader'
import  * as THREE from 'three'

export function ArchModel(props: any) {
  const { nodes, materials } = useGLTF('/arka_glow_without_draco.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Floor.geometry}
        material={materials.Floor}
        scale={23.492}
      >
          <meshBasicMaterial color="#fff" />
        {/* <THREE.MeshStandardMaterial /> */}
      
            {/* <shaderMaterial
              uniforms={{
                uColor: { value: new THREE.Color("#ff5533") },
              }}
              vertexShader={ditherMaterial.vertexShader}
              fragmentShader={ditherMaterial.fragmentShader}
             
            /> */}
        </mesh>
      <group position={[0, 6.798, 0]} scale={1.087}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.Material}
        >
          <shaderMaterial
              vertexShader={ditherMaterial.vertexShader}
              fragmentShader={ditherMaterial.fragmentShader}
              // uniforms={ditherMaterial.uniforms}
               uniforms={{
                // #ff5533
                // #eaeaea
                uColor: { value: new THREE.Color("#ff553") },
              }}
            />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials['Material.001']}
        >
          <shaderMaterial
              uniforms={{
                uColor: { value: new THREE.Color("#999999") },
              }}
              vertexShader={ditherMaterial.vertexShader}
              fragmentShader={ditherMaterial.fragmentShader}
              // uniforms={ditherMaterial.uniforms}
            />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/arka_glow_without_draco.glb')