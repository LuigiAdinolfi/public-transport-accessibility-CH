import { fetchPlatformFromLocalAPI } from "@/cache/fetchPlatformFromLocalAPI";

/**
 * Fetches platform data from the server using the provided SLOID.
 * @param {string} sloid - The SLOID (Service Location IDentifier) to fetch platform data for.
 * @returns {Promise<any>} The platform data retrieved from the server.
 * @throws {Error} If the fetch request fails or the response is not OK.
 */
export async function fetchPlatformClient(sloid: string): Promise<any> {
  try {
    const { data, ok } = await fetchPlatformFromLocalAPI(sloid);

    if (!ok) {
      console.error(
        `Failed to fetch platform for SLOID ${sloid}: ${data.message}`,
      );
      throw new Error("Failed to fetch platform");
    }
    return data;
  } catch (error) {
    console.error(`Error fetching platform for SLOID ${sloid}:`, error);
    throw error;
  }
}
