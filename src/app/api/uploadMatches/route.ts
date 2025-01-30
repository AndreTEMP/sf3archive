import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../server/db/index"; // Ensure correct path to DB connection
import { matches } from "../../../server/db/schema"; // Ensure correct path to schema

export async function POST(req: NextRequest) {
  try {
    const matchData = await req.json(); // Parse request body

    if (!Array.isArray(matchData) || matchData.length === 0) {
      return NextResponse.json({ message: "Invalid data format" }, { status: 400 });
    }

    // Insert data into the database using Drizzle ORM
    await db.insert(matches).values(matchData);

    return NextResponse.json({ message: "Matches uploaded successfully" }, { status: 200 });
  } catch (error) {
    console.error("Database insert error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
