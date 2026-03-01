
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://guideindia.tours"
            },
            ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": item.href ? `https://guideindia.tours${item.href}` : undefined
            }))
        ]
    };

    return (
        <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center text-sm mb-6", className)}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="text-gray-400 hover:text-maroon-600 transition-colors flex items-center">
                        <Home size={14} className="mr-1" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                        <ChevronRight size={14} className="text-gray-300" />
                        {item.href ? (
                            <Link href={item.href} className="text-gray-400 hover:text-maroon-600 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-900 font-medium line-clamp-1">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
