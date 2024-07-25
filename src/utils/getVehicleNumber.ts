import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import * as OJP from "ojp-sdk";

/**
 * Retrieves the train number from a given TripLeg.
 *
 * This function extracts the train number (or vehicle number) from a TripLeg object if it is a timed leg.
 * For non-timed legs or when the train number is not available, it returns an empty string.
 *
 * @param {OJP.TripLeg} leg - The TripLeg object from which to retrieve the train number.
 *                             This object must be a TripTimedLeg to provide a valid train number.
 * @returns {string} - The train number of the leg if available. Returns an empty string if:
 *                     - The leg type is "TransferLeg",
 *                     - The leg is not a TripTimedLeg,
 *                     - The train number is not available.
 */
export const getVehicleNumber = (leg: OJP.TripLeg): string => {
  // Return an empty string if the leg type is "TransferLeg"
  if (leg.legType === "TransferLeg") {
    return "";
  }

  // Check if the leg is a TripTimedLeg and return the train number if available
  if (!isTripTimedLeg(leg)) return "";

  // Return the service line number or an empty string if it is not available
  return leg.service.serviceLineNumber ?? "";
};
