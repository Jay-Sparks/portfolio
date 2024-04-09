
import Slideshow from '../Slideshow/Slideshow.jsx'

import styles from './Projects.module.css'

function Projects() {
  return (
    <div className={styles.projectsWrapper}>
      <h2>Projects</h2>
      <div className={styles.Projects}>
        <Slideshow />
      </div>
    </div>
  )
}

export default Projects