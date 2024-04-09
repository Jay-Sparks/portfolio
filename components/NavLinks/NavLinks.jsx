import React from 'react'
import { animated, useTrail } from '@react-spring/web'

import styles from './NavLinks.module.css'


const NavLinks = ({children}) => {
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
        config: { mass: 10, tension: 2500, friction: 400 },
        opacity: 1,
        x: 0,
        height: 'auto',
        from: { opacity: 0, x: 70, height: 0 },
      })
    return <div className={styles.container}>
        {trail.map(({ height, ...style }, index) => (
            <animated.div key={index} className={styles.trailsText} style={{ ...style, width: "100%" }}>
                <animated.div style={{ height }}>{items[index]}</animated.div>
            </animated.div>
        ))}
    </div>
}


export default NavLinks