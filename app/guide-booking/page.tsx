"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Star,
    CheckCircle,
    Phone,
    Shield,
    Award,
    Globe,
    Languages,
    Calendar,
    ArrowRight,
    Check,
    Clock,
    Package,
    Plus,
    Info,
    ChevronRight,
    Zap,
    Droplets,
    Footprints,
    Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/shared/OptimizedImage";
import RelatedPages from "@/components/shared/RelatedPages";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Tour Packages Data
const tourPackages = [
    {
        id: 1,
        name: "Basic",
        price: "$11.99",
        subtitle: "Licensed Guide – Per Monument",
        description: "Ideal for groups of 1–10 looking for expert historical context at a specific site.",
        popular: false,
        badge: "Best Value",
        features: [
            "Govt-authorized licensed guide",
            "Clear English explanations",
            "Photo assistance",
            "Key history & hidden stories",
            "Entry guidance & directions"
        ],
        icon: <Globe className="w-6 h-6" />
    },
    {
        id: 2,
        name: "Standard",
        price: "$28.99 – $38.99",
        subtitle: "Half Day / Full Day Tour",
        description: "Our most popular choice for a comprehensive city experience.",
        popular: true,
        badge: "Most Popular",
        features: [
            "Licensed government guide",
            "Skip-the-line assistance",
            "Cultural storytelling",
            "Photo help & local tips",
            "Flexible itinerary"
        ],
        icon: <Star className="w-6 h-6" />
    },
    {
        id: 3,
        name: "Luxury",
        price: "$55.99 – $111.99",
        subtitle: "VIP Expert Guide Experience",
        description: "A premium, private experience with our most senior academic guides.",
        popular: false,
        badge: "👑 VIP Experience",
        features: [
            "Senior expert govt guide",
            "Deep academic storytelling",
            "Personalized private experience",
            "Priority handling",
            "Restaurant & photography concierge"
        ],
        icon: <Award className="w-6 h-6" />
    },
    {
        id: 16,
        name: "Golden Triangle",
        price: "$299",
        subtitle: "Multi-City Tour - Delhi, Agra, Jaipur",
        description: "The complete Indian experience across three iconic cities.",
        popular: false,
        features: [
            "Dedicated multi-city guide",
            "All monument entry tickets",
            "Premium private transportation",
            "Luxury hotel accommodations",
            "Local cultural immersions"
        ],
        icon: <Package className="w-6 h-6" />,
        citySpecific: ["agra", "delhi", "jaipur"]
    }
];

const guideServices: any = {
    agra: {
        city: "Agra",
        image: "/images/agra/getty-images-ge82SKhuwCA-unsplash.jpg",
        description: "Explore the eternal city of love. Home to the Taj Mahal and a legacy of Mughal grandeur.",
        highlights: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"],
        monuments: [
            "Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Itimad-ud-Daulah", "Mehtab Garden", "Akbar Tomb", "Taj View Point"
        ]
    },
    delhi: {
        city: "Delhi",
        image: "/images/delhi/getty-images-C4Yf3Wbymg8-unsplash.jpg",
        description: "Where ancient heritage meets modern pulse. The vibrant heart of India's capital.",
        highlights: ["Red Fort", "Qutub Minar", "Humayun's Tomb"],
        monuments: [
            "Red Fort", "India Gate", "Qutub Minar", "Lotus Temple", "Jama Masjid", "Humayun's Tomb", "Akshardham Temple"
        ]
    },
    jaipur: {
        city: "Jaipur",
        image: "/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg",
        description: "The Pink City. A realm of royal palaces, desert forts, and vibrant Rajasthani culture.",
        highlights: ["Amber Fort", "City Palace", "Hawa Mahal"],
        monuments: [
            "Amber Fort", "City Palace", "Hawa Mahal", "Jantar Mantar", "Nahargarh Fort", "Jal Mahal", "Albert Hall Museum"
        ]
    }
};

const freeInclusions = [
    { icon: <Car className="w-5 h-5" />, title: "Golf Cart", desc: "Monuments commute" },
    { icon: <Footprints className="w-5 h-5" />, title: "Shoe Covers", desc: "For clean entry" },
    { icon: <Droplets className="w-5 h-5" />, title: "Mineral Water", desc: "Stay hydrated" },
    { icon: <Zap className="w-5 h-5" />, title: "Skip Line", desc: "Priority entry" },
];

const requiresDurationSelection = (id: number) => {
    return id === 2 || id === 3;
};

const LANGS = [
    { value: "english", label: "English" },
    { value: "french", label: "Français" },
    { value: "german", label: "Deutsch" },
    { value: "spanish", label: "Español" },
    { value: "italian", label: "Italiano" },
    { value: "russian", label: "Русский" },
    { value: "japanese", label: "日本語" },
];

const todayIso = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const prettyDate = (iso: string) =>
    iso ? new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "";

function StepHeader({ n, title, hint, done }: { n: number; title: string; hint: string; done: boolean }) {
    return (
        <div className="flex items-start gap-4 mb-5">
            <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors",
                done ? "bg-green-600 text-white" : "bg-maroon-600 text-white"
            )}>
                {done ? <Check className="w-4 h-4" /> : n}
            </div>
            <div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 leading-tight">{title}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{hint}</p>
            </div>
        </div>
    );
}

export default function GuideBookingPage() {
    const [city, setCity] = useState<string>("agra");
    const [date, setDate] = useState<string>("");
    const [guests, setGuests] = useState<number>(2);
    const [language, setLanguage] = useState<string>("english");
    const [pkgId, setPkgId] = useState<number | null>(null);
    const [duration, setDuration] = useState<"halfDay" | "fullDay" | null>(null);
    const [monuments, setMonuments] = useState<string[]>([]);

    const cityData = guideServices[city];
    const pkg = useMemo(() => tourPackages.find((p) => p.id === pkgId), [pkgId]);
    const needsDuration = pkgId !== null && requiresDurationSelection(pkgId);
    const isFriday = date ? new Date(`${date}T00:00:00`).getDay() === 5 : false;
    const tajPicked = monuments.includes("Taj Mahal");

    const changeCity = (c: string) => { setCity(c); setMonuments([]); };
    const toggle = (m: string) => setMonuments((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));

    const price = (() => {
        if (!pkg) return "";
        if (pkg.id === 2) return duration === "halfDay" ? "$28.99" : duration === "fullDay" ? "$38.99" : pkg.price;
        if (pkg.id === 3) return duration === "halfDay" ? "$55.99" : duration === "fullDay" ? "$111.99" : pkg.price;
        return pkg.price;
    })();

    const missing: string[] = [];
    if (!date) missing.push("date");
    if (!pkg) missing.push("service level");
    if (needsDuration && !duration) missing.push("half or full day");
    if (monuments.length === 0) missing.push("at least one monument");
    const ready = missing.length === 0;

    const send = () => {
        if (!ready || !pkg) return;
        const langLabel = LANGS.find((l) => l.value === language)?.label || "English";
        const msg = [
            "Hi Guide India Tours! I'd like to book a guide.",
            `City: ${cityData.city}`,
            `Date: ${prettyDate(date)}`,
            `Guests: ${guests}`,
            `Language: ${langLabel}`,
            `Service: ${pkg.name}${duration ? ` (${duration === "halfDay" ? "half day" : "full day"})` : ""}`,
            `Monuments: ${monuments.join(", ")}`,
            "Please confirm availability and the final price.",
        ].join("\n");
        window.open(`https://wa.me/918979810991?text=${encodeURIComponent(msg)}`, "_blank");
    };

    const card = "bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8";
    const chip = (on: boolean) => cn(
        "px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors text-left",
        on ? "border-maroon-600 bg-maroon-600 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-maroon-600/50"
    );

    return (
        <main className="min-h-screen bg-ivory-100">
            {/* Hero */}
            <section className="relative pt-28 md:pt-36 pb-10 md:pb-14 overflow-hidden">
                <div className="absolute inset-0">
                    <OptimizedImage src={cityData.image} alt={`${cityData.city} monuments`} className="w-full h-full object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
                </div>
                <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                    <p className="text-gold-500 text-xs font-bold uppercase tracking-[0.25em] mb-3">Licensed tour guides · Agra · Delhi · Jaipur</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight max-w-2xl">
                        Book a government-licensed guide in {cityData.city}
                    </h1>
                    <p className="text-white/80 mt-4 max-w-xl text-base md:text-lg">
                        Pick your date, language and monuments. We confirm availability and the final price on WhatsApp — no payment on this page.
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm text-white/85">
                        <span className="flex items-center gap-2"><Star className="w-4 h-4 text-gold-500 fill-current" /> 4.9/5 on Google</span>
                        <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-gold-500" /> Ministry of Tourism licensed</span>
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold-500" /> Reply within 2 hours</span>
                    </div>
                </div>
            </section>

            {/* Included strip */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-6xl py-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-maroon-600">Every booking includes</span>
                    {freeInclusions.map((item, i) => (
                        <span key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="text-maroon-600 [&_svg]:w-4 [&_svg]:h-4">{item.icon}</span>
                            {item.title}
                            <span className="text-gray-400 hidden sm:inline">· {item.desc}</span>
                        </span>
                    ))}
                </div>
            </div>

            <section className="py-8 md:py-14">
                <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    <div className="lg:col-span-8 space-y-5">

                        {/* 1 City + date + guests */}
                        <div className={card}>
                            <StepHeader n={1} title="Where and when" hint="Choose the city, your date and how many of you are travelling" done={!!date} />
                            <div className="flex flex-wrap gap-2 mb-5">
                                {Object.keys(guideServices).map((c) => (
                                    <button key={c} type="button" onClick={() => changeCity(c)} className={chip(city === c)}>
                                        {guideServices[c].city}
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className="block">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Tour date</span>
                                    <div className="relative mt-1.5">
                                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon-600 pointer-events-none" />
                                        <input type="date" value={date} min={todayIso()} onChange={(e) => setDate(e.target.value)}
                                            className="w-full pl-11 pr-3 py-3 bg-white border border-gray-200 rounded-xl focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/15 outline-none text-base" />
                                    </div>
                                </label>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Guests</span>
                                    <div className="mt-1.5 flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                                        <button type="button" aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="w-12 h-12 text-xl text-gray-600 hover:bg-gray-50">−</button>
                                        <span className="flex-1 text-center font-semibold tabular-nums">{guests} {guests === 1 ? "guest" : "guests"}</span>
                                        <button type="button" aria-label="More guests" onClick={() => setGuests((g) => Math.min(20, g + 1))} className="w-12 h-12 text-xl text-gray-600 hover:bg-gray-50">+</button>
                                    </div>
                                </div>
                            </div>
                            {isFriday && city === "agra" && (
                                <div className="mt-4 flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900">
                                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                    <p><b>The Taj Mahal is closed on Fridays.</b> Agra Fort, Itimad-ud-Daulah, Mehtab Bagh and Fatehpur Sikri are good alternatives{tajPicked ? " — please remove the Taj Mahal or pick another date" : ""}.</p>
                                </div>
                            )}
                        </div>

                        {/* 2 Language */}
                        <div className={card}>
                            <StepHeader n={2} title="Guide language" hint="Licensed guides in several languages; some are arranged on request" done={true} />
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {LANGS.map((l) => (
                                    <button key={l.value} type="button" onClick={() => setLanguage(l.value)} className={chip(language === l.value)}>{l.label}</button>
                                ))}
                            </div>
                        </div>

                        {/* 3 Service level */}
                        <div className={card}>
                            <StepHeader n={3} title="Service level" hint="Prices are starting rates; we confirm the final price before you book" done={!!pkg && (!needsDuration || !!duration)} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {tourPackages.map((p) => {
                                    const on = pkgId === p.id;
                                    return (
                                        <button key={p.id} type="button"
                                            onClick={() => { setPkgId(on ? null : p.id); setDuration(null); }}
                                            className={cn("relative text-left rounded-xl border p-5 transition-colors",
                                                on ? "border-maroon-600 ring-2 ring-maroon-600/20 bg-maroon-600/[0.03]" : "border-gray-200 bg-white hover:border-maroon-600/50")}>
                                            {p.popular && <span className="absolute -top-2.5 left-5 bg-maroon-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Most popular</span>}
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <div className="font-bold text-gray-900 text-lg">{p.name}</div>
                                                    <div className="text-xs text-gray-500">{p.subtitle}</div>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <div className="text-[10px] uppercase tracking-wider text-gray-400">From</div>
                                                    <div className="text-lg font-bold text-maroon-600 whitespace-nowrap">{p.price.split(" – ")[0]}</div>
                                                </div>
                                            </div>
                                            <ul className="mt-3 space-y-1.5">
                                                {p.features.slice(0, 4).map((f, i) => (
                                                    <li key={i} className="flex gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />{f}</li>
                                                ))}
                                            </ul>
                                        </button>
                                    );
                                })}
                            </div>
                            {needsDuration && (
                                <div className="mt-4 flex gap-2 p-1 bg-gray-100 rounded-xl max-w-sm">
                                    {(["halfDay", "fullDay"] as const).map((d) => (
                                        <button key={d} type="button" onClick={() => setDuration(d)}
                                            className={cn("flex-1 py-2.5 rounded-lg text-sm font-semibold", duration === d ? "bg-white text-maroon-600 shadow" : "text-gray-500")}>
                                            {d === "halfDay" ? "Half day" : "Full day"}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 4 Monuments */}
                        <div className={card}>
                            <StepHeader n={4} title={`Monuments in ${cityData.city}`} hint="Tap everything you would like to see" done={monuments.length > 0} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {cityData.monuments.map((m: string) => {
                                    const on = monuments.includes(m);
                                    return (
                                        <button key={m} type="button" onClick={() => toggle(m)} className={cn(chip(on), "flex items-center justify-between gap-2")}>
                                            <span>{m}</span>
                                            {on ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <Plus className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <aside className="lg:col-span-4">
                        <div className="lg:sticky lg:top-28 space-y-4">
                            <div className={card}>
                                <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Your request</h3>
                                <dl className="space-y-3 text-sm">
                                    {[
                                        ["City", cityData.city],
                                        ["Date", date ? prettyDate(date) : "—"],
                                        ["Guests", String(guests)],
                                        ["Language", LANGS.find((l) => l.value === language)?.label],
                                        ["Service", pkg ? `${pkg.name}${duration ? ` · ${duration === "halfDay" ? "half day" : "full day"}` : ""}` : "—"],
                                        ["Monuments", monuments.length ? monuments.join(", ") : "—"],
                                    ].map(([k, v]) => (
                                        <div key={k} className="flex justify-between gap-4 border-b border-gray-100 pb-2.5">
                                            <dt className="text-gray-500">{k}</dt>
                                            <dd className="font-semibold text-gray-900 text-right">{v}</dd>
                                        </div>
                                    ))}
                                </dl>
                                {pkg && (
                                    <div className="mt-4 flex items-baseline justify-between">
                                        <span className="text-sm text-gray-500">Starting price</span>
                                        <span className="text-2xl font-bold text-maroon-600">{price}</span>
                                    </div>
                                )}
                                <Button onClick={send} disabled={!ready} className="w-full mt-5 h-12 rounded-xl bg-maroon-600 hover:bg-maroon-700 text-white font-semibold text-base">
                                    Send request on WhatsApp <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                {!ready && <p className="mt-2 text-xs text-gray-500 text-center">Still needed: {missing.join(", ")}</p>}
                                <p className="mt-3 text-xs text-gray-500 text-center leading-relaxed">No payment now. We confirm availability and the final price within 2 hours; your booking is confirmed only after you approve.</p>
                            </div>
                            <a href="https://wa.me/918979810991" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-5 hover:border-green-500/50">
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">Questions first?</p>
                                    <p className="text-xs text-gray-500">Chat with us on WhatsApp</p>
                                </div>
                                <Phone className="w-5 h-5 text-green-600" />
                            </a>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Trust */}
            <section className="py-14 md:py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Shield className="w-6 h-6" />, t: "Verified credentials", d: "Every guide holds a government licence from the Ministry of Tourism." },
                        { icon: <Languages className="w-6 h-6" />, t: "Your language", d: "English, French, German, Spanish, Italian and Russian guides; other languages arranged on request." },
                        { icon: <Award className="w-6 h-6" />, t: "Since 2004", d: "Rated 4.9/5 on Google by travellers from around the world." },
                    ].map((x) => (
                        <div key={x.t} className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-maroon-600/10 text-maroon-600 flex items-center justify-center flex-shrink-0">{x.icon}</div>
                            <div>
                                <h3 className="font-bold text-gray-900">{x.t}</h3>
                                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{x.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <RelatedPages
                title="Explore More"
                pages={[
                    { href: "/plans", title: "View Tour Packages", description: "Curated tours from single-monument guides to multi-city journeys." },
                    { href: "/services", title: "Our Services", description: "Transport, stays and custom itineraries." },
                    { href: "/reviews", title: "Guest Reviews", description: "What travellers say about our guides." },
                ]}
            />
        </main>
    );
}
