import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar, CheckCircle2, ArrowRight, ThumbsUp, Users, TrendingUp } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { reviews } from '@/data/reviews';
import {
    generateReviewSchema,
    generateBreadcrumbSchema,
} from '@/lib/schemaGenerator';

export const metadata: Metadata = {
    title: 'Guest Reviews | What Travelers Say About Guide India Tours',
    description: 'Read 364+ verified guest reviews from travelers worldwide. Rated 4.9/5 on Google. Discover why 98% of guests recommend our Golden Triangle tours.',
    alternates: {
        canonical: 'https://guideindia.tours/reviews',
        languages: {
            'en-US': 'https://guideindia.tours/reviews',
            'en-GB': 'https://guideindia.tours/reviews',
            'en-AU': 'https://guideindia.tours/reviews',
            'x-default': 'https://guideindia.tours/reviews',
        },
    },
    openGraph: {
        title: 'Guest Reviews | Guide India Tours',
        description: 'Rated 4.9/5 by 364+ verified travelers. Read real reviews from guests who explored India with us.',
        url: 'https://guideindia.tours/reviews',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [
            {
                url: 'https://guideindia.tours/images/og-default.jpg',
                width: 1200,
                height: 630,
                alt: 'Guide India Tours Guest Reviews',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Guest Reviews | Guide India Tours',
        description: 'Rated 4.9/5 by 364+ verified travelers. Read real reviews from guests who explored India with us.',
    },
};

const ratingBreakdown = [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 },
];

const platformCounts = {
    Google: reviews.filter((r) => r.platform === 'Google').length,
    TripAdvisor: reviews.filter((r) => r.platform === 'TripAdvisor').length,
    Trustpilot: reviews.filter((r) => r.platform === 'Trustpilot').length,
};

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${
                        i < rating
                            ? 'text-gold-500 fill-gold-500'
                            : 'text-gray-200 fill-gray-200'
                    }`}
                />
            ))}
        </div>
    );
}

export default function ReviewsPage() {
    const aggregateRatingSchema = {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Guide India Tours',
        url: 'https://guideindia.tours',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '364',
            bestRating: '5',
            worstRating: '1',
        },
        review: reviews.slice(0, 5).map((r) =>
            generateReviewSchema({
                author: r.name,
                rating: r.rating,
                reviewBody: r.reviewText,
                datePublished: r.date,
                tourName: r.tourType,
            })
        ),
    };

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://guideindia.tours' },
        { name: 'Reviews', url: 'https://guideindia.tours/reviews' },
    ]);

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Hero Section */}
            <section className="relative pt-44 pb-24 bg-white border-b border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-maroon-600/5 rounded-bl-full translate-x-1/2 -translate-y-12" />
                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs items={[{ label: 'Reviews' }]} className="mb-12" />

                    <div className="max-w-3xl">
                        <Badge className="bg-maroon-600/10 text-maroon-600 border-none px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black mb-8">
                            Verified Reviews
                        </Badge>
                        <h1 className="text-6xl md:text-8xl font-display font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
                            Guest <span className="text-maroon-600">Reviews</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl">
                            Real experiences from travelers who explored India&apos;s Golden Triangle with us. Every review is from a verified guest.
                        </p>
                    </div>

                    {/* Aggregate Stats */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
                        <div className="bg-ivory-100 rounded-3xl p-8 text-center">
                            <div className="flex items-center justify-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-gold-500 fill-gold-500" />
                                ))}
                            </div>
                            <p className="text-4xl font-display font-bold text-gray-900">4.9</p>
                            <p className="text-sm text-gray-500 mt-1">out of 5 stars</p>
                        </div>
                        <div className="bg-ivory-100 rounded-3xl p-8 text-center">
                            <div className="flex items-center justify-center mb-3">
                                <Users className="w-6 h-6 text-maroon-600" />
                            </div>
                            <p className="text-4xl font-display font-bold text-gray-900">364</p>
                            <p className="text-sm text-gray-500 mt-1">verified reviews</p>
                        </div>
                        <div className="bg-ivory-100 rounded-3xl p-8 text-center">
                            <div className="flex items-center justify-center mb-3">
                                <ThumbsUp className="w-6 h-6 text-maroon-600" />
                            </div>
                            <p className="text-4xl font-display font-bold text-gray-900">98%</p>
                            <p className="text-sm text-gray-500 mt-1">recommend us</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rating Breakdown */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                            Rating Breakdown
                        </h2>
                        <p className="text-gray-500 font-light">
                            Based on reviews from Google, TripAdvisor, and Trustpilot
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Bar Chart */}
                        <div className="space-y-4">
                            {ratingBreakdown.map((item) => (
                                <div key={item.stars} className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 w-20 shrink-0">
                                        <span className="text-sm font-semibold text-gray-700">{item.stars}</span>
                                        <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                                    </div>
                                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gold-500 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-500 w-12 text-right">
                                        {item.percentage}%
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Platform Badges */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-display font-bold text-gray-900 mb-4">
                                Reviewed On
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(platformCounts).map(([platform, count]) => (
                                    <div
                                        key={platform}
                                        className="flex items-center justify-between bg-ivory-100 rounded-2xl px-6 py-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-maroon-600/10 flex items-center justify-center">
                                                <TrendingUp className="w-5 h-5 text-maroon-600" />
                                            </div>
                                            <span className="font-semibold text-gray-800">
                                                {platform}
                                            </span>
                                        </div>
                                        <Badge className="bg-gold-500/10 text-gold-700 border-none px-3 py-1 text-xs font-bold">
                                            {count} reviews shown
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                            What Our Guests Say
                        </h2>
                        <p className="text-gray-500 font-light max-w-2xl mx-auto">
                            Authentic reviews from verified travelers across the globe
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review) => (
                            <article
                                key={review.id}
                                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                            >
                                {/* Header */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-maroon-600 text-white flex items-center justify-center text-lg font-display font-bold shrink-0">
                                        {review.avatar || review.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 truncate">
                                                {review.name}
                                            </h3>
                                            {review.verified && (
                                                <CheckCircle2 className="w-4 h-4 text-maroon-600 shrink-0" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{review.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rating & Tour */}
                                <div className="flex items-center justify-between mb-4">
                                    <StarRating rating={review.rating} />
                                    <Badge className="bg-gold-500/10 text-gold-700 border-none text-[10px] font-bold px-2.5 py-0.5">
                                        {review.tourType}
                                    </Badge>
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-600 leading-relaxed flex-grow text-sm">
                                    &ldquo;{review.reviewText}&rdquo;
                                </p>

                                {/* Footer */}
                                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{formatDate(review.date)}</span>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="text-[10px] font-bold border-maroon-600/20 text-maroon-600"
                                    >
                                        {review.platform}
                                    </Badge>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-maroon-600 text-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <Badge className="bg-white/10 text-white border-none px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black mb-8">
                        Join Our Happy Travelers
                    </Badge>
                    <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight tracking-tight">
                        Ready to Create Your Own Story?
                    </h2>
                    <p className="text-white/70 text-lg mb-12 font-light leading-relaxed">
                        Join over 150 satisfied travelers who chose Guide India Tours for their Golden Triangle adventure. Your unforgettable India experience awaits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-maroon-600 hover:bg-ivory-100 font-bold text-base px-8"
                        >
                            <Link href="/plans">
                                View Tour Packages
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10 font-bold text-base px-8"
                        >
                            <Link href="/contact">Get a Custom Quote</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
