
import Link from 'next/link';
import { Clock, MapPin, Check, X, Shield, Users } from 'lucide-react';

interface AtAGlanceProps {
    duration: string;
    highlights: string[];
    pickup?: string;
    bestFor?: string;
    type?: string;
    cancellation?: string;
}

export default function AtAGlance({
    duration,
    highlights,
    pickup = "Delhi/Agra/Jaipur (Hotel/Airport)",
    bestFor = "Couples, Families, Solo Travelers",
    type = "Private Guided Tour",
    cancellation = "Tiered refunds — up to 85% back"
}: AtAGlanceProps) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="bg-maroon-600 p-6 text-white">
                <h3 className="text-xl font-bold uppercase tracking-wider">At a Glance</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <tbody>
                        <tr className="border-b border-gray-50">
                            <td className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest w-1/3">Duration</td>
                            <td className="p-4 font-bold text-gray-900">{duration}</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                            <td className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Pickup</td>
                            <td className="p-4 text-gray-700">{pickup}</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                            <td className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Pricing</td>
                            <td className="p-4 font-black text-maroon-600">Custom quote — free within 2 hours</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                            <td className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Best For</td>
                            <td className="p-4 text-gray-700">{bestFor}</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                            <td className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Tour Type</td>
                            <td className="p-4 text-gray-700">{type}</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Cancellation</td>
                            <td className="p-4 text-green-600 font-bold">
                                {cancellation}{' '}
                                <Link href="/refund-policy" className="text-gray-500 font-medium underline underline-offset-2 hover:text-maroon-600 whitespace-nowrap text-sm">
                                    Refund policy
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
