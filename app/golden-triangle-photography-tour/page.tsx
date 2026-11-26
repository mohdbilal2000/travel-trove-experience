import TourLanding, { landingMetadata } from "@/components/landing/TourLanding";
import { photographyTour } from "@/data/landingPages";

export const metadata = landingMetadata(photographyTour);

export default function Page() {
    return <TourLanding config={photographyTour} />;
}
