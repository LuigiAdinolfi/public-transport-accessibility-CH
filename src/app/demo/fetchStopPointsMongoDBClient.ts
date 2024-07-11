import { fetchStopPointsMongoDB } from "@/app/demo/fetchStopPointsMongoDB";

export async function fetchStopPointsMongoDBClient(): Promise<any> {
  const response = await fetchStopPointsMongoDB();
  return response ? JSON.parse(JSON.stringify(response)) : null;
}
