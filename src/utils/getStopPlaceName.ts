import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import * as OJP from "ojp-sdk";

/**
 * Returns the stop place name of a given TripLeg.
 * @param {OJP.TripLeg} leg - The TripLeg object to get the stop place name from.
 * @returns {string} - The stop place name of the leg or N/A if the leg is not a TripTimedLeg.
 */
export const getStopPlaceName = (leg: OJP.TripLeg): string => {
  if (!isTripTimedLeg(leg)) return "N/A";
  return leg.service.destinationStopPlace?.stopPlaceName ?? "N/A";
};
