import connectDB from "@/db/connectDB";
import StopPointToStoreForDemo from "@/models/stopPointForDemo";
import fetchStopPointsForDemo from "@/services/atlas/prm-directory/fetchStopPointsForDemo";
import { storeStopPointToDBForDemo } from "@/db/storeStopPointToDBForDemo";

export async function fetchStopPointsMongoDB(): Promise<any> {
  await connectDB();

  const StopPointModel = StopPointToStoreForDemo();

  // Fetch from API
  const stopPoints = await fetchStopPointsForDemo();
  if (stopPoints) {
    const selectedFields = storeStopPointToDBForDemo([stopPoints]);
    for (const item of selectedFields) {
      await StopPointModel.updateOne(
        { id: item.id },
        { $set: item },
        { upsert: true },
      );
    }
    console.log(
      "Selected fields saved to MongoDB with upsert (fetchStopPointsMongoDB)",
    );
    return stopPoints;
  }

  return null;
}
