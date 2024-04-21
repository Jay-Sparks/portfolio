import React from 'react';

import styles from './Experiments.module.css';
import Toggle from '../../components/Toggle/Toggle';
import Menu from '../../components/Menu/Menu';
import Projects from '../../components/Projects/Projects';

import { FaGithubAlt } from "react-icons/fa";

import photoGalleryImg from '../../src/assets/photoGallery.png';

function Experiments({ isDark, setIsDark, isMenu, setIsMenu }) {
  return (
    <>
      <h1>/experiments</h1>
      <Menu isMenu={isMenu} setIsMenu={setIsMenu} />
      <div className={styles.Experiments}>
        <Toggle
          isChecked={isDark}
          handleChange={() => {
            setIsDark(!isDark);
          }}
        />
        <div className={styles.aboutContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionName}>TypeScript & Next.js</h2>
          </div>
          <div className={styles.wrapper}>
            <a href={'https://t3gallery-eta-red.vercel.app/'} target={'_blank'}>
              <img src={photoGalleryImg} />
            </a>
            <div className={styles.copyWrapper}>
              <p>
                Experimenting with TypeScript and Next.js by following @TheoGG's
                tutorial. Learning how to use TypeScript in a full-stack
                production ready app, which allows users to store images in a
                gallery. The app includes; authentication powered by Clerk,
                storage powered by Vercel & Drizzle, rate limiting and analytics.
              </p>
              <p>
                Next.js, Typescript, Tailwind, Shadcn/ui
              </p>
              <p>
                Drizzle, Vercel, Clerk, Upstash, Sentry, PostHog
              </p>
              <a
                href={'https://github.com/Jay-Sparks/t3gallery'}
                target={'_blank'}
              >
                <FaGithubAlt />
              </a>
            </div>
          </div>
          <Projects />
        </div>
      </div>
    </>
  );
}

export default Experiments;
