import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface RelatedPagesProps {
    title?: string;
    pages: Array<{
        href: string;
        title: string;
        description: string;
    }>;
    className?: string;
}

export default function RelatedPages({
    title = "Explore More",
    pages,
    className = "",
}: RelatedPagesProps) {
    return (
        <section className={`bg-gray-50 py-20 ${className}`}>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
                    {title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pages.map((page) => (
                        <Link
                            key={page.href}
                            href={page.href}
                            className="group bg-white rounded-3xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-maroon-600 transition-colors">
                                        {page.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {page.description}
                                    </p>
                                </div>
                                <div className="mt-1 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-maroon-600 group-hover:text-white transition-all duration-300">
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
