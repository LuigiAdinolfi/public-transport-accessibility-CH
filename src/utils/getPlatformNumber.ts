import * as OJP from "ojp-sdk";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";

/**
 * Returns the platform number of a given TripLeg.
 * @param {OJP.TripLeg | null} selectedTripLeg - The TripLeg object to get the platform number from.
 * @returns {string} - The platform number of the selected trip leg or N/A if the leg is null.
 */
export const getPlatformNumberFromOrigin = (
  selectedTripLeg: OJP.TripLeg,
): string => {
  if (!selectedTripLeg) return "N/A";
  return isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.fromStopPoint.plannedPlatform ?? "N/A"
    : "N/A";
};

/**
 * Returns the platform number of a given TripLeg.
 * @param {OJP.TripLeg | null} selectedTripLeg - The TripLeg object to get the platform number from.
 * @returns {string} - The platform number of the selected trip leg or N/A if the leg is null.
 */
export const getPlatformNumberFromDestination = (
  selectedTripLeg: OJP.TripLeg,
): string => {
  if (!selectedTripLeg) return "N/A";
  return isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.toStopPoint.plannedPlatform ?? "N/A"
    : "N/A";
};
