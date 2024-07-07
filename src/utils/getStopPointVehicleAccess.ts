import * as OJP from "ojp-sdk";
import {
  getBehigRecordFromDestination,
  getBehigRecordFromOrigin,
} from "@/utils/getBehigRecord";

/**
 * Fetches the vehicle access information for the origin stop point of a given TripLeg.
 * @param {OJP.TripLeg} selectedTripLeg - The TripLeg object to get the vehicle access information from.
 * @returns {Promise<string>} - The vehicle access information of the origin stop point.
 */
export async function getStopPointVehicleAccessFromOrigin(
  selectedTripLeg: OJP.TripLeg,
): Promise<string> {
  const behigRecord = await getBehigRecordFromOrigin(selectedTripLeg);
  if (
    selectedTripLeg.legType === "TransferLeg" ||
    selectedTripLeg.legType === "ContinousLeg"
  ) {
    return "WALK";
  } else if (behigRecord.bpvh_verkehrsmittel_text_de === "TRAIN") {
    return behigRecord.haltekante_access_gerechnet ?? "NO_DATA"; // Default to 'NO_DATA' if null
  } else {
    return behigRecord.vehicleaccess ?? "NO_DATA"; // Default to 'NO_DATA' if null
  }
}

/**
 * Fetches the vehicle access information for the destination stop point of a given TripLeg.
 * @param {OJP.TripLeg} selectedTripLeg - The TripLeg object to get the vehicle access information from.
 * @returns {Promise<string>} - The vehicle access information of the destination stop point.
 */
export async function getStopPointVehicleAccessFromDestination(
  selectedTripLeg: OJP.TripLeg,
): Promise<string> {
  const behigRecord = await getBehigRecordFromDestination(selectedTripLeg);
  if (
    selectedTripLeg.legType === "TransferLeg" ||
    selectedTripLeg.legType === "ContinousLeg"
  ) {
    return "WALK";
  } else if (behigRecord.bpvh_verkehrsmittel_text_de === "TRAIN") {
    return behigRecord.haltekante_access_gerechnet ?? "NO_DATA"; // Default to 'NO_DATA' if null
  } else {
    return behigRecord.vehicleaccess ?? "NO_DATA"; // Default to 'NO_DATA' if null
  }
}
