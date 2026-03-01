
import { Clock, MapPin, Check, X, Shield, Users } from 'lucide-react';

interface AtAGlanceProps {
    duration: string;
    price: string;
    highlights: string[];
    pickup?: string;
    bestFor?: string;
    type?: string;
    cancellation?: string;
}

export default function AtAGlance({
    duration,
    price,
    highlights,
    pickup = "Delhi/Agra/Jaipur (Hotel/Airport)",
    bestFor = "Couples, Families, Solo Travelers",
    type = "Private Guided Tour",
    cancellation = "Flexible - Up to 24h before"
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
                            <td className="p-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest w-1/3">Duration</td>
                            <td className="p-4 font-bold text-gray-900">{duration}</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                            <td className="p-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Pickup</td>
                            <td className="p-4 text-gray-700">{pickup}</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                            <td className="p-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Pricing</td>
                            <td className="p-4 font-black text-maroon-600 text-xl">{price}</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                            <td className="p-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Best For</td>
                            <td className="p-4 text-gray-700">{bestFor}</td>
                        </tr>
                        <tr className="border-b border-gray-50">
                            <td className="p-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Tour Type</td>
                            <td className="p-4 text-gray-700">{type}</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Cancellation</td>
                            <td className="p-4 text-green-600 font-bold">{cancellation}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
