import * as OJP from "ojp-sdk";
import { BehigRecord } from "@/types/BehigRecord";
import { useBehigRecordStore } from "@/store/useBehigRecordStore";
import fetchFromExplorerAPI from "@/api/explorer/fetchFromExplorerAPI";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";

/**
 * Fetches the BehigRecord for the origin stop point of a given TripLeg.
 * @param {OJP.TripLeg} selectedTripLeg - The TripLeg object to get the BehigRecord from.
 * @returns {Promise<BehigRecord>} - The BehigRecord of the origin stop point.
 */
export async function getBehigRecordFromOrigin(
  selectedTripLeg: OJP.TripLeg,
): Promise<BehigRecord> {
  const { setBehigRecord } = useBehigRecordStore.getState();
  if (!selectedTripLeg) return {} as BehigRecord;

  const stopPlaceRef = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.fromStopPoint.location.stopPlace?.stopPlaceRef ?? "N/A"
    : "N/A";

  const stopPlaceName = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.fromStopPoint.location.stopPlace?.stopPlaceName ?? "N/A"
    : "N/A";

  const sloid = stopPlaceRef.startsWith("ch:1:") ? stopPlaceRef : stopPlaceName;

  const behigRecordResponse = await fetchFromExplorerAPI(sloid);
  setBehigRecord(behigRecordResponse.results[0]);

  return behigRecordResponse.results
    ? behigRecordResponse.results[0]
    : ({} as BehigRecord);
}

/**
 * Fetches the BehigRecord for the destination stop point of a given TripLeg.
 * @param {OJP.TripLeg} selectedTripLeg - The TripLeg object to get the BehigRecord from.
 * @returns {Promise<BehigRecord>} - The BehigRecord of the destination stop point.
 */
export async function getBehigRecordFromDestination(
  selectedTripLeg: OJP.TripLeg,
): Promise<BehigRecord> {
  if (!selectedTripLeg) return {} as BehigRecord;

  const stopPlaceRef = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.toStopPoint.location.stopPlace?.stopPlaceRef ?? "N/A"
    : "N/A";

  const stopPlaceName = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.toStopPoint.location.stopPlace?.stopPlaceName ?? "N/A"
    : "N/A";

  const sloid = stopPlaceRef.startsWith("ch:1:") ? stopPlaceRef : stopPlaceName;

  const behigRecordResponse = await fetchFromExplorerAPI(sloid);
  console.log("BehigRecordResponse: ", behigRecordResponse);

  return behigRecordResponse.results
    ? behigRecordResponse.results[0]
    : ({} as BehigRecord);
}
