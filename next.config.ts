import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Allow external images from various domains
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
    },
    // Disable strict mode for better GSAP compatibility
    reactStrictMode: false,
};

export default nextConfig;
