import TourLanding, { landingMetadata } from "@/components/landing/TourLanding";
import { lastMinute } from "@/data/landingPages";

export const metadata = landingMetadata(lastMinute);

export default function Page() {
    return <TourLanding config={lastMinute} />;
}
