import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from './Experiments.module.css';
import Toggle from '../../components/Toggle/Toggle';
import Menu from '../../components/Menu/Menu';

function Experiments({ isDark, setIsDark, isMenu, setIsMenu }) {

  const [articles, setArticles] = useState([]);


  useEffect(() => {
    axios.get("/api/articles")
      .then(response => {
        console.log(response, "RESPONSE")
        setArticles(response.data)
      }
      )
      .catch(error => console.error(error));
  }, []);

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
          <p>{articles}</p>
        </div>
      </div>
    </>
  );
}

export default Experiments;
