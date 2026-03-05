"use client";

import Hero from "@/components/home/HeroFallback";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { allPlans } from "@/data/travelPlans";
import { Star, Clock, Users, MapPin, MessageCircle, Search, X, ChevronDown, ShieldCheck, Minus, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const HomeClient = () => {
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [adults, setAdults] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);
    const [infants, setInfants] = useState<number>(0);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
    const [isPeopleDropdownOpen, setIsPeopleDropdownOpen] = useState<boolean>(false);
    const peopleDropdownRef = useRef<HTMLDivElement>(null);

    const totalTravelers = adults + children + infants;

    // Close people dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (peopleDropdownRef.current && !peopleDropdownRef.current.contains(e.target as Node)) {
                setIsPeopleDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Available cities from plans (excluding "all" and "Golden Triangle" for multi-select)
    const availableCities = [
        { value: "Delhi", label: "Delhi" },
        { value: "Agra", label: "Agra" },
        { value: "Jaipur", label: "Jaipur" },
        { value: "Bikaner", label: "Bikaner" },
        { value: "Jodhpur", label: "Jodhpur" },
        { value: "Udaipur", label: "Udaipur" },
        { value: "Jaisalmer", label: "Jaisalmer" },
        { value: "Ranthambore", label: "Ranthambore" },
        { value: "Pushkar", label: "Pushkar" },
        { value: "Ajmer", label: "Ajmer" },
        { value: "Chittorgarh", label: "Chittorgarh" },
        { value: "Mount Abu", label: "Mount Abu" },
        { value: "Mandawa", label: "Mandawa" },
    ];

    // Handle city selection/deselection
    const handleCityToggle = (cityValue: string) => {
        setSelectedCities(prev => {
            if (prev.includes(cityValue)) {
                return prev.filter(c => c !== cityValue);
            } else {
                return [...prev, cityValue];
            }
        });
        setShowResults(false);
    };

    // Remove a selected city
    const removeCity = (cityValue: string) => {
        setSelectedCities(prev => prev.filter(c => c !== cityValue));
        setShowResults(false);
    };

    // Clear all selected cities
    const clearAllCities = () => {
        setSelectedCities([]);
        setShowResults(false);
    };

    // Filter plans based on selected cities
    const getFilteredPlans = () => {
        if (selectedCities.length === 0) {
            // Return top 6 plans sorted by rating and popularity
            return allPlans
                .sort((a, b) => {
                    if (a.popular && !b.popular) return -1;
                    if (!a.popular && b.popular) return 1;
                    return b.rating - a.rating;
                })
                .slice(0, 6);
        }

        // Check if all three Golden Triangle cities are selected
        const hasDelhi = selectedCities.includes("Delhi");
        const hasAgra = selectedCities.includes("Agra");
        const hasJaipur = selectedCities.includes("Jaipur");
        const isGoldenTriangle = hasDelhi && hasAgra && hasJaipur && selectedCities.length === 3;

        if (isGoldenTriangle) {
            // Filter for Golden Triangle plans (all three cities)
            return allPlans
                .filter(plan => {
                    const title = plan.title.toLowerCase();
                    const destinations = plan.destinations || [];
                    const planHasDelhi = destinations.includes("Delhi") || title.includes("delhi");
                    const planHasAgra = destinations.includes("Agra") || title.includes("agra");
                    const planHasJaipur = destinations.includes("Jaipur") || title.includes("jaipur");

                    return (planHasDelhi && planHasAgra && planHasJaipur) || title.includes("golden triangle");
                })
                .sort((a, b) => {
                    if (a.popular && !b.popular) return -1;
                    if (!a.popular && b.popular) return 1;
                    return b.rating - a.rating;
                })
                .slice(0, 6);
        }

        // Filter by selected cities (plans that include ANY of the selected cities)
        return allPlans
            .filter(plan => {
                const title = plan.title.toLowerCase();
                const destinations = plan.destinations || [];
                const description = plan.description.toLowerCase();

                // Check if plan matches any of the selected cities
                return selectedCities.some(city => {
                    const cityLower = city.toLowerCase();
                    return (
                        destinations.includes(city) ||
                        title.includes(cityLower) ||
                        description.includes(cityLower)
                    );
                });
            })
            .sort((a, b) => {
                if (a.popular && !b.popular) return -1;
                if (!a.popular && b.popular) return 1;
                return b.rating - a.rating;
            })
            .slice(0, 6);
    };

    const filteredPlans = getFilteredPlans();

    return (
        <main>
            <Hero />

            {/* Main H1 Heading for SEO */}
            <section className="py-16 bg-gradient-to-br from-royal-50 to-amber-50">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-royal-800 mb-6">
                        Premium Golden Triangle Tours in India
                    </h1>
                    <p className="text-xl text-royal-700 max-w-4xl mx-auto leading-relaxed mb-8">
                        Discover <Link href="/plans" className="text-royal-600 hover:text-royal-800 font-semibold underline">Delhi, Agra, and Jaipur tours</Link> with our expert guides. Experience luxury accommodations,
                        private transportation, and 24/7 support for your perfect India tour.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-royal-800 hover:bg-royal-900 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            asChild
                        >
                            <Link href="/plans">View All Tour Packages</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-maroon-600 text-maroon-600 hover:bg-maroon-600 hover:text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            asChild
                        >
                            <Link href="/guide-booking">Book a Guide</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Plan Search Section */}
            <section className="py-16 bg-gradient-to-br from-white via-royal-50/30 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-royal-800 mb-3">
                                Find Your Perfect Tour
                            </h2>
                            <p className="text-lg text-royal-700/80">
                                Select your destination and group size to discover the best tour options
                            </p>
                        </div>

                        {/* Search Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-8 border border-gray-200">
                            <div className="space-y-4">
                                {/* City Multi-Select - Full Width */}
                                <div className="space-y-2">
                                    <label htmlFor="city-select" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-royal-600" />
                                        Select Cities (Multiple)
                                    </label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => { setIsCityDropdownOpen(!isCityDropdownOpen); setIsPeopleDropdownOpen(false); }}
                                            className="w-full h-12 px-3 py-2 text-left text-sm sm:text-base bg-background border border-input rounded-md flex items-center justify-between hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        >
                                            <span className="text-muted-foreground truncate pr-2">
                                                {selectedCities.length === 0
                                                    ? "Choose one or more destinations"
                                                    : `${selectedCities.length} city${selectedCities.length > 1 ? 'ies' : ''} selected`}
                                            </span>
                                            <ChevronDown className={`h-4 w-4 opacity-50 transition-transform flex-shrink-0 ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isCityDropdownOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setIsCityDropdownOpen(false)}
                                                />
                                                <div className="absolute z-50 w-full mt-1 bg-white border border-input rounded-md shadow-lg max-h-[60vh] sm:max-h-60 overflow-auto">
                                                    <div className="p-2">
                                                        {availableCities.map((city) => (
                                                            <div
                                                                key={city.value}
                                                                className="flex items-center space-x-2 p-2 sm:p-2.5 rounded hover:bg-accent cursor-pointer"
                                                                onClick={() => handleCityToggle(city.value)}
                                                            >
                                                                <Checkbox
                                                                    checked={selectedCities.includes(city.value)}
                                                                    onCheckedChange={() => handleCityToggle(city.value)}
                                                                    className="flex-shrink-0"
                                                                />
                                                                <label className="text-sm font-medium cursor-pointer flex-1">
                                                                    {city.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Selected Cities Tags */}
                                    {selectedCities.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {selectedCities.map((cityValue) => {
                                                const city = availableCities.find(c => c.value === cityValue);
                                                return (
                                                    <div
                                                        key={cityValue}
                                                        className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-royal-100 text-royal-800 rounded-full text-xs sm:text-sm font-medium"
                                                    >
                                                        <span className="truncate max-w-[120px] sm:max-w-none">{city?.label || cityValue}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCity(cityValue)}
                                                            className="hover:bg-royal-200 rounded-full p-0.5 transition-colors flex-shrink-0"
                                                            aria-label={`Remove ${city?.label || cityValue}`}
                                                        >
                                                            <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                            <button
                                                type="button"
                                                onClick={clearAllCities}
                                                className="text-xs sm:text-sm text-royal-600 hover:text-royal-800 font-medium underline whitespace-nowrap"
                                            >
                                                Clear all
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Travelers and Search Button - Side by Side on md+ */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Travelers Selector */}
                                    <div className="space-y-2 relative" ref={peopleDropdownRef}>
                                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                            <Users className="w-4 h-4 text-royal-600" />
                                            Travelers
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => { setIsPeopleDropdownOpen(!isPeopleDropdownOpen); setIsCityDropdownOpen(false); }}
                                            className="w-full h-12 px-4 flex items-center justify-between border border-gray-200 rounded-lg bg-white text-sm sm:text-base text-gray-700 hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-600/20"
                                        >
                                            <span>
                                                {totalTravelers} {totalTravelers === 1 ? 'Traveler' : 'Travelers'}
                                            </span>
                                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isPeopleDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isPeopleDropdownOpen && (
                                            <div className="absolute z-30 top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-4 space-y-3">
                                                {/* Adults */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">Adults</p>
                                                        <p className="text-xs text-gray-500">15-99 years</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setAdults(Math.max(1, adults - 1))}
                                                            disabled={adults <= 1}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="w-6 text-center text-sm font-semibold text-gray-800">{adults}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setAdults(Math.min(20, adults + 1))}
                                                            disabled={adults >= 20}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Children */}
                                                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">Children</p>
                                                        <p className="text-xs text-gray-500">6-14 years</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setChildren(Math.max(0, children - 1))}
                                                            disabled={children <= 0}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="w-6 text-center text-sm font-semibold text-gray-800">{children}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setChildren(Math.min(10, children + 1))}
                                                            disabled={children >= 10}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Infants */}
                                                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">Infants</p>
                                                        <p className="text-xs text-gray-500">0-5 years</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setInfants(Math.max(0, infants - 1))}
                                                            disabled={infants <= 0}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="w-6 text-center text-sm font-semibold text-gray-800">{infants}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setInfants(Math.min(5, infants + 1))}
                                                            disabled={infants >= 5}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Search Button */}
                                    <div className="flex items-end">
                                        <Button
                                            onClick={() => {
                                                if (selectedCities.length > 0) {
                                                    setShowResults(true);
                                                    setIsCityDropdownOpen(false);
                                                    setIsPeopleDropdownOpen(false);
                                                    setTimeout(() => {
                                                        const resultsSection = document.getElementById("search-results");
                                                        if (resultsSection) {
                                                            resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
                                                        }
                                                    }, 100);
                                                }
                                            }}
                                            className="w-full h-12 bg-royal-800 hover:bg-royal-900 text-white font-semibold text-sm sm:text-base"
                                            disabled={selectedCities.length === 0}
                                        >
                                            <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                            Search Plans
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Results */}
                        {showResults && selectedCities.length > 0 && (
                            <div id="search-results" className="mt-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-2xl font-display font-semibold text-royal-800 mb-6">
                                        {`Best Plans for ${selectedCities.length === 1
                                            ? (availableCities.find(c => c.value === selectedCities[0])?.label || selectedCities[0])
                                            : selectedCities.map(c => availableCities.find(ac => ac.value === c)?.label || c).join(', ')} (${[
                                            adults > 0 ? `${adults} ${adults === 1 ? 'Adult' : 'Adults'}` : '',
                                            children > 0 ? `${children} ${children === 1 ? 'Child' : 'Children'}` : '',
                                            infants > 0 ? `${infants} ${infants === 1 ? 'Infant' : 'Infants'}` : '',
                                        ].filter(Boolean).join(', ')})`}
                                    </h3>

                                    {filteredPlans.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {filteredPlans.map((plan, index) => (
                                                <motion.div
                                                    key={plan.id}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    viewport={{ once: true }}
                                                    className="group"
                                                >
                                                    <Link href={`/plans/${plan.id}`} className="block">
                                                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border border-gray-200">
                                                            <div className="relative h-48 overflow-hidden">
                                                                <OptimizedImage
                                                                    src={plan.image}
                                                                    alt={plan.title}
                                                                    className="w-full h-full object-cover-optimized transition-transform duration-700 group-hover:scale-110 image-no-blur"
                                                                    priority={false}
                                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                                <div className="absolute top-4 right-4">
                                                                    {plan.popular && (
                                                                        <span className="bg-maroon-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                                            Popular
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="absolute bottom-4 left-4 right-4">
                                                                    <h4 className="text-lg font-display font-semibold text-white mb-1 line-clamp-2">
                                                                        {plan.title}
                                                                    </h4>
                                                                    <div className="flex items-center gap-2 text-white/90 text-sm">
                                                                        <Clock size={14} />
                                                                        <span>{plan.duration}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="p-5">
                                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                                                                    {plan.description}
                                                                </p>

                                                                <div className="space-y-2 mb-4">
                                                                    {plan.highlights.slice(0, 2).map((highlight, idx) => (
                                                                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                                            <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full flex-shrink-0" />
                                                                            <span className="line-clamp-1">{highlight}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                <div className="flex items-center justify-between mb-4">
                                                                    <div className="flex items-center gap-1">
                                                                        <Star size={16} className="text-amber-500" fill="currentColor" />
                                                                        <span className="text-sm font-medium text-gray-900">{plan.rating}</span>
                                                                        <span className="text-sm text-gray-500">({plan.reviews})</span>
                                                                    </div>
                                                                    <span className="text-lg font-bold text-maroon-600">{plan.price}</span>
                                                                </div>

                                                                <Button
                                                                    className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-medium py-2.5"
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-200">
                                            <p className="text-gray-600 mb-4">
                                                No plans found for the selected criteria. Please try a different city or contact us for a custom itinerary.
                                            </p>
                                            <Button
                                                onClick={() => window.open('https://wa.me/918979810991?text=Hi, I would like to create a custom itinerary. Please help me plan my perfect trip!', '_blank')}
                                                className="bg-royal-800 hover:bg-royal-900 text-white"
                                            >
                                                <MessageCircle className="mr-2" size={18} />
                                                Request Custom Itinerary
                                            </Button>
                                        </div>
                                    )}

                                    {filteredPlans.length > 0 && (
                                        <div className="text-center mt-8">
                                            <Button
                                                size="lg"
                                                className="bg-royal-800 hover:bg-royal-900 text-white px-8 py-3"
                                                asChild
                                            >
                                                <Link href="/plans">
                                                    View All Tour Packages
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Choose Your Perfect Tour Package Section */}
            <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                            Choose Your Perfect Tour Package
                        </h2>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Select from our flexible booking options. Customize your Golden Triangle experience with our expert guides and premium services.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {/* Guide Only */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group flex flex-col h-full"
                        >
                            <div className="bg-gradient-to-br from-gray-50 to-white p-8 text-center border-b border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Guide Only</h3>
                                <p className="text-sm text-gray-500 font-medium px-4">Professional certified guide for your personalized tour</p>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <ul className="space-y-4 mb-8 flex-grow">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Certified multi-language guide</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Historical & cultural insights</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Monument navigation assistance</span>
                                    </li>
                                </ul>
                                <Button className="w-full bg-maroon-600 hover:bg-maroon-700 text-white h-12 rounded-xl transition-all duration-300 font-semibold" asChild>
                                    <Link href="/guide-booking">Book Guide</Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Guide + Cab */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border-2 border-maroon-600/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group relative flex flex-col h-full"
                        >
                            <div className="absolute top-4 right-4 z-10">
                                <span className="bg-maroon-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">POPULAR</span>
                            </div>
                            <div className="bg-gradient-to-br from-maroon-600/5 to-white p-8 text-center border-b border-maroon-600/10">
                                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Guide + Cab</h3>
                                <p className="text-sm text-gray-500 font-medium px-4">Complete private sightseeing package</p>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <ul className="space-y-4 mb-8 flex-grow">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Everything in Guide Only</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Private luxury AC vehicle</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Fuel, parking & driver allowance</span>
                                    </li>
                                </ul>
                                <Button className="w-full bg-maroon-600 hover:bg-maroon-700 text-white h-12 rounded-xl transition-all duration-300 font-semibold" asChild>
                                    <Link href="/contact">Get Quote</Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* All Inclusive */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group flex flex-col h-full"
                        >
                            <div className="bg-gradient-to-br from-gray-50 to-white p-8 text-center border-b border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">All Inclusive</h3>
                                <p className="text-sm text-gray-500 font-medium px-4">Guide + Cab + Hotels + Monuments</p>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <ul className="space-y-4 mb-8 flex-grow">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Everything in Guide + Cab</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Luxury 4/5 star hotels</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">All monument tickets (Skip-line)</span>
                                    </li>
                                </ul>
                                <Button className="w-full bg-maroon-600 hover:bg-maroon-700 text-white h-12 rounded-xl transition-all duration-300 font-semibold" asChild>
                                    <Link href="/plans">Explore Plans</Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Custom Tour */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group flex flex-col h-full"
                        >
                            <div className="bg-gradient-to-br from-gray-50 to-white p-8 text-center border-b border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Custom Tour</h3>
                                <p className="text-sm text-gray-500 font-medium px-4">Bespoke itinerary designed just for you</p>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <ul className="space-y-4 mb-8 flex-grow">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Flexible itinerary planning</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Mix & match destinations</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Special requests catered</span>
                                    </li>
                                </ul>
                                <Button className="w-full bg-maroon-600 hover:bg-maroon-700 text-white h-12 rounded-xl transition-all duration-300 font-semibold" asChild>
                                    <Link href="/contact">Plan My Trip</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <FeaturedDestinations />
            <Services />

            {/* Why Choose Us Section */}
            <section className="py-20 bg-royal-800 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 leading-tight">
                                Why Choose Guide India Tours?
                            </h2>
                            <p className="text-lg text-white/80 mb-8 leading-relaxed">
                                We don't just show you India's monuments; we help you experience its soul. Our local expertise, attention to detail, and commitment to quality ensure your Golden Triangle tour is nothing short of extraordinary.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Users className="text-[#bf9b30]" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2 text-[#bf9b30]">Expert Local Guides</h3>
                                        <p className="text-white/70">Our government-approved guides are storytellers who bring history to life.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck className="text-[#bf9b30]" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2 text-[#bf9b30]">Safety & Comfort</h3>
                                        <p className="text-white/70">Background-verified drivers and premium vehicles for a safe, relaxed journey.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Star className="text-[#bf9b30]" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2 text-[#bf9b30]">Top-Rated Service</h3>
                                        <p className="text-white/70">Consistent 5-star reviews from travelers worldwide. We treat you like family.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                                <OptimizedImage
                                    src="/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg"
                                    alt="Tourists enjoying Jaipur"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-maroon-600/30 rounded-full blur-3xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            <Testimonials />

            {/* CTA Section */}
            <section className="py-24 bg-cover bg-center relative" style={{ backgroundImage: 'url("/images/agra/getty-images-ge82SKhuwCA-unsplash.jpg")' }}>
                <div className="absolute inset-0 bg-black/60" />
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-6">
                            Ready for Your Indian Adventure?
                        </h2>
                        <p className="text-xl text-white/90 mb-10 leading-relaxed font-light">
                            Let us help you plan the perfect Golden Triangle tour. Whether you need a guide, a car, or a complete package, we're here to serve you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button
                                size="lg"
                                className="bg-maroon-600 hover:bg-maroon-700 text-white px-10 py-6 text-xl rounded-xl border-none shadow-xl hover:shadow-2xl transition-all duration-300"
                                asChild
                            >
                                <Link href="/contact">Book Now</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white text-white hover:bg-white hover:text-maroon-600 px-10 py-6 text-xl rounded-xl bg-transparent"
                                asChild
                            >
                                <Link href="/plans">View All Plans</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default HomeClient;
