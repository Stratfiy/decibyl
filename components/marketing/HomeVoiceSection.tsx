import { Section } from '@/components/ui/Section';
import { LiveTranscript } from '@/components/marketing/LiveTranscript';
import { LanguageChips } from '@/components/marketing/Languages';
import { getVertical } from '@/data/verticals';

export function HomeVoiceSection() {
  const ndr = getVertical('d2c-ndr-recovery')!;
  return (
    <Section surface="white" ariaLabel="Voice agents">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">And yes, they can talk</p>
          <h2 className="t-h2 mt-4">Voice is a skill, not the whole product.</h2>
          <p className="t-body-lg mt-5 text-slate">Agents can answer and place calls, use knowledge during the conversation, collect keypad input, transfer when needed and save the outcome.</p>
          <div className="mt-6 flex flex-wrap gap-2">{['Inbound','Outbound','40+ languages','Code-mixed speech','Transfers','DTMF','Campaigns','Transcripts'].map((x)=><span key={x} className="rounded-full border border-ink/10 bg-canvas px-3 py-2 text-xs font-bold text-ink/70">{x}</span>)}</div>
          <div className="mt-7"><LanguageChips /></div>
        </div>
        <LiveTranscript lines={ndr.sampleCall.lines} outcome={ndr.sampleCall.outcome} money="₹1,840 recovered" qaScore={ndr.sampleCall.qaScore} duration={ndr.sampleCall.duration} language={ndr.sampleCall.language} />
      </div>
    </Section>
  );
}
