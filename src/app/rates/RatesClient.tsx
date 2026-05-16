"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */
interface ChargeItem {
  name?:    string;
  amount?:  number | string;
  rate_id?: string;
}

interface RateItem {
  id?:                    string | number;
  code?:                  string;
  internal_api_service_code?: string;
  weight?:                string | number;
  rate?:                  number;
  fsc?:                   number;
  other_charges?:         number;
  sub_total?:             number;
  cgst?:                  number;
  sgst?:                  number;
  igst?:                  number | string;
  gst_per?:               string;
  total?:                 number;
  chrage_apply_data?:     Record<string, ChargeItem> | ChargeItem[];
  [key: string]:          unknown;
}

/* ─── Helpers ────────────────────────────────────────────────── */
const inr = (val: unknown) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(val) || 0);

function surgeEntries(data: RateItem["chrage_apply_data"]): ChargeItem[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return Object.values(data);
}

function dedup(items: RateItem[]): RateItem[] {
  const seen = new Set<string>();
  return items.filter((r) => {
    const key = String(r.id ?? r.code);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/* ─── Skeleton ───────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* Best value card skeleton — dark */}
      <div className="rounded-xl bg-[oklch(17%_0.048_239.763)] h-52" />
      {/* Alternative card skeletons — light */}
      {[0, 1].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-[oklch(88%_0.010_239.763)] bg-white h-28"
        />
      ))}
    </div>
  );
}

/* ─── Best value card ────────────────────────────────────────── */
function BestValueCard({
  rate,
  destination,
  weight,
  pieces,
}: {
  rate:        RateItem;
  destination: string;
  weight:      string;
  pieces:      string;
}) {
  const surges   = surgeEntries(rate.chrage_apply_data);
  const fsc      = Number(rate.fsc)           || 0;
  const other    = Number(rate.other_charges) || 0;
  const gstTotal = (Number(rate.cgst) || 0) + (Number(rate.sgst) || 0) + (Number(rate.igst) || 0);

  const serviceCode  = rate.code ?? rate.internal_api_service_code ?? "";
  const targetParams = new URLSearchParams({
    api_service_code: serviceCode,
    destination,
    weight:  String(rate.weight || weight),
    pieces,
  }).toString();
  const loginHandoffUrl = `https://bombino.onshorelabs.co.in/create?${targetParams}`;

  return (
    <div className="rounded-xl border-2 border-[oklch(72%_0.19_145)] bg-white overflow-hidden shadow-[0_0_24px_oklch(72%_0.19_145_/_0.35)]">
      <div className="px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

        {/* Left: label + service + breakdown */}
        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 mb-4 text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[oklch(72%_0.19_145)]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
              <path d="M5 0l1.12 3.45H10L7.19 5.58l1.12 3.45L5 7.01l-3.31 2.02L2.81 5.58 0 3.45h3.88z" />
            </svg>
            Best Value
          </span>

          <h3 className="text-xl font-black text-[oklch(17%_0.048_239.763)] tracking-tight mb-5">
            {rate.code ?? rate.internal_api_service_code ?? "Express"}
          </h3>

          {/* Breakdown rows */}
          <dl className="space-y-2">
            <div className="flex justify-between items-center">
              <dt className="text-[0.7rem] font-medium text-[oklch(52%_0.035_239.763)] uppercase tracking-wider">Base Rate</dt>
              <dd className="text-xs font-bold text-[oklch(17%_0.048_239.763)] tabular-nums">{inr(rate.rate)}</dd>
            </div>
            {fsc > 0 && (
              <div className="flex justify-between items-center">
                <dt className="text-[0.7rem] font-medium text-[oklch(52%_0.035_239.763)] uppercase tracking-wider">Fuel Surcharge</dt>
                <dd className="text-xs font-bold text-[oklch(17%_0.048_239.763)] tabular-nums">{inr(fsc)}</dd>
              </div>
            )}
            {other > 0 && (
              <div className="flex justify-between items-center">
                <dt className="text-[0.7rem] font-medium text-[oklch(52%_0.035_239.763)] uppercase tracking-wider">
                  {surges.length > 0 ? surges.map((s) => String(s.name ?? "Charge")).join(", ") : "Other"}
                </dt>
                <dd className="text-xs font-bold text-[oklch(17%_0.048_239.763)] tabular-nums">{inr(other)}</dd>
              </div>
            )}
            <div className="flex justify-between items-center pt-1 border-t border-[oklch(88%_0.010_239.763)]">
              <dt className="text-[0.7rem] font-medium text-[oklch(52%_0.035_239.763)] uppercase tracking-wider">GST ({rate.gst_per ?? "18"}%)</dt>
              <dd className="text-xs font-bold text-[oklch(17%_0.048_239.763)] tabular-nums">{inr(gstTotal)}</dd>
            </div>
          </dl>
        </div>

        {/* Right: total + CTA */}
        <div className="sm:text-right flex flex-col sm:items-end gap-4 sm:min-w-[160px]">
          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-[oklch(52%_0.035_239.763)] mb-1">
              Total
            </p>
            <p
              className="font-black text-[oklch(72%_0.19_145)] tabular-nums leading-none"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
            >
              {inr(rate.total)}
            </p>
          </div>

          <a
            href={loginHandoffUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "bg-[oklch(72%_0.19_145)] text-[oklch(17%_0.048_239.763)]",
              "hover:bg-[oklch(78%_0.18_145)]",
              "font-bold text-sm px-6 py-3 rounded-full",
              "transition-all duration-200 hover:-translate-y-px hover:shadow-lg",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(72%_0.19_145)]/50",
              "whitespace-nowrap"
            )}
          >
            Book This Rate
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Alternative card ───────────────────────────────────────── */
function AlternativeCard({
  rate,
  destination,
  weight,
  pieces,
}: {
  rate:        RateItem;
  destination: string;
  weight:      string;
  pieces:      string;
}) {
  const surges   = surgeEntries(rate.chrage_apply_data);
  const fsc      = Number(rate.fsc)           || 0;
  const other    = Number(rate.other_charges) || 0;
  const gstTotal = (Number(rate.cgst) || 0) + (Number(rate.sgst) || 0) + (Number(rate.igst) || 0);

  const serviceCode  = rate.code ?? rate.internal_api_service_code ?? "";
  const targetParams = new URLSearchParams({
    api_service_code: serviceCode,
    destination,
    weight:  String(rate.weight || weight),
    pieces,
  }).toString();
  const loginHandoffUrl = `https://bombino.onshorelabs.co.in/create?${targetParams}`;

  return (
    <div
      className={cn(
        "rounded-xl border border-[oklch(88%_0.010_239.763)] bg-white overflow-hidden",
        "hover:border-[oklch(73%_0.160_64)]/40 hover:shadow-[0_4px_20px_oklch(17%_0.048_239.763_/_0.07)]",
        "transition-all duration-200",
      )}
    >
      <div className="px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

        {/* Left: service + breakdown */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-black text-[oklch(17%_0.048_239.763)] tracking-tight mb-5">
            {rate.code ?? rate.internal_api_service_code ?? "Standard"}
          </h3>

          <dl className="space-y-2">
            <div className="flex justify-between items-center">
              <dt className="text-[0.7rem] font-medium text-[oklch(52%_0.035_239.763)] uppercase tracking-wider">Base Rate</dt>
              <dd className="text-xs font-bold text-[oklch(17%_0.048_239.763)] tabular-nums">{inr(rate.rate)}</dd>
            </div>
            {fsc > 0 && (
              <div className="flex justify-between items-center">
                <dt className="text-[0.7rem] font-medium text-[oklch(52%_0.035_239.763)] uppercase tracking-wider">Fuel Surcharge</dt>
                <dd className="text-xs font-bold text-[oklch(17%_0.048_239.763)] tabular-nums">{inr(fsc)}</dd>
              </div>
            )}
            {other > 0 && (
              <div className="flex justify-between items-center">
                <dt className="text-[0.7rem] font-medium text-[oklch(52%_0.035_239.763)] uppercase tracking-wider">
                  {surges.length > 0 ? surges.map((s) => String(s.name ?? "Charge")).join(", ") : "Other"}
                </dt>
                <dd className="text-xs font-bold text-[oklch(17%_0.048_239.763)] tabular-nums">{inr(other)}</dd>
              </div>
            )}
            <div className="flex justify-between items-center pt-1 border-t border-[oklch(88%_0.010_239.763)]">
              <dt className="text-[0.7rem] font-medium text-[oklch(52%_0.035_239.763)] uppercase tracking-wider">GST ({rate.gst_per ?? "18"}%)</dt>
              <dd className="text-xs font-bold text-[oklch(17%_0.048_239.763)] tabular-nums">{inr(gstTotal)}</dd>
            </div>
          </dl>
        </div>

        {/* Right: total + CTA */}
        <div className="sm:text-right flex flex-col sm:items-end gap-4 sm:min-w-[160px]">
          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-[oklch(52%_0.035_239.763)] mb-1">
              Total
            </p>
            <p
              className="font-black text-[oklch(17%_0.048_239.763)] tabular-nums leading-none"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
            >
              {inr(rate.total)}
            </p>
          </div>

          <a
            href={loginHandoffUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "bg-[oklch(17%_0.048_239.763)] text-white",
              "hover:bg-[oklch(73%_0.160_64)] hover:text-[oklch(17%_0.048_239.763)]",
              "font-bold text-sm px-6 py-3 rounded-full",
              "transition-all duration-200 hover:-translate-y-px hover:shadow-lg",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(17%_0.048_239.763)]/40",
              "whitespace-nowrap"
            )}
          >
            Book This Rate
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main client component ──────────────────────────────────── */
export function RatesClient() {
  const params      = useSearchParams();
  const origin      = params.get("origin")      ?? "IN";
  const destination = params.get("destination") ?? "";
  const weight      = params.get("weight")      ?? "";
  const pieces      = params.get("pieces")      ?? "1";

  const [ratesList, setRatesList] = useState<RateItem[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [apiError,  setApiError]  = useState<string | null>(null);

  const lenis = useLenis();

  useEffect(() => {
    if (loading) return;
    const id = setTimeout(() => lenis?.resize(), 50);
    return () => clearTimeout(id);
  }, [loading, lenis]);

  useEffect(() => {
    if (!destination || !weight) {
      setApiError("Missing destination or weight. Go back and try again.");
      setLoading(false);
      return;
    }

    fetch("/api/rates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, destination, weight, pieces }),
    })
      .then((r) => r.json())
      .then((data) => {
        const raw: RateItem[] =
          Array.isArray(data)         ? data :
          Array.isArray(data?.data)   ? data.data :
          Array.isArray(data?.rates)  ? data.rates :
          Array.isArray(data?.result) ? data.result :
          [];

        const sorted = dedup(raw).sort(
          (a, b) => (Number(a.total) || 0) - (Number(b.total) || 0)
        );

        if (sorted.length === 0) {
          setApiError("No rates available for this route. Please modify your search.");
        } else {
          setRatesList(sorted);
        }
      })
      .catch(() => setApiError("Failed to load rates. Please try again."))
      .finally(() => setLoading(false));
  }, [origin, destination, weight, pieces]);

  return (
    <div className="min-h-screen bg-[oklch(98%_0.004_239.763)] pt-24">

      {/* ── Top bar ───────────────────────────────────────── */}
      <div className="bg-white border-b border-[oklch(88%_0.010_239.763)]">
        <div style={{ maxWidth: "42rem" }} className="w-full mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[oklch(73%_0.160_64)] mb-1">
              Live Rates
            </p>
            <h1 className="text-base font-black text-[oklch(17%_0.048_239.763)] tracking-tight">
              {weight}kg &middot; {pieces} {Number(pieces) === 1 ? "piece" : "pieces"} &middot;{" "}
              <span className="font-mono">{origin}</span>
              {" "}&rarr;{" "}
              <span className="font-mono">{destination}</span>
            </h1>
          </div>
          <a
            href="/"
            className="text-xs font-semibold text-[oklch(52%_0.035_239.763)] hover:text-[oklch(17%_0.048_239.763)] transition-colors duration-150 whitespace-nowrap"
          >
            &larr; New quote
          </a>
        </div>
      </div>

      {/* ── Cards ─────────────────────────────────────────── */}
      <div style={{ maxWidth: "42rem" }} className="w-full mx-auto px-4 sm:px-6 py-8">
        {loading && <Skeleton />}

        {!loading && apiError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 font-medium">
            {apiError}
          </div>
        )}

        {!loading && !apiError && (
          <>
            <p className="text-xs text-[oklch(52%_0.035_239.763)] font-medium mb-5">
              {ratesList.length} option{ratesList.length !== 1 ? "s" : ""} &middot; sorted by price
            </p>

            <div className="flex flex-col gap-3">
              {ratesList.map((rate, i) =>
                i === 0 ? (
                  <BestValueCard
                    key={String(rate.id ?? rate.code ?? i)}
                    rate={rate}
                    destination={destination}
                    weight={weight}
                    pieces={pieces}
                  />
                ) : (
                  <AlternativeCard
                    key={String(rate.id ?? rate.code ?? i)}
                    rate={rate}
                    destination={destination}
                    weight={weight}
                    pieces={pieces}
                  />
                )
              )}
            </div>

            <p className="text-center text-[0.7rem] text-[oklch(52%_0.035_239.763)] mt-8 leading-relaxed">
              Rates are indicative. Final price confirmed at booking. GST applicable as per destination.
            </p>
          </>
        )}
      </div>

    </div>
  );
}
