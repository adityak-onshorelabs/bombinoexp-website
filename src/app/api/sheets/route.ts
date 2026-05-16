import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function makeAuth() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return oauth2Client;
}

export async function GET() {
  try {
    const sheets = google.sheets({ version: "v4", auth: makeAuth() });
    const meta   = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
      fields: "spreadsheetId,properties.title,sheets.properties(title,sheetId)",
    });
    return NextResponse.json({ ok: true, spreadsheet: meta.data });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...data } = body as { type: "contact" | "pickup" | "quote" | "customs"; [k: string]: string };

    const ts = new Date().toISOString();
    let row: string[];

    if (type === "contact") {
      row = [
        ts,
        data.name    ?? "",
        data.email   ?? "",
        data.phone   ?? "",
        data.company ?? "",
        data.message ?? "",
      ];
    } else if (type === "quote") {
      row = [
        ts,
        data.fullName      ?? "",
        data.email         ?? "",
        data.phone         ?? "",
        data.originCountry ?? "",
        data.originCity    ?? "",
        data.originPincode ?? "",
        data.destCountry   ?? "",
        data.destCity      ?? "",
        data.destPincode   ?? "",
        data.shipmentType  ?? "Quote Request",
        data.weight        ?? "",
        [data.length, data.width, data.height].filter(Boolean).join("x"),
      ];
    } else {
      row = [
        ts,
        data.pickupContact  ?? "",
        data.pickupEmail    ?? "",
        data.pickupPhone    ?? "",
        "India",
        data.pickupCity     ?? "",
        data.pickupPincode  ?? "",
        data.dropCountry    ?? "",
        data.dropCity       ?? "",
        data.dropPincode    ?? "",
        data.productType    ?? "Pickup Request",
        data.totalWeight    ?? "",
        `Pcs: ${data.noOfPieces ?? ""} | Date: ${data.pickupDate ?? ""} | ${data.readyTime ?? ""}–${data.closingTime ?? ""}`,
      ];
    }

    if (type === "customs") {
      row = [
        ts,
        data.awbNumber    ?? "",
        data.fullName     ?? "",
        data.email        ?? "",
        data.mobile       ?? "",
        data.shipmentType ?? "",
      ];
    }

    const sheetTab = type === "contact" ? "Contact"
      : type === "customs" ? "Request Clearance Assistance"
      : "Shipment Requests";

    const spreadsheetId = type === "customs"
      ? "1B4Lso6Jt5dL9eY0dAsPgnVgbIbia6AdmanYsyLYQKmQ"
      : process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

    const sheets = google.sheets({ version: "v4", auth: makeAuth() });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range:            `${sheetTab}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Sheet append failed:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
