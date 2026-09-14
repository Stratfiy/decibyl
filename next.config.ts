import type { NextConfig } from 'next';
import marketingRoutes from './data/marketingRoutes.json';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* This workspace sits below a user-level lockfile on Windows. Without an
     explicit root Next walks up to that lockfile and tries to trace the whole
     user directory, which fails on protected links and makes local production
     builds impossible. */
  outputFileTracingRoot: process.cwd(),
  /* Stamped into the bundle at build time so a deployed page can say which
     commit it is. Three rounds were lost to "is this the new build?" with no
     way to answer it from the page itself. Vercel sets the first variable;
     locally there is none, and the badge simply says so. */
  env: {
    NEXT_PUBLIC_BUILD_SHA: (process.env.VERCEL_GIT_COMMIT_SHA || 'local').slice(0, 7),
  },
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    // Serve the approved standalone pages before the legacy Next pages.
    // Other routes, including forms, APIs, blog and legal pages, stay intact.
    return {
      beforeFiles: marketingRoutes.map((source) => ({
        source,
        destination: `/together/pages${source === '/' ? '' : source}/index.html`,
      })),
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          ...(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'
            ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
