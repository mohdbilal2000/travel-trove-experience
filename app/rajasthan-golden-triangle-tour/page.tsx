import TourLanding, { landingMetadata } from "@/components/landing/TourLanding";
import { rajasthan10 } from "@/data/landingPages";

export const metadata = landingMetadata(rajasthan10);

export default function Page() {
    return <TourLanding config={rajasthan10} />;
}
