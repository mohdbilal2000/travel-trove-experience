
import { TravelPlan } from "@/data/travelPlans";
import ItineraryMap from "./ItineraryMap";

interface ItineraryProps {
  plan: TravelPlan;
}

const Itinerary = ({ plan }: ItineraryProps) => {
  return <ItineraryMap plan={plan} />;
};

export default Itinerary;
