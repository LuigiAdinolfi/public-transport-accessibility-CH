import { fetchStopPointFromLocalAPI } from "@/cache/fetchStopPointFromLocalAPI";

/**
 * Fetches stop point data from the server using the provided SLOID.
 * Utilizes a local API to retrieve the data and handles errors appropriately.
 *
 * @param {string} sloid - The SLOID (Service Location IDentifier) to fetch stop point data for.
 * @returns {Promise<any>} A promise that resolves to the stop point data retrieved from the server.
 * @throws {Error} If the fetch request fails or if there is an error in retrieving the data.
 */
export async function fetchStopPointClient(sloid: string) {
  try {
    // Fetch stop point data from local API
    const { data, ok } = await fetchStopPointFromLocalAPI(sloid);

    if (!ok) {
      // Log an error message if the request was unsuccessful
      console.error(`Error fetching stop point for SLOID ${sloid}:`, data);
    }

    // Return the fetched data
    return data;
  } catch (error) {
    // Log any errors that occur during the fetch operation
    console.error(`Error fetching stop point for SLOID ${sloid}:`, error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
