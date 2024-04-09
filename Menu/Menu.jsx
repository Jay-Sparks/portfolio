import React from 'react'

import styles from './Menu.module.css'
import NavBar from '../components/NavBar/NavBar'
import { CgMenuLeft } from 'react-icons/cg'

function Menu({ isMenu, setIsMenu }) {
  return (
    <>
        {isMenu ? 
            <div className={styles.menuWrapper}>
                <div className={styles.sideBar1}>
                    <NavBar />
                </div>
                <div className={styles.cover} onClick={() => setIsMenu(false)}></div>
            </div>
        : 
            <button className="menu" onClick={() => setIsMenu(true)}>
                <CgMenuLeft className={styles.menuIcon} />
            </button>
        }

        <div className={styles.sideBar}>
            <NavBar />
        </div>
    </>
  )
}

export default Menu