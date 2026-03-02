import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/digital-card'],
            },
            {
                userAgent: 'GPTBot',
                allow: ['/', '/llms.txt'],
            },
            {
                userAgent: 'ChatGPT-User',
                allow: ['/', '/llms.txt'],
            },
            {
                userAgent: 'Claude-Web',
                allow: ['/', '/llms.txt'],
            },
            {
                userAgent: 'Amazonbot',
                allow: '/',
            },
            {
                userAgent: 'anthropic-ai',
                allow: ['/', '/llms.txt'],
            },
            {
                userAgent: 'PerplexityBot',
                allow: ['/', '/llms.txt'],
            },
            {
                userAgent: 'Google-Extended',
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
        ],
        sitemap: 'https://guideindiatours.com/sitemap.xml',
        host: 'https://guideindiatours.com',
    };
}
