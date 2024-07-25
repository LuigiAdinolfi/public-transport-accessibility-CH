import { fetchStopPointsMongoDB } from "@/app/demo/fetchStopPointsMongoDB";

/**
 * Fetches stop points from MongoDB through the `fetchStopPointsMongoDB` function and processes the response.
 *
 * This function calls `fetchStopPointsMongoDB` to retrieve stop points from MongoDB and ensures the response
 * is properly serialized into a JSON object.
 *
 * @returns {Promise<any>} - A promise that resolves to the stop points data if successful, or `null` if no data is retrieved.
 */
export async function fetchStopPointsMongoDBClient(): Promise<any> {
  // Call the fetchStopPointsMongoDB function to get the stop points data
  const response = await fetchStopPointsMongoDB();

  // Convert the response to a JSON string and then parse it to ensure proper serialization
  return response ? JSON.parse(JSON.stringify(response)) : null;
}
