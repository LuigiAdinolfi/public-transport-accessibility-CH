export async function fetchStopPointsRedisClient(): Promise<any> {
  const response = await fetch("/api/demo/demoRedis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch stop point");
  }

  const data = await response.json();
  console.log("Data fetched from Redis API:", data); // Log dei dati
  return data;
}
