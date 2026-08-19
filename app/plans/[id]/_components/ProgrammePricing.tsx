import Link from "next/link";
import { Car, Users, Ticket, XCircle, Info, BadgeCheck } from "lucide-react";
import type { ProgrammePricing as ProgrammePricingData } from "@/data/types/travelPlanTypes";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

interface ProgrammePricingProps {
    pricing: ProgrammePricingData;
    planTitle: string;
}

// Itemized, transparent pricing table for real programmes — transport tiers,
// guide, per-monument tickets and honest exclusions.
export default function ProgrammePricing({ pricing, planTitle }: ProgrammePricingProps) {
    const whatsappHref = `https://wa.me/918979810991?text=${encodeURIComponent(
        `Hi! Please quote the "${planTitle}" for my group size and vehicle preference.`
    )}`;

    return (
        <div className="space-y-8">
            {/* Transport tiers */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-maroon-600 p-6 text-white flex items-center gap-3">
                    <Car className="w-5 h-5" />
                    <h3 className="text-xl font-bold uppercase tracking-wider">Private AC Transport</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Vehicle</th>
                                <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Group Size</th>
                                <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Package Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pricing.vehicleTiers.map((tier) => (
                                <tr key={tier.tier} className="border-b border-gray-50 last:border-b-0">
                                    <td className="p-4">
                                        <span className="font-bold text-gray-900 block">{tier.tier}</span>
                                        <span className="text-sm text-gray-500 font-light">{tier.models}</span>
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        <span className="inline-flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5 text-maroon-600" /> {tier.capacity}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {tier.totalEUR !== null ? (
                                            <>
                                                <span className="font-black text-maroon-600">€{tier.totalEUR}</span>
                                                {tier.basis && (
                                                    <span className="block text-xs text-gray-400 font-light">{tier.basis}</span>
                                                )}
                                            </>
                                        ) : (
                                            <a
                                                href={whatsappHref}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#128C7E] hover:underline"
                                            >
                                                <WhatsAppIcon className="w-3.5 h-3.5" /> Quote on WhatsApp
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Guide */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
                        <BadgeCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Licensed Guide</h4>
                        <p className="text-gray-600 font-light">{pricing.guideIncluded}</p>
                        <p className="text-sm text-gray-500 font-light mt-2">{pricing.languageSupplement}</p>
                    </div>
                </div>
            </div>

            {/* Monument tickets */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-900 p-6 text-white flex items-center gap-3">
                    <Ticket className="w-5 h-5 text-gold-500" />
                    <h3 className="text-xl font-bold uppercase tracking-wider">Monument Tickets</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Monument</th>
                                <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Foreign Visitor Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pricing.tickets.map((ticket) => (
                                <tr key={ticket.monument} className="border-b border-gray-50 last:border-b-0">
                                    <td className="p-4 font-medium text-gray-900">
                                        {ticket.monument}
                                        {ticket.optional && (
                                            <span className="ml-2 text-[11px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">Optional</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-gray-700">{ticket.foreignerPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 pb-5 pt-1">
                    <p className="text-xs text-gray-500 font-light flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gold-500" />
                        Official ASI rates, paid at actuals — verify current prices. {pricing.ticketsNote}
                    </p>
                </div>
            </div>

            {/* Not included */}
            <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-gray-400" /> Not Included
                </h4>
                <ul className="space-y-2">
                    {pricing.notIncluded.map((item) => (
                        <li key={item} className="text-gray-600 font-light text-sm">— {item}</li>
                    ))}
                </ul>
            </div>

            {/* Basis + disclaimer */}
            <p className="text-sm text-gray-500 font-light leading-relaxed">
                {pricing.basis}{" "}
                <Link href="/contact#trip-planner" className="text-maroon-600 font-medium underline underline-offset-2 hover:text-maroon-700">
                    Build your exact trip in the planner
                </Link>
                .
            </p>
        </div>
    );
}
