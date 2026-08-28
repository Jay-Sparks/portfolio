import items from './selectedWorkData';
import styles from './SelectedWork.module.css';

function WorkItem({ item, index }) {
  const content = (
    <>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          {item.featured ? 'Featured work' : 'Selected work'}
        </p>
        <h3>{item.name}</h3>
        <p className={styles.positioning}>{item.positioning}</p>
        <p className={styles.evidence}>{item.evidence}</p>
        <div className={styles.tags}>
          {item.categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
        <span className={styles.caseStudyStatus}>Case study coming soon</span>
      </div>
      <div className={styles.visual}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <strong>Product imagery placeholder</strong>
      </div>
    </>
  );

  return item.caseStudyUrl ? (
    <a
      className={`${styles.item} ${item.featured ? styles.featured : ''}`}
      href={item.caseStudyUrl}
    >
      {content}
    </a>
  ) : (
    <article className={`${styles.item} ${item.featured ? styles.featured : ''}`}>
      {content}
    </article>
  );
}

export default function SelectedWork() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p className={styles.kicker}>Product credibility</p>
        <h1>Selected Work</h1>
        <p>
          Product leadership across customer experiences, SaaS and data
          products. Detailed case studies are being prepared.
        </p>
      </div>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <WorkItem item={item} index={index} key={item.name} />
        ))}
      </div>
    </section>
  );
}
