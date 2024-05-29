import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function SmallShip(props) {
  const { nodes, materials } = useGLTF('/Ship_Small.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ship_Small.geometry}
        material={materials.Atlas}
      />
    </group>
  )
}

useGLTF.preload('/Ship_Small.gltf')