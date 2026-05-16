import { readFileSync } from "fs";
import { join } from "path";
import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage, RGB } from "pdf-lib";

/* ─── Types ──────────────────────────────────────────────────── */
type DocketInfo = [string, string][];

const UPSTREAM_BASE = "https://bombino.onshorelabs.co.in/api/track";

/* ─── Colors ─────────────────────────────────────────────────── */
const NAVY  = rgb(17 / 255, 35 / 255, 48 / 255);
const AMBER = rgb(242 / 255, 161 / 255, 35 / 255);
const WHITE = rgb(1, 1, 1);
const LGRAY = rgb(0.88, 0.88, 0.88);

/* ─── Data helpers ───────────────────────────────────────────── */
function getVal(info: DocketInfo, ...keys: string[]): string {
  for (const key of keys) {
    const hit = info.find(([k]) => k.trim().toLowerCase() === key.trim().toLowerCase());
    if (hit?.[1]) return hit[1].trim();
  }
  return "";
}

function extractPayload(raw: unknown): { docket_info: DocketInfo; docket_events: unknown[] } | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (Array.isArray(o.docket_info)) return o as { docket_info: DocketInfo; docket_events: unknown[] };
  if (Array.isArray(raw)) {
    for (const item of raw as unknown[]) {
      const r = extractPayload(item);
      if (r) return r;
    }
  }
  for (const k of ["data", "result", "results", "tracking", "response"]) {
    const r = extractPayload(o[k]);
    if (r) return r;
  }
  return null;
}

/* ─── PDF drawing helpers ────────────────────────────────────── */
function clip(str: string, font: PDFFont, size: number, maxWidth: number): string {
  if (!str) return "—";
  if (font.widthOfTextAtSize(str, size) <= maxWidth) return str;
  let s = str;
  while (s.length > 1 && font.widthOfTextAtSize(s + "…", size) > maxWidth) {
    s = s.slice(0, -1);
  }
  return s + "…";
}

function txt(
  page: PDFPage,
  str: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  color: RGB,
  maxWidth?: number,
) {
  const s = maxWidth ? clip(str || "—", font, size, maxWidth) : (str || "");
  if (!s) return;
  page.drawText(s, { x, y, size, font, color });
}

function hline(page: PDFPage, x: number, y: number, w: number, col: RGB = NAVY) {
  page.drawLine({ start: { x, y }, end: { x: x + w, y }, thickness: 0.5, color: col });
}

function vline(page: PDFPage, x: number, y1: number, y2: number) {
  page.drawLine({ start: { x, y: y1 }, end: { x, y: y2 }, thickness: 0.5, color: NAVY });
}

function box(page: PDFPage, x: number, y: number, w: number, h: number, fill?: RGB) {
  page.drawRectangle({
    x, y, width: w, height: h,
    borderColor: NAVY, borderWidth: 0.5,
    color: fill,
  });
}

function checkbox(page: PDFPage, x: number, y: number, checked: boolean, font: PDFFont) {
  box(page, x, y - 1, 7, 7);
  if (checked) {
    page.drawText("X", { x: x + 1.5, y: y, size: 5.5, font, color: NAVY });
  }
}

/* ─── Route handler ──────────────────────────────────────────── */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ awb: string }> },
) {
  const { awb } = await params;

  /* Fetch tracking data */
  let info: DocketInfo = [];
  try {
    const res  = await fetch(`${UPSTREAM_BASE}/${encodeURIComponent(awb)}`, { cache: "no-store" });
    const raw  = await res.json();
    const data = extractPayload(raw);
    if (data?.docket_info) info = data.docket_info;
  } catch { /* continue with empty info */ }

  /* Extract fields */
  const accountNo      = getVal(info, "Account No", "Account Number");
  const shipperName    = getVal(info, "Shipper Name", "Shipper");
  const shipperCompany = getVal(info, "Shipper Company");
  const shipperAddr    = getVal(info, "Shipper Address");
  const shipperCity    = getVal(info, "Shipper City");
  const shipperState   = getVal(info, "Shipper State");
  const shipperCountry = getVal(info, "Shipper Country");
  const shipperZip     = getVal(info, "Shipper Zip", "Shipper Pin");
  const shipperEmail   = getVal(info, "Shipper Email");
  const shipperPhone   = getVal(info, "Shipper Phone");
  const consigneeName  = getVal(info, "Consignee Name", "Consignee");
  const consigneeComp  = getVal(info, "Consignee Company");
  const consigneeAddr  = getVal(info, "Consignee Address");
  const consigneeCity  = getVal(info, "Consignee City");
  const consigneeState = getVal(info, "Consignee State");
  const consigneeCntry = getVal(info, "Consignee Country");
  const consigneeZip   = getVal(info, "Consignee Zip", "Consignee Pin");
  const consigneePhone = getVal(info, "Consignee Phone");
  const service        = getVal(info, "Service Name", "Service", "Product");
  const actWeight      = getVal(info, "Actual Weight", "Weight", "Actual Wt");
  const chgWeight      = getVal(info, "Chargeable Weight", "Chargeable Wt", "Charged Weight");
  const pieces         = getVal(info, "No of Pieces", "Pieces", "Pcs", "No. of Pieces");
  const dimRaw         = getVal(info, "Dimensions", "Dimension", "Package Dimensions");
  const dimL           = getVal(info, "Length", "L (cm)");
  const dimW           = getVal(info, "Width",  "W (cm)");
  const dimH           = getVal(info, "Height", "H (cm)");
  const dimensions     = dimRaw || (dimL && dimW && dimH ? `${dimL} × ${dimW} × ${dimH} cm` : "");
  const description    = getVal(info, "Description", "Contents", "Commodity", "Goods Description");
  const fwdNo          = getVal(info, "Forwarding No", "Reference No", "Ref No", "Forward No");
  const shipValue      = getVal(info, "Shipment Value", "Value", "Declared Value", "Invoice Value");
  const bookDate       = getVal(info, "Booking Date", "Date", "Booking Date & Time");
  const repName        = getVal(info, "Representative", "Rep Name", "Sales Rep");
  const originHub      = getVal(info, "Origin Hub", "Hub");
  const status         = getVal(info, "Status", "Shipment Status");

  /* Generate barcode PNG */
  let barcodeBytes: Uint8Array | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const bwipjs = require("bwip-js") as {
      toBuffer: (opts: Record<string, unknown>) => Promise<Buffer>;
    };
    const buf = await bwipjs.toBuffer({
      bcid:            "code128",
      text:            awb,
      scale:           2,
      height:          10,
      includetext:     false,
      backgroundcolor: "ffffff",
    });
    barcodeBytes = new Uint8Array(buf);
  } catch { /* no barcode */ }

  /* Load logo */
  let logoBytes: Buffer | null = null;
  try {
    logoBytes = readFileSync(join(process.cwd(), "public", "bombino-logo-01.png"));
  } catch { /* continue without logo */ }

  /* Create PDF — A5 landscape */
  const doc  = await PDFDocument.create();
  const page = doc.addPage([595, 420]);
  const W    = 595;
  const H    = 420;

  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const reg  = await doc.embedFont(StandardFonts.Helvetica);

  /* Layout constants */
  const M   = 10;   /* outer margin */
  const DIV = 292;  /* column divider x */
  const LX  = M + 3; /* left content x */
  const LW  = DIV - M - 6; /* left content width */
  const RX  = DIV + 5; /* right content x */
  const RW  = W - M - DIV - 8; /* right content width */

  /* Outer border */
  box(page, M, M, W - 2 * M, H - 2 * M);

  /* Column divider */
  vline(page, DIV, M, H - M);

  /* ── HEADER ─────────────────────────────────────────────── */
  const HDR_Y = H - M - 26; /* bottom of header band */
  const HDR_H = 26;

  /* Left header — navy background */
  page.drawRectangle({ x: M, y: HDR_Y, width: DIV - M, height: HDR_H, color: NAVY });

  /* Embed logo if available */
  let logoOffsetX = LX;
  if (logoBytes) {
    try {
      const logoImg   = await doc.embedPng(logoBytes);
      const logoScale = Math.min(70 / logoImg.width, 20 / logoImg.height);
      const logoW     = logoImg.width  * logoScale;
      const logoH     = logoImg.height * logoScale;
      page.drawImage(logoImg, {
        x: LX,
        y: HDR_Y + (HDR_H - logoH) / 2,
        width:  logoW,
        height: logoH,
      });
      logoOffsetX = LX + logoW + 5;
    } catch { /* draw text fallback */ }
  }
  txt(page, "BOMBINO EXPRESS PVT LTD", logoOffsetX, HDR_Y + 12, logoBytes ? 7.5 : 9, bold, WHITE);
  txt(page, "International Courier & Freight Services  |  Est. 1995", logoOffsetX, HDR_Y + 3, 5, reg, rgb(0.7, 0.7, 0.7));

  /* Right header — navy background */
  page.drawRectangle({ x: DIV, y: HDR_Y, width: W - M - DIV, height: HDR_H, color: NAVY });
  txt(page, "AIR WAYBILL (AWB)", RX, HDR_Y + 12, 9, bold, WHITE);
  txt(page, "Original — Non-Negotiable", RX, HDR_Y + 3, 5, reg, rgb(0.7, 0.7, 0.7));

  /* Header bottom border */
  hline(page, M, HDR_Y, W - 2 * M);

  /* ── LEFT COLUMN ─────────────────────────────────────────── */
  const SLH = 8;  /* section label height */
  const LH  = 9;  /* line height */

  let ly = HDR_Y - 3; /* current top of next section (baseline of section label) */

  function leftSection(label: string): number {
    txt(page, label, LX, ly - SLH, 5.5, bold, AMBER);
    return ly - SLH - 2; /* returns y for first content line */
  }

  function leftDivider() {
    ly -= 3;
    hline(page, M, ly, DIV - M);
    ly -= 1;
  }

  /* Section 1: Account */
  let cy = leftSection("1.  Sender Account Number");
  txt(page, accountNo || "—", LX, cy - LH, 8, bold, NAVY);
  ly = cy - LH - 3;
  leftDivider();

  /* Section 3: From (Shipper) */
  cy = leftSection("3.  From (Shipper)");
  /* Name always on its own bold line */
  txt(page, shipperName || "—", LX, cy - LH, 7, bold, NAVY, LW);
  const fromRest = [
    shipperCompany,
    shipperAddr,
    [shipperCity, shipperState].filter(Boolean).join(", "),
    [shipperCountry, shipperZip].filter(Boolean).join("  "),
    [shipperEmail, shipperPhone].filter(Boolean).join("   "),
  ].filter(Boolean);
  for (let i = 0; i < Math.min(fromRest.length, 5); i++) {
    txt(page, fromRest[i], LX, cy - LH * (i + 2), 6.5, reg, NAVY, LW);
  }
  ly = cy - LH * (Math.min(fromRest.length, 5) + 2) - 1;
  leftDivider();

  /* Section 4: To (Recipient) */
  cy = leftSection("4.  To (Recipient / Consignee)");
  /* Name always on its own bold line */
  txt(page, consigneeName || "—", LX, cy - LH, 7, bold, NAVY, LW);
  const toRest = [
    consigneeComp,
    consigneeAddr,
    [consigneeCity, consigneeState].filter(Boolean).join(", "),
    [consigneeCntry, consigneeZip].filter(Boolean).join("  "),
    consigneePhone,
  ].filter(Boolean);
  for (let i = 0; i < Math.min(toRest.length, 5); i++) {
    txt(page, toRest[i], LX, cy - LH * (i + 2), 6.5, reg, NAVY, LW);
  }
  ly = cy - LH * (Math.min(toRest.length, 5) + 2) - 1;
  leftDivider();

  /* Section 5: Bombino Representative */
  cy = leftSection("5.  Bombino Representative");
  txt(page, `Name: ${repName || "________________________________"}`, LX, cy - LH, 6, reg, NAVY, LW);
  txt(page, `Date: ${bookDate || "________________________________"}`, LX, cy - LH * 2, 6, reg, NAVY, LW);
  ly = cy - LH * 2 - 3;
  leftDivider();

  /* Section 6: Shipper's Authorization */
  cy = leftSection("6.  Shipper's Authorization");
  const auth1 = "I/We authorize Bombino Express Pvt Ltd to act as agent for export";
  const auth2 = "customs clearance and freight forwarding on my/our behalf.";
  txt(page, auth1, LX, cy - LH, 5.5, reg, NAVY, LW);
  txt(page, auth2, LX, cy - LH * 2, 5.5, reg, NAVY, LW);
  txt(page, "Signature: ______________________________", LX, cy - LH * 3 - 2, 6, reg, NAVY, LW);
  ly = cy - LH * 3 - 6;

  /* ── RIGHT COLUMN ────────────────────────────────────────── */
  let ry = HDR_Y - 3;

  function rightSection(label: string): number {
    txt(page, label, RX, ry - SLH, 5.5, bold, AMBER);
    return ry - SLH - 2;
  }

  function rightDivider() {
    ry -= 3;
    hline(page, DIV, ry, W - M - DIV);
    ry -= 1;
  }

  /* Barcode + AWB */
  if (barcodeBytes) {
    try {
      const img   = await doc.embedPng(barcodeBytes);
      const scale = Math.min(RW / img.width, 36 / img.height);
      const bw    = img.width * scale;
      const bh    = img.height * scale;
      const bx    = DIV + (W - M - DIV - bw) / 2;
      page.drawImage(img, { x: bx, y: ry - bh - 2, width: bw, height: bh });
      ry = ry - bh - 4;
    } catch { ry -= 40; }
  } else {
    /* Placeholder barcode box */
    box(page, RX, ry - 36, RW, 36, LGRAY);
    txt(page, "[ BARCODE ]", RX + RW / 2 - 20, ry - 22, 7, reg, NAVY);
    ry -= 40;
  }

  /* AWB number below barcode */
  const awbW = bold.widthOfTextAtSize(awb, 10);
  txt(page, awb, DIV + (W - M - DIV - awbW) / 2, ry - LH, 10, bold, NAVY);
  ry = ry - LH - 4;
  rightDivider();

  /* Section 7: Services */
  cy = rightSection("7.  Services");
  const svcUp = service.toUpperCase();
  const services = ["ARAMEX", "SPX", "UPS", "FEDEX", "DHL"];
  let sx = RX;
  for (const s of services) {
    checkbox(page, sx, cy - LH, svcUp.includes(s), bold);
    txt(page, s, sx + 9, cy - LH, 5.5, reg, NAVY);
    sx += 46;
  }
  ry = cy - LH - 4;
  rightDivider();

  /* Section 8 + 9: Weight and Pieces */
  cy = rightSection("8/9.  Weight (kg) & Pieces");
  txt(page, `ACT: ${actWeight || "—"} kg`, RX, cy - LH, 6.5, reg, NAVY);
  txt(page, `CHG: ${chgWeight || "—"} kg`, RX + 85, cy - LH, 6.5, reg, NAVY);
  txt(page, `Pcs: ${pieces || "—"}`, RX + 175, cy - LH, 6.5, bold, NAVY);
  ry = cy - LH - 4;
  rightDivider();

  /* Section 10: Dimensions */
  cy = rightSection("10.  Dimensions (L × W × H cm)");
  txt(page, dimensions || "______ × ______ × ______", RX, cy - LH, 6.5, reg, NAVY, RW);
  ry = cy - LH - 4;
  rightDivider();

  /* Section 11: Description */
  cy = rightSection("11.  Description / Contents");
  txt(page, description || "—", RX, cy - LH, 6.5, reg, NAVY, RW);
  ry = cy - LH - 4;
  rightDivider();

  /* Section 12: Forwarding No */
  cy = rightSection("12.  Forwarding / Reference No.");
  txt(page, fwdNo || "—", RX, cy - LH, 6.5, reg, NAVY, RW);
  ry = cy - LH - 4;
  rightDivider();

  /* Section 13: Duties & Taxes */
  cy = rightSection("13.  Duties & Taxes — Bill to:");
  checkbox(page, RX, cy - LH, false, bold);
  txt(page, "Sender", RX + 9, cy - LH, 6, reg, NAVY);
  checkbox(page, RX + 60, cy - LH, false, bold);
  txt(page, "Recipient", RX + 69, cy - LH, 6, reg, NAVY);
  checkbox(page, RX + 130, cy - LH, false, bold);
  txt(page, "Third Party", RX + 139, cy - LH, 6, reg, NAVY);
  ry = cy - LH - 4;
  rightDivider();

  /* Section 14: Shipment Value */
  cy = rightSection("14.  Declared Shipment Value");
  txt(page, shipValue ? `USD ${shipValue}` : "—", RX, cy - LH, 6.5, reg, NAVY, RW);
  ry = cy - LH - 4;
  rightDivider();

  /* Section 17: Charges */
  cy = rightSection("17.  Shipment Charges");
  txt(page, "Freight: _________   Surcharge: _________   Total: _________", RX, cy - LH, 5.5, reg, NAVY, RW);
  ry = cy - LH - 4;
  rightDivider();

  /* Section 18: Payment Terms */
  cy = rightSection("18.  Payment Terms");
  const payments = ["Cash", "Cheque", "Credit Card", "COD"];
  let px = RX;
  for (const p of payments) {
    checkbox(page, px, cy - LH, false, bold);
    txt(page, p, px + 9, cy - LH, 5.5, reg, NAVY);
    px += 62;
  }
  ry = cy - LH - 4;
  rightDivider();

  /* Section 20: Received in Good Condition */
  cy = rightSection("20.  Received in Good Condition");
  txt(page, "Stamp & Signature: ___________________________", RX, cy - LH, 5.5, reg, NAVY, RW);
  txt(page, `Date: ____________________`, RX, cy - LH * 2, 5.5, reg, NAVY, RW);

  /* ── FOOTER ──────────────────────────────────────────────── */
  hline(page, M, M + 13, W - 2 * M);
  const footer = "Tracking & other information: www.bombinoexp.com   |   Bombino Express Pvt Ltd, Mumbai, India";
  const fW     = reg.widthOfTextAtSize(footer, 5.5);
  txt(page, footer, (W - fW) / 2, M + 4, 5.5, reg, NAVY);

  /* ── Serialize ───────────────────────────────────────────── */
  const pdfBytes = await doc.save();

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type":        "application/pdf",
      "Content-Disposition": `inline; filename="label-${awb}.pdf"`,
      "Cache-Control":       "no-store",
    },
  });
}
