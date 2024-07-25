import { fetchStopPointsRedis } from "@/app/demo/fetchStopPointsRedis";

/**
 * Fetches stop points from Redis through the `fetchStopPointsRedis` function and processes the response.
 *
 * This function calls `fetchStopPointsRedis` to retrieve stop points from Redis. It ensures that the response
 * is properly serialized into a JSON object for consistent data handling.
 *
 * @returns {Promise<any>} - A promise that resolves to the stop points data if found, or `null` if no data is available.
 */
export async function fetchStopPointsRedisClient(): Promise<any> {
  // Call the fetchStopPointsRedis function to get the stop points data
  let response = await fetchStopPointsRedis();

  // Convert the response to a JSON string and then parse it to ensure proper serialization
  return response ? JSON.parse(JSON.stringify(response)) : null;
}
