import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { countries } from "@/data/countries";
import { siteConfig } from "@/lib/siteConfig";

const url = `${siteConfig.url}/plan-your-trip`;
const title = "Plan Your India Trip from Your Country | Guide India Tours";
const description = "Planning facts for travellers from the US, UK, Canada, Australia, Germany, France, Spain, Mexico and more: time difference, guide languages, visa and quote currency, plus private Taj Mahal and Golden Triangle tours.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: url, languages: { en: url, "x-default": url } },
    openGraph: { title, description, url, siteName: siteConfig.name, type: "website", images: [{ url: `${siteConfig.url}/images/og-default.jpg`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description },
};

export default function PlanYourTripHub() {
    return (
        <main className="bg-white min-h-screen">
            <PageHero
                breadcrumbs={[{ label: "Plan your trip" }]}
                badge="From your country"
                title="Plan Your India Trip"
                subtitle="Choose your country for the practical facts, guide languages and tours to start with."
            />
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {countries.map((c) => (
                            <li key={c.slug}>
                                <Link href={`/plan-your-trip/${c.slug}`} className="flex items-center justify-between rounded-xl border border-gray-100 bg-ivory-100 px-5 py-4 font-bold text-gray-800 hover:border-maroon-600 hover:text-maroon-600 transition-colors">
                                    {c.label} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
