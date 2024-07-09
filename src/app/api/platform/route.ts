import { NextRequest, NextResponse } from "next/server";
import { fetchPlatform } from "@/cache/fetchPlatform";

export async function POST(request: NextRequest) {
  try {
    const { sloid } = await request.json();
    if (!sloid) {
      return NextResponse.json({ error: "Invalid sloid" }, { status: 400 });
    }

    const platform = await fetchPlatform(sloid);
    if (platform) {
      return NextResponse.json(platform);
    } else {
      return NextResponse.json(
        { error: "Platform not found" },
        { status: 404 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
