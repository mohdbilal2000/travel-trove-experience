export default function BlogPostLoading() {
    return (
        <main className="min-h-screen bg-ivory-100">
            {/* Hero skeleton */}
            <div className="relative h-[50vh] md:h-[70vh] bg-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-12 md:bottom-20 left-0 right-0">
                    <div className="container mx-auto px-4 max-w-4xl space-y-6">
                        <div className="h-6 w-24 bg-white/20 rounded-full" />
                        <div className="h-14 w-3/4 bg-white/20 rounded-2xl" />
                        <div className="flex gap-4">
                            <div className="h-4 w-24 bg-white/20 rounded" />
                            <div className="h-4 w-32 bg-white/20 rounded" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content skeleton */}
            <article className="py-20">
                <div className="container mx-auto px-4 max-w-3xl animate-pulse space-y-6">
                    <div className="h-5 w-full bg-gray-200 rounded" />
                    <div className="h-5 w-full bg-gray-200 rounded" />
                    <div className="h-5 w-4/5 bg-gray-200 rounded" />
                    <div className="h-5 w-full bg-gray-100 rounded mt-8" />
                    <div className="h-5 w-full bg-gray-100 rounded" />
                    <div className="h-5 w-3/4 bg-gray-100 rounded" />
                    <div className="h-64 w-full bg-gray-200 rounded-3xl mt-8" />
                    <div className="h-5 w-full bg-gray-100 rounded mt-8" />
                    <div className="h-5 w-full bg-gray-100 rounded" />
                    <div className="h-5 w-2/3 bg-gray-100 rounded" />
                </div>
            </article>
        </main>
    );
}
