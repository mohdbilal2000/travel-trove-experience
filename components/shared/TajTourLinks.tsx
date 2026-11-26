import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allPlans } from "@/data/travelPlans";
import { fromPrice } from "@/lib/planPrice";

const priceOf = (id: number) => {
    const p = allPlans.find((x) => x.id === id);
    return p ? fromPrice(p.price) : null;
};

/**
 * Descriptive internal links from the Taj Mahal guides to the tour pages that
 * actually include the Taj Mahal. `exclude` drops the page the visitor is
 * already being sent to by the main call to action.
 */
export default function TajTourLinks({ exclude }: { exclude?: string }) {
    const items = [
        { href: "/same-day-agra-tour-from-delhi", label: "Same Day Agra Tour from Delhi", note: priceOf(2001) ?? "Private car, guide and entrance fees" },
        { href: "/taj-mahal-sunrise-tour", label: "Taj Mahal Sunrise Tour", note: priceOf(2000) ?? "Pickup from anywhere in Delhi NCR" },
        { href: "/golden-triangle-tours", label: "Golden Triangle tours", note: "Delhi, Agra and Jaipur" },
        { href: "/last-minute-golden-triangle-tour", label: "Last minute Golden Triangle", note: "Book one or two days ahead, as per availability" },
    ].filter((i) => i.href !== exclude);

    return (
        <section className="py-12 bg-ivory-100 border-t border-gray-100" aria-labelledby="taj-tours-heading">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 id="taj-tours-heading" className="text-xs font-black uppercase tracking-[0.3em] text-maroon-600 mb-6">Private tours that include the Taj Mahal</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {items.map((i) => (
                        <li key={i.href}>
                            <Link href={i.href} className="group flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 hover:border-maroon-600 transition-colors">
                                <span className="font-bold text-gray-900 group-hover:text-maroon-600 transition-colors">{i.label}</span>
                                <span className="mt-2 flex items-center justify-between text-sm text-gray-500 font-light">{i.note}<ArrowRight className="w-4 h-4 shrink-0 ml-2" /></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
