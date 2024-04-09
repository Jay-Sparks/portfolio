import React from 'react'
import NavBar from '../../components/NavBar/NavBar'

import styles from './Experiments.module.css'

function Experiments() {
  return (
    <div className={styles.Experiments}>
      <h1>/experiments</h1>
      <div className={styles.sideBar}>
        <NavBar />
      </div>
    </div>
  )
}

export default Experiments