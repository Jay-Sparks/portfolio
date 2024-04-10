import React from 'react';
import NavBar from '../../components/NavBar/NavBar';

import styles from './Cv.module.css';
import Toggle from '../../components/Toggle/Toggle';
import Menu from '../../components/Menu/Menu';

function Cv({ isDark, setIsDark, isMenu, setIsMenu }) {
  return (
    <>
      <Menu isMenu={isMenu} setIsMenu={setIsMenu}/>
      <div className={styles.Cv}>
        <Toggle 
            isChecked={isDark}
            handleChange={() => {setIsDark(!isDark)}}
          />
        <div className={styles.cvContent}>
          <h1>/cv</h1>
          <h2>Skills</h2>
          <p>
            <strong>Libraries:</strong> React-three-fiber, React Spring, Drei, React-three-rapier, Three.js<br/>
            <strong>Front-End:</strong> JavaScript, React.js, HTML, CSS<br/>
            <strong>Back-End:</strong> Express, Axio, Node, PostgreSQL, Firebase<br/>
            <strong>Testing:</strong> Test-Driven Development, Jest, React Test Library, SuperTest<br/>
            <strong>Tooling:</strong> VS code, Github, Vite, JIRA, Slack, Render, Netlify, Nodemon<br/>
            <strong>Design:</strong> Figma, MIRO, Blender
          </p>
          <h2>Experience</h2>
          <p>
            <strong>Trainee Software Engineer | Northcoders | Jan 24 - Apr 24</strong><br/>
            Full stack JavaScript engineering programme that covered a deep interrogation of
            JavaScript fundamentals as well as the application of back-end
            technologies such as: Express.js, Axios, PostgreSQL and tooling such as
            ElephantSQL, Render, SuperTest and Nodemon; also front-end technologies
            such as: React.js, HTML, CSS, Axios, Vite; and core techniques such as
            TDD, CI/CD and paired programming.
          </p>
          <p>
            <strong>Senior Product Owner | Nationwide Building Society | Nov 19 - Nov 2023</strong><br/>
            <i>Mortgage Originations:</i> Lead the originations platform proof of concept
            for discovery of a platform buy vs build decision. Working closely
            alongside senior stakeholders 
            to define the vision and strategic roadmap to concurrently improve
            user experiences and operational processes. 
            <i>Innovation Lead:</i> 
            Researching and developing new customer value propositions that meet
            the FCA’s consumer duty. I lead a cross-functional team of UX
            researchers, data scientists and engineers to build & test rapid proof
            of concepts. We developed proof of concepts utilising IBMs hyperledger
            blockchain, AI image recognition & natural language generation and
            OpenBanking.
          </p>
          <p>
            <strong>Digital Product Manager | HSBC | Feb 19 - Nov 19 </strong><br/>
            Product Manager for a cloud based Global Digital Identity platform, designed to orchestrate
            the integration of multiple third party suppliers to provide biometric
            authentication and ID validation capabilities, across 38 Global
            Markets, to the Retail Banking & Wealth Management business of HSBC.
            Working closely with an agile team split between the UK, Poland and
            Hong Kong, I lead engagement with senior global stakeholders to define
            the business case and agree key product success metrics to measure the
            performance of the solution and defined the roadmap through frequent
            workshops and user research.
          </p>
          <p>
            <strong>Digital Consultant | CAPCO | Oct 15 - Oct 18</strong><br/>
            Digital consultant across multiple projects including a startup business bank and the
            foundations of the CMAs Open-banking. Most notable roles
            were: <br/>
            <i>HSBC - Group Executive MI Dashboard</i><br/>
            Responsible for the design & delivery of a management information
            dashboard for senior executives across a multi-billion dollar portfolio. I
            embedded agile principles across two cross-functional teams whilst
            negotiating & prioritising features to define the roadmap.<br/>
            <i>HSBC - PPM Data Remediation</i><br/>
            Initiative to consolidate internal project & portfolio management data across multiple source systems
            into a centralised data clean room. I took the roles of business analyst & later scrum
            master in a cross-functional remote team split between the UK and India.
          </p>
          <p>
            <strong>Founder - CEO | TIPSTA | Sep 15 - Feb 18</strong><br/>
            Founder of a mobile app startup that allowed restaurant customers to pay a tip directly to
            restaurant staff, as well as allow sharing tips amongst colleagues. I
            recruited a team, defined the product vision, designed ux flows and
            3rd party integrations, and organised weekend development
            sessions/sprints. We successfully launched our mobile app to the iOS
            Appstore in early 2017.
          </p>
        </div>
      </div>
    </>
  );
}

export default Cv;
