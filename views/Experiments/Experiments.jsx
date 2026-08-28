import styles from './Experiments.module.css';
import Toggle from '../../components/Toggle/Toggle';
import Menu from '../../components/Menu/Menu';
import Projects from '../../components/Projects/Projects';
import SelectedWork from '../../components/SelectedWork/SelectedWork';

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
          <Projects />
        </main>
      </div>
    </>
  );
}

export default Experiments;
