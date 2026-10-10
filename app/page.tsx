import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { HomeHero } from '@/components/marketing/HomeHero';
import { HomeAskSection } from '@/components/marketing/HomeAskSection';
import { HomeAgentsSection } from '@/components/marketing/HomeAgentsSection';
import { HomeAppsSection } from '@/components/marketing/HomeAppsSection';
import { HomeMemorySection } from '@/components/marketing/HomeMemorySection';
import { HomeRoutinesSection } from '@/components/marketing/HomeRoutinesSection';
import { HomeTeamSection } from '@/components/marketing/HomeTeamSection';
import { HomeVoiceSection } from '@/components/marketing/HomeVoiceSection';
import { HomeKnowledgeSection } from '@/components/marketing/HomeKnowledgeSection';
import { HomeControlSection } from '@/components/marketing/HomeControlSection';
import { HomeBuilderSection } from '@/components/marketing/HomeBuilderSection';
import { PricingPreview } from '@/components/marketing/Blocks';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Intelligence That Grows With You | Decibyl',
  description: 'Build your own work autopilot with Decibyl Cloud. Connect apps, delegate recurring tasks and keep control through approvals. Personalized intelligence for individuals and businesses.',
  path: '/',
  keywords: ['AI agents','AI personal assistant','AI voice agents','AI automation agents','AI agent memory','AI workflow automation','AI agent platform'],
  ogTitle: 'Intelligence that grows with you',
  ogSubtitle: 'Build a personalized autopilot for the work you would rather not repeat.',
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeAskSection />
      <HomeAgentsSection />
      <HomeAppsSection />
      <HomeMemorySection />
      <HomeRoutinesSection />
      <HomeTeamSection />
      <HomeVoiceSection />
      <HomeKnowledgeSection />
      <HomeControlSection />
      <HomeBuilderSection />

      <Section surface="white" ariaLabel="Pricing preview">
        <SectionHead eyebrow="Start small" title="Use Decibyl for yourself. Scale when the work grows." sub="Start with one agent and add more capability, usage and teammates when you need them." />
        <div className="mt-10"><PricingPreview /></div>
      </Section>

      <section className="bg-ink px-5 py-20 text-white sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="t-eyebrow text-white/50">DECIBYL</p>
            <h2 className="mt-4 font-[var(--font-bricolage)] text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">What would you put on autopilot?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">Build a Decibyl autopilot for yourself or your team. It connects to your tools, follows your instructions, remembers what matters and asks before important actions.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="https://app.decibyl.ai" className="inline-flex min-h-12 items-center rounded-xl bg-white px-6 text-sm font-black text-ink">Build your autopilot →</Link>
              <Link href="/how-it-works" className="inline-flex min-h-12 items-center rounded-xl border border-white/20 px-6 text-sm font-bold text-white">See how it works</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
