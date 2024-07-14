import connectDB from "@/db/connectDB";
import fetchFromAPIByParentSloid from "@/lib/fetchFromAPIByParentSloid";
import ParkingLotToStore from "@/models/parkingLot";
import { Document } from "mongoose";

export default async function fetchAndStoreParkingLotsByParentSloid<
  T extends Document,
>(
  endpoint: string,
  selectFieldsFn: (data: any[]) => T[],
  parentSloid: string,
): Promise<any | null> {
  console.log(
    `fetchAndStoreParkingLotsByParentSloidToDB called with sloid: ${parentSloid}`,
  );
  await connectDB();

  try {
    console.log(
      `Fetching data from endpoint: ${endpoint} with sloid: ${parentSloid}`,
    );
    const response = await fetchFromAPIByParentSloid(endpoint, parentSloid);

    if (response) {
      let data = Array.isArray(response)
        ? response
        : response.objects
          ? response.objects
          : [response];
      console.log("Data fetched successfully, processing data...");

      const selectedFields = selectFieldsFn(data);

      const ParkingLotsModel = ParkingLotToStore();
      for (const item of selectedFields) {
        console.log(`Upserting item with ID: ${item.id}`);
        await ParkingLotsModel.updateOne(
          { id: item.id },
          { $set: item },
          { upsert: true },
        );
      }

      console.log(
        "Selected fields saved to MongoDB with upsert (by parentSloid)",
      );
      return response;
    } else {
      console.error("Invalid response structure:", response);
      return null;
    }
  } catch (error) {
    console.error(
      `Failed to fetch parking lots for parent SLOID ${parentSloid}:`,
      error,
    );
    return null;
  }
}
