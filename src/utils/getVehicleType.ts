import * as OJP from "ojp-sdk";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";

/**
 * Returns the vehicle type of given TripLeg.
 * @param {OJP.TripLeg | null} selectedTripLeg - The TripLeg object to get the vehicle type from.
 * @returns {string} - The vehicle type of the selected trip leg or N/A if the leg is null.
 */
export const getVehicleType = (selectedTripLeg: OJP.TripLeg | null): string => {
  if (!selectedTripLeg) return "N/A";
  if (
    selectedTripLeg.legType === "TransferLeg" ||
    selectedTripLeg.legType === "ContinousLeg"
  ) {
    return "Fussweg";
  }
  return isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.service.ptMode.name ?? "N/A"
    : "N/A";
};
