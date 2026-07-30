"use client";

// Confirmation panel shown once the enquiry has been emailed to the office.
// Offers the WhatsApp handoff (short summary only) and the tour packages that
// match the cities they chose.

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { buildEnquiryWhatsAppUrl, type TourEnquiry } from "@/lib/tourEnquiry";
import { matchingPlans, tripLength, totalGuests } from "@/lib/quote";
import { CONTACT_EMAIL } from "@/lib/planner";
import { cityLabel } from "@/data/plannerOptions";

export default function EnquirySent({ enquiry }: { enquiry: TourEnquiry }) {
  const plans = matchingPlans(enquiry.cities).slice(0, 3);
  const length = tripLength(enquiry.arrivalDate, enquiry.departureDate);
  const guests = totalGuests(enquiry.adults, enquiry.children);

  return (
    <section className="py-14 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 rounded-3xl bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Thank you, {enquiry.fullName.split(" ")[0]}.
          </h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
            Your enquiry is with our team. We&apos;ll prepare a personalised itinerary, recommend the
            best sightseeing schedule, and send a transparent quotation with no hidden charges — to{" "}
            <strong className="text-gray-800 font-semibold">{enquiry.email}</strong>.
          </p>

          <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-gray-600 bg-ivory-300/60 rounded-2xl px-6 py-4 mb-10">
            <span>
              {guests} {guests === 1 ? "guest" : "guests"}
            </span>
            {length && (
              <span>
                {length.days} days / {length.nights} nights
              </span>
            )}
            {enquiry.cities.length > 0 && <span>{enquiry.cities.map(cityLabel).join(" · ")}</span>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href={buildEnquiryWhatsAppUrl(enquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 min-h-[56px] rounded-2xl bg-[#25D366] text-white font-bold text-base hover:brightness-95 transition-all shadow-lg"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Continue on WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[56px] rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:border-maroon-600/40 hover:text-maroon-600 transition-colors"
            >
              Email us directly
            </a>
          </div>

          <p className="text-xs text-gray-400">
            Prefer to talk it through? A quick WhatsApp message usually gets you an itinerary the same day.
          </p>
        </div>

        {plans.length > 0 && (
          <div className="max-w-5xl mx-auto mt-16 md:mt-24">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-8 text-center">
              While you wait — tours matching your trip
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Link
                  key={plan.id}
                  href={`/plans/${plan.id}`}
                  className="group bg-white rounded-3xl border border-gray-100 p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-maroon-600 mb-2">
                    {plan.duration}
                  </p>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-maroon-600 transition-colors">
                    {plan.title}
                  </h4>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-500 group-hover:text-maroon-600 transition-colors">
                    View itinerary
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
