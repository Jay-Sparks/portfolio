import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Dock(props) {
  const { nodes, materials } = useGLTF('/Environment_Dock.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Environment_Dock.geometry}
        material={materials.Atlas}
      />
    </group>
  )
}

useGLTF.preload('/Environment_Dock.gltf')