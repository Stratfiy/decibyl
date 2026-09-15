import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

const agents = [
  { icon: 'A', index: '01', title: 'Personal Assistant', body: 'Reminders, files, follow-ups and everyday admin.' },
  { icon: 'R', index: '02', title: 'Researcher', body: 'Track topics, competitors and changes that matter.' },
  { icon: 'V', index: '03', title: 'Voice Receptionist', body: 'Answer, book, verify and escalate calls.' },
];

export function HomeAgentsSection() {
  return (
    <Section surface="canvas" ariaLabel="Ready agents">
      <div className="text-center">
        <p className="t-eyebrow text-sindoor">Give each agent a job</p>
        <h2 className="t-h2 mt-4">Start with the work you want off your plate.</h2>
        <p className="mt-4 text-slate">Pick a ready agent or describe your own job.</p>
      </div>
      <div className={styles.agentGrid}>
        {agents.map((agent) => (
          <article key={agent.title} className={styles.agentCard}>
            <div className={styles.agentTop}>
              <span className={styles.agentIcon} aria-hidden="true">{agent.icon}</span>
              <span className={styles.agentIndex}>{agent.index}</span>
            </div>
            <h3>{agent.title}</h3>
            <p>{agent.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
