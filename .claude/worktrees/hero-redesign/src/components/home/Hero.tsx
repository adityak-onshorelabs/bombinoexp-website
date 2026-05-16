"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RateCalculator } from "./RateCalculator";

/* ─── World Map SVG ─────────────────────────────────────────── */
function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      // Draw routes via strokeDashoffset
      const routes = gsap.utils.toArray<SVGPathElement>(".route-path");
      routes.forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2.2,
          delay: 0.6 + i * 0.35,
          ease: "power2.out",
        });
      });

      // City node entrance
      gsap.from(".city-node", {
        scale: 0,
        opacity: 0,
        stagger: 0.12,
        delay: 1.2,
        duration: 0.45,
        ease: "back.out(2)",
      });
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hero-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.85" fill="white" opacity="0.11" />
        </pattern>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gradients run left→right; Mumbai origin is right (x≈57%), so right end = bright */}
        <linearGradient id="route-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F2A123" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#F2A123" stopOpacity="0.82" />
        </linearGradient>
        <linearGradient id="route-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F2A123" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#F2A123" stopOpacity="0.70" />
        </linearGradient>
        <linearGradient id="route-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F2A123" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#F2A123" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Full-coverage dot grid */}
      <rect width="1200" height="600" fill="url(#hero-dots)" />

      {/* Faint latitude grid lines */}
      {[150, 300, 450].map((y) => (
        <line
          key={y}
          x1="0" y1={y} x2="1200" y2={y}
          stroke="white" strokeOpacity="0.06"
          strokeWidth="1" strokeDasharray="6 14"
        />
      ))}

      {/* ── Route arcs ────────────────────────────────────────── */}
      {/* Mumbai → New York */}
      <path
        className="route-path"
        d="M 680,300 C 560,70 360,70 245,225"
        fill="none"
        stroke="url(#route-grad-1)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Mumbai → London */}
      <path
        className="route-path"
        d="M 680,300 C 618,120 530,120 465,185"
        fill="none"
        stroke="url(#route-grad-2)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Mumbai → Dubai (short, dashed) */}
      <path
        className="route-path"
        d="M 680,300 C 660,272 640,268 608,282"
        fill="none"
        stroke="url(#route-grad-3)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="4 7"
      />

      {/* ── Moving shipment dot (Mumbai → New York) ──────────── */}
      <circle cx="0" cy="0" r="4.5" fill="#F2A123" opacity="0.95">
        <animateMotion
          dur="7s"
          repeatCount="indefinite"
          begin="2.5s"
          path="M 680,300 C 560,70 360,70 245,225"
          calcMode="spline"
          keySplines="0.42 0 0.58 1"
          keyTimes="0;1"
        />
      </circle>

      {/* ── City nodes ────────────────────────────────────────── */}
      {/* Mumbai — origin */}
      <g className="city-node" filter="url(#glow)">
        <circle cx="680" cy="300" r="22" fill="#F2A123" opacity="0.09" />
        <circle cx="680" cy="300" r="12" fill="#F2A123" opacity="0.22" />
        <circle cx="680" cy="300" r="6" fill="#F2A123" opacity="0.95" />
        <circle cx="680" cy="300" r="22" fill="none" stroke="#F2A123"
          strokeOpacity="0.45" strokeWidth="1"
          style={{ animation: "orbit-ping 2.4s ease-out infinite" }}
        />
        <text x="692" y="292" fill="white" fontSize="9.5" fontWeight="700"
          opacity="0.88" fontFamily="var(--font-poppins)" letterSpacing="0.05em">
          MUMBAI
        </text>
      </g>

      {/* New York */}
      <g className="city-node">
        <circle cx="245" cy="225" r="10" fill="white" opacity="0.13" />
        <circle cx="245" cy="225" r="4" fill="white" opacity="0.85" />
        <text x="258" y="218" fill="white" fontSize="8.5" fontWeight="600"
          opacity="0.70" fontFamily="var(--font-poppins)" letterSpacing="0.04em">
          NEW YORK
        </text>
      </g>

      {/* London */}
      <g className="city-node">
        <circle cx="465" cy="185" r="10" fill="white" opacity="0.13" />
        <circle cx="465" cy="185" r="4" fill="white" opacity="0.85" />
        <text x="478" y="178" fill="white" fontSize="8.5" fontWeight="600"
          opacity="0.70" fontFamily="var(--font-poppins)" letterSpacing="0.04em">
          LONDON
        </text>
      </g>

      {/* Dubai */}
      <g className="city-node">
        <circle cx="608" cy="282" r="7" fill="white" opacity="0.13" />
        <circle cx="608" cy="282" r="3" fill="white" opacity="0.82" />
        <text x="620" y="276" fill="white" fontSize="8" fontWeight="600"
          opacity="0.68" fontFamily="var(--font-poppins)" letterSpacing="0.04em">
          DUBAI
        </text>
      </g>
    </svg>
  );
}

/* ─── Trust pill ─────────────────────────────────────────────── */
function TrustPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-extrabold text-freight-paper tracking-tight text-xl leading-none">
        {value}
      </span>
      <span className="text-freight-paper/35 text-[0.65rem] font-bold tracking-[0.12em] uppercase">
        {label}
      </span>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const counterRef   = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Live shipment counter — cosmetic count-up
      const obj = { val: 1208 };
      gsap.to(obj, {
        val: 1247,
        duration: 5,
        ease: "power1.out",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(obj.val).toLocaleString();
          }
        },
      });

      // Staggered entrance — fromTo() so GSAP has explicit end state
      // regardless of the CSS opacity:0 pre-hide in globals.css
      const tl = gsap.timeline({ delay: 0.12 });
      tl.fromTo(".hero-eyebrow",  { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "expo.out" })
        .fromTo(".hero-h1 > *",   { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "expo.out", stagger: 0.08 }, "-=0.3")
        .fromTo(".hero-sub",      { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6,  ease: "expo.out" }, "-=0.4")
        .fromTo(".hero-ctas > *", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5,  ease: "expo.out", stagger: 0.08 }, "-=0.35")
        .fromTo(".hero-proof > *",{ y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "expo.out", stagger: 0.06 }, "-=0.3")
        .fromTo(".hero-calc",     { x: 44, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: "expo.out" }, 0.25);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-svh bg-admiralty overflow-hidden flex flex-col"
      style={{ minHeight: "min(100svh, 940px)" }}
    >
      {/* SVG world map — full bleed */}
      <WorldMap />

      {/* Left text scrim — protects copy legibility, leaves center/right open for SVG */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(95deg, oklch(14% 0.048 248 / 0.94) 0%, oklch(15% 0.048 248 / 0.72) 34%, oklch(15% 0.048 248 / 0.20) 60%, transparent 76%)",
        }}
        aria-hidden="true"
      />

      {/* Top vignette — depth without full coverage */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(to bottom, oklch(13% 0.040 248 / 0.55) 0%, transparent 30%)",
        }}
        aria-hidden="true"
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] opacity-[0.038] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Amber bottom-left glow */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 52% 38% at 6% 96%, oklch(73% 0.160 64 / 0.16) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex-1 max-w-[1280px] mx-auto w-full px-6 lg:px-8 pt-28 pb-16 lg:pb-40 flex items-center">
        <div className="grid lg:grid-cols-[1fr_448px] xl:grid-cols-[1fr_468px] gap-14 xl:gap-20 w-full items-center">

          {/* ── Left: copy ─────────────────────────────────────── */}
          <div className="flex flex-col gap-8">

            {/* Live eyebrow badge */}
            <div className="hero-eyebrow">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-dispatch-amber/22 bg-dispatch-amber/7">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dispatch-amber opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-dispatch-amber" />
                </span>
                <span className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-dispatch-amber/88">
                  Live ·{" "}
                  <span ref={counterRef}>1,208</span>
                  {" "}Shipments in Transit
                </span>
              </div>
            </div>

            {/* Headline — tight leading, massive scale */}
            <div className="hero-h1 flex flex-col" id="hero-heading">
              <h1
                className="font-black text-freight-paper tracking-[-0.04em] overflow-hidden"
                style={{ fontSize: "clamp(3.4rem, 6.8vw, 5.8rem)", lineHeight: 0.9 }}
              >
                <span className="block">Your cargo,</span>
                <span className="block text-dispatch-amber">moving</span>
                <span className="block">now.</span>
              </h1>
            </div>

            {/* Sub */}
            <p
              className="hero-sub text-freight-paper/55 text-[1.0625rem] leading-[1.65] font-light"
              style={{ maxWidth: "44ch" }}
            >
              India's trusted international courier since 1995. Express delivery to USA, UK, UAE, and 150+ countries worldwide.
            </p>

            {/* CTAs */}
            <div className="hero-ctas flex flex-wrap gap-3 pt-1">
              <Link
                href="/quick-rates"
                className="inline-flex items-center gap-2 rounded-full bg-dispatch-amber px-7 py-3.5 text-sm font-bold tracking-[0.02em] text-admiralty transition-all duration-200 hover:bg-[oklch(79%_0.155_64)] hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dispatch-amber/50"
              >
                Get a Rate
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center rounded-full border border-freight-paper/22 bg-freight-paper/7 px-7 py-3.5 text-sm font-semibold tracking-[0.02em] text-freight-paper backdrop-blur-sm transition-all duration-200 hover:border-freight-paper/45 hover:bg-freight-paper/14 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-freight-paper/25"
              >
                Our Services
              </Link>
            </div>

            {/* Trust pills */}
            <div className="hero-proof flex items-center gap-7 pt-2">
              <div className="h-6 w-px bg-freight-paper/12" aria-hidden="true" />
              <TrustPill value="1M+" label="Shipments" />
              <div className="h-6 w-px bg-freight-paper/12" aria-hidden="true" />
              <TrustPill value="150+" label="Countries" />
              <div className="h-6 w-px bg-freight-paper/12" aria-hidden="true" />
              <TrustPill value="1995" label="Est." />
            </div>
          </div>

          {/* ── Right: rate calculator ──────────────────────────── */}
          <div className="hero-calc lg:-mb-36 xl:-mb-44">
            <div
              className="rounded-3xl overflow-hidden border border-white/10"
              style={{
                background: "oklch(98% 0.004 246 / 0.06)",
                backdropFilter: "blur(24px) saturate(1.2)",
                WebkitBackdropFilter: "blur(24px) saturate(1.2)",
                boxShadow: "0 24px 80px oklch(17% 0.048 248 / 0.45), 0 0 0 1px oklch(98% 0.004 246 / 0.08)",
              }}
            >
              <div className="h-[3px] bg-dispatch-amber" aria-hidden="true" />
              <RateCalculator variant="glass" />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-35" aria-hidden="true">
        <div className="w-px h-12 relative overflow-hidden bg-freight-paper/20 rounded-full">
          <div className="absolute top-0 w-full rounded-full bg-freight-paper" style={{ height: "40%", animation: "fade-up 1.8s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
