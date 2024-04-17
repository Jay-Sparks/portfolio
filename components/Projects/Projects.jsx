
import Slideshow from '../Slideshow/Slideshow.jsx'
import { PiHandSwipeLeftThin } from "react-icons/pi";
import { GiSideswipe } from "react-icons/gi";

import styles from './Projects.module.css'

function Projects() {
  return (
    <div className={styles.projectsWrapper}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionName}>Three.js & R3F</h2>
        <PiHandSwipeLeftThin className={styles.swipeIcon} />
        {/* <GiSideswipe className={styles.glideIcon}/> */}
      </div>
      <div className={styles.Projects}>
        <Slideshow />
      </div>
    </div>
  )
}

export default Projects