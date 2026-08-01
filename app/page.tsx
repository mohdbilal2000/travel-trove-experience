
import { Metadata } from 'next';
import Link from 'next/link';
import PlannerSection from "@/components/home/PlannerSection";
import HowItWorks from "@/components/shared/HowItWorks";
import NewsletterForm from "@/components/shared/NewsletterForm";
import {
    TrustStats, GoldenTriangleExplainer, PackageTiers, DestinationsGrid,
    BookDirect, EeatGuides, ReviewsWall, ResourcesHub, FinalCta,
} from "@/components/home/HomeSections";
import { getFilteredPlans } from "@/lib/planner";
import { homeFaqs } from "@/data/homeFaqs";

export const metadata: Metadata = {
    title: "Private Golden Triangle Tours India — Delhi, Agra & Jaipur",
    description: "Private Golden Triangle tours with government-licensed guides since 2004. Delhi, Agra & Jaipur packages with Taj Mahal sunrise visits, AC cars and 24/7 support. Rated 4.9/5 by 403+ travelers on Google.",
    keywords: "Golden Triangle Tours, Delhi tours, Agra tours, Jaipur tours, Taj Mahal visit, India travel packages, luxury India tours, same day Agra tour, Jaipur sightseeing, private tour India",
    alternates: {
        canonical: 'https://www.guideindiatours.com',
        languages: {
            'en': 'https://www.guideindiatours.com',
            'en-US': 'https://www.guideindiatours.com',
            'en-GB': 'https://www.guideindiatours.com',
            'en-IN': 'https://www.guideindiatours.com',
            'en-AU': 'https://www.guideindiatours.com',
            'x-default': 'https://www.guideindiatours.com',
        },
    },
    openGraph: {
        title: "Private Golden Triangle Tours — Delhi, Agra & Jaipur | Guide India Tours",
        description: "Government-licensed guides, private AC cars, 24/7 support. Operating from Agra since 2004 and rated 4.9/5 by 403+ travelers on Google.",
        url: 'https://www.guideindiatours.com',
        siteName: 'Guide India Tours',
        images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630, alt: 'Taj Mahal at sunrise — Guide India Tours private Golden Triangle tours' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Private Golden Triangle Tours | Guide India Tours',
        description: 'Private Delhi, Agra & Jaipur tours with government-licensed guides. Rated 4.9/5 by 403+ travelers on Google.',
        images: ['https://www.guideindiatours.com/images/og-default.jpg'],
    },
};

export default function Home() {
    const featuredPlans = getFilteredPlans([]);

    // The global Organization (#organization) and WebSite (#website) nodes are
    // emitted once in app/layout.tsx — this page only references them by @id.
    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://www.guideindiatours.com/#webpage",
        "url": "https://www.guideindiatours.com",
        "name": "Private Golden Triangle Tours India — Delhi, Agra & Jaipur",
        "isPartOf": { "@id": "https://www.guideindiatours.com/#website" },
        "about": { "@id": "https://www.guideindiatours.com/#organization" },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://www.guideindiatours.com/images/optimized/agra/getty-images-WQ6WY27_uhQ-unsplash-1920.webp",
            "width": 1920,
            "height": 1281
        },
        "inLanguage": "en",
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["#home-hero-title", "#golden-triangle-definition"]
        }
    };

    const featuredToursSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": "https://www.guideindiatours.com/#featured-tours",
        "name": "Best-Selling Private India Tour Packages",
        "numberOfItems": featuredPlans.length,
        "itemListElement": featuredPlans.map((plan, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": plan.title,
            "url": `https://www.guideindiatours.com/plans/${plan.id}`
        }))
    };

    // NOTE: no FAQPage schema here — /faq is the single marked-up FAQPage
    // site-wide (Google guideline: don't mark up the same questions on
    // multiple pages). The visible FAQ section below stays for readers/AEO.
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageSchema, featuredToursSchema]) }}
            />

            {/* Hero with trip planner (client island) + planner-driven tour grid */}
            <PlannerSection />

            {/* Quotable trust facts */}
            <TrustStats />

            {/* Answer-box: what is the Golden Triangle + route table */}
            <GoldenTriangleExplainer />

            {/* Guide Only / Guide+Cab / All-Inclusive / Custom */}
            <PackageTiers />

            {/* Destination cluster: Delhi, Agra, Jaipur */}
            <DestinationsGrid />

            {/* Direct booking vs marketplaces */}
            <BookDirect />

            {/* E-E-A-T: licensed guides, founder, NAP address */}
            <EeatGuides />

            {/* Inquiry → quote → deposit → travel */}
            <HowItWorks />

            {/* Fresh, server-rendered Google reviews */}
            <ReviewsWall />

            {/* Taj Mahal info pages + blog guides */}
            <ResourcesHub />

            {/* Homepage FAQ - visible content backing the FAQPage schema */}
            <section className="py-14 md:py-20 bg-ivory-100" aria-labelledby="home-faq-heading">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-14">
                        <h2 id="home-faq-heading" className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                            India Private Tour <span className="text-maroon-600">FAQs</span>
                        </h2>
                        <p className="text-gray-500 font-light max-w-2xl mx-auto">
                            Everything you need to know about planning a private Golden Triangle tour with Guide India Tours.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {homeFaqs.map((faq, i) => (
                            <details
                                key={i}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <summary className="cursor-pointer list-none px-8 py-6 flex items-center justify-between gap-4 text-lg font-bold text-gray-900">
                                    <span>{faq.question}</span>
                                    <span aria-hidden="true" className="text-maroon-600 transition-transform group-open:rotate-45 text-2xl leading-none flex-shrink-0">+</span>
                                </summary>
                                <div className="px-8 pb-8 -mt-2 text-gray-500 font-light leading-relaxed">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <p className="text-gray-500 font-light mb-4">Still have questions?</p>
                        <Link
                            href="/faq"
                            className="inline-flex items-center gap-2 font-bold text-maroon-600 hover:text-maroon-700 transition-colors mr-6"
                        >
                            See all FAQs
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 font-bold text-maroon-600 hover:text-maroon-700 transition-colors"
                        >
                            Contact our team
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter capture */}
            <section className="py-14 md:py-20 bg-black text-white" aria-labelledby="newsletter-heading">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <h2 id="newsletter-heading" className="text-3xl md:text-5xl font-display font-bold mb-4">
                        Not Ready to Book <span className="text-gold-500">Yet?</span>
                    </h2>
                    <p className="text-lg text-white/60 mb-10 font-light">
                        Join our newsletter for insider Golden Triangle travel tips, seasonal booking advice, and early access to new tours.
                    </p>
                    <NewsletterForm />
                </div>
            </section>

            {/* Final conversion CTA */}
            <FinalCta />
        </main>
    );
}
