export async function fetchStopPointsMongoDBClient(): Promise<any> {
  const response = await fetch("/api/demo/demoMongoDB", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch stop point");
  }

  return response.json();
}
