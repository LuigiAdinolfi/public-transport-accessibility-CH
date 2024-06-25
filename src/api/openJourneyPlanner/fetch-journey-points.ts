import * as OJP from "ojp-sdk";

/**
 * Type representing different location types.
 * @type {'stop' | 'address' | 'poi' | 'topographicPlace'} LocationType
 */
type LocationType = 'stop' | 'address' | 'poi' | 'topographicPlace';

/**
 * Interface defining the structure of fetched locations grouped by type.
 * @interface MapLocations
 */
export interface MapLocations {
  [key: string]: OJP.Location[];
}

/**
 * Asynchronously fetches journey points based on a search term.
 * @param {string} searchTerm - The term to search for journey points.
 * @returns {Promise<MapLocations>} A promise resolving to the fetched locations grouped by type.
 */
export const fetchJourneyPoints = async (searchTerm: string): Promise<MapLocations> => {
  const request = OJP.LocationInformationRequest.initWithLocationName(
    OJP.DEFAULT_STAGE,
    searchTerm,
    ['stop', 'address', 'poi', 'topographicPlace']
  );
  const response = await request.fetchResponse();

  const mapLookupLocations: MapLocations = {
    address: [],
    poi: [],
    stop: [],
    topographicPlace: [],
  };

  response.locations.forEach(location => {
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
