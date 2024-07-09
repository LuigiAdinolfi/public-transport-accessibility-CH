import { usePlatformStore } from "@/store/usePlatformStore";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import { fetchPlatformClient } from "@/cache/fetchPlatformClient";
import fetchFromExplorerAPI from "@/api/explorer/fetchFromExplorerAPI";

/**
 * Retrieves and caches platform information for the origin stop of a trip leg.
 * @param {any} selectedTripLeg - The selected trip leg object.
 * @returns {Promise<any>} The platform information retrieved or an empty object if not found.
 */
export async function getCachedPlatformFromOrigin(
  selectedTripLeg: any,
): Promise<any> {
  const { setPlatformOrigin } = usePlatformStore.getState();
  // Return early if selectedTripLeg is falsy
  if (!selectedTripLeg) return {};

  // Determine stop place reference and name based on whether it's a timed leg
  const stopPlaceRef = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.fromStopPoint.location.stopPlace?.stopPlaceRef ?? ""
    : "";
  const stopPlaceName = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.fromStopPoint.location.stopPlace?.stopPlaceName ?? ""
    : "";

  // Use ch:1: prefixed sloid if available, otherwise use stopPlaceName
  const sloid = stopPlaceRef.startsWith("ch:1:") ? stopPlaceRef : stopPlaceName;

  if (sloid.startsWith("ch:1:")) {
    // Fetch platform data using the sloid
    const platform = await fetchPlatformClient(sloid);
    setPlatformOrigin(platform); // Update platform in state
    return platform; // Return fetched platform data
  } else {
    // Fetch platform data from Explorer API if sloid not prefixed with ch:1:
    const platformFromBehig = await fetchFromExplorerAPI(stopPlaceName);
    if (platformFromBehig) {
      // Check if results exist and fetch platform using the first result's sloid
      if (platformFromBehig.results && platformFromBehig.results.length > 0) {
        const sloid = platformFromBehig.results[0].kanten_sloid;
        if (!sloid) return {}; // Return empty object if sloid is missing
        const platform = await fetchPlatformClient(sloid);
        setPlatformOrigin(platform); // Update platform in state
        return platform; // Return fetched platform data
      }
    } else {
      console.error("No results found in platformFromBehig");
      return {}; // Return empty object if no results from Explorer API
    }
  }
}

/**
 * Retrieves and caches platform information for the destination stop of a trip leg.
 * @param {any} selectedTripLeg - The selected trip leg object.
 * @returns {Promise<any>} The platform information retrieved or an empty object if not found.
 */
export async function getCachedPlatformFromDestination(
  selectedTripLeg: any,
): Promise<any> {
  const { setPlatformDestination } = usePlatformStore.getState();
  // Return early if selectedTripLeg is falsy
  if (!selectedTripLeg) return {};

  // Determine stop place reference and name based on whether it's a timed leg
  const stopPlaceRef = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.toStopPoint.location.stopPlace?.stopPlaceRef ?? ""
    : "";
  const stopPlaceName = isTripTimedLeg(selectedTripLeg)
    ? selectedTripLeg.toStopPoint.location.stopPlace?.stopPlaceName ?? ""
    : "";

  // Use ch:1: prefixed sloid if available, otherwise use stopPlaceName
  const sloid = stopPlaceRef.startsWith("ch:1:") ? stopPlaceRef : stopPlaceName;

  if (sloid.startsWith("ch:1:")) {
    // Fetch platform data using the sloid
    const platform = await fetchPlatformClient(sloid);
    setPlatformDestination(platform); // Update platform in state
    return platform; // Return fetched platform data
  } else {
    // Fetch platform data from Explorer API if sloid not prefixed with ch:1:
    const platformFromBehig = await fetchFromExplorerAPI(stopPlaceName);
    if (platformFromBehig) {
      // Check if results exist and fetch platform using the first result's sloid
      if (platformFromBehig.results && platformFromBehig.results.length > 0) {
        const sloid = platformFromBehig.results[0].kanten_sloid;
        if (!sloid) return {}; // Return empty object if sloid is missing
        const platform = await fetchPlatformClient(sloid);
        setPlatformDestination(platform); // Update platform in state
        return platform; // Return fetched platform data
      }
    } else {
      console.error("No results found in platformFromBehig");
      return {}; // Return empty object if no results from Explorer API
    }
  }
}
