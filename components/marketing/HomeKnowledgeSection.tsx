import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeKnowledgeSection() {
  return (
    <Section surface="canvas" ariaLabel="Knowledge and documents">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="t-eyebrow text-iron">Give bots your knowledge</p>
          <h2 className="t-h2 mt-4">Your documents become working context.</h2>
          <p className="t-body-lg mt-5 text-slate">Upload files for retrieval, read scanned pages with OCR, extract important fields for confirmation and let the approved context support later calls, messages and tasks.</p>
          <div className="mt-6 flex flex-wrap gap-2">{['Knowledge base','Google Drive','OCR','Extraction','Search','Expiry reminders'].map((x)=><span key={x} className="rounded-full border border-ink/10 bg-white px-3 py-2 text-xs font-bold text-ink/70">{x}</span>)}</div>
        </div>
        <div className={`${styles.stage} ${styles.docStack}`}>
          <div className={styles.docCard}><span className={styles.docBadge}>POLICY</span><div className={styles.docLines}><i /><i /><i /></div></div>
          <div className={styles.docCard}><span className={styles.docBadge}>SCANNED FILE</span><div className={styles.docLines}><i /><i /><i /></div></div>
          <div className={styles.docCard}>
            <span className={styles.docBadge}>VENDOR CONTRACT</span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">Vendor-contract.pdf</h3>
            <div className={styles.docLines}><i /><i /><i /></div>
            <div className={styles.docFact}><span>Renewal date</span><strong>12 Nov · confirm</strong></div>
            <div className={styles.docFact}><span>After confirmation</span><strong>Reminder can be created</strong></div>
          </div>
        </div>
      </div>
    </Section>
  );
}
