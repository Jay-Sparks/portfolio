
import Slideshow from '../../components/Slideshow/Slideshow.jsx'

import styles from './Projects.module.css'

import ArticoImg from '../../src/assets/Artico.png'
import WasteNot from '../../src/assets/wasteNotFavourites.webp'

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