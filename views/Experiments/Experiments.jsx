import React from 'react';

import styles from './Experiments.module.css';
import Toggle from '../../components/Toggle/Toggle';
import Menu from '../../components/Menu/Menu';

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
          <h2>coming soon...</h2>
          <h1>/experiments</h1>
        </div>
      </div>
    </>
  );
}

export default Experiments;
