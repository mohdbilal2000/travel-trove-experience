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

export default function GuideBookingPage() {
    const [selectedCity, setSelectedCity] = useState<string>("agra");
    const [selectedMonuments, setSelectedMonuments] = useState<string[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("english");
    const [selectedDuration, setSelectedDuration] = useState<{ [packageId: number]: 'halfDay' | 'fullDay' | null }>({});

    const currentCityData = guideServices[selectedCity];

    const availableLanguages = [
        { value: "english", label: "English", flag: "🇬🇧" },
        { value: "french", label: "French", flag: "🇫🇷" },
        { value: "german", label: "German", flag: "🇩🇪" },
        { value: "spanish", label: "Spanish", flag: "🇪🇸" },
        { value: "japanese", label: "Japanese", flag: "🇯🇵" },
        { value: "russian", label: "Russian", flag: "🇷🇺" },
        { value: "italian", label: "Italian", flag: "🇮🇹" },
        { value: "hindi", label: "Hindi", flag: "🇮🇳" },
    ];

    // Derived states
    const isFriday = useMemo(() => selectedDate ? new Date(selectedDate).getDay() === 5 : false, [selectedDate]);
    const showFridayWarning = isFriday && selectedCity === 'agra';

    const progress = useMemo(() => {
        let p = 0;
        if (selectedDate) p += 25;
        if (selectedLanguage) p += 25;
        if (selectedPackage) p += 25;
        if (selectedMonuments.length > 0) p += 25;
        return Math.min(p, 100);
    }, [selectedDate, selectedLanguage, selectedPackage, selectedMonuments]);

    const toggleMonument = (monument: string) => {
        setSelectedMonuments(prev =>
            prev.includes(monument) ? prev.filter(m => m !== monument) : [...prev, monument]
        );
    };

    const currentPackageData = useMemo(() =>
        tourPackages.find(p => p.id === selectedPackage), [selectedPackage]
    );

    const getPriceDisplay = (pkg: any) => {
        const duration = selectedDuration[pkg.id];
        if (pkg.id === 2) {
            if (duration === 'halfDay') return '$28.99';
            if (duration === 'fullDay') return '$38.99';
            return '$28.99 - $38.99';
        }
        if (pkg.id === 3) {
            if (duration === 'halfDay') return '$55.99';
            if (duration === 'fullDay') return '$111.99';
            return '$55.99 - $111.99';
        }
        return pkg.price;
    };

    const handleBookNow = () => {
        const pkgName = currentPackageData?.name;
        const durationText = selectedDuration[selectedPackage!] ? ` (${selectedDuration[selectedPackage!]})` : '';
        const langLabel = availableLanguages.find(l => l.value === selectedLanguage)?.label || 'English';
        const message = `Hi GuideIndia Tours! I'd like to book a ${pkgName} tour in ${currentCityData.city}${durationText}.
Date: ${selectedDate}
Language: ${langLabel}
Monuments: ${selectedMonuments.join(', ')}
Please provide availability and pricing details.`;

        const whatsappUrl = `https://wa.me/918979810991?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <main className="min-h-screen bg-ivory-100">
            {/* Premium Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <OptimizedImage
                        src={currentCityData.image}
                        alt={selectedCity}
                        className="w-full h-full object-cover grayscale-[20%]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-maroon-600/90 to-black/40" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-6 px-4 py-1.5 uppercase tracking-widest text-xs">
                            Personalized Guiding Services
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                            Book India's Best <br /><span className="text-gold-500">Local Experts</span>
                        </h1>
                        <p className="text-xl text-white/80 mb-10 leading-relaxed font-light">
                            Explore {currentCityData.city} with government-authorized storytellers who bring history to life. Same-day bookings available.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {Object.keys(guideServices).map((city) => (
                                <button
                                    key={city}
                                    onClick={() => setSelectedCity(city)}
                                    className={cn(
                                        "px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2",
                                        selectedCity === city
                                            ? "bg-white text-maroon-600 border-white shadow-xl scale-105"
                                            : "bg-transparent text-white border-white/30 hover:bg-white/10"
                                    )}
                                >
                                    {guideServices[city].city}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Floating Inclusions */}
                <div className="absolute bottom-0 right-0 left-0 bg-white/5 backdrop-blur-xl border-t border-white/10">
                    <div className="container mx-auto px-4 py-4 md:py-6">
                        {/* Desktop layout */}
                        <div className="hidden md:flex justify-between items-center text-white/90">
                            <span className="text-sm font-bold uppercase tracking-widest opacity-60">All Bookings Include:</span>
                            <div className="flex gap-12">
                                {freeInclusions.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="text-gold-500">{item.icon}</div>
                                        <div>
                                            <div className="text-xs font-bold leading-none">{item.title}</div>
                                            <div className="text-xs opacity-60">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Mobile layout */}
                        <div className="grid grid-cols-2 gap-3 md:hidden text-white/90">
                            {freeInclusions.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs">
                                    <div className="text-gold-500">{item.icon}</div>
                                    <span className="font-bold">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Progress Sticky */}
            <div className="sticky top-16 md:top-[72px] z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-tighter text-maroon-600">Reservation Progress</span>
                        <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
                            <div className="h-1 bg-gray-100 flex-1 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-maroon-600"
                                />
                            </div>
                            <span className="text-xs font-bold text-gray-500">{Math.round(progress)}%</span>
                        </div>
                        <div className="flex items-center gap-2 group cursor-help">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span className="text-xs font-bold text-gray-500 uppercase">Secure Booking</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Left: Form Steps */}
                        <div className="lg:col-span-8 space-y-12 md:space-y-24">

                            {/* Step 1: Date */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="w-16 h-16 rounded-2xl bg-maroon-600 text-white flex items-center justify-center text-3xl font-display shadow-2xl shadow-maroon-600/30 transform -rotate-3">1</div>
                                    <div>
                                        <h2 className="text-4xl font-display font-bold text-gray-900">Select Date</h2>
                                        <p className="text-gray-500">Choose your preferred tour date</p>
                                    </div>
                                </div>

                                <div className="max-w-md">
                                    <div className="relative">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-maroon-600" />
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-100 rounded-2xl focus:border-maroon-600 outline-none text-lg font-medium shadow-sm transition-all focus:shadow-xl hover:border-gray-200"
                                        />
                                    </div>
                                    {showFridayWarning && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="mt-4 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl"
                                        >
                                            <div className="flex gap-4">
                                                <Info className="w-6 h-6 text-amber-500 shrink-0" />
                                                <div>
                                                    <p className="font-bold text-amber-900 text-sm">Friday Notice</p>
                                                    <p className="text-amber-700 text-xs leading-relaxed">The Taj Mahal is closed for prayers on Fridays. However, other monuments in Agra like the Fort and Fatehpur Sikri are open.</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Step 2: Language */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gold-500 text-white flex items-center justify-center text-3xl font-display shadow-2xl shadow-gold-500/30 transform rotate-3">2</div>
                                    <div>
                                        <h2 className="text-4xl font-display font-bold text-gray-900">Guide Language</h2>
                                        <p className="text-gray-500">Choose your preferred language for the guided tour</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {availableLanguages.map((lang) => (
                                        <button
                                            key={lang.value}
                                            onClick={() => setSelectedLanguage(lang.value)}
                                            className={cn(
                                                "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-left",
                                                selectedLanguage === lang.value
                                                    ? "border-maroon-600 bg-maroon-600 text-white shadow-lg scale-[1.02]"
                                                    : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-md"
                                            )}
                                        >
                                            <span className="text-2xl">{lang.flag}</span>
                                            <span className="text-sm font-bold">{lang.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Step 3: Package */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-3xl font-display shadow-2xl shadow-black/30 transform -rotate-3">3</div>
                                    <div>
                                        <h2 className="text-4xl font-display font-bold text-gray-900">Choose Package</h2>
                                        <p className="text-gray-500">Pick a service level that fits your needs</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {tourPackages.map((pkg) => (
                                        <div
                                            key={pkg.id}
                                            onClick={() => setSelectedPackage(prev => prev === pkg.id ? null : pkg.id)}
                                            className={cn(
                                                "group relative bg-white border-2 rounded-3xl p-8 transition-all duration-500 cursor-pointer overflow-hidden",
                                                selectedPackage === pkg.id
                                                    ? "border-maroon-600 shadow-2xl scale-[1.02]"
                                                    : "border-gray-100 hover:border-gray-300 hover:shadow-xl"
                                            )}
                                        >
                                            {pkg.popular && (
                                                <div className="absolute top-0 right-10 bg-maroon-600 text-white px-6 py-2 rounded-b-2xl font-black text-xs uppercase tracking-tighter shadow-lg">
                                                    Best Choice
                                                </div>
                                            )}

                                            <div className="flex justify-between items-start mb-8">
                                                <div className={cn(
                                                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                                                    selectedPackage === pkg.id ? "bg-maroon-600 text-white" : "bg-gray-50 text-gray-400 group-hover:bg-maroon-600/5 group-hover:text-maroon-600"
                                                )}>
                                                    {pkg.icon}
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-none mb-1">Starting At</div>
                                                    <div className="text-3xl font-black text-maroon-600">{pkg.price}</div>
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed mb-8">{pkg.description}</p>

                                            <div className="space-y-4 mb-8">
                                                {pkg.features.map((f, i) => (
                                                    <div key={i} className="flex items-start gap-4">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                                                            <Check className="w-3 h-3 text-green-600" />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-600">{f}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {requiresDurationSelection(pkg.id) && (
                                                <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setSelectedDuration(prev => ({ ...prev, [pkg.id]: 'halfDay' })); }}
                                                        className={cn(
                                                            "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
                                                            selectedDuration[pkg.id] === 'halfDay' ? "bg-white text-maroon-600 shadow-md" : "text-gray-400 hover:text-gray-600"
                                                        )}
                                                    >Half Day</button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setSelectedDuration(prev => ({ ...prev, [pkg.id]: 'fullDay' })); }}
                                                        className={cn(
                                                            "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
                                                            selectedDuration[pkg.id] === 'fullDay' ? "bg-white text-maroon-600 shadow-md" : "text-gray-400 hover:text-gray-600"
                                                        )}
                                                    >Full Day</button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Step 4: Monuments */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-16 h-16 rounded-2xl bg-maroon-600/80 text-white flex items-center justify-center text-3xl font-display shadow-2xl shadow-maroon-600/20 transform rotate-2">4</div>
                                    <div>
                                        <h2 className="text-4xl font-display font-bold text-gray-900">Select Monuments</h2>
                                        <p className="text-gray-500">Tell us where you want to go</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {currentCityData.monuments.map((m: string) => (
                                        <div
                                            key={m}
                                            onClick={() => toggleMonument(m)}
                                            className={cn(
                                                "group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer",
                                                selectedMonuments.includes(m)
                                                    ? "bg-maroon-600 border-maroon-600 text-white shadow-2xl scale-105"
                                                    : "bg-white border-gray-100 hover:border-maroon-600/30 hover:shadow-lg"
                                            )}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <MapPin className={cn(
                                                    "w-5 h-5",
                                                    selectedMonuments.includes(m) ? "text-white" : "text-gray-300 group-hover:text-maroon-600"
                                                )} />
                                                {selectedMonuments.includes(m) && <CheckCircle className="w-5 h-5" />}
                                            </div>
                                            <span className="text-sm font-black uppercase tracking-tight">{m}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                        </div>

                        {/* Right: Summary Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32">
                                <Card className="bg-white border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden">
                                    <div className="p-6 md:p-10">
                                        <h3 className="text-3xl font-display font-bold text-gray-900 mb-8 border-b border-gray-100 pb-6">Reservation Summary</h3>

                                        <div className="space-y-8 mb-10">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-black uppercase text-gray-500 tracking-widest">Base Destination</span>
                                                <span className="text-lg font-bold text-maroon-600">{currentCityData.city}</span>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-black uppercase text-gray-500 tracking-widest">Planned Date</span>
                                                <div className="flex items-center gap-3">
                                                    <span className={cn("text-lg font-bold", selectedDate ? "text-gray-900" : "text-gray-200")}>
                                                        {selectedDate || "Not Selected"}
                                                    </span>
                                                    {selectedDate && <CheckCircle className="w-5 h-5 text-green-500" />}
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-black uppercase text-gray-500 tracking-widest">Guide Language</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{availableLanguages.find(l => l.value === selectedLanguage)?.flag}</span>
                                                    <span className="text-lg font-bold text-gray-900">{availableLanguages.find(l => l.value === selectedLanguage)?.label}</span>
                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-black uppercase text-gray-500 tracking-widest">Service Level</span>
                                                <div className="flex items-center justify-between">
                                                    <span className={cn("text-lg font-bold", selectedPackage ? "text-gray-900" : "text-gray-200")}>
                                                        {currentPackageData?.name || "Not Selected"}
                                                        <span className="text-xs font-light block opacity-60">
                                                            {selectedDuration[selectedPackage!] ? `(${selectedDuration[selectedPackage!]})` : ""}
                                                        </span>
                                                    </span>
                                                    <span className="text-maroon-600 font-black">
                                                        {selectedPackage ? getPriceDisplay(currentPackageData) : ""}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-black uppercase text-gray-500 tracking-widest">Monuments ({selectedMonuments.length})</span>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {selectedMonuments.map(m => (
                                                        <Badge key={m} className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-none px-3 py-1 font-bold text-[9px] uppercase">
                                                            {m}
                                                        </Badge>
                                                    ))}
                                                    {selectedMonuments.length === 0 && <span className="text-gray-200 text-lg font-bold">None Selected</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleBookNow}
                                            disabled={!selectedDate || !selectedPackage || selectedMonuments.length === 0}
                                            className="w-full py-10 rounded-2xl bg-maroon-600 hover:bg-black text-white text-xl font-display font-bold shadow-2xl transition-all duration-500 group overflow-hidden relative"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                Proceed with Request
                                                <ChevronRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        </Button>

                                        <div className="mt-8 flex flex-col items-center gap-4 text-center">
                                            <div className="flex -space-x-4 mb-2">
                                                {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-gray-200" />)}
                                                <div className="w-10 h-10 rounded-full border-4 border-white bg-gold-500 flex items-center justify-center text-xs font-bold text-white">+500</div>
                                            </div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Rest easy. 15,000+ Travelers Guided Since 2012.</p>
                                        </div>
                                    </div>
                                </Card>

                                {/* Support Sticky */}
                                <div className="mt-8 p-8 bg-[#F5F1EE] rounded-3xl flex items-center justify-between border border-white">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Need immediate help?</h4>
                                        <p className="text-xs text-gray-500">Live support via WhatsApp</p>
                                    </div>
                                    <a href="https://wa.me/918979810991" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#25D366] shadow-sm hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6 fill-current" />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Safety & Trust */}
            <section className="py-32 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">Expertise You Can Trust</h2>
                        <p className="text-lg text-gray-500">We prioritize your experience through rigorous guide selection and continuous service improvement.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-maroon-600">
                                <Shield className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Verified Credentials</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Every single guide is government-authorized with a verified heritage license from the Ministry of Tourism.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-maroon-600">
                                <Languages className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Multilingual Fluency</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Beyond English, we provide specialists in French, German, Spanish, Japanese, and Russian for a native experience.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-maroon-600">
                                <Star className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">5-Star Standards</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Consistently recognized on Google and TripAdvisor for our commitment to historical accuracy and hospitality.</p>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedPages
                title="Explore More"
                pages={[
                    {
                        href: "/plans",
                        title: "View Tour Packages",
                        description: "Discover our range of curated tour packages from basic guides to luxury multi-city experiences.",
                    },
                    {
                        href: "/services",
                        title: "Our Services",
                        description: "Learn about our full suite of travel services including transport, stays, and custom itineraries.",
                    },
                    {
                        href: "/reviews",
                        title: "Guest Reviews",
                        description: "See what thousands of travelers say about their experience with our expert guides.",
                    },
                ]}
            />
        </main>
    );
}
