/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    experimental: {
        serverActions: true,
    },
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
