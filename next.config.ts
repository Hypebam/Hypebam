import type { NextConfig } from "next";

// Everything on this site is self-hosted — the CSP below ENFORCES that: no
// script, style, font, image or connection may leave the origin. 'unsafe-inline'
// is required for Next's own inline bootstrap scripts and our inline <Script>
// blocks in layout.tsx; data:/blob: cover the base64 webflow icon font and the
// createImageBitmap/ObjectURL canvas pipeline. Applied in production only —
// `next dev` needs eval for source maps.
const CSP = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "media-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
    // All images are plain self-hosted <img> tags served at their ORIGINAL
    // sizes (never resized/re-encoded by the framework) — no next/image, no
    // remote patterns, nothing external.
    reactStrictMode: false,
    // Enable compression
    compress: true,
    // Optimize for production
    poweredByHeader: false,
    // Cache static assets aggressively on Vercel
    async headers() {
        return [
            {
                // Security headers on every response (HSTS is ignored over plain
                // HTTP, so it's safe to always send).
                source: '/:path*',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                    ...(process.env.NODE_ENV === 'production'
                        ? [{ key: 'Content-Security-Policy', value: CSP }]
                        : []),
                ],
            },
            {
                source: '/img/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                    {
                        // Let Vercel CDN serve different formats (WebP/AVIF) per browser capability
                        key: 'Vary',
                        value: 'Accept',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                ],
            },
            {
                // Compressed testimonial videos — served locally, cache aggressively
                source: '/img/video/compressed/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                    {
                        key: 'Accept-Ranges',
                        value: 'bytes',
                    },
                ],
            },
            {
                source: '/styles/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/scripts/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
