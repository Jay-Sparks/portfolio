import React from 'react'
import NavBar from '../../components/NavBar/NavBar'

import styles from './About.module.css'

function About() {
  return (
    <div className={styles.About}>
      <div className={styles.sideBar}>

        <NavBar />
      </div>
      <div className={styles.aboutContent}>
        <h1>/about</h1>
        <h2>Software Engineering</h2>
        <p>I started my engineering journey learning python basics, 
          moving onto Javascript & JQuery and later learning React 16. 
          During my role as Innovation Product Manager I was able to assist in the build phase of new product concepts, 
          building user interfaces for blockchain, savings and mortgage journeys.
          I continued to deepen my knowledge of React, utilising resources such as;
           Robin Weiruch's Road to React, 
           Maximillian Schwarzmüller's complete guide and 
           Bruno Simon's Three.js & React-three-fiber. 
           In 2024 I also completed a full-stack Javascript Software Engineering course at Northcoders coding school.
        </p>
        <h2>Agile Experience</h2>
        <p>
          5 years as a digital product manager assisting in the research, 
          design and development of new products in the financial services industry.
        </p>
        <p>
          2 years as a scrum master, 
          assisting remote teams in delivering complex data dashboards for tier 1 banks.
        </p>
        <p>
          Tech start-up founder of a mobile app called Tipsta, which allowed customers to tip restaurant staff directly. 
          Designed using figma, built using meteor.js & launched to the app store in 2018
        </p>
      </div>
    </div>
  )
}

export default About