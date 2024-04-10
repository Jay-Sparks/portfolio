
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";

// import { animated, useSpring } from '@react-spring/web'
import styles from "../NavBar/NavBar.module.css"

import { useTrail, animated, useSpring } from '@react-spring/web'
import NavLinks from "../NavLinks/NavLinks";



function NavBar() {
    const [ isHovered, setIsHovered ] = useState(true)
    const [{ x, color, background }, set] = useSpring(() => ({ 
        x: 10, 
        color: "#fff", 
        background: "var(--primary-button-background-dark)",
        config: { mass: 10, tension: 2500, friction: 400 },
    }));
  
    useEffect(() => {
        setTimeout(() => {
            set.start({ 
                x: 7, 
                color: "black", 
                background: "var(--primary-button-background)", 
                config: { mass: 10, tension: 1000, friction: 300 } })
                setIsHovered(false)
            }
        , 1400)
    }, [])

    const location = useLocation();

    return (
    <div className={styles.NavBar}>
        <div className={styles.navLinks}>
            <animated.a href={location.pathname === "/" ? '#' : '/'} className={styles.removeA}>
                <animated.div
                    onMouseEnter={() => {
                        set.start({ x: 10, color: "var(--secondary-text-color)", background: "var(--primary-button-background-dark)", config: { mass: 10, tension: 2500, friction: 400 } })
                        setTimeout(() => setIsHovered(() => true), 50)
                    }}
                    onMouseLeave={() => {
                        set.start({ x: 7, color: "var(--secondary-text-color)", background: "var(--primary-button-background)", config: { mass: 10, tension: 2500, friction: 400 } })
                        setTimeout(() => setIsHovered(false), 0)
                    }}
                    style={{ opacity: 0.95, width: x.to(v => `${v}rem`), background: background.to(v => `${v}`)}}
                    className={styles.glance}
                >
                    <animated.span style={{ color }}>
                        {isHovered ? <p className={styles.lightShine}>Jay Spencer</p> : ".JS"}
                    </animated.span>
                </animated.div>
            </animated.a>
            <NavLinks>
                <div className={styles.topLinks}>
                    <animated.div className={styles.topLinkWrapper}><Link to={`/about`} className={location.pathname === '/about' ? styles.topLinksCurr : styles.topLinksLink}>About</Link></animated.div>
                    <animated.div className={styles.topLinkWrapper}><Link to={`/experiments`} className={location.pathname === '/experiments' ? styles.topLinksCurr : styles.topLinksLink}>Experiments</Link></animated.div>
                    <animated.div className={styles.topLinkWrapper}><Link to={`/cv`} className={location.pathname === '/cv' ? styles.topLinksCurr : styles.topLinksLink}>CV</Link></animated.div>
                </div>
                <div className={styles.botLinks}>
                    <div className={styles.projects}>
                        <animated.p>PROJECTS</animated.p>
                        <div className={styles.innerLinks}>
                            <animated.a href='https://city-zen.netlify.app/' target={'_blank'}>City Zen</animated.a>
                            <animated.a href='https://artico-app-js.netlify.app/' target={'_blank'}>Artico</animated.a>
                            <animated.a href='https://threejs-tshirt-ai.netlify.app/' target={'_blank'}>3D t-shirt</animated.a>
                            <animated.a href='https://threejs-island.netlify.app/' target={'_blank'}>3D Island</animated.a>
                            <animated.a href='https://waste-not-js.netlify.app/' target={'_blank'}>Waste Not</animated.a>
                        </div>
                    </div>
                </div>
                <div className={styles.botLinks}>
                    <animated.div className={styles.projects}>
                        <animated.p>CONTACT</animated.p>
                        <animated.div className={styles.innerLinks}>
                            <animated.a href='https://www.linkedin.com/in/jay-spencer-55675792/' target={'_blank'}>LinkedIn</animated.a>
                            <animated.a href='https://github.com/Jay-Sparks' target={'_blank'}>GitHub</animated.a>
                            <button onClick={() => window.location = 'mailto:jay_sparks@icloud.com'}>E-mail</button>
                        </animated.div>
                    </animated.div>
                </div>
            </NavLinks>
        </div>
    </div>
  )
}

export default NavBar