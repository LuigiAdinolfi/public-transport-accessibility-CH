import { storeStopPointToDBForDemo } from "@/db/storeStopPointToDBForDemo";
import StopPointToStoreForDemo from "@/models/stopPoint";
import fetchAndStoreDataToDB from "@/lib/fetchAndStoreDataToDB";

export default async function fetchStopPointsForDemo(): Promise<any | null> {
  try {
    return await fetchAndStoreDataToDB(
      "/prm-directory/v1/stop-points",
      storeStopPointToDBForDemo,
      StopPointToStoreForDemo,
    );
  } catch (error) {
    console.error(`Failed to fetch stop points:`, error);
    return null;
  }
}
