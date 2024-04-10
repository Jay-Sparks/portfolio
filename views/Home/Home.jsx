import React, { useState } from 'react'

import Experience from '../../components/Experience/Experience'
import Toggle from '../../components/Toggle/Toggle'
import Projects from '../../components/Projects/Projects'
import Menu from '../../components/Menu/Menu'

import styles from './Home.module.css'

function Home({ isDark, setIsDark, isMenu, setIsMenu }) {

  

  return (
    <>
      <Menu isMenu={isMenu} setIsMenu={setIsMenu}/>
      <div className={styles.views}>
          <Toggle 
            isChecked={isDark}
            handleChange={() => {setIsDark(!isDark)}}
          />
          <Experience isDark={isDark}/>
          <Projects />
      </div>
    </>
  )
}

export default Home