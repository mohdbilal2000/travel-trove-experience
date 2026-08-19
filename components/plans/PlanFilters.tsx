
"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CITIES = ["All", "Delhi", "Agra", "Jaipur", "Varanasi", "Udaipur", "Ranthambore"];

const SORT_OPTIONS = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'duration', label: 'Duration: Short to Long' },
];

export default function PlanFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeCity = searchParams.get('city') || 'All';
    const activeSort = searchParams.get('sort') || 'recommended';

    const updateParams = (mutate: (params: URLSearchParams) => void) => {
        const params = new URLSearchParams(searchParams.toString());
        mutate(params);
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    };

    const handleCityChange = (city: string) => {
        updateParams(params => {
            if (city === 'All') params.delete('city');
            else params.set('city', city);
        });
    };

    const handleSortChange = (sort: string) => {
        updateParams(params => {
            if (sort === 'recommended') params.delete('sort');
            else params.set('sort', sort);
        });
    };

    return (
        <div className="flex flex-col gap-4 mb-12">
            <div className="flex flex-wrap gap-3">
                {CITIES.map((city) => (
                    <Button
                        key={city}
                        variant={activeCity === city ? "default" : "outline"}
                        className={cn(
                            "rounded-full px-6 py-2 h-auto text-sm font-bold transition-all",
                            activeCity === city ? "bg-maroon-600 hover:bg-black text-white" : "border-gray-200 hover:border-maroon-600 hover:text-maroon-600 bg-white text-gray-600"
                        )}
                        onClick={() => handleCityChange(city)}
                    >
                        {city}
                    </Button>
                ))}
            </div>
            <div className="flex items-center gap-3 self-start md:self-end">
                <label htmlFor="plan-sort" className="text-xs font-black uppercase tracking-widest text-gray-500">
                    Sort by
                </label>
                <select
                    id="plan-sort"
                    value={activeSort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:border-maroon-600 cursor-pointer"
                >
                    {SORT_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
