import TourLanding, { landingMetadata } from "@/components/landing/TourLanding";
import { sameDayAgra } from "@/data/landingPages";

export const metadata = landingMetadata(sameDayAgra);

export default function Page() {
    return <TourLanding config={sameDayAgra} />;
}
