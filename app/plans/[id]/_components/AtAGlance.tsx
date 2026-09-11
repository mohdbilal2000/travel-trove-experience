import Link from 'next/link';

interface AtAGlanceProps {
    duration: string;
    destinations?: string[];
    bestFor?: string;
    type?: string;
    cancellation?: string;
}

const formatList = (items: string[]) =>
    items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} & ${items[items.length - 1]}`;

export default function AtAGlance({
    duration,
    destinations = [],
    bestFor = "Couples, families, solo travelers",
    type = "Private guided tour — your party only",
    cancellation = "Tiered refunds — up to 85% back"
}: AtAGlanceProps) {
    const pickup = destinations.length > 0
        ? `Hotel or airport pickup in ${formatList(destinations)}`
        : "Hotel or airport pickup in Delhi, Agra & Jaipur";

    const rows: Array<{ label: string; value: React.ReactNode; valueClass?: string }> = [
        { label: "Duration", value: duration, valueClass: "font-bold text-gray-900" },
        { label: "Destinations", value: destinations.length > 0 ? formatList(destinations) : "Delhi, Agra & Jaipur" },
        { label: "Pickup", value: pickup },
        { label: "Pricing", value: "Custom quote — free within 2 hours", valueClass: "font-black text-maroon-600" },
        { label: "Best season", value: "October – March (tours run year-round)" },
        { label: "Best for", value: bestFor },
        { label: "Tour type", value: type },
        {
            label: "Cancellation",
            valueClass: "text-green-700 font-bold",
            value: (
                <>
                    {cancellation}{' '}
                    <Link href="/refund-policy" className="text-gray-500 font-medium underline underline-offset-2 hover:text-maroon-600 whitespace-nowrap text-sm">
                        Refund policy
                    </Link>
                </>
            ),
        },
    ];

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="bg-maroon-600 p-6 text-white">
                <h3 className="text-xl font-bold uppercase tracking-wider">At a Glance</h3>
            </div>
            <dl className="divide-y divide-gray-50">
                {rows.map((row) => (
                    <div key={row.label} className="grid grid-cols-[minmax(6rem,1fr)_2fr] sm:grid-cols-[1fr_2fr] gap-4 p-4">
                        <dt className="font-bold text-gray-500 uppercase text-[11px] sm:text-[10px] tracking-widest self-center">{row.label}</dt>
                        <dd className={row.valueClass ?? "text-gray-700"}>{row.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
