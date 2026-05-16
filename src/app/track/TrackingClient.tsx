"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */
type DocketInfo = [string, string][];

interface TrackingEvent {
  scan_type?:         string;
  event_description?: string;
  description?:       string;
  event?:             string;
  remarks?:           string;
  event_at?:          string;
  scan_date?:         string;
  date?:              string;
  scan_time?:         string;
  time?:              string;
  event_location?:    string;
  location?:          string;
  city?:              string;
  country?:           string;
  [key: string]:      unknown;
}

interface TrackingPayload {
  docket_info?:   DocketInfo;
  docket_events?: TrackingEvent[];
  errors?:        boolean | string[] | unknown;
}

/* ─── Data helpers ───────────────────────────────────────────── */
function getDocketValue(info: DocketInfo, label: string): string {
  const needle = label.trim().toLowerCase();
  const found  = info.find(([k]) => k.trim().toLowerCase() === needle);
  return found ? String(found[1] ?? "").trim() : "";
}

function firstOf(info: DocketInfo, ...labels: string[]): string {
  for (const label of labels) {
    const v = getDocketValue(info, label);
    if (v) return v;
  }
  return "";
}

function eventDescription(ev: TrackingEvent): string {
  return ev.scan_type ?? ev.event_description ?? ev.description ?? ev.event ?? ev.remarks ?? "Update";
}

function eventLocation(ev: TrackingEvent): string {
  return [ev.event_location, ev.city, ev.location, ev.country].filter(Boolean).join(", ");
}

function eventDateTime(ev: TrackingEvent): string {
  const eventAt = ev.event_at ?? "";
  const d = eventAt ? eventAt.split(" ")[0] : (ev.scan_date ?? ev.date  ?? "");
  const t = eventAt ? eventAt.split(" ")[1] : (ev.scan_time ?? ev.time  ?? "");
  if (!d && !t) return "";
  try {
    if (d) {
      const iso    = `${d}${t ? "T" + t : ""}`;
      const parsed = new Date(iso);
      if (!isNaN(parsed.getTime())) {
        return new Intl.DateTimeFormat("en-IN", {
          day: "2-digit", month: "short", year: "numeric",
          hour: "2-digit", minute: "2-digit", hour12: true,
        }).format(parsed);
      }
    }
  } catch { /* fall through */ }
  return [d, t].filter(Boolean).join("  ·  ");
}

/* ─── Response normaliser ────────────────────────────────────── */
function isPayload(v: unknown): v is TrackingPayload {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return Array.isArray(o.docket_info) || Array.isArray(o.docket_events);
}

function extractPayload(raw: unknown): TrackingPayload | null {
  if (isPayload(raw)) return raw;
  if (Array.isArray(raw)) {
    for (const item of raw) {
      if (isPayload(item)) return item;
    }
  }
  if (raw && typeof raw === "object") {
    const o = raw as Record<string, unknown>;
    for (const key of ["data", "result", "results", "tracking", "response"]) {
      const found = extractPayload(o[key]);
      if (found) return found;
    }
  }
  return null;
}

/* ─── Status classification ──────────────────────────────────── */
type StatusClass = "delivered" | "exception" | "transit";

function classifyStatus(status: string): StatusClass {
  const s = status.toLowerCase();
  if (/delivered|delivery completed/.test(s))                    return "delivered";
  if (/exception|hold|customs|seized|detained|returned/.test(s)) return "exception";
  return "transit";
}

/* ─── Search input ───────────────────────────────────────────── */
function SearchInput({
  defaultValue = "",
  variant      = "light",
}: {
  defaultValue?: string;
  variant?:      "light" | "dark";
}) {
  const router              = useRouter();
  const [val, setVal]       = useState(defaultValue);
  const [, startTransition] = useTransition();

  useEffect(() => { setVal(defaultValue); }, [defaultValue]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = val.trim();
    if (!trimmed) return;
    startTransition(() => {
      router.push(`/track?tracking_no=${encodeURIComponent(trimmed)}`);
    });
  }

  const dark = variant === "dark";

  return (
    <form
      onSubmit={submit}
      role="search"
      style={{ width: "100%" }}
      className="flex"
    >
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="AWB / Docket number"
        aria-label="Tracking number"
        style={{ width: "100%", minWidth: 0 }}
        className={cn(
          "flex-1 px-5 py-3.5 rounded-l-xl text-sm font-semibold",
          "focus:outline-none transition-all duration-150",
          dark
            ? "bg-white/12 border border-white/25 text-white placeholder:text-white/35 placeholder:font-normal focus:bg-white/18 focus:border-white/45"
            : "bg-white border border-slate-200 text-foreground placeholder:text-slate-400 placeholder:font-normal focus:ring-2 focus:ring-[#FBAD1F]/40 focus:border-[#FBAD1F]/50"
        )}
      />
      <button
        type="submit"
        className={cn(
          "shrink-0 px-5 py-3.5 rounded-r-xl text-sm font-bold",
          "inline-flex items-center gap-1.5 transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2",
          dark
            ? "bg-[#FBAD1F] text-foreground hover:bg-[#E59C17] focus-visible:ring-[#FBAD1F]/60"
            : "bg-admiralty text-white hover:bg-[#FBAD1F] hover:text-foreground focus-visible:ring-primary/40"
        )}
      >
        Track
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function HeroSearch() {
  return (
    <section className="w-full min-h-screen bg-admiralty flex flex-col pt-20">
      <div className="flex-1 flex items-center px-6 sm:px-12 lg:px-20 py-20">
        <div
          className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          style={{ maxWidth: "80rem" }}
        >
          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-[#FBAD1F] mb-8">
              Bombino Express &middot; Est. 1995
            </p>
            <h1
              className="font-black text-white leading-[1.03] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Track your<br />
              international<br />
              <span className="text-[#FBAD1F]">shipment.</span>
            </h1>
            <p className="text-white/45 text-base leading-relaxed" style={{ maxWidth: "38ch" }}>
              Real-time courier visibility across 150+ countries. No account needed.
            </p>
          </div>

          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-white/30 mb-3">
              Enter your AWB or docket number
            </p>
            <SearchInput variant="dark" />
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span className="text-white/30 text-xs font-medium">Live data</span>
              </div>
              <span className="text-white/15 text-xs hidden sm:block" aria-hidden="true">·</span>
              <span className="text-white/30 text-xs font-medium">No sign-in required</span>
              <span className="text-white/15 text-xs hidden sm:block" aria-hidden="true">·</span>
              <span className="text-white/30 text-xs font-medium">150+ countries</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 px-6 sm:px-12 lg:px-20 py-5">
        <div className="mx-auto flex items-center justify-between" style={{ maxWidth: "80rem" }}>
          <p className="text-white/20 text-xs">Swift &middot; Safe &middot; Secure</p>
          <p className="text-white/20 text-xs">Mumbai, India</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Thin navy top bar (results state) ──────────────────────── */
function ResultsHeader({ trackingNo }: { trackingNo: string }) {
  return (
    <header className="w-full bg-admiralty border-b border-white/8 pt-20">
      <div
        className="w-full mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ maxWidth: "72rem" }}
      >
        <div>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/30 mb-1">
            Live Tracking
          </p>
          <p className="text-2xl font-black text-white font-mono tracking-wide">
            {trackingNo}
          </p>
        </div>
        <div style={{ minWidth: "260px", maxWidth: "360px" }} className="w-full sm:w-auto">
          <SearchInput variant="dark" defaultValue={trackingNo} />
        </div>
      </div>
    </header>
  );
}

/* ─── Status badge ───────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const cls    = classifyStatus(status);
  const styles = {
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-200 [&>span]:bg-emerald-500",
    exception: "bg-red-50    text-red-700    border-red-200    [&>span]:bg-red-500",
    transit:   "bg-[#FBAD1F]/10 text-[#b87a10] border-[#FBAD1F]/30 [&>span]:bg-[#FBAD1F]",
  }[cls];

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border",
      "text-[0.6rem] font-bold uppercase tracking-widest",
      styles
    )}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" aria-hidden="true" />
      {status || "Unknown"}
    </span>
  );
}

/* ─── Status header card ─────────────────────────────────────── */
function StatusHeaderCard({
  trackingNo, status, origin, destination,
}: {
  trackingNo:  string;
  status:      string;
  origin:      string;
  destination: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-slate-400 mb-1.5">
            Air Waybill
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground font-mono tracking-wide">
              {trackingNo}
            </h2>
            {status && <StatusBadge status={status} />}
          </div>
        </div>
        <a
          href={`/api/label/${encodeURIComponent(trackingNo)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-admiralty text-white text-xs font-bold hover:bg-[#FBAD1F] hover:text-foreground transition-colors duration-150 shrink-0 self-start"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download Label
        </a>
      </div>

      {(origin || destination) && (
        <div className="mt-4 flex items-center gap-3 text-sm">
          <span className="font-bold text-foreground shrink-0">{origin || "—"}</span>
          <span className="flex-1 flex items-center gap-1.5 min-w-0">
            <span className="flex-1 h-px bg-gradient-to-r from-slate-200 via-[#FBAD1F]/50 to-slate-200" />
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-[#FBAD1F] shrink-0" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-bold text-foreground shrink-0">{destination || "—"}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Shipment panel (manifest + timeline unified) ───────────── */
function ShipmentPanel({ info, events }: { info: DocketInfo; events: TrackingEvent[] }) {
  const service          = getDocketValue(info, "Service Name");
  const booked           = getDocketValue(info, "Booking Date");
  const originHub        = getDocketValue(info, "Origin Hub");
  const shipperName      = getDocketValue(info, "Shipper Name");
  const shipperCity      = getDocketValue(info, "Shipper City");
  const shipperState     = getDocketValue(info, "Shipper State");
  const shipperCountry   = getDocketValue(info, "Shipper Country");
  const consigneeName    = getDocketValue(info, "Consignee Name");
  const consigneeCity    = getDocketValue(info, "Consignee City");
  const consigneeCountry = getDocketValue(info, "Consignee Country");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">

      <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#FBAD1F]">
        Shipment Manifest
      </p>

      {/* Route bar */}
      <div className="flex items-center gap-4 bg-slate-50 rounded-xl px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-0.5">From</p>
          <p className="text-base font-bold text-foreground">{shipperCity || "—"}{shipperCountry ? `, ${shipperCountry}` : ""}</p>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 h-px bg-slate-200" />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#FBAD1F] shrink-0" aria-hidden="true">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-0.5">To</p>
          <p className="text-base font-bold text-foreground">{consigneeCity || "—"}{consigneeCountry ? `, ${consigneeCountry}` : ""}</p>
        </div>
      </div>

      {/* Shipper + Consignee cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 px-5 py-4">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Shipper</p>
          <p className="text-sm font-bold text-foreground leading-snug">{shipperName || "—"}</p>
          <p className="text-sm text-slate-500 mt-0.5">{[shipperCity, shipperState].filter(Boolean).join(", ")}</p>
        </div>
        <div className="rounded-xl border border-slate-200 px-5 py-4">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Consignee</p>
          <p className="text-sm font-bold text-foreground leading-snug">{consigneeName || "—"}</p>
          <p className="text-sm text-slate-500 mt-0.5">{[consigneeCity, consigneeCountry].filter(Boolean).join(", ")}</p>
        </div>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {service && (
          <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-foreground">
            {service}
          </span>
        )}
        {booked && (
          <span className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-500">
            Booked <span className="font-bold text-foreground">{booked}</span>
          </span>
        )}
        {originHub && (
          <span className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-500">
            Origin hub <span className="font-bold text-foreground">{originHub}</span>
          </span>
        )}
      </div>

      {/* Divider + Timeline */}
      <div className="border-t border-slate-100 pt-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#FBAD1F]">
            Tracking History
          </p>
          <span className="text-xs text-slate-400 font-medium">
            {events.length} scan{events.length !== 1 ? "s" : ""}
          </span>
        </div>

        <ol className="flex flex-col">
          {events.map((ev, i) => {
            const isFirst = i === 0;
            const isLast  = i === events.length - 1;
            const desc    = eventDescription(ev);
            const loc     = eventLocation(ev);
            const dt      = eventDateTime(ev);
            return (
              <li key={i} className="flex gap-4 pb-6 last:pb-0">
                {/* Dot + line column */}
                <div className="flex flex-col items-center shrink-0">
                  {isFirst ? (
                    <span
                      className="h-4 w-4 rounded-full bg-[#E59C17] ring-4 ring-[#E59C17]/20 shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className="h-3 w-3 rounded-full border-2 border-[#0d2e57]/30 bg-transparent mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {!isLast && (
                    <div className="my-1 w-[2px] flex-1 bg-slate-200" aria-hidden="true" />
                  )}
                </div>

                {/* Content column */}
                <div className="pb-0.5">
                  <p className={cn("text-base font-bold leading-snug", isFirst ? "text-[#0d2e57]" : "text-slate-500")}>
                    {desc}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {loc && (
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" className="text-slate-300 shrink-0" aria-hidden="true">
                          <path d="M8 1a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5zm0 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                        {loc}
                      </p>
                    )}
                    {dt && <p className="text-xs text-slate-400 tabular-nums">{dt}</p>}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Help footer */}
      <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-4">
        <a
          href="tel:+912222018181"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-foreground transition-colors duration-150"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6.16 6.16l.61-.61a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          +91 22 2201 8181
        </a>
        <a
          href="mailto:support@bombino.in"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-foreground transition-colors duration-150"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          support@bombino.in
        </a>
      </div>

    </div>
  );
}

/* ─── Exception banner ───────────────────────────────────────── */
function ExceptionBanner({ awb }: { awb: string }) {
  return (
    <div
      role="alert"
      className="w-full rounded-xl border border-red-200 bg-red-50 px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-4"
    >
      <span className="shrink-0 w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-extrabold text-red-700 mb-1">
          Action Required: Shipment on Hold
        </p>
        <p className="text-xs text-red-600 leading-relaxed mb-3">
          AWB <span className="font-mono font-bold">{awb}</span> has been flagged for customs or
          regulatory review. Contact our support team immediately to resolve the exception and
          avoid further delays.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="tel:+912222018181"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors duration-150"
          >
            Call Support
          </a>
          <a
            href="mailto:support@bombino.in"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition-colors duration-150"
          >
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Skeleton ───────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-24 bg-white rounded-xl border border-slate-200" />
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
        <div className="h-3 bg-slate-200 rounded w-28" />
        <div className="h-14 bg-slate-100 rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 w-24 bg-slate-100 rounded-full" />
          <div className="h-7 w-32 bg-slate-100 rounded-full" />
        </div>
        <div className="border-t border-slate-100 pt-5 space-y-5">
          {[88, 72, 60, 50].map((w, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-[14px] h-[14px] rounded-full bg-slate-200 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 bg-slate-200 rounded" style={{ width: `${w}%` }} />
                <div className="h-3 bg-slate-100 rounded w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export function TrackingClient() {
  const params     = useSearchParams();
  const trackingNo = params.get("tracking_no")?.trim() ?? "";

  const [payload,  setPayload]  = useState<TrackingPayload | null>(null);
  const [loading,  setLoading]  = useState<boolean>(() => !!trackingNo);
  const [apiError, setApiError] = useState<string | null>(null);

  const lastFetched = useRef<string>("");

  useEffect(() => {
    if (!trackingNo || trackingNo === lastFetched.current) return;
    lastFetched.current = trackingNo;

    setLoading(true);
    setApiError(null);
    setPayload(null);

    fetch(`/api/track/${encodeURIComponent(trackingNo)}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((raw: unknown) => {
        const item = extractPayload(raw);

        const hasDocketInfo   = Array.isArray(item?.docket_info)   && item!.docket_info!.length   > 0;
        const hasDocketEvents = Array.isArray(item?.docket_events) && item!.docket_events!.length > 0;

        const errs = item?.errors;
        const hasExplicitError =
          errs === true ||
          (Array.isArray(errs) && errs.length > 0 && typeof errs[0] === "string");

        if (!item || (!hasDocketInfo && !hasDocketEvents) || hasExplicitError) {
          setApiError("No tracking data found for this AWB. Please verify the number and try again.");
        } else {
          setPayload(item);
        }
      })
      .catch(() =>
        setApiError("Could not reach the tracking service. Please try again in a moment.")
      )
      .finally(() => setLoading(false));
  }, [trackingNo]);

  if (!trackingNo) return <HeroSearch />;

  const info   = payload?.docket_info   ?? [];
  const events = payload?.docket_events ?? [];

  const status      = firstOf(info, "Status");
  const origin      = firstOf(info, "Origin", "Origin Country", "Shipper City", "From");
  const destination = firstOf(info, "Destination", "Destination Country", "Consignee City", "To");
  const isException = payload ? classifyStatus(status) === "exception" : false;

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb]">

      <ResultsHeader trackingNo={trackingNo} />

      <div
        className="w-full mx-auto px-6 sm:px-10 py-10"
        style={{ maxWidth: "72rem" }}
      >
        {loading && <Skeleton />}

        {!loading && apiError && (
          <div className="w-full bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500 shrink-0 mt-0.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-sm text-red-700 font-medium">{apiError}</p>
          </div>
        )}

        {!loading && payload && (
          <div className="space-y-4">
            <StatusHeaderCard
              trackingNo={trackingNo}
              status={status}
              origin={origin}
              destination={destination}
            />

            {isException && <ExceptionBanner awb={trackingNo} />}

            {(info.length > 0 || events.length > 0) && (
              <ShipmentPanel info={info} events={events} />
            )}
          </div>
        )}
      </div>

    </div>
  );
}
