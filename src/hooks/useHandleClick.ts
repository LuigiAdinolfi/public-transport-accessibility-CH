import { useJourneyStore } from "@/store/useJourneyStore";
import { useRecentJourneysStore } from "@/store/useRecentJourneysStore";
import { getVehicleType } from "@/utils/getVehicleType";
import { getVehicleNumber } from "@/utils/getVehicleNumber";
import { accessIconProps } from "@/helpers/accessIconProps";
import * as OJP from "ojp-sdk";

/**
 * Custom hook to handle click events for selecting trip details and navigating to the details page.
 * @param {OJP.TripLeg[]} allLegs - Array of trip legs to set in the journey store.
 * @param duration - Total duration of the journey.
 * @param accessIcons - Array of access icons to set in the journey store.
 * @param {(url: string) => void} push - Function to navigate to a new URL.
 * @returns Click event handler function.
 */
export function useHandleClick(
  allLegs: OJP.TripLeg[],
  duration: string,
  accessIcons: accessIconProps[],
  push: (url: string) => void,
) {
  const { setAllLegs, setAccessIcons } = useJourneyStore();
  const { addRecentJourney } = useRecentJourneysStore();

  return () => {
    setAllLegs(allLegs); // Set all trip legs in the journey store
    setAccessIcons(accessIcons); // Set access icons in the journey store
    // Extract necessary details for recent journey
    const fromLocation = allLegs[0].fromLocation;
    const toLocation = allLegs[allLegs.length - 1].toLocation;
    const journeyDate = new Date();
    const vehicleType = getVehicleType(allLegs[0]);
    const vehicleNumber = getVehicleNumber(allLegs[0]);
    const legs = allLegs.filter((leg) => leg.legType === "TimedLeg") || [];
    const isMultipleConnection = legs.length > 1;
    const connections = isMultipleConnection
      ? legs.map((leg) => ({
          vehicleType: getVehicleType(leg),
          vehicleNumber: getVehicleNumber(leg),
        }))
      : [];

    // Create a journey object
    const journey = {
      fromLocation,
      toLocation,
      journeyDate,
      journeyDuration: duration,
      vehicleType,
      vehicleNumber,
      isMultipleConnection,
      connections,
    };

    // Add the recent journey to the store
    addRecentJourney(journey);

    push("/select/details"); // Navigate to the details page
  };
}
