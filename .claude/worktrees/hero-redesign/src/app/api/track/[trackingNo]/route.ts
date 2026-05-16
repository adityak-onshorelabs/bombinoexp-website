import { NextResponse } from "next/server";

const UPSTREAM_BASE = "https://bombino.onshorelabs.co.in/api/track";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ trackingNo: string }> }
) {
  const { trackingNo } = await params;

  try {
    const upstream = await fetch(
      `${UPSTREAM_BASE}/${encodeURIComponent(trackingNo)}`,
      { cache: "no-store" }
    );

    const data = await upstream.json();

    return NextResponse.json(data, {
      status: upstream.status,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("Track proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tracking data" },
      { status: 502 }
    );
  }
}
