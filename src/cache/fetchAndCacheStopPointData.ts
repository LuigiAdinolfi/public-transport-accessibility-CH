import { useStopPointStore } from "@/store/useStopPointStore";
import { getStopPointData } from "@/cache/getStopPointData";

/**
 * Retrieves and caches stop point information based on the provided SLOID (Service Location IDentifier).
 * This function first checks if the SLOID starts with the prefix `ch:1:`. If so, it fetches the stop point data
 * using the `getStopPointData` function and updates the stop point store. If the SLOID does not start with `ch:1:`,
 * an error is logged and an empty object is returned.
 *
 * @param {string} sloid - The SLOID (Service Location IDentifier) used to fetch stop point data.
 * @returns {Promise<any>} A promise that resolves to the stop point information or an empty object if not found.
 */
export async function fetchAndCacheStopPointData(sloid: string) {
  const { setStopPoint } = useStopPointStore.getState();

  // Return early if sloid is falsy
  if (!sloid) return {};

  // Check if sloid starts with the prefix 'ch:1:'
  if (sloid.startsWith("ch:1:")) {
    try {
      // Fetch stop point data using the sloid
      const stopPoint = await getStopPointData(sloid);
      setStopPoint(stopPoint); // Update the stop point in state
      return stopPoint; // Return the fetched stop point data
    } catch (error) {
      // Log error if fetching fails
      console.error(`Error fetching stop point for SLOID ${sloid}:`, error);
      return {}; // Return empty object if an error occurs
    }
  } else {
    // Log error if sloid does not start with 'ch:1:'
    console.error(`SLOID ${sloid} does not start with ch:1:`);
    return {}; // Return empty object if sloid is not valid
  }
}
