import * as OJP from "ojp-sdk";
import {
  getBehigRecordFromDestination,
  getBehigRecordFromOrigin,
} from "@/lib/fetchBehigRecord";

/**
 * Fetches the vehicle access information for the origin stop point of a given TripLeg.
 *
 * This function retrieves the vehicle access details for the stop point where the trip leg starts.
 *
 * @param {OJP.TripLeg} selectedTripLeg - The TripLeg object from which to extract the vehicle access information for the origin stop point.
 * @returns {Promise<string>} - A promise that resolves to a string describing the vehicle access information.
 *                              Returns "NO_DATA" if no record is found, or if the access information is not available.
 */
export async function getStopPointVehicleAccessFromOrigin(
  selectedTripLeg: OJP.TripLeg,
): Promise<string> {
  // Fetch the Behig record for the origin stop point
  const behigRecord = await getBehigRecordFromOrigin(selectedTripLeg);

  // Return 'NO_DATA' if no Behig record is available
  if (!behigRecord) return "NO_DATA";

  // Check leg type and return corresponding access information
  if (
    selectedTripLeg.legType === "TransferLeg" ||
    selectedTripLeg.legType === "ContinousLeg"
  ) {
    return "WALK";
  } else if (
    behigRecord.bpvh_verkehrsmittel_text_de === "TRAIN" ||
    behigRecord.bpvh_verkehrsmittel_text_de === "ICE"
  ) {
    return behigRecord.haltekante_access_gerechnet ?? "NO_DATA"; // Default to 'NO_DATA' if null
  } else {
    return behigRecord.vehicleaccess ?? "NO_DATA"; // Default to 'NO_DATA' if null
  }
}

/**
 * Fetches the vehicle access information for the destination stop point of a given TripLeg.
 *
 * This function retrieves the vehicle access details for the stop point where the trip leg ends.
 *
 * @param {OJP.TripLeg} selectedTripLeg - The TripLeg object from which to extract the vehicle access information for the destination stop point.
 * @returns {Promise<string>} - A promise that resolves to a string describing the vehicle access information.
 *                              Returns "NO_DATA" if no record is found, or if the access information is not available.
 */
export async function getStopPointVehicleAccessFromDestination(
  selectedTripLeg: OJP.TripLeg,
): Promise<string> {
  // Fetch the Behig record for the destination stop point
  const behigRecord = await getBehigRecordFromDestination(selectedTripLeg);

  // Return 'NO_DATA' if no Behig record is available
  if (!behigRecord) return "NO_DATA";

  // Check leg type and return corresponding access information
  if (
    selectedTripLeg.legType === "TransferLeg" ||
    selectedTripLeg.legType === "ContinousLeg"
  ) {
    return "WALK";
  } else if (
    behigRecord.bpvh_verkehrsmittel_text_de === "TRAIN" ||
    behigRecord.bpvh_verkehrsmittel_text_de === "ICE"
  ) {
    return behigRecord.haltekante_access_gerechnet ?? "NO_DATA"; // Default to 'NO_DATA' if null
  } else {
    return behigRecord.vehicleaccess ?? "NO_DATA"; // Default to 'NO_DATA' if null
  }
}
