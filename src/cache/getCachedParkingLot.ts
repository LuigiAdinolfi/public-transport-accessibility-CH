import { fetchParkingLotClient } from "@/cache/fetchParkingLotClient";
import { useParkingLotStore } from "@/store/useParkingLotStore";

export async function getCachedParkingLot(parentServicePointSloid: string) {
  const { setParkingLot } = useParkingLotStore.getState();
  if (!parentServicePointSloid) return {};

  if (parentServicePointSloid.startsWith("ch:1:")) {
    try {
      const parkingLot = await fetchParkingLotClient(parentServicePointSloid);
      setParkingLot(parkingLot);
      return parkingLot;
    } catch (error) {
      console.log(
        `Error fetching parking lot for parentServicePointSloid ${parentServicePointSloid}`,
      );
      return {};
    }
  }

  return {};
}
