import { NextResponse } from "next/server";

const EXPRESS_URL = "https://bombino.onshorelabs.co.in/api/rates";

export async function POST(request: Request) {
  try {
    const { destination, weight, pieces = "1", origin = "IN" } =
      await request.json();

    const upstream = await fetch(EXPRESS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_code: "SPX",
        destination_code: destination,
        origin_code: origin,
        actual_weight: weight,
        pcs: pieces,
      }),
    });

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Rates proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch live vendor rates" },
      { status: 502 },
    );
  }
}
