import * as OJP from "ojp-sdk";
import { BehigRecord } from "@/types/BehigRecord";
import { useBehigRecordStore } from "@/store/useBehigRecordStore";
import fetchFromExplorerAPI from "@/services/explorer/fetchFromExplorerAPI";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";

/**
 * Fetches the BehigRecord for the origin stop point of a given TripLeg.
 *
 * This function retrieves the BehigRecord for the origin stop point of a trip leg by:
 * 1. Extracting the stop place reference or name from the `selectedTripLeg` object.
 * 2. Using the stop place reference or name to fetch data from the Explorer API.
 * 3. Updating the BehigRecord in the state store.
 * 4. Logging the response for debugging purposes.
 *
 * @param {OJP.TripLeg} selectedTripLeg - The TripLeg object to get the BehigRecord from.
 * @returns {Promise<BehigRecord>} - A promise that resolves to the BehigRecord of the origin stop point.
 */
export async function getBehigRecordFromOrigin(
  selectedTripLeg: OJP.TripLeg,
): Promise<BehigRecord> {
  const { setBehigRecord } = useBehigRecordStore.getState();

  // Return an empty BehigRecord if the selectedTripLeg is falsy
  if (!selectedTripLeg) return {} as BehigRecord;

  // Extract stop place reference and name
  const stopPlaceRef = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.fromStopPoint.location.stopPlace?.stopPlaceRef ?? "N/A"
    : "N/A";

  const stopPlaceName = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.fromStopPoint.location.stopPlace?.stopPlaceName ?? "N/A"
    : "N/A";

  // Return an empty BehigRecord if stopPlaceName starts with a number
  if (/^[0-9]/.test(stopPlaceName)) {
    return {} as BehigRecord;
  }

  // Determine the sloid based on the stopPlaceRef or stopPlaceName
  const sloid = stopPlaceRef.startsWith("ch:1:") ? stopPlaceRef : stopPlaceName;

  // Fetch the BehigRecord from the Explorer API
  const behigRecordResponse = await fetchFromExplorerAPI(sloid);

  // Update the state store with the fetched BehigRecord
  setBehigRecord(behigRecordResponse.results[0]);

  // Log the response for debugging
  console.log("BehigRecordResponseOrigin: ", behigRecordResponse);

  // Return the BehigRecord if available, otherwise return an empty BehigRecord
  return behigRecordResponse.results
    ? behigRecordResponse.results[0]
    : ({} as BehigRecord);
}

/**
 * Fetches the BehigRecord for the destination stop point of a given TripLeg.
 *
 * This function retrieves the BehigRecord for the destination stop point of a trip leg by:
 * 1. Extracting the stop place reference or name from the `selectedTripLeg` object.
 * 2. Using the stop place reference or name to fetch data from the Explorer API.
 * 3. Updating the BehigRecord in the state store.
 * 4. Logging the response for debugging purposes.
 *
 * @param {OJP.TripLeg} selectedTripLeg - The TripLeg object to get the BehigRecord from.
 * @returns {Promise<BehigRecord>} - A promise that resolves to the BehigRecord of the destination stop point.
 */
export async function getBehigRecordFromDestination(
  selectedTripLeg: OJP.TripLeg,
): Promise<BehigRecord> {
  const { setBehigRecord } = useBehigRecordStore.getState();

  // Return an empty BehigRecord if the selectedTripLeg is falsy
  if (!selectedTripLeg) return {} as BehigRecord;

  // Extract stop place reference and name
  const stopPlaceRef = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.toStopPoint.location.stopPlace?.stopPlaceRef ?? "N/A"
    : "N/A";

  const stopPlaceName = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.toStopPoint.location.stopPlace?.stopPlaceName ?? "N/A"
    : "N/A";

  // Return an empty BehigRecord if stopPlaceName starts with a number
  if (/^[0-9]/.test(stopPlaceName)) {
    return {} as BehigRecord;
  }

  // Determine the sloid based on the stopPlaceRef or stopPlaceName
  const sloid = stopPlaceRef.startsWith("ch:1:") ? stopPlaceRef : stopPlaceName;

  // Fetch the BehigRecord from the Explorer API
  const behigRecordResponse = await fetchFromExplorerAPI(sloid);

  // Update the state store with the fetched BehigRecord
  setBehigRecord(behigRecordResponse.results[0]);

  // Log the response for debugging
  console.log("BehigRecordResponseDestination: ", behigRecordResponse);

  // Return the BehigRecord if available, otherwise return an empty BehigRecord
  return behigRecordResponse.results
    ? behigRecordResponse.results[0]
    : ({} as BehigRecord);
}
