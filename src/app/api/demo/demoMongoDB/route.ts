import { NextResponse } from "next/server";
import { fetchStopPointsMongoDB } from "@/app/demo/fetchStopPointsMongoDB";

export async function POST() {
  try {
    const stopPoints = await fetchStopPointsMongoDB();
    if (stopPoints) {
      return NextResponse.json(stopPoints);
    } else {
      return NextResponse.json({ error: "Failed to fetch stop points" });
    }
  } catch (error) {
    console.error("Error fetching stop points:", error);
    return NextResponse.json({ error: "Failed to fetch stop points" });
  }
}
