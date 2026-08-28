
import Slideshow from '../Slideshow/Slideshow.jsx'
import styles from './Projects.module.css'

function Projects() {
  return (
    <div className={styles.projectsWrapper}>
      <div className={styles.sectionHeader}>
        <p>Builder credibility</p>
        <h2>Experiments &amp; Builds</h2>
        <span>Things I&apos;ve made because I like making things.</span>
      </div>
      <div className={styles.Projects}>
        <Slideshow />
      </div>
    </div>
  )
}

export default Projects
