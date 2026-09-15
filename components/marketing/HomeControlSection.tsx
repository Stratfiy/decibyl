import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

const controls = [
  ['Approve important actions', 'Let reads run and review writes before they happen.', true],
  ['See what agents did', 'Keep calls, tasks and actions visible.', false],
  ['Control memory', 'Correct context and choose what should be remembered.', true],
  ['Control access', 'Give each agent only the tools its job needs.', false],
] as const;

export function HomeControlSection() {
  return (
    <Section surface="white" ariaLabel="Human control">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">You stay in control</p>
          <h2 className="t-h2 mt-4">Let AI act. Set the limits.</h2>
          <p className="t-body-lg mt-5 text-slate">Agents can do the routine work while sensitive actions, memory and access stay visible and controllable.</p>
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
