import { fetchParkingLotClient } from "@/cache/fetchParkingLotClient";
import { useParkingLotStore } from "@/store/useParkingLotStore";

/**
 * Retrieves parking lot data for the given parent service point SLOID.
 * If the SLOID starts with "ch:1:", it fetches the parking lot data from the client,
 * updates the store with the fetched data, and returns it.
 * If the SLOID does not start with "ch:1:" or an error occurs, returns an empty object.
 *
 * @param {string} parentServicePointSloid - The SLOID (Service Location IDentifier) to fetch parking lot data for.
 * @returns {Promise<any>} A promise that resolves to the parking lot data or an empty object if no data is available.
 */
export async function getCachedParkingLot(parentServicePointSloid: string) {
  // Get the state updater function from the parking lot store
  const { setParkingLot } = useParkingLotStore.getState();

  // Return an empty object if the SLOID is not provided
  if (!parentServicePointSloid) return {};

  // Check if the SLOID starts with "ch:1:"
  if (parentServicePointSloid.startsWith("ch:1:")) {
    try {
      // Fetch parking lot data using the client
      const parkingLot = await fetchParkingLotClient(parentServicePointSloid);
      // Update the store with the fetched parking lot data
      setParkingLot(parkingLot);
      // Return the fetched parking lot data
      return parkingLot;
    } catch (error) {
      // Log error if fetching fails
      console.log(
        `Error fetching parking lot for parentServicePointSloid ${parentServicePointSloid}:`,
        error,
      );
      return {};
    }
  }

  return {};
}
