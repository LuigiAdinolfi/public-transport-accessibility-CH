import { storeStopPointToDBForDemo } from "@/db/storeStopPointToDBForDemo";
import fetchAndStoreStopPointsToDB from "@/lib/fetchAndStoreStopPointsToDB";

export default async function fetchStopPointsForDemo(): Promise<any | null> {
  try {
    return await fetchAndStoreStopPointsToDB(
      "/prm-directory/v1/stop-points",
      storeStopPointToDBForDemo,
    );
  } catch (error) {
    console.error(`Failed to fetch stop points:`, error);
    return null;
  }
}
