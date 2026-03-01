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
                hostname: 'guideindia.tours',
            }
        ],
    },
    // Vercel handles deployment automatically — no standalone needed.
};

export default nextConfig;
