"use client";

const DESTINATIONS = [
  "United States",
  "United Kingdom",
  "UAE",
  "Canada",
  "Australia",
  "Germany",
  "Singapore",
  "Japan",
  "France",
  "Netherlands",
  "New Zealand",
  "Saudi Arabia",
  "Hong Kong",
  "Malaysia",
];

const DOT = (
  <span className="w-1 h-1 rounded-full bg-border-subtle shrink-0 mx-2" aria-hidden="true" />
);

function Track() {
  return (
    <div className="flex items-center whitespace-nowrap shrink-0" aria-hidden="true">
      {DESTINATIONS.map((dest) => (
        <span key={dest} className="flex items-center">
          {DOT}
          <span className="text-[0.8125rem] font-semibold tracking-[0.06em] text-muted-ink uppercase px-3">
            {dest}
          </span>
        </span>
      ))}
    </div>
  );
}

export function TrustBand() {
  return (
    <section
      aria-label="Countries we deliver to"
      className="border-y border-border-subtle overflow-hidden py-4 bg-freight-paper"
    >
      {/* Visible label for assistive tech */}
      <span className="sr-only">
        Delivering to: {DESTINATIONS.join(", ")}, and 130+ more countries.
      </span>

      {/* Fade masks */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, oklch(98% 0.004 246), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, oklch(98% 0.004 246), transparent)" }}
          aria-hidden="true"
        />

        {/* Marquee container — two identical tracks for seamless loop */}
        <div
          className="flex animate-marquee hover:animation-pause"
          style={{ width: "max-content" }}
        >
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}
