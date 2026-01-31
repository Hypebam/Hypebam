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
    },
    reactStrictMode: false,
};

export default nextConfig;
