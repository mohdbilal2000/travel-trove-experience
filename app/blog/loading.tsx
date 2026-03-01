export default function BlogLoading() {
    return (
        <main className="min-h-screen bg-ivory-100">
            {/* Hero skeleton */}
            <section className="relative pt-44 pb-32 bg-white">
                <div className="container mx-auto px-4 text-center animate-pulse">
                    <div className="h-5 w-24 bg-gray-200 rounded-full mx-auto mb-8" />
                    <div className="h-20 w-80 bg-gray-200 rounded-2xl mx-auto mb-8" />
                    <div className="h-6 w-96 bg-gray-100 rounded-xl mx-auto" />
                </div>
            </section>

            {/* Featured post skeleton */}
            <section className="pb-32">
                <div className="container mx-auto px-4">
                    <div className="rounded-3xl overflow-hidden h-[600px] bg-gray-200 animate-pulse" />
                </div>
            </section>

            {/* Grid skeleton */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex gap-4 mb-20 animate-pulse">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-12 w-24 bg-gray-200 rounded-full" />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[4/5] bg-gray-200 rounded-3xl mb-8" />
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="h-3 w-24 bg-gray-200 rounded" />
                                        <div className="h-3 w-20 bg-gray-200 rounded" />
                                    </div>
                                    <div className="h-7 w-3/4 bg-gray-200 rounded-lg" />
                                    <div className="h-4 w-full bg-gray-100 rounded" />
                                    <div className="h-4 w-2/3 bg-gray-100 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
