import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import {Text3D, Center, useMatcapTexture} from '@react-three/drei'

function NameText({ content, positionY }) {

    // const [matcapMaterial] = useMatcapTexture('2A2A2A_DBDBDB_6A6A6A_949494', 256)
    // const [matcapMaterial2] = useMatcapTexture('2A2D21_555742_898974_6C745B', 256)
    const [matcapMaterial3] = useMatcapTexture('2D2D2F_C6C2C5_727176_94949B', 256)
  return (
    <>
        <Center position-y={positionY}>
            <Text3D
                scale={[0.5, 0.5, 0.2]}
                font={"./helvetiker_regular.typeface.json"}
                curveSegments={24}
                bevelSegments={2}
                bevelEnabled
                bevelSize={0.08}
                bevelThickness={0.04}
                height={1}
                lineHeight={0.2}
                letterSpacing={0.2}
                castShadow
            >{content}
                <meshMatcapMaterial color="white" matcap={matcapMaterial3}/>
            </Text3D>
        </Center>
    </>
  )
}

export default NameText