
import styles from './Toggle.module.css'

function Toggle({ handleChange, isChecked }) {

  return (
    <div className={styles.toggleContainer}>
        <input 
            type="checkbox"
            id="check"
            className={styles.toggle}
            onChange={handleChange}
            checked={isChecked}
        />
        <label htmlFor="check">{isChecked ? 'Light Mode' : 'Dark Mode' }</label>
    </div>
  )
}

export default Toggle