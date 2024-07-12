import { fetchStopPointsRedis } from "@/app/demo/fetchStopPointsRedis";

export async function fetchStopPointsRedisClient(): Promise<any> {
  let response = await fetchStopPointsRedis();
  return response ? JSON.parse(JSON.stringify(response)) : null;
}
