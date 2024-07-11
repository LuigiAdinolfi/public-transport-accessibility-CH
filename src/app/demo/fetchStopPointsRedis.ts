import connectDB from "@/db/connectDB";
import StopPointToStoreForDemo from "@/models/stopPoint";
import redis from "@/cache/redisClient";

export async function fetchStopPointsRedis(): Promise<any> {
  const cacheKey = "stopPoints";
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log("Redis: Returning cached data");
    const sloidList = JSON.parse(cachedData);
    return await Promise.all(
      sloidList.map(async (sloid: string) => {
        const stopPointData = await redis.get(`stopPoint:${sloid}`);
        return JSON.parse(stopPointData || "{}");
      }),
    );
  }

  await connectDB();

  console.log("Redis: Fetching stop points data from MongoDB");
  const stopPointsModel = StopPointToStoreForDemo();
  const stopPointsFromDB = await stopPointsModel.find().lean();

  if (stopPointsFromDB && stopPointsFromDB.length > 0) {
    console.log("Data fetched from MongoDB:", stopPointsFromDB); // Log dei dati

    // Salva ogni stop point individualmente in Redis
    for (const stopPoint of stopPointsFromDB) {
      const stopPointKey = `stopPoint:${stopPoint.sloid}`;
      await redis.set(stopPointKey, JSON.stringify(stopPoint), "EX", 3600);
    }

    // Salva una lista di sloids per riferimento futuro
    const sloidList = stopPointsFromDB.map((sp) => sp.sloid);
    await redis.set(cacheKey, JSON.stringify(sloidList), "EX", 3600);

    return stopPointsFromDB;
  } else {
    console.log("No data found in MongoDB");
  }

  return null;
}
