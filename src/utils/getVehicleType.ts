import * as OJP from "ojp-sdk";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";

/**
 * Retrieves the vehicle type of given TripLeg.
 *
 * This function determines the type of vehicle used in the trip leg. If the trip leg is a `TransferLeg` or `ContinousLeg`, it returns "Fussweg" (indicating a walking path).
 * For other types of trip legs, it returns the vehicle type if it is a timed leg, or "N/A" if the vehicle type is not available or the leg is not a timed leg.
 *
 * @param {OJP.TripLeg | null} selectedTripLeg - The TripLeg object from which to extract the vehicle type.
 *                                                Can be null if no trip leg information is provided.
 * @returns {string} - The vehicle type of the selected trip leg. Returns:
 *                     - "Fussweg" if the leg type is "TransferLeg" or "ContinousLeg",
 *                     - The vehicle type from `ptMode.name` if the leg is a `TripTimedLeg`,
 *                     - "N/A" if the leg is null or if the vehicle type is not available.
 */
export const getVehicleType = (selectedTripLeg: OJP.TripLeg | null): string => {
  // Return "N/A" if the selectedTripLeg is null
  if (!selectedTripLeg) return "N/A";

  // Return 'Fussweg' if the leg type is 'TransferLeg' or 'ContinousLeg'
  if (
    selectedTripLeg.legType === "TransferLeg" ||
    selectedTripLeg.legType === "ContinousLeg"
  ) {
    return "Fussweg";
  }

  // Return the vehicle type from ptMode.name if the leg is a TripTimedLeg
  return isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.service.ptMode.name ?? "N/A"
    : "N/A";
};
