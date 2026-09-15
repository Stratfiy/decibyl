import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

const controls = [
  ['Approve consequential writes', 'Supported reads can run; writes and unknown consequential actions can wait for confirmation.', true],
  ['See what bots did', 'Tasks, runs, calls, failures and recent outcomes stay inspectable.', false],
  ['Control memory', 'Confirm, reject, correct, export or erase remembered context.', true],
  ['Control access', 'Give each bot only the apps, knowledge and tools its job needs.', false],
] as const;

export function HomeControlSection() {
  return (
    <Section surface="white" ariaLabel="Human control">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="t-eyebrow text-iron">You stay in control</p>
          <h2 className="t-h2 mt-4">Let bots work. Keep the important boundaries visible.</h2>
          <p className="t-body-lg mt-5 text-slate">Automation is useful when routine work can move quickly without giving every bot unlimited authority.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {controls.map(([title, body, accent]) => (
            <article key={title} className={styles.controlCard}>
              <span className={styles.controlSwitch} data-accent={accent || undefined} aria-hidden="true"><i /></span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
