import * as OJP from "ojp-sdk";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";

/**
 * Retrieves the platform number from the origin stop point of a given TripLeg.
 *
 * @param {OJP.TripLeg | null} selectedTripLeg - The TripLeg object to get the platform number from.
 *                                               Can be null if no TripLeg is provided.
 * @returns {string} - The platform number of the origin stop point of the selected trip leg,
 *                     or "N/A" if the leg is null or not a timed leg, or if the platform number is not available.
 */
export const getPlatformNumberFromOrigin = (
  selectedTripLeg: OJP.TripLeg | null,
): string => {
  // Return "N/A" if the selectedTripLeg is null
  if (!selectedTripLeg) return "N/A";

  // Check if the leg is a timed leg and return the planned platform number
  return isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.fromStopPoint.plannedPlatform ?? "N/A"
    : "N/A";
};

/**
 * Retrieves the platform number from the destination stop point of a given TripLeg.
 *
 * @param {OJP.TripLeg | null} selectedTripLeg - The TripLeg object to get the platform number from.
 *                                               Can be null if no TripLeg is provided.
 * @returns {string} - The platform number of the destination stop point of the selected trip leg,
 *                     or "N/A" if the leg is null or not a timed leg, or if the platform number is not available.
 */
export const getPlatformNumberFromDestination = (
  selectedTripLeg: OJP.TripLeg | null,
): string => {
  // Return "N/A" if the selectedTripLeg is null
  if (!selectedTripLeg) return "N/A";

  // Check if the leg is a timed leg and return the planned platform number
  return isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.toStopPoint.plannedPlatform ?? "N/A"
    : "N/A";
};
