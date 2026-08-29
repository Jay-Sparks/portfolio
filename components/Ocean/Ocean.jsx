import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Water } from 'three-stdlib'

extend({ Water })

function OceanComponent({ isDark }) {
  const ref = useRef()
  const gl = useThree((state) => state.gl)

  const waterNormals = useLoader(
    THREE.TextureLoader,
    '/waternormals.jpg'
  )

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping

  const geom = useMemo(
    () => new THREE.PlaneGeometry(10000, 10000),
    []
  )

  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 200,
      waterNormals,



      waterColor: isDark
  ? 0x06131c
  : 0x0b2d3d,

sunColor: isDark
  ? 0x9aaabd
  : 0xffc77d,

sunDirection: isDark
  ? new THREE.Vector3(115, 3.5, -285).normalize()
  : new THREE.Vector3(115, 8, -285).normalize(),

distortionScale: isDark
  ? 2.1
  : 3.2,

      sunDirection: new THREE.Vector3(
        115,
        8,
        -285
      ).normalize(),

      fog: true,
      format: gl.encoding,
    }),
    [waterNormals, gl, isDark]
  )

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta / 2
    }
  })

  return (
    <water
      key={isDark ? 'night-ocean' : 'day-ocean'}
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
    />
  )
}

export default function Ocean({ isDark }) {
  return (
    <Suspense fallback={null}>
      <OceanComponent isDark={isDark} />
    </Suspense>
  )
}