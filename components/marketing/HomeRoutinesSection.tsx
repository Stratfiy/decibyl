import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeRoutinesSection() {
  return (
    <Section surface="white" ariaLabel="Routines">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">Runs without you</p>
          <h2 className="t-h2 mt-4">Turn repeat work into routines.</h2>
          <p className="t-body-lg mt-5 text-slate">Start work on a schedule or when something happens. No need to remember to prompt it again.</p>
        </div>
        <div className={`${styles.stage} ${styles.routineStack}`}>
          <div className={styles.routineCard}><span className={styles.routineDot} /><div><strong>Every morning</strong><p>Research competitors → summarize changes → send on WhatsApp</p></div></div>
          <div className={styles.routineCard}><span className={styles.routineDot} /><div><strong>When a lead arrives</strong><p>Research → qualify → follow up → update CRM</p></div></div>
          <div className={styles.routineCard}><span className={styles.routineDot} /><div><strong>Every Friday</strong><p>Collect updates → prepare the weekly report</p></div></div>
        </div>
      </div>
    </Section>
  );
}
