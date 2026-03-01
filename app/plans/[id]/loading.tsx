export default function PlanDetailLoading() {
    return (
        <main className="bg-ivory-100 min-h-screen">
            {/* Hero skeleton */}
            <section className="relative h-[60vh] md:h-[80vh] bg-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-12 md:bottom-24 left-0 right-0">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl space-y-6">
                            <div className="flex gap-4">
                                <div className="h-7 w-32 bg-white/20 rounded-full" />
                                <div className="h-7 w-24 bg-white/20 rounded-full" />
                            </div>
                            <div className="h-16 w-3/4 bg-white/20 rounded-2xl" />
                            <div className="h-10 w-40 bg-white/20 rounded-xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content skeleton */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        <div className="lg:col-span-8 space-y-20 animate-pulse">
                            {/* At a Glance */}
                            <div className="bg-white rounded-3xl p-10 space-y-6">
                                <div className="h-8 w-48 bg-gray-200 rounded-xl" />
                                <div className="grid grid-cols-3 gap-6">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-24 bg-gray-100 rounded-2xl" />
                                    ))}
                                </div>
                            </div>

                            {/* Overview */}
                            <div className="space-y-4">
                                <div className="h-10 w-56 bg-gray-200 rounded-xl" />
                                <div className="h-4 w-full bg-gray-100 rounded" />
                                <div className="h-4 w-full bg-gray-100 rounded" />
                                <div className="h-4 w-3/4 bg-gray-100 rounded" />
                            </div>

                            {/* Itinerary */}
                            <div className="space-y-4">
                                <div className="h-10 w-48 bg-gray-200 rounded-xl" />
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-3xl p-10 space-y-4">
                                        <div className="flex gap-6">
                                            <div className="w-20 h-20 bg-gray-200 rounded-3xl flex-shrink-0" />
                                            <div className="flex-grow space-y-3">
                                                <div className="h-6 w-2/3 bg-gray-200 rounded-lg" />
                                                <div className="h-4 w-full bg-gray-100 rounded" />
                                                <div className="h-4 w-4/5 bg-gray-100 rounded" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 animate-pulse">
                            <div className="bg-white rounded-3xl p-10 space-y-8">
                                <div className="h-5 w-32 bg-gray-200 rounded" />
                                <div className="h-12 w-full bg-gray-200 rounded-xl" />
                                <div className="h-16 w-full bg-gray-200 rounded-2xl" />
                                <div className="h-5 w-40 bg-gray-100 rounded mx-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
