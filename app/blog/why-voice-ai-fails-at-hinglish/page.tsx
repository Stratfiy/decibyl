import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogSection, BlogStat } from '@/components/marketing/BlogLayout';
import { FinalCta } from '@/components/marketing/Blocks';
import { getBlogPost } from '@/data/blog';
import { JsonLd, articleSchema, breadcrumbSchema, pageMetadata } from '@/lib/seo';

const meta = getBlogPost('why-voice-ai-fails-at-hinglish')!;

export const metadata: Metadata = pageMetadata({
  title: meta.seoTitle ?? meta.title,
  description: meta.description,
  path: `/blog/${meta.slug}`,
  keywords: ['Hinglish voice AI', 'code-mixed speech recognition', 'Indian language ASR'],
  ogTitle: meta.title,
});

export default function Post() {
  return (
    <>
      <BlogLayout meta={meta}>
        <BlogSection>
          <p>
            More than 250 million people in India are estimated to code-switch regularly — blending
            Hindi and English inside a single sentence, not alternating between two clean
            conversations. That&rsquo;s not an edge case for a voice agent built for India. It&rsquo;s
            the default input. Most voice AI products aren&rsquo;t built for it, and the reason is
            architectural, not a matter of adding more training data.
          </p>
        </BlogSection>

        <BlogStat
          value="30–50%"
          label="Relative increase in word error rate on code-switched speech vs. monolingual input"
          source="published ASR research on code-switching, incl. Interspeech 2023"
        />

        <BlogSection heading="The problem sits in the architecture, not the vocabulary">
          <p>
            Most speech-to-text systems run <strong>utterance-level language identification</strong>{' '}
            — the model decides which language it&rsquo;s hearing once, for the whole audio segment,
            before it starts transcribing. On clean monolingual speech that&rsquo;s fine. On a
            sentence that opens in Hindi and closes in English — or the reverse, mid-word — the
            model has already committed to the wrong language for half the sentence. What comes out
            is substitution and deletion errors on whichever language it guessed wrong, not a
            slightly-worse transcript.
          </p>
          <p>
            The fix isn&rsquo;t &ldquo;more Hindi data&rdquo; or &ldquo;more English data.&rdquo; A
            model trained on a large Hindi corpus and a large English corpus separately still
            doesn&rsquo;t know the actual mixing patterns — which words get borrowed, where the
            switch tends to happen in a sentence, how an English word gets pronounced once it&rsquo;s
            sitting inside Hindi phonology. None of that shows up in either monolingual dataset on
            its own. It only shows up in real code-mixed speech.
          </p>
        </BlogSection>

        <BlogSection heading="What this looks like on an actual support call">
          <p>
            &ldquo;Mera order abhi tak deliver nahi hua, can you check kab tak aayega&rdquo; is an
            ordinary sentence for a huge share of Indian callers — not a stress test. A voice agent
            that silently drops to English-only or Hindi-only the moment it detects the &ldquo;wrong&rdquo;
            language mid-sentence doesn&rsquo;t fail loudly. It just mishears half of what was said,
            which is worse: the call sounds like it went fine and the data underneath it is wrong.
          </p>
        </BlogSection>

        <BlogSection heading="Where this fits into how Decibyl is built">
          <p>
            Code-mixed speech — Hinglish, Tanglish, and the equivalent registers in the other five
            languages — is the register the agent is designed for by default, not a mode you switch
            into. That&rsquo;s the reasoning behind an Indic-native stack: Sarvam&rsquo;s STT/TTS is
            built against real Indian call data rather than adapted from an English-first model, and
            it&rsquo;s one of the providers Decibyl runs on, alongside OpenAI, Google, and
            ElevenLabs. See{' '}
            <Link href="/how-it-works">how it works</Link> for the full setup, or hear it for
            yourself on the <Link href="/#languages">language samples</Link> on the homepage.
          </p>
        </BlogSection>
      </BlogLayout>

      <FinalCta
        title="Want to hear it handle a real code-mixed call?"
        sub="Book a demo and bring your actual call patterns — not a scripted English demo."
        secondary={{ label: 'See supported languages', href: '/how-it-works' }}
      />

      <JsonLd
        data={[
          articleSchema({
            title: meta.title,
            description: meta.description,
            path: `/blog/${meta.slug}`,
            publishedAt: meta.publishedAt,
            updatedAt: meta.updatedAt,
            category: meta.category,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: meta.title, path: `/blog/${meta.slug}` },
          ]),
        ]}
      />
    </>
  );
}
