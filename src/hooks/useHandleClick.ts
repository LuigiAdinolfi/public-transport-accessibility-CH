import { useJourneyStore } from "@/store/useJourneyStore";
import { useRecentJourneysStore } from "@/store/useRecentJourneysStore";
import { getVehicleType } from "@/utils/getVehicleType";
import { getVehicleNumber } from "@/utils/getVehicleNumber";
import { accessIconProps } from "@/helpers/accessIconProps";
import * as OJP from "ojp-sdk";

/**
 * Custom hook to handle click events for selecting trip details and navigating to the details page.
 * This hook manages setting trip details in the journey store, storing journey data in local storage,
 * and adding the journey to the recent journeys store before navigating to the details page.
 *
 * @param {OJP.TripLeg[]} allLegs - Array of trip legs to be stored in the journey store.
 * @param {string} duration - Total duration of the journey to be stored in the journey store.
 * @param {accessIconProps[]} accessIcons - Array of access icons to be stored in the journey store.
 * @param {(url: string) => void} push - Function to navigate to a new URL.
 * @returns {() => void} A function that handles the click event.
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
    // Store journey data in local storage
    localStorage.setItem(
      "journeyData",
      JSON.stringify({
        allLegs,
        duration,
        accessIcons,
      }),
    );

    // Update the journey store with trip details and access icons
    setAllLegs(allLegs);
    setAccessIcons(accessIcons);

    // Extract details for recent journey
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

    // Create a journey object with relevant details
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

    // Add the recent journey to the recent journeys store
    addRecentJourney(journey);

    // Navigate to the details page
    push("/select/details");
  };
}
