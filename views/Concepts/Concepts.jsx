import { useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import Toggle from '../../components/Toggle/Toggle';
import Slideshow from '../../components/Slideshow/Slideshow';
import styles from './Concepts.module.css';

export default function Concepts({ isDark, setIsDark, isMenu, setIsMenu }) {
  useEffect(() => {
    document.title = '.JS - Concepts';
  }, []);

  return (
    <>
      <Menu isMenu={isMenu} setIsMenu={setIsMenu} />
      <div className={styles.Concepts}>
        <Toggle
          isChecked={isDark}
          handleChange={() => setIsDark(!isDark)}
        />
        <main className={styles.conceptsContent}>
          <header className={styles.heading}>
            <p>Hands-on exploration</p>
            <h1>Concepts</h1>
            <span>
              Prototypes, interactive tools and smaller builds I&apos;ve designed
              and made hands-on.
            </span>
          </header>
          <Slideshow />
        </main>
      </div>
    </>
  );
}
