import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { blogPosts, formatBlogDate } from '@/data/blog';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Blog — Voice AI, DPDP Compliance, and NDR Recovery in India',
  description:
    'Practical, researched writing on AI voice agent pricing, DPDP compliance, code-mixed speech, and NDR recovery for Indian businesses. Every number cited.',
  path: '/blog',
  keywords: [
    'voice AI blog India',
    'DPDP compliance AI calling',
    'Hinglish speech recognition',
    'NDR RTO India',
  ],
  ogTitle: 'Written for the person who has to decide',
});

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <>
      <section className="bg-canvas" aria-label="Blog">
        <Container>
          <div className="pt-14 pb-10 sm:pt-20">
            <p className="t-eyebrow text-sindoor">Blog</p>
            <h1 className="t-display mt-4 max-w-3xl text-balance">
              Written for the person who has to decide.
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Pricing, compliance, and the language problem most voice AI products don&rsquo;t
              actually solve. Every claim here is either true of the product or attributed to a
              named source.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="canvas" className="pt-0" ariaLabel="Posts">
        <ul className="grid gap-6 lg:grid-cols-2">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block h-full rounded-card border border-line bg-snow p-7 transition-colors hover:border-vermilion"
              >
                <p className="t-eyebrow text-sindoor">{post.category}</p>
                <h2 className="t-h3 mt-3 text-[1.1875rem]">{post.title}</h2>
                <p className="mt-3 text-slate">{post.description}</p>
                <p className="t-data mt-5 text-iron">
                  {formatBlogDate(post.publishedAt)} · {post.readingMinutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
    </>
  );
}
