import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import * as OJP from "ojp-sdk";

/**
 * Retrieves the stop place name of a given TripLeg.
 *
 * @param {OJP.TripLeg} leg - The TripLeg object from which to extract the stop place name.
 *                             This object must be a TripTimedLeg for a valid result.
 * @returns {string} - The name of the stop place from the leg's destination. Returns "N/A" if:
 *                     - The leg is not a TripTimedLeg,
 *                     - The `destinationStopPlace` is null or undefined,
 *                     - The `stopPlaceName` is null or undefined.
 */
export const getStopPlaceName = (leg: OJP.TripLeg): string => {
  // Check if the leg is a TripTimedLeg
  if (!isTripTimedLeg(leg)) return "N/A";

  // Return the stop place name if available, otherwise return "N/A"
  return leg.service.destinationStopPlace?.stopPlaceName ?? "N/A";
};
