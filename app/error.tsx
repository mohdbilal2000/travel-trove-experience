"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <main className="bg-ivory-100 min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
                {/* Error Icon */}
                <div className="w-20 h-20 rounded-3xl bg-maroon-600/10 flex items-center justify-center mx-auto mb-10">
                    <AlertTriangle size={36} className="text-maroon-600" />
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                    Something Went <span className="text-maroon-600">Wrong</span>
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-500 font-light leading-relaxed mb-4 max-w-md mx-auto">
                    We apologize for the inconvenience. An unexpected error has occurred while loading this page.
                </p>

                {/* Error details (subtle) */}
                {error?.message && (
                    <p className="text-sm text-gray-400 bg-white rounded-2xl px-6 py-3 inline-block mb-10 border border-gray-100">
                        {error.message}
                    </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                    <Button
                        onClick={reset}
                        size="lg"
                        className="h-14 px-10 rounded-3xl text-base font-bold shadow-lg"
                    >
                        <RefreshCw size={20} className="mr-2" />
                        Try Again
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-14 px-10 rounded-3xl text-base font-bold">
                        <Link href="/" className="flex items-center gap-3">
                            <Home size={20} />
                            Go Home
                        </Link>
                    </Button>
                </div>

                {/* Support note */}
                <p className="mt-12 text-sm text-gray-400 font-light">
                    If this issue persists, please contact us at{" "}
                    <a href="mailto:info@guideindiatours.com" className="text-maroon-600 hover:underline">
                        info@guideindiatours.com
                    </a>
                </p>
            </div>
        </main>
    );
}
