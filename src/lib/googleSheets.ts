import { google } from "googleapis";

export type QuoteEntry = {
  fullName:      string;
  email:         string;
  phone:         string;
  originCountry: string;
  originCity:    string;
  originPincode: string;
  destCountry:   string;
  destCity:      string;
  destPincode:   string;
  shipmentType:  string;
  weight:        string;
  length:        string;
  width:         string;
  height:        string;
};

export async function appendQuoteToSheet(data: QuoteEntry) {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    key:   process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId:   process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range:           "Quotes!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toISOString(),
        data.fullName,
        data.email,
        data.phone,
        data.originCountry,
        data.originCity,
        data.originPincode,
        data.destCountry,
        data.destCity,
        data.destPincode,
        data.shipmentType,
        data.weight,
        `${data.length}x${data.width}x${data.height}`,
      ]],
    },
  });
}
