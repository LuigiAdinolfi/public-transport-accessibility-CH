import fetchAndStorePlatformBySloidToDB from "@/lib/fetchAndStorePlatformBySloidToDB";
import { storePlatformToDB } from "@/db/storePlatformToDB";

/**
 * Fetches platform data for a given SLOID from the API and stores it in the database.
 *
 * This function retrieves platform data using the provided `sloid` by appending it to the API endpoint.
 * The fetched data is then stored in the database using the `storePlatformToDB` function.
 *
 * @param {string} sloid - The SLOID used to query the platform data from the API.
 * @returns {Promise<any | null>} A promise that resolves to the fetched platform data, or `null` if the request fails.
 */
export default async function fetchPlatformBySloid(
  sloid: string,
): Promise<any | null> {
  try {
    // Fetch platform data from the API and store it in the database
    return await fetchAndStorePlatformBySloidToDB(
      "/prm-directory/v1/platforms",
      storePlatformToDB,
      sloid,
    );
  } catch (error) {
    // Log any errors encountered during the fetch or store process
    console.error(`Failed to fetch platform data for SLOID ${sloid}:`, error);
    return null;
  }
}
