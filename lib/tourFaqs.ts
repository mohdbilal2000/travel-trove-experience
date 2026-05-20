import type { TravelPlan } from "@/data/types/travelPlanTypes";
import type { FAQItem } from "@/data/types/travelPlanTypes";

/**
 * Returns the plan's own FAQs when present, otherwise a fact-based default set
 * derived from real business details so every tour page has a visible FAQ
 * section and matching FAQPage schema.
 */
export function getTourFaqs(plan: TravelPlan): FAQItem[] {
    if (plan.faqs && plan.faqs.length > 0) {
        return plan.faqs;
    }

    const destinations = plan.destinations && plan.destinations.length > 0
        ? plan.destinations.join(', ')
        : 'Delhi, Agra, and Jaipur';

    const inclusions = plan.inclusions && plan.inclusions.length > 0
        ? plan.inclusions.join(', ')
        : 'a private air-conditioned car, an expert licensed guide, hotel stays, and daily breakfast';

    return [
        {
            question: `What is included in the ${plan.title}?`,
            answer: `This ${plan.duration} private tour includes ${inclusions}. There are no hidden fees — your quoted price covers the listed inclusions.`,
        },
        {
            question: 'Are your guides government-approved and licensed?',
            answer: 'Yes. Guide India Tours works with government-approved, licensed guides, including our lead guide Avneesh Dixit, so you get accurate history and a safe, professional experience.',
        },
        {
            question: 'What languages do your guides speak?',
            answer: 'Our guides speak English and Hindi as standard, with French, Spanish, German, Japanese, Russian, and Italian-speaking guides available on request.',
        },
        {
            question: 'Is this a private tour or a shared group tour?',
            answer: `The ${plan.title} is a fully private tour. You travel only with your own party in a private vehicle, and the itinerary can be customized to your interests and pace.`,
        },
        {
            question: 'Is hotel or airport pickup and drop-off included?',
            answer: `Yes. The tour includes private pickup and drop-off in a comfortable air-conditioned vehicle for your travels across ${destinations}.`,
        },
        {
            question: 'How do I book this tour?',
            answer: 'You can book directly through the booking button on this page, or message us on WhatsApp at +91 8979810991. Booking direct means no third-party markup and direct contact with the team.',
        },
        {
            question: 'What is the best time to take this tour?',
            answer: 'October to March offers the most pleasant weather for sightseeing across North India, with clear skies and comfortable temperatures. Tours run year-round.',
        },
        {
            question: 'Can the itinerary be customized?',
            answer: 'Absolutely. As a private tour, the itinerary is flexible — we can adjust the pace, add destinations, or tailor activities to your interests. Just let us know your preferences when booking.',
        },
    ];
}
