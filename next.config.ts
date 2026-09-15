import type { NextConfig } from 'next';
import marketingRoutes from './data/marketingRoutes.json';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  env: {
    NEXT_PUBLIC_BUILD_SHA: (process.env.VERCEL_GIT_COMMIT_SHA || 'local').slice(0, 7),
  },
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    // Keep public URLs stable while serving the unified server-rendered
    // product marketing system underneath them.
    return {
      beforeFiles: marketingRoutes.map((source) => ({
        source,
        destination: `/marketing${source}`,
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
