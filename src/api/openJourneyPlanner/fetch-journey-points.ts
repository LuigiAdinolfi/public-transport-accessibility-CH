import * as OJP from "ojp-sdk";

// Uncomment the line below if you need to use other location types in the future
// type LocationType = 'stop' | 'address' | 'poi' | 'topographicPlace';
type LocationType = "stop";

/**
 * Interface defining the structure of fetched locations grouped by type.
 * @interface MapLocations
 */
export interface MapLocations {
  [key: string]: OJP.Location[];
}

/**
 * Asynchronously fetches journey points based on a search term.
 * @async
 * @function fetchJourneyPoints
 * @param {string} searchTerm - The term to search for journey points.
 * @returns {Promise<MapLocations>} A promise that resolves to the fetched locations grouped by type.
 * @throws Will throw an error if the fetch operation fails.
 */
export const fetchJourneyPoints = async (
  searchTerm: string,
): Promise<MapLocations> => {
  const request = OJP.LocationInformationRequest.initWithLocationName(
    OJP.DEFAULT_STAGE,
    searchTerm,
    // ['stop', 'address', 'poi', 'topographicPlace']
    ["stop"], // Uncomment and modify the array to fetch other types of locations
  );
  const response = await request.fetchResponse();

  const mapLookupLocations: MapLocations = {
    stop: [],
    // address: [],
    // poi: [],
    // topographicPlace: [],
  };

  response.locations.forEach((location) => {
    const locationType = location.getLocationType() as LocationType;
    if (locationType === null) {
      return;
    }

    if (mapLookupLocations[locationType]) {
      mapLookupLocations[locationType].push(location);
    }
  });

  return mapLookupLocations;
};
