import React from 'react';

import NavBar from '../NavBar/NavBar';
import { CgMenuLeft } from 'react-icons/cg';

import styles from './Menu.module.css';
import SideDrawerAnimation from '../SideDrawerAnimation/SideDrawerAnimation.jsx';

function Menu({ isMenu, setIsMenu }) {
  return (
    <>
      {isMenu ? (
        <>
          <SideDrawerAnimation isMenu={isMenu}>
            <div className={styles.sideBar1}>
              <NavBar />
            </div>
          </SideDrawerAnimation>
          <div className={styles.cover} onClick={() => setIsMenu(false)}></div>
        </>
      ) : (
        <button className={styles.menu} onClick={() => setIsMenu(true)}>
          <CgMenuLeft className={styles.menuIcon} />
        </button>
      )}
      <div className={styles.sideBar}>
        <NavBar />
      </div>
    </>
  );
}

export default Menu;
