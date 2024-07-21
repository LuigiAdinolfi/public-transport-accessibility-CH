import { fetchParkingLotFromLocalAPI } from "@/cache/fetchParkingLotFromLocalAPI";

export async function fetchParkingLotClient(parentServicePointSloid: string) {
  try {
    const { data, ok } = await fetchParkingLotFromLocalAPI(
      parentServicePointSloid,
    );

    if (!ok) {
      console.log(
        `Error fetching parking lots for parent SLOID ${parentServicePointSloid}:`,
        data,
      );
    }
    return JSON.parse(JSON.stringify(data)); // Ensure plain object
  } catch (error) {
    console.log(
      `Parking lot with parent SLOID ${parentServicePointSloid} not found!`,
    );
    return {}; // Return empty object on exception
  }
}
