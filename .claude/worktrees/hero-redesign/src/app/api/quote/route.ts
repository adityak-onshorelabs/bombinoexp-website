import { NextRequest, NextResponse } from "next/server";
import { appendQuoteToSheet } from "@/lib/googleSheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await appendQuoteToSheet(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sheet append failed:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
