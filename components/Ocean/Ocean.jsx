import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Water } from 'three-stdlib'

extend({ Water })

function OceanComponent() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 200,
      waterNormals,
      waterColor: 0x0b2d3d,
      sunColor: 0xffc77d,
      sunDirection: new THREE.Vector3(115, 8, -285).normalize(),
      distortionScale: 3.2,
      fog: true,
      format: gl.encoding,
    }),
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta / 2))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

export default function Ocean() {
    return (
        <Suspense fallback={null}>
          <OceanComponent />
        </Suspense>
    )
  }
