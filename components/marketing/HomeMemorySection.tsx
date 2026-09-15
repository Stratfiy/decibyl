import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeMemorySection() {
  return (
    <Section surface="canvas" ariaLabel="Memory">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="t-eyebrow text-iron">Gets smarter as it works</p>
          <h2 className="t-h2 mt-4">It remembers what you choose to make useful.</h2>
          <p className="t-body-lg mt-5 text-slate">Confirmed facts, decisions, people and document context can come back when they help with the next job. Things Decibyl only inferred stay reviewable until you confirm them.</p>
          <p className="mt-4 text-sm text-slate">Correct a fact, reject it, export memory to an Obsidian vault, or explicitly forget everything when you need a clean slate.</p>
        </div>
        <div className={`${styles.stage} ${styles.memoryMap}`}>
          <div className={styles.memoryCore}><span>Memory</span></div>
          <div className={styles.memoryNode}><strong>Confirmed fact</strong><span>Dana approves final terms.</span></div>
          <div className={styles.memoryNode}><strong>Decision</strong><span>Annual plan chosen.</span></div>
          <div className={styles.memoryNode}><strong>Inferred</strong><span>Waiting for your confirmation.</span></div>
          <div className={styles.memoryNode}><strong>Document</strong><span>Renewal date confirmed: 12 Nov.</span></div>
        </div>
      </div>
    </Section>
  );
}
