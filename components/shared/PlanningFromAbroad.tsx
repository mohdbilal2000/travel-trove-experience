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
        { icon: CreditCard, t: "Prices in your currency", d: "Package prices are shown in US dollars. We quote and accept payment in USD, EUR, GBP and AUD by bank transfer, with no surprise charges on arrival." },
        { icon: Clock, t: "Replies in your time zone", d: "Send your dates on WhatsApp or email and you will have a written quote within 2 hours, whether you are in New York, London, Sydney or Berlin." },
        { icon: Plane, t: "Airport to monument, door to door", d: "Pickup at Delhi airport is included on every multi-day tour. Most guests from the US and Europe land in Delhi overnight and start the next morning." },
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
                        Most of our guests book from abroad three to eight weeks before they fly. Here is what that looks like in practice.
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
                <p className="text-center text-sm text-gray-500 mt-8">
                    Ready to plan? <Link href="/contact" className="font-bold text-maroon-600 underline underline-offset-2">Get a custom quote</Link> or{" "}
                    <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-bold text-maroon-600 underline underline-offset-2">message us on WhatsApp</a>.
                </p>
            </div>
        </section>
    );
}
