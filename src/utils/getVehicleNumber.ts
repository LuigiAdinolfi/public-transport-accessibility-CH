import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import * as OJP from "ojp-sdk";

/**
 * Returns the train number of a given TripLeg.
 * @param {OJP.TripLeg} leg - The TripLeg object to get the train number from.
 * @returns {string} - The train number of the leg or N/A if the leg is not a TripTimedLeg.
 */
export const getVehicleNumber = (leg: OJP.TripLeg): string => {
  if (leg.legType === "TransferLeg") {
    return "";
  }
  if (!isTripTimedLeg(leg)) return "";
  return leg.service.serviceLineNumber ?? "";
};
