import * as OJP from "ojp-sdk";
import { usePlatformStore } from "@/store/usePlatformStore";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import fetchPlatformsBySloid from "@/api/atlas/prm-directory/fetchPlatformsBySloid";

export async function getPlatformFromOrigin(selectedTripLeg: OJP.TripLeg) {
  const { setPlatformOrigin } = usePlatformStore.getState();
  if (!selectedTripLeg) return {};

  const sloid = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.fromStopPoint.location.stopPlace?.stopPlaceRef ?? ""
    : "";

  if (sloid.startsWith("ch:1:")) {
    const platformResponse = await fetchPlatformsBySloid(sloid);
    setPlatformOrigin(platformResponse);
    return platformResponse;
  }
  return {};
}

export async function getPlatformFromDestination(selectedTripLeg: OJP.TripLeg) {
  const { setPlatformDestination } = usePlatformStore.getState();
  if (!selectedTripLeg) return {};

  const sloid = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.toStopPoint.location.stopPlace?.stopPlaceRef ?? ""
    : "";

  if (sloid.startsWith("ch:1:")) {
    const platformResponse = await fetchPlatformsBySloid(sloid);
    setPlatformDestination(platformResponse);
    return platformResponse;
  }
  return {};
}
