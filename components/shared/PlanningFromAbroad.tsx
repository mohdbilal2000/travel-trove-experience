import Link from "next/link";
import { Globe, Clock, CreditCard, Plane } from "lucide-react";
import { siteConfig, ratingCountDisplay } from "@/lib/siteConfig";

/**
 * "Travelling from the US, UK, Australia or Europe" block for the money pages.
 * Written for international buyers (the bulk of non-brand impressions) rather
 * than domestic searchers, and keeps the currency and time-zone answers on-page.
 */
export default function PlanningFromAbroad({ destination = "the Golden Triangle" }: { destination?: string }) {
    const items = [
        { icon: CreditCard, t: "Quotes in your currency", d: "Prices on this site are shown in US dollars. we issue your written quote in your own currency, and you can pay by bank transfer. Straightforward pricing with no hidden charges." },
        { icon: Clock, t: "Replies in your time zone", d: "Send your dates on WhatsApp or email and we aim to reply with a written quote within 2 hours, wherever you are writing from." },
        { icon: Plane, t: "Day one built around your flight", d: "Tell us when you land and we plan your first day around it. Airport transfers are listed in each package's inclusions, or we can add one to your quote." },
        { icon: Globe, t: "Guides in your language", d: `Government-licensed guides in ${siteConfig.languages.slice(0, 6).join(", ")} and more, rated ${siteConfig.rating.value}/5 by ${ratingCountDisplay} travellers on Google.` },
    ];
    return (
        <section className="py-20 bg-white border-t border-gray-100" aria-labelledby="abroad-heading">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 id="abroad-heading" className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                        Travelling to {destination} from the US, UK, Australia or Europe?
                    </h2>
                    <p className="text-gray-500 font-light max-w-2xl mx-auto">
                        Here is what planning a private tour from overseas looks like.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((x) => (
                        <div key={x.t} className="flex gap-4 bg-ivory-100 rounded-2xl p-6 border border-gray-100">
                            <div className="w-11 h-11 rounded-xl bg-maroon-600/10 text-maroon-600 flex items-center justify-center flex-shrink-0"><x.icon className="w-5 h-5" /></div>
                            <div>
                                <h3 className="font-bold text-gray-900">{x.t}</h3>
                                <p className="text-sm text-gray-600 font-light leading-relaxed mt-1">{x.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-8">Prices and practical information last reviewed {new Date(siteConfig.contentUpdated).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}.</p>
                <p className="text-center text-sm text-gray-500 mt-3">
                    Ready to plan? <Link href="/contact" className="font-bold text-maroon-600 underline underline-offset-2">Get a custom quote</Link> or{" "}
                    <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-bold text-maroon-600 underline underline-offset-2">message us on WhatsApp</a>.
                </p>
            </div>
        </section>
    );
}
