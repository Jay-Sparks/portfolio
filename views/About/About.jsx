import React, { useEffect, useState } from 'react';

import styles from './About.module.css';
import Toggle from '../../components/Toggle/Toggle';
import Menu from '../../components/Menu/Menu';
import TrailAnimation from '../../components/TrailAnimation/TrailAnimation';

const CAREER_HISTORY = [
  { company: '7IM', role: 'Product Manager, Data Platform', dates: '2026–Present' },
  { company: 'Redgate', role: 'Product Manager', dates: '2024–2025' },
  { company: 'Nationwide', role: 'Lead Product Manager', dates: '2019–2023' },
  { company: 'HSBC', role: 'Product Manager', dates: '2019' },
  { company: 'Capco', role: 'Consultant', dates: '2015–2018' },
];

const SOUNDCLOUD_URL = 'https://soundcloud.com/anvme';
const SOUNDCLOUD_EMBED_URL =
  'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/anvme&color=%23f28c28&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false';

function About({ isDark, setIsDark, isMenu, setIsMenu }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = '.JS - About';
  }, []);

  let x = window.matchMedia('(max-width: 600px)');

  useEffect(() => {
    mediaQuery(x);
  }, [x]);

  function mediaQuery(x) {
    if (x.matches) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  x.addEventListener('change', mediaQuery);

  const aboutSections = [
    <section className={styles.introduction} key="who-i-am">
      <h1 className={styles.aboutHeading}>
        From ambiguous problems to working products
      </h1>
      <p>
        I work end-to-end, from understanding a problem and shaping the
        proposition through design and prototyping to getting real products into
        users&apos; hands. I’m particularly interested in exploring complex problem
        spaces, identifying where technology can create meaningful value, and
        turning those opportunities into products worth building.
      </p>
    </section>,
    <section key="where-ive-worked">
      <h2>Experience</h2>
      <ul className={styles.careerList}>
        {CAREER_HISTORY.map(({ company, role, dates }) => (
          <li className={styles.careerRow} key={`${company}-${dates}`}>
            <strong>{company}</strong>
            <span>{role}</span>
            <span>{dates}</span>
          </li>
        ))}
      </ul>
    </section>,
    <section key="beyond-product">
      <h2>Beyond product</h2>
      <p>
        I&apos;ve always liked making things. Music has been a big part of that — I
        play piano and guitar, and have written, produced and released my own
        music, including work played on BBC Radio. Away from a screen, I&apos;m
        usually doing something active: cycling, tennis, badminton or climbing.
        I also love travelling and exploring different places and cultures.
      </p>
    </section>,
    <div className={styles.soundcloud} key="soundcloud">
      <iframe
        title="Anvme on SoundCloud"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        loading="lazy"
        src={SOUNDCLOUD_EMBED_URL}
      />
      <a
        href={SOUNDCLOUD_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        More on SoundCloud →
      </a>
    </div>,
    <div className={styles.utilityLinks} key="utility-links">
      <button className={styles.downloadPlaceholder} disabled type="button">
        Download CV →
      </button>
    </div>,
  ];

  return (
    <>
      <Menu isMenu={isMenu} setIsMenu={setIsMenu} />
      <div className={styles.About}>
        <Toggle
          isChecked={isDark}
          handleChange={() => {
            setIsDark(!isDark);
          }}
        />
        <div
          className={styles.aboutContent}
          // style={{ opacity: 0.95, width: x.to(v => `${v}rem`) }}
        >
          {/* From previous route label
          <h1>/about</h1>
          */}
          {isMobile ? aboutSections : <TrailAnimation>{aboutSections}</TrailAnimation>}
        </div>
      </div>
    </>
  );
}

export default About;
