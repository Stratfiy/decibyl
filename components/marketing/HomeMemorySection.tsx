import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeMemorySection() {
  return (
    <Section surface="canvas" ariaLabel="Memory">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">Gets smarter as it works</p>
          <h2 className="t-h2 mt-4">It remembers what matters.</h2>
          <p className="t-body-lg mt-5 text-slate">Useful context from conversations, calls, documents and completed work can come back when it helps with the next task.</p>
          <p className="mt-4 text-sm text-slate">Correct it anytime. What Decibyl inferred can stay separate from facts you explicitly confirmed.</p>
        </div>
        <div className={`${styles.stage} ${styles.memoryMap}`}>
          <div className={styles.memoryCore}><span>Memory</span></div>
          <div className={styles.memoryNode}><strong>People</strong><span>Dana is the final approver.</span></div>
          <div className={styles.memoryNode}><strong>Decisions</strong><span>Annual contract preferred.</span></div>
          <div className={styles.memoryNode}><strong>Preferences</strong><span>Keep weekly reports short.</span></div>
          <div className={styles.memoryNode}><strong>Documents</strong><span>Renewal is due 12 Nov.</span></div>
        </div>
      </div>
    </Section>
  );
}
