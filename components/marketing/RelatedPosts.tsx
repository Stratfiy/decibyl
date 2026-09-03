import Link from 'next/link';
import { postsRelatedTo } from '@/data/blog';

/**
 * The posts that point at this page, listed on the page itself.
 *
 * The inbound half of SEO.md Lever 5. A post reachable only from /blog is
 * crawled last and passes nothing onward; linked from the solution page whose
 * question it answers, it is reachable in two hops from the home page and the
 * link carries an anchor that describes what the post argues.
 *
 * Renders nothing when no post maps to `path`, so it is safe to drop into any
 * template without checking first.
 */
export function RelatedPosts({ path }: { path: string }) {
  const posts = postsRelatedTo(path);
  if (!posts.length) return null;

  return (
    <nav className="mt-14 border-t border-line pt-8" aria-label="Related reading">
      <p className="t-eyebrow text-sindoor">From the blog</p>
      <ul className="mt-4 space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="text-sindoor underline-offset-4 hover:underline"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
