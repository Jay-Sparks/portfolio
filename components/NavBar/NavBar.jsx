import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from '../NavBar/NavBar.module.css';

import { animated, useSpring } from '@react-spring/web';
import NavAnimation from '../NavAnimation/NavAnimation';

function NavBar() {
  const [isHovered, setIsHovered] = useState(true);
  const [{ x, color, background }, set] = useSpring(() => ({
    x: 10,
    color: '#fff',
    background: 'var(--primary-button-background-dark)',
    config: { mass: 10, tension: 2500, friction: 400 },
  }));

  useEffect(() => {
    setTimeout(() => {
      set.start({
        x: 7,
        color: 'black',
        background: 'var(--primary-button-background)',
        config: { mass: 10, tension: 1000, friction: 300 },
      });
      setIsHovered(false);
    }, 1400);
  }, []);

  const location = useLocation();

  return (
    <div className={styles.NavBar}>
      <div className={styles.navLinks}>
        <animated.a
          href={location.pathname === '/' ? '#' : '/'}
          className={styles.removeA}
        >
          <animated.div
            onMouseEnter={() => {
              set.start({
                x: 10,
                color: 'var(--secondary-text-color)',
                background: 'var(--primary-button-background-dark)',
                config: { mass: 10, tension: 2500, friction: 400 },
              });
              setTimeout(() => setIsHovered(() => true), 50);
            }}
            onMouseLeave={() => {
              set.start({
                x: 7,
                color: 'var(--secondary-text-color)',
                background: 'var(--primary-button-background)',
                config: { mass: 10, tension: 2500, friction: 400 },
              });
              setTimeout(() => setIsHovered(false), 0);
            }}
            style={{
              opacity: 0.95,
              width: x.to((v) => `${v}rem`),
              background: background.to((v) => `${v}`),
            }}
            className={styles.glance}
          >
            <animated.span style={{ color }}>
              {isHovered ? (
                <p className={styles.lightShine}>Jay Spencer</p>
              ) : (
                '.JS'
              )}
            </animated.span>
          </animated.div>
        </animated.a>
        <NavAnimation>
          <div className={styles.topLinks}>
            <div className={styles.topLinkWrapper}>
              <Link
                to={`/about`}
                className={
                  location.pathname === '/about'
                    ? styles.topLinksCurr
                    : styles.topLinksLink
                }
              >
                About
              </Link>
            </div>
            <div className={styles.topLinkWrapper}>
              <Link
                to={`/experiments`}
                className={
                  location.pathname === '/experiments'
                    ? styles.topLinksCurr
                    : styles.topLinksLink
                }
              >
                Experiments
              </Link>
            </div>
            <div className={styles.topLinkWrapper}>
              <Link
                to={`/cv`}
                className={
                  location.pathname === '/cv'
                    ? styles.topLinksCurr
                    : styles.topLinksLink
                }
              >
                CV
              </Link>
            </div>
          </div>
          <div className={styles.botLinks}>
            <div className={styles.projects}>
              <p>PROJECTS</p>
              <div className={styles.innerLinks}>
                <a href="https://city-zen.netlify.app/" target={'_blank'}>
                  City Zen
                </a>
                <a href="https://artico-app-js.netlify.app/" target={'_blank'}>
                  Artico
                </a>
                {/* <a
                  href="https://threejs-tshirt-ai.netlify.app/"
                  target={'_blank'}
                >
                  3D t-shirt
                </a>
                <a href="https://threejs-island.netlify.app/" target={'_blank'}>
                  3D Island
                </a> */}
                <a href="https://waste-not-js.netlify.app/" target={'_blank'}>
                  Waste Not
                </a>
              </div>
            </div>
          </div>
          <div className={styles.botLinks}>
            <div className={styles.projects}>
              <p>CONTACT</p>
              <div className={styles.innerLinks}>
                <a
                  href="https://www.linkedin.com/in/jay-spencer-55675792/"
                  target={'_blank'}
                >
                  LinkedIn
                </a>
                <a href="https://github.com/Jay-Sparks" target={'_blank'}>
                  GitHub
                </a>
                <button
                  onClick={() =>
                    (window.location = 'mailto:jay_sparks@icloud.com')
                  }
                >
                  E-mail
                </button>
              </div>
            </div>
          </div>
        </NavAnimation>
      </div>
    </div>
  );
}

export default NavBar;
