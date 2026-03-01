import { Metadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Map } from "lucide-react";

export const metadata: Metadata = {
    title: '404 - Page Not Found | Guide India Tours',
    description: 'The page you are looking for could not be found. Explore our luxury Golden Triangle tours or return to the homepage.',
    alternates: {
        canonical: 'https://guideindia.tours/404',
    },
};

export default function NotFound() {
    return (
        <main className="bg-ivory-100 min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
                {/* Decorative top accent */}
                <div className="w-16 h-1 bg-maroon-600 mx-auto mb-12 rounded-full" />

                {/* 404 Number */}
                <h1 className="text-8xl md:text-9xl font-display font-bold text-maroon-600 mb-6 leading-none tracking-tighter">
                    404
                </h1>

                {/* Subheading */}
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-500 font-light leading-relaxed mb-12 max-w-md mx-auto">
                    The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us help you find your way.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button asChild size="lg" className="h-14 px-10 rounded-3xl text-base font-bold shadow-lg">
                        <Link href="/" className="flex items-center gap-3">
                            <Home size={20} />
                            Go Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-14 px-10 rounded-3xl text-base font-bold">
                        <Link href="/plans" className="flex items-center gap-3">
                            <Map size={20} />
                            View Tours
                        </Link>
                    </Button>
                </div>

                {/* Decorative bottom accent */}
                <div className="mt-16 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-maroon-600/20" />
                    <div className="w-2 h-2 rounded-full bg-maroon-600/40" />
                    <div className="w-2 h-2 rounded-full bg-maroon-600/60" />
                </div>
            </div>
        </main>
    );
}
