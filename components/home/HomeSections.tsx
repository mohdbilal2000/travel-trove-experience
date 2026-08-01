import Link from "next/link";
import Image from "next/image";
import {
    Users, ShieldCheck, Star, MapPin, Landmark, CalendarRange,
    MessageCircle, Phone, BookOpen, Clock, ArrowRight, BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { reviews } from "@/data/reviews";
import { blogPosts, estimateReadTime } from "@/data/blogPosts";
import { allPlans } from "@/data/travelPlans";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Guide+India+Tours/";

/* ------------------------------------------------------------------ */
/* Trust stats — quotable facts as a definition list                   */
/* ------------------------------------------------------------------ */

const stats = [
    { term: "Operating since", detail: "2004" },
    { term: "Travelers guided", detail: "15,000+" },
    { term: "Google rating", detail: "4.9/5 · 403+ reviews" },
    { term: "Tour packages", detail: `${allPlans.length}+` },
    { term: "Guides", detail: "Government-licensed" },
    { term: "Support", detail: "24/7 on WhatsApp" },
];

export function TrustStats() {
    return (
        <section className="bg-black text-white py-10 md:py-14" aria-labelledby="trust-stats-heading">
            <div className="container mx-auto px-4">
                <h2 id="trust-stats-heading" className="text-center text-xs font-black uppercase tracking-[0.3em] text-gold-500 mb-8">
                    India Tour Operator Since 2004 — Trusted by 15,000+ Travelers
                </h2>
                <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                    {stats.map((s) => (
                        <div key={s.term} className="flex flex-col-reverse">
                            <dt className="text-[11px] uppercase tracking-widest text-white/50 font-bold">{s.term}</dt>
                            <dd className="text-xl md:text-2xl font-display font-bold text-white mb-1">{s.detail}</dd>
                        </div>
                    ))}
                </dl>
                <p className="text-center text-white/70 font-light mt-8 max-w-3xl mx-auto leading-relaxed">
                    Guide India Tours is a private tour operator based in Agra, India, working only with
                    government-approved, licensed guides — operating since 2004 and rated 4.9/5 from 403+ Google reviews.{" "}
                    <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-white underline underline-offset-2">
                        Verify our reviews on Google
                    </a>{" "}
                    or read our{" "}
                    <Link href="/about" className="text-gold-500 hover:text-white underline underline-offset-2">
                        story since 2004
                    </Link>.
                </p>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Golden Triangle explainer — answer-box content with route table     */
/* ------------------------------------------------------------------ */

const routeLegs = [
    { leg: "Delhi → Agra", distance: "~230 km", time: "3–4 hours", route: "Yamuna Expressway", highlights: "Taj Mahal, Agra Fort, Itmad-ud-Daulah" },
    { leg: "Agra → Jaipur", distance: "~240 km", time: "4–5 hours", route: "Via Fatehpur Sikri", highlights: "Fatehpur Sikri, Amber Fort, City Palace" },
    { leg: "Jaipur → Delhi", distance: "~280 km", time: "5–6 hours", route: "NH48", highlights: "Hawa Mahal, Jantar Mantar, drive back to Delhi" },
];

export function GoldenTriangleExplainer() {
    return (
        <section className="py-14 md:py-20 bg-white" aria-labelledby="golden-triangle-heading">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 id="golden-triangle-heading" className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6 text-center">
                    What Is India&apos;s <span className="text-maroon-600">Golden Triangle</span> Tour?
                </h2>
                <p id="golden-triangle-definition" className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto text-center mb-12">
                    India&apos;s Golden Triangle is the classic tourist circuit connecting Delhi, Agra and Jaipur —
                    roughly 750 km of highway linking the Taj Mahal, Agra Fort, Amber Fort and Old Delhi&apos;s Mughal
                    monuments. Most travelers complete it in 4 to 7 days by private car with a licensed guide,
                    starting and ending in Delhi.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-12">
                    <table className="w-full text-left border-collapse bg-white">
                        <caption className="sr-only">Golden Triangle route legs with distances and driving times</caption>
                        <thead>
                            <tr className="bg-maroon-600 text-white">
                                <th scope="col" className="p-4 text-xs font-black uppercase tracking-widest">Route Leg</th>
                                <th scope="col" className="p-4 text-xs font-black uppercase tracking-widest">Distance</th>
                                <th scope="col" className="p-4 text-xs font-black uppercase tracking-widest">Drive Time</th>
                                <th scope="col" className="p-4 text-xs font-black uppercase tracking-widest hidden md:table-cell">Road</th>
                                <th scope="col" className="p-4 text-xs font-black uppercase tracking-widest">Key Sights</th>
                            </tr>
                        </thead>
                        <tbody>
                            {routeLegs.map((r) => (
                                <tr key={r.leg} className="border-b border-gray-50 last:border-0">
                                    <th scope="row" className="p-4 font-bold text-gray-900 whitespace-nowrap">{r.leg}</th>
                                    <td className="p-4 text-gray-700 whitespace-nowrap">{r.distance}</td>
                                    <td className="p-4 text-gray-700 whitespace-nowrap">{r.time}</td>
                                    <td className="p-4 text-gray-700 hidden md:table-cell">{r.route}</td>
                                    <td className="p-4 text-gray-700">{r.highlights}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-ivory-300 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">How many days do you need for the Golden Triangle?</h3>
                        <p className="text-gray-600 font-light leading-relaxed">
                            Four days is the minimum to comfortably cover Delhi, Agra and Jaipur. Five to seven days
                            allow a more relaxed pace and time for extensions such as Udaipur, Ranthambore or Varanasi.
                            Compare our{" "}
                            <Link href="/golden-triangle-tours" className="text-maroon-600 font-bold underline underline-offset-2 hover:text-black">
                                4 to 10-day Golden Triangle tour itineraries
                            </Link>.
                        </p>
                    </div>
                    <div className="bg-ivory-300 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">When is the best time to visit?</h3>
                        <p className="text-gray-600 font-light leading-relaxed">
                            October to March offers the most pleasant weather across all three cities. Visit the Taj
                            Mahal at sunrise for the softest light and smallest crowds — and note it is closed on
                            Fridays. See our{" "}
                            <Link href="/taj-mahal-best-time-to-visit" className="text-maroon-600 font-bold underline underline-offset-2 hover:text-black">
                                month-by-month Taj Mahal guide
                            </Link>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Package tiers                                                       */
/* ------------------------------------------------------------------ */

const tiers = [
    {
        title: "Guide Only",
        blurb: "Professional certified guide for your personalized tour",
        points: ["Certified multi-language guide", "Historical & cultural insights", "Monument navigation assistance"],
        cta: { label: "Book a Guide", href: "/guide-booking" },
        icon: Users,
        popular: false,
    },
    {
        title: "Guide + Cab",
        blurb: "Complete private sightseeing package",
        points: ["Everything in Guide Only", "Private luxury AC vehicle", "Fuel, parking & driver allowance"],
        cta: { label: "Get a Quote", href: "/contact" },
        icon: BadgeCheck,
        popular: true,
    },
    {
        title: "All Inclusive",
        blurb: "Guide + Cab + Hotels + Monuments",
        points: ["Everything in Guide + Cab", "Luxury 4/5-star hotels", "All monument tickets (skip-the-line)"],
        cta: { label: "Explore Packages", href: "/plans" },
        icon: Landmark,
        popular: false,
    },
    {
        title: "Custom Tour",
        blurb: "Bespoke itinerary designed just for you",
        points: ["Flexible itinerary planning", "Mix & match destinations", "Special requests catered"],
        cta: { label: "Plan My Trip", href: "/contact" },
        icon: CalendarRange,
        popular: false,
    },
];

export function PackageTiers() {
    return (
        <section className="py-14 md:py-20 bg-gradient-to-b from-white via-gray-50 to-white" aria-labelledby="tiers-heading">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 id="tiers-heading" className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                        Choose How You Want to Travel
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Book just a licensed guide, add a private car, or go fully all-inclusive — every option is
                        private and customizable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {tiers.map((tier) => (
                        <div
                            key={tier.title}
                            className={`bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group flex flex-col h-full relative ${tier.popular ? "border-2 border-maroon-600/10 shadow-xl" : "border border-gray-100"}`}
                        >
                            {tier.popular && (
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="bg-maroon-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Popular</span>
                                </div>
                            )}
                            <div className={`p-8 text-center border-b ${tier.popular ? "bg-gradient-to-br from-maroon-600/5 to-white border-maroon-600/10" : "bg-gradient-to-br from-gray-50 to-white border-gray-100"}`}>
                                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <tier.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">{tier.title}</h3>
                                <p className="text-sm text-gray-500 font-medium px-4">{tier.blurb}</p>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <ul className="space-y-4 mb-8 flex-grow">
                                    {tier.points.map((point) => (
                                        <li key={point} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-gray-600 text-[15px] leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full bg-maroon-600 hover:bg-maroon-700 text-white h-12 rounded-xl transition-all duration-300 font-semibold" asChild>
                                    <Link href={tier.cta.href}>{tier.cta.label}</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Destinations cluster                                                */
/* ------------------------------------------------------------------ */

const cities = [
    {
        name: "Delhi",
        href: "/delhi-tours",
        anchor: "Delhi sightseeing tours",
        image: "/images/optimized/delhi/getty-images-C4Yf3Wbymg8-unsplash-900.webp",
        alt: "Humayun's Tomb and historic monuments of Delhi",
        blurb: "India's capital blends Mughal landmarks — the Red Fort, Jama Masjid and Humayun's Tomb — with New Delhi's India Gate, Qutub Minar and Lotus Temple. Tours from $25 per person.",
    },
    {
        name: "Agra",
        href: "/agra-tours",
        anchor: "Agra & Taj Mahal tours",
        image: "/images/optimized/agra/getty-images-x83xvTdlITo-unsplash-900.webp",
        alt: "Taj Mahal reflected in the Yamuna river, Agra",
        blurb: "Home of the Taj Mahal, Agra Fort and Fatehpur Sikri. Our same-day Agra tour from Delhi includes a sunrise Taj Mahal visit with a licensed guide. Tours from $30 per person.",
    },
    {
        name: "Jaipur",
        href: "/jaipur-tours",
        anchor: "Jaipur Pink City tours",
        image: "/images/optimized/jaipur/getty-images-zlqHXvaEIiI-unsplash-900.webp",
        alt: "Amber Fort overlooking Maota Lake, Jaipur",
        blurb: "Rajasthan's royal capital: Amber Fort, City Palace, Hawa Mahal and the Jantar Mantar observatory, plus artisan bazaars for jewelry and textiles. Tours from $35 per person.",
    },
];

export function DestinationsGrid() {
    return (
        <section className="py-14 md:py-20 bg-ivory-100" aria-labelledby="destinations-heading">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 id="destinations-heading" className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                        Where We Take You: <span className="text-maroon-600">Delhi, Agra &amp; Jaipur</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto">
                        Every city page below includes tour prices, itineraries and practical travel tips written by our local guides.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {cities.map((city) => (
                        <Link key={city.name} href={city.href} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={city.image}
                                    alt={city.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                <h3 className="absolute bottom-5 left-6 text-3xl font-display font-bold text-white">{city.name}</h3>
                            </div>
                            <div className="p-7">
                                <p className="text-gray-600 text-sm font-light leading-relaxed mb-5">{city.blurb}</p>
                                <span className="inline-flex items-center gap-2 text-maroon-600 font-bold text-sm uppercase tracking-widest group-hover:gap-3 transition-all">
                                    {city.anchor} <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <p className="text-center mt-10 text-gray-600 font-light">
                    Visiting all three?{" "}
                    <Link href="/golden-triangle-tours" className="text-maroon-600 font-bold underline underline-offset-2 hover:text-black">
                        Compare our Golden Triangle tour packages from $150 per person
                    </Link>{" "}
                    — or extend to Udaipur, Ranthambore and Varanasi from the{" "}
                    <Link href="/plans" className="text-maroon-600 font-bold underline underline-offset-2 hover:text-black">
                        full tour list
                    </Link>.
                </p>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Book direct comparison                                              */
/* ------------------------------------------------------------------ */

const comparisons = [
    { aspect: "Pricing", direct: "Direct local rates with no third-party markup", ota: "Platform commission is typically built into the price" },
    { aspect: "Who you talk to", direct: "The Agra-based team that runs your tour, on WhatsApp", ota: "Marketplace support staff" },
    { aspect: "Customization", direct: "Fully private and customizable itineraries", ota: "Mostly fixed, pre-packaged products" },
    { aspect: "Payment", direct: "25% deposit; balance due 30 days before travel", ota: "Usually full payment upfront" },
    { aspect: "Refunds", direct: "Tiered refunds up to 85% — see our refund policy", ota: "Varies by platform policy" },
];

export function BookDirect() {
    return (
        <section className="py-14 md:py-20 bg-white" aria-labelledby="book-direct-heading">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 id="book-direct-heading" className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 text-center">
                    Why Book Direct with a <span className="text-maroon-600">Local Tour Operator</span>?
                </h2>
                <p className="text-lg text-gray-600 font-light text-center max-w-3xl mx-auto mb-12">
                    Booking directly with Guide India Tours means no middleman markup and direct WhatsApp contact
                    with the team that actually runs your tour.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                    <table className="w-full text-left border-collapse bg-white">
                        <caption className="sr-only">Booking direct with Guide India Tours compared with booking through an online travel marketplace</caption>
                        <thead>
                            <tr className="bg-gray-900 text-white">
                                <th scope="col" className="p-4 text-xs font-black uppercase tracking-widest w-1/5"><span className="sr-only">Comparison aspect</span></th>
                                <th scope="col" className="p-4 text-xs font-black uppercase tracking-widest text-gold-500">Booking Direct With Us</th>
                                <th scope="col" className="p-4 text-xs font-black uppercase tracking-widest">Typical Marketplace</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisons.map((row) => (
                                <tr key={row.aspect} className="border-b border-gray-50 last:border-0 align-top">
                                    <th scope="row" className="p-4 font-bold text-gray-900 whitespace-nowrap">{row.aspect}</th>
                                    <td className="p-4 text-gray-700 bg-maroon-600/[0.03]">{row.direct}</td>
                                    <td className="p-4 text-gray-500">{row.ota}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-center mt-8 text-gray-600 font-light">
                    A 25% deposit confirms your booking, the balance is due 30 days before your tour begins, and
                    cancellations are refunded on a tiered scale of up to 85%. Full details in our{" "}
                    <Link href="/refund-policy" className="text-maroon-600 font-bold underline underline-offset-2 hover:text-black">refund policy</Link>{" "}
                    and <Link href="/faq" className="text-maroon-600 font-bold underline underline-offset-2 hover:text-black">booking FAQs</Link>.
                </p>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* E-E-A-T: the team behind the tours                                  */
/* ------------------------------------------------------------------ */

export function EeatGuides() {
    return (
        <section className="py-14 md:py-20 bg-royal-800 text-white" aria-labelledby="guides-heading">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <div>
                        <h2 id="guides-heading" className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 leading-tight">
                            Meet Your Government-Licensed Guides
                        </h2>
                        <p className="text-lg text-white/80 mb-8 leading-relaxed">
                            Guide India Tours has operated from Agra since 2004, guiding more than 15,000 travelers
                            through Delhi, Agra and Jaipur. Our team is led by{" "}
                            <Link href="/about/avneesh-dixit" className="text-gold-500 font-semibold underline underline-offset-2 hover:text-white">
                                government-approved lead guide Avneesh Dixit
                            </Link>{" "}
                            and founded by{" "}
                            <Link href="/about/bilal" className="text-gold-500 font-semibold underline underline-offset-2 hover:text-white">
                                Agra-born founder Bilal
                            </Link>. Guides speak English and Hindi as standard, with German, French, Italian and
                            Spanish available on request.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Users className="text-gold-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium mb-2 text-gold-500">Licensed Local Experts</h3>
                                    <p className="text-white/70">Government-approved guides who are storytellers, bringing Mughal and Rajput history to life.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="text-gold-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium mb-2 text-gold-500">Safety &amp; Comfort</h3>
                                    <p className="text-white/70">Background-verified drivers, private air-conditioned vehicles, and women- and solo-traveler-friendly service.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Star className="text-gold-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium mb-2 text-gold-500">Top-Rated Service</h3>
                                    <p className="text-white/70">4.9/5 average rating from travelers worldwide — book direct with the team that runs your tour.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl aspect-[4/3]">
                            <Image
                                src="/images/optimized/jaipur/getty-images-zlqHXvaEIiI-unsplash-1200.webp"
                                alt="Travelers exploring Amber Fort in Jaipur with a private guide"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <address className="not-italic relative z-10 mt-6 bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white/80 leading-relaxed">
                            <span className="flex items-start gap-3 mb-2">
                                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                                <span>Guide India Tours, 31/84A Jangjeet Nagar, Shamsabad Road, Agra 282001, Uttar Pradesh, India</span>
                            </span>
                            <span className="flex items-center gap-3 mb-2">
                                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                                <a href="tel:+919410000991" className="hover:text-gold-500 transition-colors">+91 94100 00991</a>
                            </span>
                            <span className="flex items-center gap-3">
                                <MessageCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                                <a href="https://wa.me/918979810991" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">WhatsApp +91 89798 10991 (24/7)</a>
                            </span>
                        </address>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Reviews wall — server-rendered, freshest first                      */
/* ------------------------------------------------------------------ */

export function ReviewsWall() {
    const latest = [...reviews]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 4);

    return (
        <section className="py-14 md:py-20 bg-ivory-300" aria-labelledby="reviews-heading" id="testimonials">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 id="reviews-heading" className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                        Rated 4.9/5 by <span className="text-maroon-600">403+ Travelers</span> on Google
                    </h2>
                    <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                        Recent reviews from verified guests — read them all on Google or on our reviews page.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {latest.map((review) => (
                        <figure key={review.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex gap-0.5 mb-4" role="img" aria-label={`${review.rating} out of 5 stars`}>
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                                ))}
                            </div>
                            <blockquote className="text-gray-700 font-light leading-relaxed flex-grow">
                                &ldquo;{review.reviewText}&rdquo;
                            </blockquote>
                            <figcaption className="mt-6 pt-6 border-t border-gray-50 flex items-center gap-4">
                                <div className="w-11 h-11 rounded-full bg-maroon-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                    {review.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                </div>
                                <div>
                                    <cite className="not-italic font-bold text-gray-900 block">{review.name}</cite>
                                    <span className="text-xs text-gray-500">
                                        {review.location} · {review.tourType} ·{" "}
                                        {new Date(review.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                    </span>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <Button asChild className="bg-maroon-600 hover:bg-black text-white rounded-xl px-8 py-6 font-bold">
                        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Verify Our Reviews on Google</a>
                    </Button>
                    <Button asChild variant="outline" className="border-2 border-maroon-600 text-maroon-600 hover:bg-maroon-600 hover:text-white rounded-xl px-8 py-6 font-bold">
                        <Link href="/reviews">Read All Traveler Reviews</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Resources hub — Taj Mahal guides + blog                             */
/* ------------------------------------------------------------------ */

const tajResources = [
    { label: "Complete Taj Mahal visitor guide", href: "/taj-mahal-guide" },
    { label: "Taj Mahal tickets & entry fees", href: "/taj-mahal-tickets" },
    { label: "Taj Mahal opening hours", href: "/taj-mahal-opening-hours" },
    { label: "Taj Mahal sunrise guide", href: "/taj-mahal-sunrise-guide" },
    { label: "Best time to visit the Taj Mahal", href: "/taj-mahal-best-time-to-visit" },
    { label: "Taj Mahal dress code", href: "/taj-mahal-dress-code" },
    { label: "Taj Mahal photography guide", href: "/taj-mahal-photography-guide" },
];

const featuredSlugs = [
    "best-time-to-visit-golden-triangle",
    "taj-mahal-visiting-guide",
    "golden-triangle-on-budget",
];

export function ResourcesHub() {
    const featured = featuredSlugs
        .map((slug) => blogPosts.find((p) => p.slug === slug))
        .filter((p): p is NonNullable<typeof p> => Boolean(p));

    return (
        <section className="py-14 md:py-20 bg-white" aria-labelledby="resources-heading">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 id="resources-heading" className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                        Plan Your Trip with <span className="text-maroon-600">Free Expert Guides</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                        Practical, guide-written answers to the questions every India traveler asks.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1 bg-ivory-100 rounded-3xl p-8 border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Landmark className="w-5 h-5 text-maroon-600" /> Taj Mahal Essentials
                        </h3>
                        <ul className="space-y-3">
                            {tajResources.map((r) => (
                                <li key={r.href}>
                                    <Link href={r.href} className="flex items-center gap-2 text-gray-600 hover:text-maroon-600 transition-colors font-medium text-sm">
                                        <ArrowRight className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" /> {r.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {featured.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, 25vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
                                        <BookOpen className="w-3 h-3" /> {post.category}
                                        <span className="w-1 h-1 rounded-full bg-gold-500" />
                                        <Clock className="w-3 h-3" /> {estimateReadTime(post.content)} min
                                    </div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-maroon-600 transition-colors leading-snug text-sm line-clamp-3">
                                        {post.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                        <div className="sm:col-span-3 text-center mt-2">
                            <Link href="/blog" className="text-sm font-bold text-maroon-600 hover:text-black uppercase tracking-widest">
                                Read all India travel guides →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

export function FinalCta() {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-black text-white" aria-labelledby="final-cta-heading">
            <Image
                src="/images/optimized/agra/getty-images-ge82SKhuwCA-unsplash-1920.webp"
                alt=""
                fill
                aria-hidden="true"
                className="object-cover opacity-40"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 id="final-cta-heading" className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-6">
                        Start Planning Your Private India Tour
                    </h2>
                    <p className="text-xl text-white/90 mb-4 leading-relaxed font-light">
                        Message us on WhatsApp for a custom quote within 2 hours — or start from a ready-made package.
                    </p>
                    <p className="text-sm text-white/60 mb-10 font-light">
                        25% deposit to confirm · balance 30 days before travel · tiered refunds up to 85% · 24/7 on-trip support
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button size="lg" className="bg-maroon-600 hover:bg-maroon-700 text-white px-10 py-6 text-xl rounded-xl border-none shadow-xl hover:shadow-2xl transition-all duration-300" asChild>
                            <a href="https://wa.me/918979810991?text=Hi%20Guide%20India%20Tours!%20I%27d%20like%20help%20planning%20my%20trip." target="_blank" rel="noopener noreferrer">
                                Chat on WhatsApp
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-maroon-600 px-10 py-6 text-xl rounded-xl bg-transparent" asChild>
                            <Link href="/plans">Browse All Tour Packages</Link>
                        </Button>
                    </div>
                    <p className="mt-8 text-white/60 text-sm">
                        Prefer to talk? Call{" "}
                        <a href="tel:+919410000991" className="text-gold-500 hover:text-white font-bold">+91 94100 00991</a>{" "}
                        or visit our <Link href="/contact" className="text-gold-500 hover:text-white font-bold underline underline-offset-2">Agra office contact page</Link>.
                    </p>
                </div>
            </div>
        </section>
    );
}
