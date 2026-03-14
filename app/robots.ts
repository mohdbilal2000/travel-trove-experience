import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/digital-card', '/admin/', '/private/', '/checkout/'],
            },
            // OpenAI crawlers
            {
                userAgent: 'GPTBot',
                allow: ['/', '/llms.txt'],
            },
            {
                userAgent: 'ChatGPT-User',
                allow: ['/', '/llms.txt'],
            },
            {
                userAgent: 'OAI-SearchBot',
                allow: ['/', '/llms.txt'],
            },
            // Anthropic crawlers
            {
                userAgent: 'Claude-Web',
                allow: ['/', '/llms.txt'],
            },
            {
                userAgent: 'anthropic-ai',
                allow: ['/', '/llms.txt'],
            },
            {
                userAgent: 'ClaudeBot',
                allow: ['/', '/llms.txt'],
            },
            // Google AI
            {
                userAgent: 'Google-Extended',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
            // Other AI crawlers
            {
                userAgent: 'PerplexityBot',
                allow: ['/', '/llms.txt'],
            },
            {
                userAgent: 'Amazonbot',
                allow: '/',
            },
            {
                userAgent: 'Bytespider',
                allow: '/',
            },
            {
                userAgent: 'cohere-ai',
                allow: ['/', '/llms.txt'],
            },
            // Bing & search engines
            {
                userAgent: 'Bingbot',
                allow: '/',
            },
            {
                userAgent: 'DuckDuckBot',
                allow: '/',
            },
            {
                userAgent: 'YandexBot',
                allow: '/',
            },
            // Social media crawlers
            {
                userAgent: 'facebookexternalhit',
                allow: '/',
            },
            {
                userAgent: 'Twitterbot',
                allow: '/',
            },
            {
                userAgent: 'LinkedInBot',
                allow: '/',
            },
        ],
        sitemap: 'https://guideindiatours.com/sitemap.xml',
        host: 'https://guideindiatours.com',
    };
}
