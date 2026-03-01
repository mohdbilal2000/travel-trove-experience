export default function PlansLoading() {
    return (
        <main className="min-h-screen bg-ivory-100">
            {/* Hero skeleton */}
            <section className="relative pt-44 pb-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="animate-pulse">
                        <div className="h-5 w-32 bg-gray-200 rounded-full mx-auto mb-8" />
                        <div className="h-16 w-96 bg-gray-200 rounded-2xl mx-auto mb-6" />
                        <div className="h-6 w-72 bg-gray-100 rounded-xl mx-auto" />
                    </div>
                </div>
            </section>

            {/* Grid skeleton */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {/* Filter bar skeleton */}
                    <div className="flex gap-4 mb-16 animate-pulse">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-12 w-28 bg-gray-200 rounded-full" />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
                                <div className="aspect-[4/3] bg-gray-200" />
                                <div className="p-8 space-y-4">
                                    <div className="flex gap-3">
                                        <div className="h-5 w-16 bg-gray-200 rounded-full" />
                                        <div className="h-5 w-20 bg-gray-200 rounded-full" />
                                    </div>
                                    <div className="h-7 w-3/4 bg-gray-200 rounded-xl" />
                                    <div className="h-4 w-full bg-gray-100 rounded" />
                                    <div className="h-4 w-2/3 bg-gray-100 rounded" />
                                    <div className="flex justify-between items-center pt-4">
                                        <div className="h-8 w-20 bg-gray-200 rounded-lg" />
                                        <div className="h-10 w-28 bg-gray-200 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
