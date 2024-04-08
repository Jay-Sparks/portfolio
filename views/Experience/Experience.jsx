import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import {OrbitControls, Sky, Sparkles, Sphere, Shadow, Billboard, Cloud, Clouds, Text3D, Center, Stars} from '@react-three/drei'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import { Canvas, useFrame } from '@react-three/fiber'
import { Leva, useControls } from 'leva';

import styles from './Experience.module.css'
import NameText from '../../components/NameText/NameText';
import Ocean from '../../components/Ocean/Ocean'

function Experience({isDark}) {
    const [ sunPosition, setSunPosition ] = useState([100, 10, -250])
    // const { sunPosition } = useControls('sky', {
    //     sunPosition: { value: positionSun },
    //   });
    console.log(sunPosition);

    useEffect(() => {
        if(isDark) setSunPosition([ 1, -5, 3])
        else setSunPosition([180, 3, -200])
    }, [isDark])

    const Moon = ({ size = 1, amount = 50, color = 'white', emissive, glow, ...props }) => (
        <mesh {...props}>
          <sphereGeometry args={[size, 64, 64]} />
          <meshPhysicalMaterial roughness={5} color={color} emissive={emissive || color} envMapIntensity={0.2} />
          <Sparkles count={amount} scale={size * 10} size={6} speed={0.4} />
        </mesh>
      )

    return (
        <div className={styles.Experience}>
            <div className={styles.scrollDowns}>
                <div className={styles.mousey}>
                    <div className={styles.scroller}></div>
                </div>
            </div>
            <Canvas camera={{ fov: 65, position: [0, 5, 20] }}>
                <EffectComposer disableNormalPass>
                    <Vignette darkness={0.5}/>

                    <Sky 
                        sunPosition={[100, 10, -250]} 
                        distance={45000} 
                        inclination={0.6} 
                        azimuth={0.1} 
                        turbidity={isDark ? 1 : 12 }
                        rayleigh={isDark ? 0 : 0.5}
                        mieDirectionalG={isDark ? 0.4 : 0.8}
                        mieCoefficient={0.005}
                    />
                    {isDark ? 
                    <>
                        <Stars
                            radius={100} 
                            depth={50} 
                            count={5000} 
                            factor={4} 
                            saturation={1} 
                            fade 
                            speed={1}
                        />
                        <hemisphereLight intensity={0.5} color="#c7c7c7" groundColor="black" />
                        <Moon color="purple" amount={0} emissive="black" size={0.8} position={[20, 45, -200]} />
                        <Moon color="blue" amount={3} emissive="black" size={1} position={[-90, 30, -230]} />
                        <Moon color="white" amount={0} emissive="black" size={1.1} position={[-120, 60, -120]} />
                        <Moon color="cyan" amount={6} emissive="black" size={2} position={[-150, 30, 150]} />
                        <Moon color="#D42B07" amount={0} emissive="black" size={0.8} position={[-250, 60, 30]} />
                        <Moon color="#CEB32A" amount={10} emissive="black" size={2.8} position={[180, 152, 350]} />
                        <Moon color="white" amount={0} emissive="black" size={1.1} position={[120, 60, -120]} />
                        <Moon color="red" amount={20} emissive="grey" size={10} position={[850, 1, 10]} />
                        <Moon color="black" amount={0} emissive="#D7D59D" size={1.1} position={[250, 60, 180]} />
                        {/* <Sparkles count={60} scale={10 * 4} size={5.5} speed={0.4} position={[10,5,-2]}/>
                        <Sparkles count={60} scale={10 * 3} size={5} speed={0.4} position={[-10,5,-2]}/> */}
                        <Clouds material={THREE.MeshBasicMaterial}>
                            <Cloud seed={1} scale={1} volume={3} color="#c7c7c7" fade={100} position={[80, 30, -14]} />
                            <Cloud seed={1} scale={1} volume={3} color="white" fade={100} position={[-11, 18, -40]} />
                            <Cloud seed={1} scale={1} volume={3} color="white" fade={100} position={[11, 18, -32]} />
                        </Clouds>
                    </>
                        :
                        <Clouds material={THREE.MeshBasicMaterial}>
                            <Cloud segments={40} bounds={[1, 0.5, 5]} volume={10} fade={60} color="white" position={[4, 7.5, 4]} scale={0.5}/>
                            <Cloud segments={50} bounds={[5, 0.5, 2]} volume={10} fade={60} color="white" position={[3, 9, -5]} scale={0.5}/>
                            <Cloud segments={40} bounds={[4, 1, 3]} volume={10} fade={60} color="white" position={[-5, 7, 2]} scale={0.5}/>
                            <Cloud seed={1} scale={1} volume={3} color="white" fade={100} position={[-4, 10, -4]} />

                            {/* <Cloud seed={1} scale={1} volume={3} color="white" fade={100} position={[-40, 14, -40]} />
                            <Cloud seed={1} scale={1} volume={3} color="white" fade={100} position={[-30, 9, -30]} />
                            <Cloud seed={1} scale={1} volume={3} color="white" fade={100} position={[-20, 11, -30]} /> */}
                        </Clouds>
                    }
                    <ambientLight intensity={isDark ? 0.3 : 2} />
                    <directionalLight
                        castShadow
                        intensity={isDark ? 0.5 : 1}
                        position={sunPosition}
                        shadow-normalBias={0.04}
                    />
                    <OrbitControls 
                        target={[0, 1, 0]}
                        minDistance={20}
                        maxDistance={20}
                        enableRotate={true}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 6}
                        enableZoom={false}
                        
                    />
                    <NameText content={`Jay Spencer`} positionY={3}/>
                    <NameText content={`Creative Developer`} positionY={1.5}/>

                    <mesh receiveShadow position={ [100, 1, 100] } >
                        <boxGeometry args={ [ 10, 0.5, 10 ] } />
                        <meshStandardMaterial color="#8f4111" />
                    </mesh>
                    <Ocean />
                </EffectComposer>
            </Canvas>
            <h1>/jayspencer</h1>
        </div>
    )
}

export default Experience