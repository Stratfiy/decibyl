import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeTeamSection() {
  return (
    <Section surface="canvas" ariaLabel="Bots and people working together">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="t-eyebrow text-iron">Bots can hand work off</p>
          <h2 className="t-h2 mt-4">One job can move between specialists — and back to a person.</h2>
          <p className="t-body-lg mt-5 text-slate">Inside a shared channel, a bot can @mention another bot when the next step belongs to it. Tasks can also be assigned to bots or teammates, so the handoff stays visible.</p>
          <p className="mt-4 text-sm text-slate">Bot-to-bot handoffs are intentionally bounded to prevent loops.</p>
        </div>
        <div className={styles.darkStage}>
          <div className={styles.teamFlow}>
            <div className={styles.teamPrompt}>“This customer needs an order check and then a payment follow-up.”</div>
            <div className={styles.teamAgents}>
              <div className={styles.teamAgent}><small>@ORDER-DESK</small><strong>Checks the order and records the result</strong></div>
              <div className={styles.teamAgent}><small>@PAYMENTS</small><strong>Gets the follow-up task with context</strong></div>
              <div className={styles.teamAgent}><small>PERSON</small><strong>Steps in only if the task needs judgment</strong></div>
            </div>
            <div className={styles.teamOutput}>Task board → result and owner stay visible</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
