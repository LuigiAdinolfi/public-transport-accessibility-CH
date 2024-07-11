import { NextResponse } from "next/server";
import { fetchStopPointsRedis } from "@/app/demo/fetchStopPointsRedis";

export async function POST() {
  try {
    const stopPoints = await fetchStopPointsRedis();
    if (stopPoints) {
      console.log("Returning stop points data:", stopPoints); // Log dei dati
      return NextResponse.json(stopPoints);
    } else {
      return NextResponse.json({ error: "Failed to fetch stop points" });
    }
  } catch (error) {
    console.error("Error fetching stop points:", error);
    return NextResponse.json({ error: "Failed to fetch stop points" });
  }
}
