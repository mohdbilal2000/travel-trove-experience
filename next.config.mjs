/** @type {import('next').NextConfig} */

const securityHeaders = [
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), browsing-topics=()' },
    // CSP runs in Report-Only first. Confirm GA4/Clarity/maps/embeds aren't blocked,
    // then rename the header to 'Content-Security-Policy' to enforce.
    {
        key: 'Content-Security-Policy-Report-Only',
        value: [
            "default-src 'self'",
            "img-src 'self' data: blob: https:",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' data: https://fonts.gstatic.com",
            "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.clarity.ms https://api.indexnow.org",
            "frame-ancestors 'self'",
        ].join('; '),
    },
];

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
            },
            {
                protocol: 'https',
                hostname: 'www.guideindiatours.com',
            },
        ],
    },
    async headers() {
        return [{ source: '/:path*', headers: securityHeaders }];
    },
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'guideindiatours.com' }],
                destination: 'https://www.guideindiatours.com/:path*',
                permanent: true, // 308
            },
        ];
    },
    // Vercel handles deployment automatically — no standalone needed.
};

export default nextConfig;
