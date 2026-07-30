import { Clock, ShieldCheck, Award } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import RelatedPages from "@/components/shared/RelatedPages";
import PlanMyTourForm from "@/components/plan-my-tour/PlanMyTourForm";

export default function PlanMyTourPage() {
    return (
        <main className="min-h-screen bg-ivory-100">
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Plan My Tour" }]}
                badge="Free · No Obligation"
                title={<>Plan Your <span className="text-maroon-600">Perfect India Tour</span></>}
                subtitle="Answer a few questions about your trip and our team will build a personalised itinerary with a transparent quotation — no hidden charges."
                meta={
                    <>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-maroon-600" /> Takes about 3 minutes
                        </span>
                        <span className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-maroon-600" /> No payment required
                        </span>
                        <span className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-maroon-600" /> Government-approved guides since 2007
                        </span>
                    </>
                }
            />

            <PlanMyTourForm />

            <RelatedPages
                title="Explore More"
                pages={[
                    {
                        href: "/plans",
                        title: "Browse Tour Packages",
                        description: "See our curated Golden Triangle and Rajasthan itineraries before you decide.",
                    },
                    {
                        href: "/guide-booking",
                        title: "Book a Guide Only",
                        description: "Just need a government-authorized guide for a single monument? Book one directly.",
                    },
                    {
                        href: "/faq",
                        title: "Frequently Asked Questions",
                        description: "Answers on tickets, timings, transport and what's included in a private tour.",
                    },
                ]}
            />
        </main>
    );
}
