import { Suspense } from "react";
import { RatesClient } from "./RatesClient";

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
      <span className="block h-8 w-8 rounded-full border-4 border-[#F2A123]/30 border-t-[#F2A123] animate-spin" />
    </div>
  );
}

export default function RatesPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RatesClient />
    </Suspense>
  );
}
