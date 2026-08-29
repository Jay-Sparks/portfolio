import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import Toggle from '../../components/Toggle/Toggle';
import BuiltProjects from '../../components/BuiltProjects/BuiltProjects';
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
          <BuiltProjects />
          <section className={styles.conceptsTeaser}>
            <p>Further exploration</p>
            <h2>Concepts</h2>
            <span>
              Prototypes, interactive tools and smaller builds created through
              hands-on exploration.
            </span>
            <Link to="/concepts">Explore concepts →</Link>
          </section>
        </main>
      </div>
    </>
  );
}
