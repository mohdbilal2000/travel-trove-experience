import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const aiCrawlers = [
        'GPTBot',
        'ChatGPT-User',
        'OAI-SearchBot',
        'ClaudeBot',
        'anthropic-ai',
        'Claude-Web',
        'PerplexityBot',
        'Perplexity-User',
        'Google-Extended',
        'Applebot',
        'Applebot-Extended',
        'CCBot',
        'cohere-ai',
        'Diffbot',
        'FacebookBot',
        'Meta-ExternalAgent',
        'Amazonbot',
        'Bytespider',
    ];

    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/llms.txt'],
                disallow: ['/api/'],
            },
            ...aiCrawlers.map((userAgent) => ({
                userAgent,
                allow: ['/', '/llms.txt'],
            })),
        ],
        sitemap: 'https://www.guideindiatours.com/sitemap.xml',
    };
}
