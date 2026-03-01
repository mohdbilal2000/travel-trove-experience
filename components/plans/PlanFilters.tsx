
"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CITIES = ["All", "Delhi", "Agra", "Jaipur", "Varanasi", "Udaipur", "Ranthambore"];

export default function PlanFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeCity = searchParams.get('city') || 'All';

    const handleCityChange = (city: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (city === 'All') {
            params.delete('city');
        } else {
            params.set('city', city);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-wrap gap-3 mb-12">
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
    );
}
