import * as OJP from "ojp-sdk";
import { usePlatformStore } from "@/store/usePlatformStore";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import fetchPlatformBySloid from "@/services/atlas/prm-directory/fetchPlatformBySloid";

export async function fetchPlatformFromOrigin(selectedTripLeg: OJP.TripLeg) {
  const { setPlatformOrigin } = usePlatformStore.getState();
  if (!selectedTripLeg) return {};

  const sloid = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.fromStopPoint.location.stopPlace?.stopPlaceRef ?? ""
    : "";

  if (sloid.startsWith("ch:1:")) {
    const platformResponse = await fetchPlatformBySloid(sloid);
    setPlatformOrigin(platformResponse);
    return platformResponse;
  }
  return {};
}

export async function fetchPlatformFromDestination(
  selectedTripLeg: OJP.TripLeg,
) {
  const { setPlatformDestination } = usePlatformStore.getState();
  if (!selectedTripLeg) return {};

  const sloid = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.toStopPoint.location.stopPlace?.stopPlaceRef ?? ""
    : "";

  if (sloid.startsWith("ch:1:")) {
    const platformResponse = await fetchPlatformBySloid(sloid);
    setPlatformDestination(platformResponse);
    return platformResponse;
  }
  return {};
}
