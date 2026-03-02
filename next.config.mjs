/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        qualities: [75, 85],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'guideindiatours.com',
            }
        ],
    },
    // Vercel handles deployment automatically — no standalone needed.
};

export default nextConfig;
