import React from 'react';

import styles from './Experiments.module.css';
import Toggle from '../../components/Toggle/Toggle';
import Menu from '../../components/Menu/Menu';
import Slideshow from '../../components/Slideshow/Slideshow';
import Projects from '../../components/Projects/Projects';

function Experiments({ isDark, setIsDark, isMenu, setIsMenu }) {
  return (
    <>
      <Menu isMenu={isMenu} setIsMenu={setIsMenu}/>
      <div className={styles.Experiments}>
        <Toggle
          isChecked={isDark}
          handleChange={() => {
            setIsDark(!isDark);
          }}
        />
        <div className={styles.aboutContent}>
          <Projects />
          <h1>/experiments</h1>
        </div>
      </div>
    </>
  );
}

export default Experiments;
