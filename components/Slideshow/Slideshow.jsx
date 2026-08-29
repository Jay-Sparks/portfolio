import items from './Items.jsx';
import styles from './Slideshow.module.css'

function Slideshow() {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <article className={styles.card} key={item.title}>
          {item.image ? (
            <img src={item.image} alt="" />
          ) : (
            <div className={styles.imagePlaceholder}>Visual coming soon</div>
          )}
          <div className={styles.cardContent}>
            <p className={styles.category}>{item.category}</p>
            <h3>{item.title}</h3>
            <p className={styles.blurb}>{item.blurb}</p>
            <p className={styles.description}>
              {item.description || 'Project details to be added.'}
            </p>
            {item.tools && <p className={styles.tools}>{item.tools}</p>}
            <div className={styles.links}>
              {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer">Live project</a>}
              {item.github.map((url, index) => (
                <a href={url} target="_blank" rel="noopener noreferrer" key={url}>
                  {item.github.length > 1 ? `GitHub ${index + 1}` : 'GitHub'}
                </a>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Slideshow;
