import { storeStopPointToDBForDemo } from "@/db/storeStopPointToDBForDemo";
import fetchAndStoreStopPointsToDB from "@/lib/fetchAndStoreStopPointsToDB";

/**
 * Fetches stop points data from the API and stores it in the demo database.
 *
 * This function retrieves stop point data from the API endpoint and stores it in a demo database
 * using the `storeStopPointToDBForDemo` function. This is typically used for testing or demo purposes.
 *
 * @returns {Promise<any | null>} A promise that resolves to the fetched stop point data or `null` if the request fails.
 */
export default async function fetchStopPointsForDemo(): Promise<any | null> {
  try {
    // Fetch stop points data from the API and store it in the demo database
    return await fetchAndStoreStopPointsToDB(
      "/prm-directory/v1/stop-points",
      storeStopPointToDBForDemo,
    );
  } catch (error) {
    // Log any errors encountered during the fetch or store process
    console.error(`Failed to fetch stop points:`, error);
    return null;
  }
}
