import { useStopPointStore } from "@/store/useStopPointStore";
import { fetchStopPointClient } from "@/cache/fetchStopPointClient";

export async function getCachedStopPoint(sloid: string) {
  const { setStopPoint } = useStopPointStore.getState();
  if (!sloid) return {};

  if (sloid.startsWith("ch:1:")) {
    try {
      const stopPoint = await fetchStopPointClient(sloid);
      setStopPoint(stopPoint);
      return stopPoint;
    } catch (error) {
      console.error(`Error fetching stop point for SLOID ${sloid}:`, error);
      return {};
    }
  } else {
    console.error(`SLOID ${sloid} does not start with ch:1:`);
    return {};
  }
}
