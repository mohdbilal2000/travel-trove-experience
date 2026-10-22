import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, ListChecks, MessageCircle } from 'lucide-react';
import { getBlogPostBySlug, estimateReadTime } from '@/data/blogPosts';
import { blogTranslations, getBlogTranslation, getTranslationsFor } from '@/data/blogTranslations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { renderMarkdown } from '@/lib/markdown';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerator';
import { siteConfig } from '@/lib/siteConfig';

/**
 * Translated blog posts at /blog/[lang]/[slug].
 * The first dynamic segment is named `slug` only because Next.js requires
 * sibling dynamic segments under /blog to share a name with /blog/[slug];
 * here it carries the language code.
 */
export const revalidate = 86400;
export const dynamicParams = false;

const BASE_URL = 'https://www.guideindiatours.com';

type PageProps = { params: Promise<{ slug: string; post: string }> };

export async function generateStaticParams() {
    return blogTranslations.map((t) => ({ slug: t.lang, post: t.slug }));
}

const absoluteImage = (src: string) => (src.startsWith('http') ? src : `${BASE_URL}${src}`);

function hreflangFor(postSlug: string) {
    const original = getBlogPostBySlug(postSlug);
    const enUrl = `${BASE_URL}/blog/${postSlug}`;
    const map: Record<string, string> = { en: enUrl, 'x-default': enUrl };
    for (const t of getTranslationsFor(postSlug)) map[t.lang] = `${BASE_URL}/blog/${t.lang}/${t.slug}`;
    return { original, enUrl, map };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug: lang, post } = await params;
    const t = getBlogTranslation(lang, post);
    if (!t) return {};
    const { original, map } = hreflangFor(t.postSlug);
    const url = `${BASE_URL}/blog/${t.lang}/${t.slug}`;
    const image = original ? absoluteImage(original.image) : `${BASE_URL}/images/og-default.jpg`;
    const title = `${t.title} | Guide India Tours`;
    return {
        title,
        description: t.excerpt,
        alternates: { canonical: url, languages: map },
        openGraph: {
            title,
            description: t.excerpt,
            url,
            siteName: 'Guide India Tours',
            locale: t.htmlLang,
            type: 'article',
            publishedTime: original?.publishedDate,
            modifiedTime: original?.updatedDate || original?.publishedDate,
            images: [{ url: image, width: 1200, height: 630, alt: t.title }],
        },
        twitter: { card: 'summary_large_image', title, description: t.excerpt, images: [image] },
    };
}

export default async function TranslatedBlogPage({ params }: PageProps) {
    const { slug: lang, post } = await params;
    const t = getBlogTranslation(lang, post);
    if (!t) notFound();
    const original = getBlogPostBySlug(t.postSlug);
    if (!original) notFound();

    const url = `${BASE_URL}/blog/${t.lang}/${t.slug}`;
    const dateModified = original.updatedDate || original.publishedDate;
    const siblings = getTranslationsFor(t.postSlug);
    const dateLabel = new Date(original.publishedDate).toLocaleDateString(t.htmlLang, { year: 'numeric', month: 'long', day: 'numeric' });
    const wa = `https://wa.me/918979810991?text=${encodeURIComponent(t.ui.whatsappText)}`;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: t.title,
        name: t.title,
        url,
        inLanguage: t.htmlLang,
        image: { '@type': 'ImageObject', url: absoluteImage(original.image), width: 1200, height: 630 },
        datePublished: original.publishedDate,
        dateModified,
        wordCount: t.content.split(/\s+/).length,
        author: {
            '@type': 'Person',
            name: original.author || 'Avneesh Dixit',
            url: `${BASE_URL}/about/avneesh-dixit`,
            jobTitle: 'Government-Approved Tour Guide',
            worksFor: { '@id': `${BASE_URL}/#organization` },
        },
        publisher: { '@id': `${BASE_URL}/#organization` },
        description: t.excerpt,
        abstract: t.quickAnswer,
        keywords: original.tags.join(', '),
        isBasedOn: { '@type': 'BlogPosting', '@id': `${BASE_URL}/blog/${original.slug}#article`, inLanguage: 'en' },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#quick-answer', 'article h2'] },
    };
    const faqSchema = generateFAQSchema(t.faqs.map((f) => ({ question: f.q, answer: f.a })));
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: t.ui.blog, url: `${BASE_URL}/blog` },
        { name: t.title, url },
    ]);

    return (
        <main className="bg-ivory-100 min-h-screen" lang={t.htmlLang}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="pt-28 md:pt-44 pb-16 md:pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Breadcrumbs items={[{ label: t.ui.blog, href: '/blog' }, { label: t.title }]} className="mb-8 md:mb-12" />

                    <div className="space-y-6 md:space-y-8 mb-10 md:mb-14">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                            <Badge className="bg-maroon-600/10 text-maroon-600 border-none px-4 py-1.5 uppercase tracking-widest text-[10px] font-black">
                                {t.label}
                            </Badge>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                                <Calendar className="w-4 h-4" />
                                <span>{t.ui.published} {dateLabel}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                                <Clock className="w-4 h-4" />
                                <span>{estimateReadTime(t.content)} {t.ui.minRead}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-gray-900 leading-[1.15] sm:leading-[1.1] tracking-tight">
                            {t.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-3xl">{t.excerpt}</p>

                        <div className="flex items-center gap-4 py-5 border-y border-gray-200/70">
                            <div className="w-12 h-12 rounded-full bg-maroon-600 text-white flex items-center justify-center flex-shrink-0">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">{t.ui.writtenBy}</p>
                                <Link href="/about/avneesh-dixit" className="font-bold text-gray-900 hover:text-maroon-600 transition-colors">
                                    {original.author || 'Avneesh Dixit'}
                                </Link>
                                <span className="text-gray-500 text-sm"> · {t.ui.role}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl mb-10 md:mb-14">
                        <Image src={original.image} alt={t.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 900px" />
                    </div>

                    <div id="quick-answer" className="bg-white rounded-3xl border border-gold-200 border-l-4 border-l-gold-500 p-6 md:p-8 shadow-sm mb-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-3">{t.ui.quickAnswer}</p>
                        <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-3">{t.faqQuestion}</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">{t.quickAnswer}</p>
                    </div>

                    <div className="bg-gray-900 text-white rounded-3xl p-6 md:p-8 mb-8">
                        <h2 className="text-sm font-black uppercase tracking-[0.25em] text-gold-500 mb-5 flex items-center gap-2">
                            <ListChecks className="w-4 h-4" /> {t.ui.takeaways}
                        </h2>
                        <ul className="space-y-3">
                            {t.keyTakeaways.map((item, i) => (
                                <li key={i} className="flex gap-3 items-start text-white/85 leading-relaxed">
                                    <span aria-hidden="true" className="mt-2.5 w-2 h-2 rotate-45 bg-gold-500 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 sm:p-10 md:p-16 rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-gray-100">
                        <article className="max-w-none">{renderMarkdown(t.content)}</article>

                        <div className="mt-14 pt-10 border-t border-gray-100">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">{t.ui.faqHeading}</h2>
                            <div className="space-y-5">
                                {t.faqs.map((f, i) => (
                                    <div key={i} className="bg-ivory-100 p-6 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{f.q}</h3>
                                        <p className="text-gray-600 font-light leading-relaxed">{f.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-14 pt-10 border-t border-gray-100 space-y-6">
                            <div className="flex flex-col md:flex-row gap-6 items-center bg-ivory-100 p-8 rounded-3xl">
                                <div className="w-20 h-20 rounded-full bg-maroon-600 text-white flex items-center justify-center font-display text-3xl font-bold shrink-0">GT</div>
                                <div className="text-center md:text-left">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t.ui.aboutHeading}</h3>
                                    <p className="text-gray-600 font-light leading-relaxed">{t.ui.aboutText}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-gray-900 text-white p-6 md:p-8 rounded-3xl">
                                <div>
                                    <p className="font-bold">{t.ui.ctaHeading}</p>
                                    <p className="text-white/60 text-sm font-light">{t.ui.ctaText}</p>
                                </div>
                                <div className="flex gap-3 flex-shrink-0">
                                    <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black rounded-xl">
                                        <Link href={t.ui.guideHref}>{t.ui.guideLinkLabel}</Link>
                                    </Button>
                                    <Button asChild className="bg-maroon-600 hover:bg-white hover:text-black text-white rounded-xl">
                                        <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            <MessageCircle className="w-4 h-4" /> {t.ui.ctaBtn}
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-4">{t.ui.otherLanguages}</p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link href={`/blog/${original.slug}`} className="px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-maroon-600/40 text-sm font-semibold text-gray-700">English</Link>
                            {siblings.map((s) => (
                                <Link
                                    key={s.lang}
                                    href={`/blog/${s.lang}/${s.slug}`}
                                    className={`px-4 py-2 rounded-full border text-sm font-semibold ${s.lang === t.lang ? 'bg-gold-500 text-black border-gold-500' : 'bg-white border-gray-200 hover:border-maroon-600/40 text-gray-700'}`}
                                >
                                    {s.label}
                                </Link>
                            ))}
                        </div>
                        <p className="mt-6 text-xs text-gray-400">{siteConfig.rating.value}/5 · {siteConfig.rating.count}+ Google</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
