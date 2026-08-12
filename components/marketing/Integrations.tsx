import { SlideDeck, type DeckItem } from './SlideDeck';
import { integrationsForDeck, statusLabel } from '@/data/integrations';

/** "Your team doesn't change how they work." Every card carries a truthful status. */
export function IntegrationsDeck() {
  const items: DeckItem[] = integrationsForDeck.map((i) => ({
    id: i.name,
    eyebrow: i.category,
    title: i.name,
    body: i.flow,
    chip: statusLabel[i.status],
  }));

  return (
    <div>
      <SlideDeck
        idPrefix="integrations"
        title="The call ends. Your CRM already knows."
        sub="Outcomes, transcripts, and recordings write back to the system your team already opens every morning."
        items={items}
      />
      <p className="t-body-lg mt-10 max-w-2xl text-ink">
        Don’t see yours? Every call outcome fires a webhook. If your system accepts one, it works
        today.
      </p>
    </div>
  );
}
