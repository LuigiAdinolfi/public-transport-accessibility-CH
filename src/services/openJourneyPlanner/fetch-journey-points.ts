import * as OJP from "ojp-sdk";

// Uncomment the line below if you need to use other location types in the future
// type LocationType = 'stop' | 'address' | 'poi' | 'topographicPlace';
type LocationType = "stop";

/**
 * Interface defining the structure of fetched locations grouped by type.
 * The `MapLocations` interface maps location types to arrays of OJP locations.
 * @interface MapLocations
 */
export interface MapLocations {
  [key: string]: OJP.Location[];
}

/**
 * Formats the location name by removing any content within parentheses.
 *
 * This helper function removes any text enclosed in parentheses from the location name
 * and trims any leading or trailing whitespace.
 *
 * @param {string | null} locationName - The name of the location to be formatted.
 * @returns {string} The formatted location name. Returns "N/A" if the input is null.
 */
const formatLocationName = (locationName: string | null): string => {
  if (locationName === null) {
    return "N/A";
  }
  return locationName
    .replace(/\s*\(.*?\)\s*/g, "") // Remove text within parentheses and surrounding spaces
    .replace(/\)\s*$/, "") // Remove trailing closing parentheses if any
    .trim(); // Remove leading and trailing whitespace
};

/**
 * Asynchronously fetches journey points based on a search term.
 *
 * This function creates a request to fetch location information from the OJP API based on the provided search term.
 * It retrieves the locations and groups them by type. The default type is 'stop', but you can modify this
 * to include other location types such as 'address', 'poi', or 'topographicPlace' if needed.
 *
 * @async
 * @function fetchJourneyPoints
 * @param {string} searchTerm - The term to search for journey points.
 * @returns {Promise<MapLocations>} A promise that resolves to an object containing fetched locations grouped by type.
 * @throws {Error} Throws an error if the fetch operation fails or if there is an issue with the response.
 */
export const fetchJourneyPoints = async (
  searchTerm: string,
): Promise<MapLocations> => {
  // Initialize the request with the search term and location types to fetch
  const request = OJP.LocationInformationRequest.initWithLocationName(
    OJP.DEFAULT_STAGE,
    searchTerm,
    // ['stop', 'address', 'poi', 'topographicPlace']
    ["stop"], // Modify this array to include other types if needed
  );

  // Perform the request and get the response
  const response = await request.fetchResponse();

  // Initialize the map to store locations grouped by type
  const mapLookupLocations: MapLocations = {
    stop: [],
    // address: [],
    // poi: [],
    // topographicPlace: [],
  };

  // Process each location in the response
  response.locations.forEach((location) => {
    const locationType = location.getLocationType() as LocationType;
    if (locationType === null) {
      return;
    }

    // Format the location name
    location.locationName = formatLocationName(location.locationName);

    // Add the location to the appropriate type array
    if (mapLookupLocations[locationType]) {
      mapLookupLocations[locationType].push(location);
    }
  });

  // Return the locations grouped by type
  return mapLookupLocations;
};
