import { fetchStopPointFromLocalAPI } from "@/cache/fetchStopPointFromLocalAPI";

export async function fetchStopPointClient(sloid: string) {
  try {
    const { data, ok } = await fetchStopPointFromLocalAPI(sloid);

    if (!ok) {
      console.error(`Error fetching stop point for SLOID ${sloid}:`, data);
    }
    return data;
  } catch (error) {
    console.error(`Error fetching stop point for SLOID ${sloid}:`, error);
  }
}
