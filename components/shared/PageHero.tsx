import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeroProps {
    breadcrumbs?: BreadcrumbItem[];
    badge?: string;
    title: ReactNode;
    subtitle?: string;
    meta?: ReactNode;
}

/**
 * Shared light hero used across SEO/GEO content pages. Mobile-first paddings,
 * single H1 per page, consistent badge + breadcrumb pattern, and good contrast
 * against the global Navbar (which always renders ivory on non-home routes).
 */
export default function PageHero({ breadcrumbs, badge, title, subtitle, meta }: PageHeroProps) {
    return (
        <section className="relative pt-28 md:pt-44 pb-14 md:pb-24 bg-white border-b border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-maroon-600/5 rounded-bl-full translate-x-1/4 -translate-y-12 pointer-events-none -z-0" />
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <Breadcrumbs items={breadcrumbs} className="mb-6 md:mb-8" />
                )}
                {badge && (
                    <Badge className="bg-maroon-600/10 text-maroon-600 border-none mb-5 md:mb-6 px-4 py-1.5 uppercase tracking-[0.3em] text-[10px] font-black">
                        {badge}
                    </Badge>
                )}
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-4 md:mb-6 tracking-tight md:tracking-tighter leading-[1.05] sm:leading-[0.95] text-gray-900">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-base sm:text-lg md:text-2xl text-gray-500 font-light max-w-3xl leading-relaxed">
                        {subtitle}
                    </p>
                )}
                {meta && (
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 md:mt-8 text-gray-600 text-sm font-medium">
                        {meta}
                    </div>
                )}
            </div>
        </section>
    );
}
