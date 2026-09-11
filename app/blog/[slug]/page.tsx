import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Clock, Star, HelpCircle, ListChecks, MessageCircle, ArrowRight } from "lucide-react";
import { getBlogPostBySlug, blogPosts, estimateReadTime } from "@/data/blogPosts";
import { allPlans } from "@/data/travelPlans";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { renderMarkdown, extractHeadings } from "@/lib/markdown";

export const revalidate = 86400;

const BASE_URL = 'https://www.guideindiatours.com';

interface PageProps {
    params: Promise<{ slug: string }>;
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const absoluteImage = (src: string) => (src.startsWith('http') ? src : `${BASE_URL}${src}`);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found | Guide India Tours' };
    }

    const title = `${post.title} | Guide India Tours`;
    const description = post.excerpt || `${post.content.substring(0, 155)}...`;
    const url = `${BASE_URL}/blog/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': url,
                'en-US': url,
                'en-GB': url,
                'en-IN': url,
                'en-AU': url,
                'x-default': url,
            },
        },
        openGraph: {
            title,
            description,
            url,
            images: [{ url: absoluteImage(post.image), width: 1200, height: 630, alt: post.title }],
            type: 'article',
            publishedTime: post.publishedDate,
            modifiedTime: post.updatedDate || post.publishedDate,
            authors: [post.author || 'Guide India Tours'],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [absoluteImage(post.image)],
        },
    };
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const url = `${BASE_URL}/blog/${slug}`;
    const dateModified = post.updatedDate || post.publishedDate;
    const headings = extractHeadings(post.content);

    const relatedPlans = allPlans.filter(plan => post.relatedPlans?.includes(plan.id)).slice(0, 3);
    const relatedPosts = blogPosts
        .filter(p => p.slug !== post.slug)
        .sort((a, b) => {
            const sameCat = Number(b.category === post.category) - Number(a.category === post.category);
            if (sameCat !== 0) return sameCat;
            return new Date(b.updatedDate || b.publishedDate).getTime() - new Date(a.updatedDate || a.publishedDate).getTime();
        })
        .slice(0, 3);

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        "mainEntityOfPage": { "@type": "WebPage", "@id": url },
        "headline": post.title,
        "name": post.title,
        "url": url,
        "image": { "@type": "ImageObject", "url": absoluteImage(post.image), "width": 1200, "height": 630 },
        "datePublished": post.publishedDate,
        "dateModified": dateModified,
        "wordCount": post.content.split(/\s+/).length,
        "inLanguage": "en",
        "author": {
            "@type": "Person",
            "name": post.author || "Avneesh Dixit",
            "url": `${BASE_URL}/about/avneesh-dixit`,
            "jobTitle": "Government-Approved Tour Guide",
            "worksFor": { "@id": `${BASE_URL}/#organization` }
        },
        "publisher": { "@id": `${BASE_URL}/#organization` },
        "description": post.excerpt || post.content.substring(0, 160),
        "keywords": post.tags?.join(", ") || "India tours, Golden Triangle, travel guide",
        "articleSection": post.category || "Travel Guide",
        "about": { "@type": "TouristDestination", "name": "Golden Triangle, India" },
        "isPartOf": { "@type": "Blog", "@id": `${BASE_URL}/blog`, "name": "Guide India Tours Travel Blog" },
        ...(post.quickAnswer && {
            "abstract": post.quickAnswer,
            "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["#quick-answer", "article h2"] },
        }),
    };

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            <section className="pt-28 md:pt-44 pb-16 md:pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Breadcrumbs
                        items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]}
                        className="mb-8 md:mb-12"
                    />

                    <div className="space-y-6 md:space-y-8 mb-10 md:mb-14">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                            <Badge className="bg-maroon-600/10 text-maroon-600 border-none px-4 py-1.5 uppercase tracking-widest text-[10px] font-black">
                                {post.category || "Travel Guide"}
                            </Badge>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                                <Calendar className="w-4 h-4" />
                                <span>{post.updatedDate ? `Updated ${formatDate(post.updatedDate)}` : formatDate(post.publishedDate)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                                <Clock className="w-4 h-4" />
                                <span>{estimateReadTime(post.content)} min read</span>
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-gray-900 leading-[1.15] sm:leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-3xl">{post.excerpt}</p>

                        <div className="flex items-center gap-4 py-5 border-y border-gray-200/70">
                            <div className="w-12 h-12 rounded-full bg-maroon-600 text-white flex items-center justify-center flex-shrink-0">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Written by</p>
                                <Link href="/about/avneesh-dixit" className="font-bold text-gray-900 hover:text-maroon-600 transition-colors">
                                    {post.author || "Avneesh Dixit"}
                                </Link>
                                <span className="text-gray-500 text-sm"> · Government-approved guide, Agra</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl mb-10 md:mb-14">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 900px"
                        />
                    </div>

                    {post.quickAnswer && (
                        <div id="quick-answer" className="bg-white rounded-3xl border border-gold-200 border-l-4 border-l-gold-500 p-6 md:p-8 shadow-sm mb-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-3">Quick answer</p>
                            {post.faqQuestion && (
                                <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-3">{post.faqQuestion}</h2>
                            )}
                            <p className="text-gray-700 text-lg leading-relaxed">{post.quickAnswer}</p>
                        </div>
                    )}

                    {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                        <div className="bg-gray-900 text-white rounded-3xl p-6 md:p-8 mb-8">
                            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-gold-500 mb-5 flex items-center gap-2">
                                <ListChecks className="w-4 h-4" /> Key takeaways
                            </h2>
                            <ul className="space-y-3">
                                {post.keyTakeaways.map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start text-white/85 leading-relaxed">
                                        <span aria-hidden="true" className="mt-2.5 w-2 h-2 rotate-45 bg-gold-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {headings.length >= 3 && (
                        <nav aria-label="In this guide" className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 mb-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4">In this guide</p>
                            <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                                {headings.map((h, i) => (
                                    <li key={h.id} className="flex gap-3 text-sm">
                                        <span className="text-gold-600 font-bold w-5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                        <a href={`#${h.id}`} className="text-gray-700 hover:text-maroon-600 font-medium transition-colors">{h.text}</a>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    )}

                    <div className="bg-white p-6 sm:p-10 md:p-16 rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-gray-100">
                        <article className="max-w-none">
                            {renderMarkdown(post.content)}
                        </article>

                        <div className="mt-14 pt-10 border-t border-gray-100 space-y-6">
                            <div className="flex flex-col md:flex-row gap-6 items-center bg-ivory-100 p-8 rounded-3xl">
                                <div className="w-20 h-20 rounded-full bg-maroon-600 text-white flex items-center justify-center font-display text-3xl font-bold shrink-0">
                                    GT
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">About Guide India Tours</h3>
                                    <p className="text-gray-600 font-light leading-relaxed">
                                        Private Golden Triangle tours run from Agra since 2004 by government-approved guides. Rated 4.9/5 by 403+ travelers on Google. Every article is written from what we see on the ground with guests every week.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-gray-900 text-white p-6 md:p-8 rounded-3xl">
                                <div className="flex items-start gap-3">
                                    <HelpCircle className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold">Still have a question about your trip?</p>
                                        <p className="text-white/60 text-sm font-light">Browse the full FAQ hub or message a guide directly on WhatsApp.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-shrink-0">
                                    <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black rounded-xl">
                                        <Link href="/faq">FAQ hub</Link>
                                    </Button>
                                    <Button asChild className="bg-maroon-600 hover:bg-white hover:text-black text-white rounded-xl">
                                        <a href="https://wa.me/918979810991?text=Hi%20Guide%20India%20Tours!%20I%20have%20a%20question%20about%20my%20trip." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            <MessageCircle className="w-4 h-4" /> WhatsApp
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {relatedPlans.length > 0 && (
                <section className="py-20 md:py-28 bg-[#F8F5F2]">
                    <div className="container mx-auto px-4 max-w-7xl text-center">
                        <Badge className="bg-maroon-600/10 text-maroon-600 border-none mb-6 px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black">
                            Put it into practice
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-12 md:mb-16">Recommended <span className="text-maroon-600">Tour Packages</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {relatedPlans.map(plan => (
                                <Card key={plan.id} className="overflow-hidden group rounded-3xl border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-white">
                                    <Link href={`/plans/${plan.id}`}>
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={plan.image}
                                                alt={plan.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                        <CardContent className="p-8 text-left">
                                            <div className="flex justify-between items-center mb-4">
                                                <Badge variant="outline" className="border-maroon-600/20 text-maroon-600 rounded-lg">
                                                    {plan.duration}
                                                </Badge>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-3 h-3 text-gold-500 fill-current" />
                                                    <span className="text-[10px] font-bold text-gray-500">{plan.rating}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-6 group-hover:text-maroon-600 transition-colors line-clamp-2 min-h-[3.5rem] leading-tight">{plan.title}</h3>
                                            <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                                                <span className="text-xs font-black text-maroon-600 uppercase tracking-widest">Custom Quote</span>
                                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-maroon-600 group-hover:text-white transition-all">
                                                    <ArrowLeft className="rotate-180 w-5 h-5" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {relatedPosts.length > 0 && (
                <section className="py-16 md:py-20 bg-white border-t border-gray-100">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="flex items-end justify-between mb-10 md:mb-12 gap-6">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                                Keep <span className="text-maroon-600">Reading</span>
                            </h2>
                            <Link href="/blog" className="hidden sm:flex items-center gap-2 text-sm font-bold text-maroon-600 hover:text-black uppercase tracking-widest">
                                All guides <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map(p => (
                                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block bg-ivory-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500">
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
                                            <span>{p.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-gold-500" />
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {estimateReadTime(p.content)} min read</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-maroon-600 transition-colors leading-snug line-clamp-2">{p.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}
