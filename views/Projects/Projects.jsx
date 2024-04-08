
import Slideshow from '../../components/Slideshow/Slideshow.jsx'

import styles from './Projects.module.css'

function Projects() {
  return (
    <div className={styles.projectsWrapper}>
      <div className={styles.Projects}>
        <Slideshow />
      </div>
    </div>
  )
}

export default Projects