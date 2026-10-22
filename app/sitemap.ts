import { MetadataRoute } from 'next';
import { allPlans } from '@/data/travelPlans';
import { blogPosts } from '@/data/blogPosts';
import { FAQ_LAST_UPDATED } from '@/data/faqs';
import { guideLangs } from '@/data/multilingualGuide';
import { blogTranslations, getTranslationsFor } from '@/data/blogTranslations';

const BASE_URL = 'https://www.guideindiatours.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date().toISOString();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/plans`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/about/avneesh-dixit`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/guide-booking`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/reviews`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/faq`,
            lastModified: new Date(FAQ_LAST_UPDATED).toISOString(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        // City cluster pages
        {
            url: `${BASE_URL}/delhi-tours`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/agra-tours`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/agra-tour-guide`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/golden-triangle-tour-cost`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/jaipur-tour-guide`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/delhi-tour-guide`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/private-vs-group-tour`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        // Multilingual guide landing pages
        ...guideLangs.map(({ code: lang }) => ({
            url: `${BASE_URL}/guide/${lang}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
        {
            url: `${BASE_URL}/jaipur-tours`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/golden-triangle-tours`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Taj Mahal authority hub
        {
            url: `${BASE_URL}/taj-mahal-guide`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.95,
        },
        {
            url: `${BASE_URL}/taj-mahal-tickets`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${BASE_URL}/taj-mahal-opening-hours`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${BASE_URL}/taj-mahal-sunrise-guide`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${BASE_URL}/taj-mahal-photography-guide`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: `${BASE_URL}/taj-mahal-dress-code`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/taj-mahal-best-time-to-visit`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        // City-to-Agra pages
        {
            url: `${BASE_URL}/delhi-to-agra-tour`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/jaipur-to-agra-tour`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        // Founder authority
        {
            url: `${BASE_URL}/about/bilal`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        // Legal pages
        {
            url: `${BASE_URL}/privacy-policy`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: `${BASE_URL}/terms-of-service`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: `${BASE_URL}/refund-policy`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.2,
        },
    ];

    // Tour plan pages
    const planPages: MetadataRoute.Sitemap = allPlans.map((plan) => ({
        url: `${BASE_URL}/plans/${plan.id}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Blog post pages
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => {
        const translated = getTranslationsFor(post.slug);
        return {
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.updatedDate || post.publishedDate).toISOString(),
            changeFrequency: 'monthly' as const,
            priority: post.quickAnswer ? 0.8 : 0.7,
            ...(translated.length > 0 && {
                alternates: {
                    languages: {
                        en: `${BASE_URL}/blog/${post.slug}`,
                        ...Object.fromEntries(translated.map((s) => [s.lang, `${BASE_URL}/blog/${s.lang}/${s.slug}`])),
                    },
                },
            }),
        };
    });

    // Translated blog posts, each with reciprocal hreflang alternates.
    const blogTranslationPages: MetadataRoute.Sitemap = blogTranslations.map((tr) => {
        const original = blogPosts.find((p) => p.slug === tr.postSlug);
        const languages: Record<string, string> = { en: `${BASE_URL}/blog/${tr.postSlug}` };
        getTranslationsFor(tr.postSlug).forEach((s) => { languages[s.lang] = `${BASE_URL}/blog/${s.lang}/${s.slug}`; });
        return {
            url: `${BASE_URL}/blog/${tr.lang}/${tr.slug}`,
            lastModified: new Date(original?.updatedDate || original?.publishedDate || Date.now()),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
            alternates: { languages },
        };
    });

    return [...staticPages, ...planPages, ...blogPages, ...blogTranslationPages];
}
