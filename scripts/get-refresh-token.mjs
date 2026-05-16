/**
 * Run once locally to get a fresh refresh token:
 *   node scripts/get-refresh-token.mjs
 *
 * Requires .env.local to have GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.
 */

import { createServer } from "http";
import { readFileSync } from "fs";
import { google } from "googleapis";

/* ── Load env vars from .env.local ────────────────────────── */
const envRaw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const env = Object.fromEntries(
  envRaw
    .split("\n")
    .filter((l) => l.trim() && !l.trim().startsWith("#"))
    .map((l) => l.split("=").map((p) => p.trim()))
    .filter(([k, v]) => k && v)
);

const CLIENT_ID     = env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI  = "http://localhost:9876/callback";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌  GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET missing from .env.local");
  process.exit(1);
}

const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt:      "consent",
  scope:       ["https://www.googleapis.com/auth/spreadsheets"],
});

console.log("\n1. Opening authorization URL in your browser...");
console.log("   If it doesn't open automatically, paste this URL:\n");
console.log("   " + authUrl + "\n");

/* Try to open browser automatically */
const { exec } = await import("child_process");
exec(
  process.platform === "win32"
    ? `start "" "${authUrl}"`
    : process.platform === "darwin"
    ? `open "${authUrl}"`
    : `xdg-open "${authUrl}"`
);

/* Temporary local server to capture the callback */
const server = createServer(async (req, res) => {
  const url  = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get("code");

  if (!code) {
    res.end("No code received. Close this tab and try again.");
    return;
  }

  try {
    const { tokens } = await oauth2.getToken(code);
    res.end("✅ Success! Check your terminal for the refresh token. You can close this tab.");

    console.log("\n✅  Paste this into .env.local:\n");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);

    server.close();
    process.exit(0);
  } catch (err) {
    res.end("Error: " + err.message);
    console.error("❌  Token exchange failed:", err.message);
    server.close();
    process.exit(1);
  }
});

server.listen(9876, () => {
  console.log("2. Waiting for Google authorization callback on port 9876...\n");
});
