import { useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import Toggle from '../../components/Toggle/Toggle';
import Slideshow from '../../components/Slideshow/Slideshow';
import styles from './Built.module.css';

export default function Built({ isDark, setIsDark, isMenu, setIsMenu }) {
  useEffect(() => {
    document.title = '.JS - Built';
  }, []);

  return (
    <>
      <Menu isMenu={isMenu} setIsMenu={setIsMenu} />
      <div className={styles.Built}>
        <Toggle
          isChecked={isDark}
          handleChange={() => setIsDark(!isDark)}
        />
        <main className={styles.builtContent}>
          <header className={styles.heading}>
            <p>Builder credibility</p>
            <h1>Things I&apos;ve Built</h1>
            <span>
              Products, prototypes and experiments I&apos;ve designed and built
              hands-on.
            </span>
          </header>
          <Slideshow />
        </main>
      </div>
    </>
  );
}
