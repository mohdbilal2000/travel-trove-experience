import TourLanding, { landingMetadata } from "@/components/landing/TourLanding";
import { taj_sunrise } from "@/data/landingPages";

export const metadata = landingMetadata(taj_sunrise);

export default function Page() {
    return <TourLanding config={taj_sunrise} />;
}
