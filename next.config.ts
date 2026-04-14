import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.prod.website-files.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.dl.dropboxusercontent.com',
                port: '',
                pathname: '/**',
            },
        ],
        // Optimize images served from public dir
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 31536000, // 1 year cache
    },
    reactStrictMode: false,
    // Enable compression
    compress: true,
    // Optimize for production
    poweredByHeader: false,
    // Cache static assets aggressively on Vercel
    async headers() {
        return [
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
