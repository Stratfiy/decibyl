import type { ReactNode } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Section';
import { formatBlogDate, type BlogPostMeta } from '@/data/blog';

export function BlogLayout({ meta, children }: { meta: BlogPostMeta; children: ReactNode }) {
  return (
    <article className="bg-canvas" aria-label={meta.title}>
      <Container>
        <div className="max-w-[42rem] py-14 sm:py-20">
          <Link
            href="/blog"
            className="t-data text-sindoor underline-offset-4 hover:underline"
          >
            ← Blog
          </Link>
          <p className="t-eyebrow mt-6 text-sindoor">{meta.category}</p>
          <h1 className="t-h2 mt-4 text-balance">{meta.title}</h1>
          <p className="t-body-lg mt-5 text-slate text-pretty">{meta.description}</p>
          <p className="t-data mt-6 text-iron">
            {formatBlogDate(meta.publishedAt)} · {meta.readingMinutes} min read
          </p>

          <div className="mt-12 space-y-9">{children}</div>
        </div>
      </Container>
    </article>
  );
}

export function BlogSection({ heading, children }: { heading?: string; children: ReactNode }) {
  return (
    <section>
      {heading ? <h2 className="t-h3">{heading}</h2> : null}
      <div className="mt-3 space-y-4 text-slate [&_a]:text-sindoor [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2 [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

/** A citable stat, pulled out of the paragraph flow so it reads as a fact, not an aside. */
export function BlogStat({ value, label, source }: { value: string; label: string; source?: string }) {
  return (
    <div className="rounded-card bg-snow p-6">
      <p className="t-data text-[1.75rem] font-semibold text-sindoor">{value}</p>
      <p className="mt-1 text-slate">{label}</p>
      {source ? <p className="t-caption mt-2 text-iron">Source: {source}</p> : null}
    </div>
  );
}
