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
        <label htmlFor="check">Dark Mode</label>
    </div>
  )
}

export default Toggle