import { usePlatformStore } from "@/store/usePlatformStore";
import { isTripTimedLeg } from "@/utils/isTripTimedLeg";
import { getPlatformData } from "@/cache/getPlatformData";
import fetchFromExplorerAPI from "@/services/explorer/fetchFromExplorerAPI";

/**
 * Retrieves and caches platform information for the origin stop of a trip leg.
 * This function first attempts to fetch platform data from the cache or database.
 * If not available, it fetches from an external API and caches the result.
 *
 * @param {any} selectedTripLeg - The selected trip leg object which includes information about the origin stop.
 * @returns {Promise<any>} A promise that resolves to the platform information or an empty object if not found.
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
    try {
      const platform = await getPlatformData(sloid);
      setPlatformOrigin(platform); // Update platform in state
      return platform; // Return fetched platform data
    } catch (error) {
      console.error(
        `Error fetching platform for origin sloid ${sloid}:`,
        error,
      );
      return {}; // Return empty object if error occurs
    }
  } else {
    // Fetch platform data from Explorer API if sloid not prefixed with ch:1:
    const platformFromBehig = await fetchFromExplorerAPI(stopPlaceName);
    if (platformFromBehig) {
      // Check if results exist and fetch platform using the first result's sloid
      if (platformFromBehig.results && platformFromBehig.results.length > 0) {
        const sloid = platformFromBehig.results[0].kanten_sloid;
        if (!sloid) return {}; // Return empty object if sloid is missing
        try {
          const platform = await getPlatformData(sloid);
          setPlatformOrigin(platform); // Update platform in state
          return platform; // Return fetched platform data
        } catch (error) {
          console.error(`Error fetching platform for sloid ${sloid}:`, error);
          return {}; // Return empty object if error occurs
        }
      }
    } else {
      console.error("No results found in platformFromBehig");
      return {}; // Return empty object if no results from Explorer API
    }
  }
}

/**
 * Retrieves and caches platform information for the destination stop of a trip leg.
 * This function first attempts to fetch platform data from the cache or database.
 * If not available, it fetches from an external API and caches the result.
 *
 * @param {any} selectedTripLeg - The selected trip leg object which includes information about the destination stop.
 * @returns {Promise<any>} A promise that resolves to the platform information or an empty object if not found.
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
    try {
      // Fetch platform data using the sloid
      const platform = await getPlatformData(sloid);
      setPlatformDestination(platform); // Update platform in state
      return platform; // Return fetched platform data
    } catch (error) {
      console.error(
        `Error fetching platform for destination sloid ${sloid}:`,
        error,
      );
      return {}; // Return empty object if error occurs
    }
  } else {
    // Fetch platform data from Explorer API if sloid not prefixed with ch:1:
    const platformFromBehig = await fetchFromExplorerAPI(stopPlaceName);
    if (platformFromBehig) {
      // Check if results exist and fetch platform using the first result's sloid
      if (platformFromBehig.results && platformFromBehig.results.length > 0) {
        const sloid = platformFromBehig.results[0].kanten_sloid;
        if (!sloid) return {}; // Return empty object if sloid is missing
        try {
          const platform = await getPlatformData(sloid);
          setPlatformDestination(platform); // Update platform in state
          return platform; // Return fetched platform data
        } catch (error) {
          console.error(`Error fetching platform for sloid ${sloid}:`, error);
          return {}; // Return empty object if error occurs
        }
      }
    } else {
      console.error("No results found in platformFromBehig");
      return {}; // Return empty object if no results from Explorer API
    }
  }
}
