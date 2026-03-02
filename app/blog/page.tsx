
import { Metadata } from 'next';
import Link from "next/link";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { blogPosts as allPosts } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    Calendar, User, ArrowRight, Tag,
    Search, ChevronRight, Clock, Sparkles,
    TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/shared/NewsletterForm";

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
    const { category, q } = await searchParams;
    let title = 'India Travel Blog | Golden Triangle Stories & Guides';
    if (q) title = `Search results for "${q}" | Guide India Tours Blog`;
    else if (category && category !== 'All') title = `${category} Articles | India Travel Blog`;

    return {
        title,
        description: 'Explore our collection of expert travel guides, cultural narratives, and insider tips for visiting Delhi, Agra, and Jaipur. Start your journey with Guide India Tours.',
        alternates: {
            canonical: 'https://guideindiatours.com/blog',
            languages: {
                'en-US': 'https://guideindiatours.com/blog',
                'en-GB': 'https://guideindiatours.com/blog',
                'en-AU': 'https://guideindiatours.com/blog',
                'x-default': 'https://guideindiatours.com/blog',
            },
        },
        openGraph: {
            title,
            description: 'Expert travel guides and cultural narratives for India\'s Golden Triangle.',
            url: 'https://guideindiatours.com/blog',
            images: [{ url: 'https://guideindiatours.com/images/og-blog.jpg' }],
        }
    };
}

interface BlogPageProps {
    searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const { category, q } = await searchParams;

    const categories = ["All", ...Array.from(new Set(allPosts.map(post => post.category)))];

    const selectedCategory = category || "All";

    const filteredPosts = allPosts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = !q ||
            post.title.toLowerCase().includes(q.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(q.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = allPosts[0];

    return (
        <main className="min-h-screen bg-ivory-100">
            {/* Editorial Hero */}
            <section className="relative pt-44 pb-32 overflow-hidden bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <Badge className="bg-maroon-600/10 text-maroon-600 border-none mb-8 px-6 py-2 uppercase tracking-[0.3em] text-[9px] font-black">
                            Our Journal
                        </Badge>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
                            Narratives of <br /><span className="text-maroon-600">History.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            Deep dives into the architecture, legends, and soul of India's Golden Triangle.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Story */}
            {!category && !q && featuredPost && (
                <section className="pb-32">
                    <div className="container mx-auto px-4">
                        <Link href={`/blog/${featuredPost.slug}`} className="group block relative rounded-3xl overflow-hidden shadow-2xl h-[350px] sm:h-[450px] md:h-[600px] border border-gray-100">
                            <div className="absolute inset-0">
                                <OptimizedImage
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    fill
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12 z-10 max-w-3xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <Badge className="bg-gold-500 text-black border-none px-4 py-1.5 font-black uppercase text-xs tracking-widest">Featured Story</Badge>
                                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> {Math.max(1, Math.ceil(featuredPost.content.split(/\s+/).length / 200))} Min Read
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight group-hover:text-gold-500 transition-colors">{featuredPost.title}</h2>
                                <p className="text-lg text-white/70 font-light mb-8 line-clamp-2">{featuredPost.excerpt}</p>
                                <div className="flex items-center gap-4 text-white font-bold uppercase tracking-[0.2em] text-xs">
                                    Read the Full Essay <ArrowRight className="group-hover:translate-x-4 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Main Grid */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    {/* Filter Bar - AEO Optimized using Links instead of buttons for crawlability */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
                        <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide max-w-full">
                            {categories.map(cat => (
                                <Link
                                    key={cat}
                                    href={cat === "All" ? "/blog" : `/blog?category=${cat}`}
                                    className={cn(
                                        "px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                        selectedCategory === cat
                                            ? "bg-maroon-600 text-white shadow-xl"
                                            : "bg-white text-gray-400 hover:text-gray-900 border border-gray-100"
                                    )}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                        <form action="/blog" className="relative w-full md:w-80">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                name="q"
                                defaultValue={q}
                                className="w-full pl-14 pr-8 py-4 rounded-full border border-gray-100 bg-white focus:outline-none focus:border-maroon-600 transition-all text-sm font-medium"
                                placeholder="Search archives..."
                            />
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                        {filteredPosts.map((post, i) => (
                            <div key={post.id} className="group">
                                <Link href={`/blog/${post.slug}`} className="block">
                                    <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700 relative">
                                        <OptimizedImage
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <Badge className="bg-white/90 backdrop-blur-md text-black border-none px-4 py-1.5 font-black uppercase text-[9px] tracking-widest">{post.category}</Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-xs font-black text-gray-500 uppercase tracking-widest">
                                            <span>{post.publishedDate}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                                            <span>By {post.author}</span>
                                        </div>
                                        <h2 className="text-2xl font-display font-bold text-gray-900 group-hover:text-maroon-600 transition-colors leading-tight">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-500 font-light leading-relaxed line-clamp-3 text-sm">{post.excerpt}</p>
                                        <div className="pt-4 flex items-center gap-2 text-maroon-600 text-xs font-black uppercase tracking-[0.2em]">
                                            Full Story <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Luxury Newsletter */}
            <section className="py-16 md:py-24 lg:py-40 bg-black text-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-full bg-maroon-600 opacity-10 blur-[200px]" />
                <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
                    <TrendingUp className="w-12 h-12 text-gold-500 mx-auto mb-8" />
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Join the <span className="text-gold-500">Heritage Club.</span></h2>
                    <p className="text-xl text-white/60 mb-16 font-light max-w-2xl mx-auto">Get exclusive essays on Indian history, hidden travel gems, and advance notice of our signature tour openings.</p>
                    <NewsletterForm />
                </div>
            </section>
        </main>
    );
}
