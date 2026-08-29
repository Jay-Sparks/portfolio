import styles from './Experiments.module.css';
import Toggle from '../../components/Toggle/Toggle';
import Menu from '../../components/Menu/Menu';
import SelectedWork from '../../components/SelectedWork/SelectedWork';
import { Link } from 'react-router-dom';

function Experiments({ isDark, setIsDark, isMenu, setIsMenu }) {
  return (
    <>
      {/* From previous route label
      <h1>/experiments</h1>
      */}
      <Menu isMenu={isMenu} setIsMenu={setIsMenu} />
      <div className={styles.Experiments}>
        <Toggle
          isChecked={isDark}
          handleChange={() => {
            setIsDark(!isDark);
          }}
        />
        <main className={styles.workContent}>
          <SelectedWork />
          <section className={styles.builtTeaser}>
            <p>Builder credibility</p>
            <h2>Things I&apos;ve Built</h2>
            <span>
              Products, prototypes and experiments I&apos;ve designed and built
              hands-on.
            </span>
            <Link to="/built">Explore everything I&apos;ve built →</Link>
          </section>
        </main>
      </div>
    </>
  );
}

export default Experiments;
