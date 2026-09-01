import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Section';

const customerSignals = [
  '20+ businesses',
  'Fertility clinic · Hosur',
  'Agri outreach · Telangana',
  'D2C · COD confirmation',
  'Clinics',
  'Property teams',
  'Commerce teams',
  'After-hours desks',
];

const integrations = [
  { name: 'Webhooks', state: 'Live' },
  { name: 'Google Calendar', state: 'Live' },
  { name: 'Gmail', state: 'Live' },
  { name: 'Google Sheets', state: 'Beta' },
  { name: 'n8n', state: 'Beta' },
  { name: 'WhatsApp', state: 'Beta' },
  { name: 'Zoho CRM', state: 'On request' },
];

const workflow = [
  {
    number: '01',
    title: 'Listen',
    body: 'Understands intent, names, dates and code-mixed Indian speech without forcing callers through a menu.',
  },
  {
    number: '02',
    title: 'Act',
    body: 'Answers, qualifies, confirms, books or recovers the conversation while the caller is still on the line.',
  },
  {
    number: '03',
    title: 'Update',
    body: 'Writes the outcome, transcript and next action back to the tools your team already opens every morning.',
  },
];

function RibbonRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="living-ribbon-run" aria-hidden={hidden || undefined}>
      {customerSignals.map((item, index) => (
        <span className={index === 0 ? 'living-ribbon-lead' : ''} key={`${item}-${index}`}>
          {item}
          <i aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export function LivingProofWorld() {
  return (
    <section id="story-end" aria-labelledby="living-world-title" className="living-world scroll-mt-24">
      <Container className="relative z-10">
        <div className="living-world-heading">
          <div>
            <p className="t-eyebrow text-sindoor">Front desk · sales desk · support desk</p>
            <h2 id="living-world-title" className="living-world-title">
              One agent.<br />Many worlds.
            </h2>
          </div>
          <p className="living-world-intro">
            Decibyl moves with the call—from a patient at reception, to a portal lead, to a
            delivery at the door, and every conversation your business handles next.
          </p>
        </div>

        <div className="living-world-stage">
          <Image
            src="/media/home/living-operations-world.png"
            alt="Connected miniature scenes of a clinic reception, property sales office, and commerce support team"
            width={1728}
            height={909}
            sizes="(max-width: 768px) 150vw, 1200px"
            className="living-world-image"
            priority
          />
          <div className="living-world-stat living-world-stat-left">
            <strong>24/7</strong>
            <span>the line stays open</span>
          </div>
          <div className="living-world-stat living-world-stat-right">
            <strong>&lt;60s</strong>
            <span>lead follow-up</span>
          </div>
        </div>
      </Container>

      <div className="living-ribbon-shell" aria-label="Trusted by more than twenty businesses across India">
        <div className="living-ribbon-track">
          <RibbonRun />
          <RibbonRun hidden />
        </div>
      </div>

      <Container>
        <div className="living-integrations" aria-label="Integrations">
          <p className="living-integrations-label">Works with what you already use</p>
          <ul>
            {integrations.map((integration) => (
              <li key={integration.name}>
                <i aria-hidden="true" />
                <span>
                  <strong>{integration.name}</strong>
                  <small>{integration.state}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="living-workflow">
          <div className="living-workflow-copy">
            <p className="t-eyebrow text-sindoor">How Decibyl works</p>
            <h2 className="living-workflow-title">The call becomes the workflow.</h2>
            <p>
              No separate dashboard theatre. Every conversation moves through one clear operating
              line: understand what is needed, do it, and leave the system updated.
            </p>
            <Link href="/how-it-works" className="living-text-link">
              Follow a call end to end <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <ol className="living-workflow-steps">
            {workflow.map((step) => (
              <li key={step.number}>
                <span className="living-step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
