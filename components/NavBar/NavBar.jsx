import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from '../NavBar/NavBar.module.css';

import { animated, useSpring } from '@react-spring/web';
import NavAnimation from '../NavAnimation/NavAnimation';

function NavBar() {
  /* From previous .JS animation
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
  */

  const location = useLocation();

  return (
    <div className={styles.NavBar}>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark}>.JS</span>
          <span className={styles.brandDescriptor}>Product Leader & Builder</span>
        </Link>

        {/* From previous .JS animation
        <animated.a href={location.pathname === '/' ? '#' : '/'} className={styles.removeA}>
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
        */}
        <NavAnimation>
          <div className={styles.topLinks}>
            <p className={styles.groupLabel}>Explore</p>
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
                to={`/work`}
                className={
                  location.pathname === '/work' || location.pathname === '/experiments'
                    ? styles.topLinksCurr
                    : styles.topLinksLink
                }
              >
                Work
              </Link>
            </div>
          </div>
          <div className={styles.botLinks}>
            <div className={styles.projects}>
              <p className={styles.groupLabel}>Selected Work</p>
              <div className={styles.innerLinks}>
                <span>Product Hunter</span>
                <span>Settle</span>
                <span>Redgate Monitor</span>
                <span>Data Platform</span>
              </div>
            </div>
          </div>
          <div className={styles.botLinks}>
            <div className={styles.projects}>
              <p className={styles.groupLabel}>Connect</p>
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
                  Email
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
