import type { Metadata } from "next";
import { Suspense } from "react";
import { TrackingClient } from "./TrackingClient";

export const metadata: Metadata = {
  title:       "Track Shipment — Bombino Express",
  description: "Get real-time tracking updates for your Bombino Express shipment. Enter your AWB or docket number to see live status.",
};

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
      <span className="block h-8 w-8 rounded-full border-4 border-[#F2A123]/30 border-t-[#F2A123] animate-spin" />
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TrackingClient />
    </Suspense>
  );
}
