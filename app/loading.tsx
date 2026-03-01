export default function Loading() {
    return (
        <main className="bg-ivory-100 min-h-screen">
            {/* Navbar height spacer */}
            <div className="pt-32" />

            <div className="container mx-auto px-4 max-w-7xl">
                {/* Heading skeleton */}
                <div className="max-w-3xl mb-16 space-y-6">
                    <div className="h-4 w-32 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-12 w-3/4 bg-gray-200 rounded-2xl animate-pulse" />
                    <div className="h-6 w-1/2 bg-gray-100 rounded-xl animate-pulse" />
                </div>

                {/* Card grid skeleton: 3 columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50">
                            {/* Image placeholder */}
                            <div className="aspect-[4/3] bg-gray-200 animate-pulse" />

                            {/* Content placeholder */}
                            <div className="p-8 space-y-4">
                                <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse" />
                                <div className="h-6 w-3/4 bg-gray-200 rounded-xl animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-gray-100 rounded-lg animate-pulse" />
                                    <div className="h-4 w-5/6 bg-gray-100 rounded-lg animate-pulse" />
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <div className="h-8 w-24 bg-gray-200 rounded-xl animate-pulse" />
                                    <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom spacer */}
                <div className="pb-24" />
            </div>
        </main>
    );
}
