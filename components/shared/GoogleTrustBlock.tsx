import Link from "next/link";
import { Star, MapPin, Phone, ShieldCheck, ExternalLink, Clock } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

/**
 * Visible Google Business trust block — mirrors the NAP + rating published on
 * the Google Business Profile so visitors (and AI/search engines reading the
 * page) see consistent, verifiable business data. Values come from the single
 * source of truth in lib/siteConfig.ts.
 */
export default function GoogleTrustBlock() {
    const {
        rating,
        address,
        phoneDisplay,
        telHref,
        whatsappDisplay,
        whatsappHref,
        social,
        foundingDate,
    } = siteConfig;

    return (
        <section
            aria-labelledby="google-trust-heading"
            className="bg-white py-16 md:py-20 border-y border-gray-100"
        >
            <div className="container mx-auto px-4">
                <h2 id="google-trust-heading" className="sr-only">
                    Guide India Tours — verified Google reviews, licensing and contact details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Rating */}
                    <a
                        href={social.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center text-center bg-ivory-100 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center gap-1 text-gold-500 mb-2" aria-hidden="true">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <Star key={i} className="w-5 h-5 fill-current" />
                            ))}
                        </div>
                        <div className="text-4xl font-black text-gray-900">
                            {rating.value}
                            <span className="text-lg text-gray-400 font-bold">/5</span>
                        </div>
                        <p className="text-sm font-bold text-gray-600 mt-1">
                            on Google · {rating.count}+ reviews
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-maroon-600 text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                            Read reviews <ExternalLink className="w-3 h-3" />
                        </span>
                    </a>

                    {/* Licensing / authority */}
                    <div className="flex flex-col items-center text-center bg-ivory-100 rounded-3xl p-8 border border-gray-100">
                        <div className="w-12 h-12 rounded-2xl bg-maroon-600/10 flex items-center justify-center mb-3">
                            <ShieldCheck className="w-6 h-6 text-maroon-600" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                            Government-Licensed Guides
                        </div>
                        <p className="text-sm text-gray-500 font-light mt-1">
                            Ministry of Tourism approved · Agra specialists since {foundingDate}
                        </p>
                        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-gray-600">
                            <Clock className="w-3.5 h-3.5 text-maroon-600" /> Open 24 hours · 24/7 support
                        </p>
                    </div>

                    {/* Contact / NAP */}
                    <div className="flex flex-col bg-ivory-100 rounded-3xl p-8 border border-gray-100">
                        <div className="flex items-start gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-0.5" />
                            <address className="not-italic text-sm text-gray-600 leading-relaxed">
                                {address.street}, {address.locality} {address.postalCode}, {address.region}
                            </address>
                        </div>
                        <div className="flex flex-col gap-2 mt-auto">
                            <a
                                href={telHref}
                                className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-maroon-600 transition-colors"
                            >
                                <Phone className="w-4 h-4 text-maroon-600" />
                                <span>Call {phoneDisplay}</span>
                            </a>
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-[#1da851] transition-colors"
                            >
                                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                                <span>WhatsApp {whatsappDisplay}</span>
                            </a>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-400 mt-8">
                    <Link href="/reviews" className="hover:text-maroon-600 transition-colors font-semibold">
                        See all guest reviews
                    </Link>
                </p>
            </div>
        </section>
    );
}
