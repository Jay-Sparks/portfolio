import items from './builtData';
import styles from './BuiltProjects.module.css';

function BuiltItem({ item, index }) {
  return (
    <article className={`${styles.item} ${item.featured ? styles.featured : ''}`}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          {item.featured ? 'Featured build' : 'Built'}
        </p>

        <h3>{item.name}</h3>
        <p className={styles.positioning}>{item.positioning}</p>
        <p className={styles.evidence}>{item.evidence}</p>

        <div className={styles.tags}>
          {item.categories.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        {item.url && (
          <a className={styles.cta} href={item.url}>
            {item.cta}
          </a>
        )}
      </div>

      <div className={styles.visual}>
        <img src={item.image} alt={item.name} />
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
    </article>
  );
}

export default function BuiltProjects() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h1>Built</h1>
        <p>
          Products I've designed and built from fintech apps and interactive tools
          to multiplayer games.
        </p>
      </div>

      <div className={styles.grid}>
        {items.map((item, index) => (
          <BuiltItem key={item.name} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
