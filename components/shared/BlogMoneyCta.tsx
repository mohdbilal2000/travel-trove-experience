import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Target = { href: string; label: string; blurb: string };

/** Pick the one money page a blog post should hand its reader to, by topic. */
export function moneyPageFor(slug: string, title: string): Target {
    const s = `${slug} ${title}`.toLowerCase();
    if (/delhi.*agra|same.day|distance|yamuna/.test(s))
        return { href: "/plans/2001", label: "Same Day Agra Tour from Delhi", blurb: "Private car, licensed guide and Taj Mahal tickets, door to door from your Delhi hotel." };
    if (/taj|agra/.test(s))
        return { href: "/agra-tours", label: "Private Agra & Taj Mahal tours", blurb: "Sunrise Taj Mahal visits with a government-licensed Agra guide, from $149 per adult." };
    if (/jaipur|pink city/.test(s))
        return { href: "/jaipur-tours", label: "Private Jaipur tours", blurb: "Amber Fort, City Palace and Hawa Mahal with a licensed guide and your own car." };
    if (/delhi/.test(s))
        return { href: "/delhi-tours", label: "Private Delhi tours", blurb: "Old and New Delhi in a day with a licensed guide and private AC car." };
    if (/golden|days|budget|pack|safe|visa|tipping|cash|etiquette|photograph|monument/.test(s))
        return { href: "/golden-triangle-tours", label: "Private Golden Triangle tours", blurb: "Delhi, Agra and Jaipur in 4 to 10 days with licensed guides, private car and hotel pickup." };
    return { href: "/plans", label: "All private tour packages", blurb: "Same-day Agra trips to 15-day Rajasthan journeys, each with a licensed guide." };
}

export default function BlogMoneyCta({ slug, title }: { slug: string; title: string }) {
    const t = moneyPageFor(slug, title);
    return (
        <aside className="my-10 rounded-3xl border border-gold-500/40 bg-ivory-100 p-6 md:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-2">Plan this trip with us</p>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                <Link href={t.href} className="hover:text-maroon-600 transition-colors">{t.label}</Link>
            </h3>
            <p className="text-gray-600 font-light text-sm leading-relaxed mb-4">{t.blurb}</p>
            <Link href={t.href} className="inline-flex items-center gap-2 text-sm font-bold text-maroon-600 hover:text-black">
                See itinerary and price <ArrowRight className="w-4 h-4" />
            </Link>
        </aside>
    );
}
