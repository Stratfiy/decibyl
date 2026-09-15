import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

const bots = [
  { icon: 'F', index: '01', title: 'Front Desk', body: 'Handle routine questions, bookings and the first customer conversation.' },
  { icon: 'L', index: '02', title: 'Lead Qualifier', body: 'Qualify incoming leads and keep the next step moving.' },
  { icon: 'O', index: '03', title: 'Order Confirmation', body: 'Confirm orders and collect the information the workflow needs.' },
];

export function HomeAgentsSection() {
  return (
    <Section surface="canvas" ariaLabel="Marketplace bots">
      <div className="text-center">
        <p className="t-eyebrow text-iron">Give each bot a job</p>
        <h2 className="t-h2 mt-4">Start from a role that already exists.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate">The live marketplace includes front desk, lead qualification, order confirmation, payment reminders, reservations, admissions, compliance reminders and internal knowledge. Or build your own.</p>
      </div>
      <div className={styles.agentGrid}>
        {bots.map((bot) => (
          <article key={bot.title} className={styles.agentCard}>
            <div className={styles.agentTop}>
              <span className={styles.agentIcon} aria-hidden="true">{bot.icon}</span>
              <span className={styles.agentIndex}>{bot.index}</span>
            </div>
            <h3>{bot.title}</h3>
            <p>{bot.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-7 text-center"><Link href="/use-cases" className="text-sm font-semibold text-ink underline underline-offset-4">Find a bot →</Link></div>
    </Section>
  );
}
