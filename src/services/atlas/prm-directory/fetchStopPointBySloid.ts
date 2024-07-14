import { storeStopPointToDB } from "@/db/storeStopPointToDB";
import fetchAndStoreStopPointBySloidToDB from "@/lib/fetchAndStoreStopPointBySloidToDB";

export default async function fetchStopPointBySloid(sloid: string) {
  try {
    return await fetchAndStoreStopPointBySloidToDB(
      "/prm-directory/v1/stop-points",
      storeStopPointToDB,
      sloid,
    );
  } catch (error) {
    console.error(`Failed to fetch stop point for SLOID ${sloid}:`, error);
    return null;
  }
}
