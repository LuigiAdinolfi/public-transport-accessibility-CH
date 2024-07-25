import { storeStopPointToDB } from "@/db/storeStopPointToDB";
import fetchAndStoreStopPointBySloidToDB from "@/lib/fetchAndStoreStopPointBySloidToDB";

/**
 * Fetches stop point data for a given SLOID from the API and stores it in the database.
 *
 * This function retrieves stop point data by appending the provided `sloid` to the API endpoint.
 * The fetched data is then stored in the database using the `storeStopPointToDB` function.
 *
 * @param {string} sloid - The SLOID (Service Location Identifier) used to query the stop point data from the API.
 * @returns {Promise<any | null>} A promise that resolves to the fetched stop point data, or `null` if the request fails.
 */
export default async function fetchStopPointBySloid(sloid: string) {
  try {
    // Fetch stop point data from the API and store it in the database
    return await fetchAndStoreStopPointBySloidToDB(
      "/prm-directory/v1/stop-points",
      storeStopPointToDB,
      sloid,
    );
  } catch (error) {
    // Log any errors encountered during the fetch or store process
    console.error(`Failed to fetch stop point for SLOID ${sloid}:`, error);
    return null;
  }
}
