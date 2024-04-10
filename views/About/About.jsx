import React from 'react';

import styles from './About.module.css';
import Toggle from '../../components/Toggle/Toggle';
import Menu from '../../components/Menu/Menu';

function About({ isDark, setIsDark, isMenu, setIsMenu }) {
  return (
    <>
      <Menu isMenu={isMenu} setIsMenu={setIsMenu}/>
      <div className={styles.About}>
        <Toggle
          isChecked={isDark}
          handleChange={() => {
            setIsDark(!isDark);
          }}
        />
        <div className={styles.aboutContent}>
          <h1>/about</h1>
          <p>
            A creative full-stack digital collaborator with over 8 years
            experience in agile teams as a Product Owner & Scrum Master. 4 years
            self-taught in front-end technologies, particularly react.js, and
            recently completing a full-stack JavaScript course. With a passion
            for creating delightful & unique user experiences that leverage
            large data sets and utilise the latest technologies.
          </p>
          <h2>Software Engineering</h2>
          <p>
            I started my engineering journey learning python basics, moving onto
            Javascript & JQuery and later learning React 16. During my role as
            Innovation Product Manager I was able to assist in the build phase
            of new product concepts, building user interfaces for blockchain,
            savings and mortgage journeys. I continued to deepen my knowledge of
            React, utilising resources such as; Robin Weiruch's Road to React,
            Maximillian Schwarzmüller's complete guide and Bruno Simon's
            Three.js & React-three-fiber. In 2024 I also completed a full-stack
            Javascript Software Engineering course at Northcoders coding school.
          </p>
          <h2>Agile Collaborator</h2>
          <p>
            5 years as a digital product manager and scrum master, assisting
            remote teams in delivering complex data dashboards for tier 1 banks
            & leading the research, design and development of new products in
            the financial services industry.
          </p>
          <h2>Entrepreneur</h2>
          <p>
            Tech start-up founder of a mobile app called Tipsta, which allowed
            customers to tip restaurant staff directly. Designed using figma,
            built using meteor.js & launched to the app store in 2018
          </p>
          <h2>Business Consultant</h2>
          <p>
            Assisted in the analysis and reporting of a large scale resource
            allocation programme, that lead to a data clean room and later
            management information dashboards for senior executives.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
