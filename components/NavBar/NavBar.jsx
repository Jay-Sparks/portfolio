
import { useEffect, useState } from "react"

// import { animated, useSpring } from '@react-spring/web'
import styles from "../NavBar/NavBar.module.css"

import { useTrail, animated, useSpring } from '@react-spring/web'
import NavLinks from "../NavLinks/NavLinks";



function NavBar() {
    const [ isHovered, setIsHovered ] = useState(true)
    const [{ x, color, background }, set] = useSpring(() => ({ x: 10, color: "#fff", background: "#000" }));
  
    useEffect(() => {
        setTimeout(() => {
            setIsHovered(false)
            set.start({ x: 7, color: "black", background: "#c0c0c0" })
        }
        , 540)
    }, [])

    return (
    <div className={styles.NavBar}>
        <div className={styles.navLinks}>
            <a>
                <animated.div
                    onMouseEnter={() => {
                        set.start({ x: 10, color: "#fff", background: "#000" })
                        setTimeout(() => setIsHovered(() => true), 50)
                    }}
                    onMouseLeave={() => {
                        set.start({ x: 7, color: "#000", background: "#c0c0c0" })
                        setTimeout(() => setIsHovered(false), 0)
                    }}
                    style={{ opacity: 0.95, width: x.to(v => `${v}rem`), background: background.to(v => `${v}`)}}
                    className={styles.glance}
                >
                    <animated.span style={{ color }}>
                        {isHovered ? <p className={styles.lightShine}>Jay Spencer</p> : ".JS"}
                    </animated.span>
                </animated.div>
            </a>
            <NavLinks>
                <animated.div className={styles.topLinks}>
                    <animated.a>About</animated.a>
                    <animated.a>Experiments</animated.a>
                    <animated.a>CV</animated.a>
                </animated.div>
                <animated.div className={styles.botLinks}>
                    <animated.div className={styles.projects}>
                        <animated.p>PROJECTS</animated.p>
                        <animated.div className={styles.innerLinks}>
                            <animated.a>Artico</animated.a>
                            <animated.a>3D t-shirt</animated.a>
                        </animated.div>
                    </animated.div>
                    <animated.p>EXPERIENCE</animated.p>
                </animated.div>
                <animated.div className={styles.botLinks}>
                    <animated.p>CONTACT</animated.p>
                </animated.div>
            </NavLinks>
        </div>
    </div>
  )
}

export default NavBar