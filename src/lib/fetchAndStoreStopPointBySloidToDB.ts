import { Document } from "mongoose";
import connectDB from "@/db/connectDB";
import fetchFromAPIBySloid from "@/lib/fetchFromAPIBySloid";
import StopPointToStore from "@/models/stopPoint";

export default async function fetchAndStoreStopPointBySloidToDB<
  T extends Document,
>(endpoint: string, selectFieldsFn: (data: any[]) => T[], sloid: string) {
  console.log(`fetchAndStoreStopPointBySloidToDB called with sloid: ${sloid}`);
  await connectDB();

  try {
    console.log(
      `Fetching data from endpoint: ${endpoint} with sloid: ${sloid}`,
    );
    const response = await fetchFromAPIBySloid(endpoint, sloid);

    if (response) {
      let data = Array.isArray(response)
        ? response
        : response.objects
          ? response.objects
          : [response];
      console.log("Data fetched successfully, processing data...");

      const selectedFields = selectFieldsFn(data);

      const StopPointModel = StopPointToStore();
      for (const item of selectedFields) {
        console.log(`Upserting item with ID: ${item.id}`);
        await StopPointModel.updateOne(
          { id: item.id },
          { $set: item },
          { upsert: true },
        );
      }

      console.log("Selected fields saved to MongoDB with upsert (by sloid)");
      return response;
    } else {
      console.error("Invalid response structure:", response);
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch or save data:", error);
    return null;
  }
}
