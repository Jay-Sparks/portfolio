import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import {OrbitControls, Sky, Sparkles, Sphere, Shadow, Billboard, Cloud, Clouds} from '@react-three/drei'

import { Canvas, useFrame } from '@react-three/fiber'
import { Leva, useControls } from 'leva';

function Experience({isDark}) {
    const [ sunPosition, setSunPosition ] = useState([1, 2, 3])
    // const { sunPosition } = useControls('sky', {
    //     sunPosition: { value: positionSun },
    //   });
    console.log(sunPosition);

    useEffect(() => {
        if(isDark) setSunPosition([ 1, -5, 3])
        else setSunPosition([ 4, 5, 7 ])
    }, [isDark])

    const Moon = ({ size = 1, amount = 50, color = 'white', emissive, glow, ...props }) => (
        <mesh {...props}>
          <sphereGeometry args={[size, 64, 64]} />
          <meshPhysicalMaterial roughness={0} color={color} emissive={emissive || color} envMapIntensity={0.2} />
          <Sparkles count={amount} scale={size * 8} size={6} speed={0.4} />
        </mesh>
      )

    return (
        <Canvas camera={{ fov: 65, position: [0, 5, 20] }}>
            <Sky sunPosition={sunPosition} />
            {isDark ? 
            <>
                <hemisphereLight intensity={0.5} color="white" groundColor="black" />
                <Sparkles count={60} scale={10 * 2} size={6} speed={0.4} />
                <Moon color="white" amount={20} emissive="grey" size={0.8} position={[-3, 10, -2]} />
                <Clouds material={THREE.MeshBasicMaterial}>

                    <Cloud seed={1} scale={1} volume={3} color="#c7c7c7" fade={100} position={[4, 10, 4]} />
                    <Cloud seed={1} scale={1} volume={3} color="#white" fade={100} position={[-4, 10, -4]} />
                </Clouds>
            </>
                :
                <Clouds material={THREE.MeshBasicMaterial}>
                    <Cloud segments={40} bounds={[1, 0.5, 5]} volume={10} fade={60} color="white" position={[4, 7.5, 4]} scale={0.5}/>
                    <Cloud segments={50} bounds={[5, 0.5, 2]} volume={10} fade={60} color="white" position={[3, 9, -5]} scale={0.5}/>
                    <Cloud segments={40} bounds={[4, 1, 3]} volume={10} fade={60} color="white" position={[-5, 7, 2]} scale={0.5}/>
                    <Cloud seed={1} scale={1} volume={3} color="#white" fade={100} position={[-4, 10, -4]} />
                </Clouds>
            }
            <ambientLight intensity={Math.PI / 8} />
            <directionalLight
              castShadow
              intensity={2.5}
              position={sunPosition}
              shadow-normalBias={0.04}
            />
            <OrbitControls 
                target={[0, 1, 0]}
                minDistance={15}
                maxDistance={20}
                enableRotate={true}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 6}
                
            />
            <mesh castShadow position-y={ 0.75 }>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>

            <mesh receiveShadow position-y={ -0.3 } >
                <boxGeometry args={ [ 10, 0.5, 10 ] } />
                <meshStandardMaterial color="#8f4111" />
            </mesh>
        </Canvas>
    )
}

export default Experience