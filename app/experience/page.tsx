import type { Metadata } from 'next';
import { CinematicIntro } from '@/components/story/CinematicIntro';
import { ScrollStory } from '@/components/story/ScrollStory';
import { LivingProofWorld } from '@/components/marketing/LivingProofWorld';
import { verticals, verticalHref, getVertical } from '@/data/verticals';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Experience Decibyl',
  description: 'Step inside an interactive story showing how Decibyl voice agents answer, qualify and complete real customer workflows.',
  path: '/experience',
});

const storyVerticalSlugs = ['clinics', 'real-estate', 'd2c-ndr-recovery'];

export default function ExperiencePage() {
  const ndr = getVertical('d2c-ndr-recovery')!;
  const needs = storyVerticalSlugs.map((slug) => {
    const vertical = verticals.find((item) => item.slug === slug && !item.parent)!;
    return {
      id: vertical.slug,
      label: vertical.cardTitle,
      pain: vertical.cardPain,
      href: verticalHref(vertical),
    };
  });

  return (
    <>
      <CinematicIntro />
      <ScrollStory
        needs={needs}
        call={{
          language: ndr.sampleCall.language,
          outcome: ndr.sampleCall.outcome,
          duration: ndr.sampleCall.duration,
        }}
        phone={site.demoPhone}
      />
      <LivingProofWorld />
    </>
  );
}
