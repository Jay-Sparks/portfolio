import React from 'react'
import styles from './Home.module.css'
import Experience from '../Experience/Experience'
import Toggle from '../../components/Toggle/Toggle'
import Projects from '../../components/Projects/Projects'

function Home({ isDark, setIsDark }) {
  return (
    <div className={styles.views}>
        <Toggle 
          isChecked={isDark}
          handleChange={() => {setIsDark(!isDark)}}
        />
        <Experience isDark={isDark}/>
        <Projects />
    </div>
  )
}

export default Home