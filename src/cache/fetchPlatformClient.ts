import { fetchPlatformFromLocalAPI } from "@/cache/fetchPlatformFromLocalAPI";

/**
 * Fetches platform data from the server using the provided SLOID.
 * This function calls a local API to get the platform data for a given SLOID.
 * If the fetch request fails or the response is not OK, an error is thrown.
 *
 * @param {string} sloid - The SLOID (Service Location IDentifier) to fetch platform data for.
 * @returns {Promise<any>} A promise that resolves to the platform data retrieved from the server.
 * @throws {Error} If the fetch request fails or the response is not OK.
 */
export async function fetchPlatformClient(sloid: string) {
  try {
    const { data, ok } = await fetchPlatformFromLocalAPI(sloid);

    // Check if the response was successful
    if (!ok) {
      console.error(`Error fetching platform for SLOID ${sloid}:`, data);
    }

    return data;
  } catch (error) {
    // Log the error and rethrow it
    console.error(`Error fetching platform for SLOID ${sloid}:`, error);
    throw error;
  }
}
