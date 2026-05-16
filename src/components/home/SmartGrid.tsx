"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  ShoppingCart, Globe, FileCheck2, Warehouse, Package, Ship,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Custom animated SVG icons ─────────────────────────────── */

function GlobeIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14" aria-hidden="true">
      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="28" cy="28" rx="24" ry="9.5" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <ellipse
        cx="28" cy="28" rx="10" ry="24"
        stroke="currentColor" strokeWidth="1.25" opacity="0.7"
        style={{ transformOrigin: "28px 28px", animation: "clock-min 8s linear infinite" }}
      />
      <line x1="28" y1="4" x2="28" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14" aria-hidden="true">
      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="1.5" />
      <line
        x1="28" y1="28" x2="28" y2="14"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        style={{ transformOrigin: "28px 28px", animation: "clock-hour 18s linear infinite" }}
      />
      <line
        x1="28" y1="28" x2="28" y2="10"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        style={{ transformOrigin: "28px 28px", animation: "clock-min 3s linear infinite" }}
      />
      <circle cx="28" cy="28" r="2.5" fill="currentColor" />
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="28" y1="5.5" x2="28" y2="9"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"
          style={{ transformOrigin: "28px 28px", transform: `rotate(${deg}deg)` }}
        />
      ))}
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14" aria-hidden="true">
      <path
        d="M28 4L8 12v16c0 14 20 24 20 24s20-10 20-24V12L28 4z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      <motion.path
        d="M20 28l5.5 5.5 10.5-11"
        stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14" aria-hidden="true">
      <motion.path
        d="M4 44 L14 30 L24 35 L36 18 L46 22 L52 10"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.polyline
        points="40,10 52,10 52,22"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 1.2, duration: 0.3 }}
      />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */
const capabilities = [
  {
    number: "01",
    title: "Global Reach",
    desc: "Seamless freight corridors connecting India to 150+ countries worldwide.",
    Icon: GlobeIcon,
    accent: "text-dispatch-amber",
    dark: true,
  },
  {
    number: "02",
    title: "Secure Handling",
    desc: "Bank-grade security protocols and real-time monitoring for every shipment.",
    Icon: ShieldIcon,
    accent: "text-trade-wind",
    dark: false,
  },
  {
    number: "03",
    title: "Time Critical",
    desc: "Express air freight and dedicated vehicles for urgent, time-sensitive cargo.",
    Icon: ClockIcon,
    accent: "text-dispatch-amber",
    dark: false,
  },
  {
    number: "04",
    title: "Real-Time Tracking",
    desc: "Advanced analytics and live tracking for full supply chain visibility.",
    Icon: TrendIcon,
    accent: "text-trade-wind",
    dark: false,
  },
] as const;

const services = [
  { number: "01", title: "Ecommerce Courier", tagline: "Express delivery for online sellers", icon: ShoppingCart, href: "/services/ecommerce" },
  { number: "02", title: "Cross Border", tagline: "Global deliveries with no boundaries", icon: Globe, href: "/services/cross-border" },
  { number: "03", title: "Customs Clearance", tagline: "Complex paperwork handled for you", icon: FileCheck2, href: "/services/customs" },
  { number: "04", title: "Warehousing", tagline: "Temperature-sensitive, real-time storage", icon: Warehouse, href: "/services/warehousing" },
  { number: "05", title: "Parcel Delivery", tagline: "Express and next-day options", icon: Package, href: "/services/parcel" },
  { number: "06", title: "Ocean Freight", tagline: "LCL, FCL, and breakbulk worldwide", icon: Ship, href: "/services/ocean-freight" },
] as const;

/* ─── Route Strip ────────────────────────────────────────────── */
const ROUTE = ["Mumbai", "Dubai", "London", "New York"];

function RouteStrip() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % ROUTE.length);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-0">
      {ROUTE.map((city, i) => {
        const isActive  = i === active;
        const isPast    = i < active;
        const isLast    = i === ROUTE.length - 1;

        return (
          <div key={city} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                animate={{
                  backgroundColor: isActive
                    ? "oklch(73% 0.160 64)"
                    : isPast
                    ? "oklch(37% 0.092 239.763)"
                    : "oklch(88% 0.010 239.763)",
                  scale: isActive ? 1.4 : 1,
                  boxShadow: isActive
                    ? "0 0 0 4px oklch(73% 0.160 64 / 0.20)"
                    : "none",
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="text-[0.58rem] font-semibold tracking-wide whitespace-nowrap hidden sm:block"
                style={{ color: isActive ? "oklch(73% 0.160 64)" : "oklch(52% 0.035 239.763 / 0.55)" }}>
                {city}
              </span>
            </div>

            {!isLast && (
              <div className="relative mx-2 h-px w-10 sm:w-14 bg-border-subtle overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 h-full"
                  style={{ background: "oklch(37% 0.092 239.763)" }}
                  animate={{ width: isPast ? "100%" : isActive ? "50%" : "0%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export function SmartGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".svc-row", {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".svc-list",
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="bg-white">

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — Why Bombino: asymmetric bento grid
          Card 1: dark, lg:row-span-2 (tall left pillar)
          Card 2 & 3: standard 1×1
          Card 4: lg:col-span-2 (wide bottom band)
      ══════════════════════════════════════════════════════════ */}
      <section aria-labelledby="bento-heading" className="bg-freight-paper">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-24 lg:py-32">

          {/* Section header */}
          <div className="mb-12">
            <p className="text-eyebrow text-dispatch-amber mb-3">Why Bombino Express</p>
            <h2
              id="bento-heading"
              className="font-extrabold text-[lab(7.78673_1.82346_-15.0537)] leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)" }}
            >
              Built for every shipping scenario.
            </h2>
          </div>

          {/* Asymmetric bento grid */}
          <div className="cap-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:grid-rows-2">

            {/* Card 1 — Global Reach: dark pillar, row-span-2 */}
            <motion.div
              className="cap-block lg:row-span-2 rounded-2xl bg-white border border-border-subtle p-8 flex flex-col gap-6 group cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div className="text-dispatch-amber">
                  <GlobeIcon />
                </div>
                <span
                  className="text-4xl font-black leading-none select-none text-[lab(7.78673_1.82346_-15.0537)]/8"
                  aria-hidden="true"
                >
                  01
                </span>
              </div>
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-[lab(7.78673_1.82346_-15.0537)] leading-snug">Global Reach</h3>
                <p className="text-[lab(7.78673_1.82346_-15.0537)]/60 text-sm mt-3 leading-relaxed">
                  Seamless freight corridors connecting India to 150+ countries worldwide.
                </p>
              </div>
              <div className="pt-4 border-t border-admiralty/10">
                <p className="text-dispatch-amber text-3xl font-black tabular-nums">150+</p>
                <p className="text-[lab(7.78673_1.82346_-15.0537)]/40 text-xs mt-1 font-medium tracking-wide uppercase">Countries served</p>
              </div>
            </motion.div>

            {/* Card 2 — Secure Handling: standard */}
            <motion.div
              className="cap-block rounded-2xl border border-border-subtle bg-white p-7 flex flex-col gap-5 group hover:border-dispatch-amber/25 hover:[box-shadow:0_8px_32px_oklch(17%_0.048_239.763_/_0.08)] transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div className="text-trade-wind">
                  <ShieldIcon />
                </div>
                <span
                  className="text-4xl font-black leading-none select-none group-hover:text-dispatch-amber/20 transition-colors duration-300"
                  style={{ color: "oklch(92% 0.010 239.763)" }}
                  aria-hidden="true"
                >
                  02
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[lab(7.78673_1.82346_-15.0537)] leading-snug">Secure Handling</h3>
                <p className="text-muted-ink text-sm mt-2 leading-relaxed">Bank-grade security protocols and real-time monitoring for every shipment.</p>
              </div>
            </motion.div>

            {/* Card 3 — Time Critical: standard */}
            <motion.div
              className="cap-block rounded-2xl border border-border-subtle bg-white p-7 flex flex-col gap-5 group hover:border-dispatch-amber/25 hover:[box-shadow:0_8px_32px_oklch(17%_0.048_239.763_/_0.08)] transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div className="text-dispatch-amber">
                  <ClockIcon />
                </div>
                <span
                  className="text-4xl font-black leading-none select-none group-hover:text-dispatch-amber/20 transition-colors duration-300"
                  style={{ color: "oklch(92% 0.010 239.763)" }}
                  aria-hidden="true"
                >
                  03
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[lab(7.78673_1.82346_-15.0537)] leading-snug">Time Critical</h3>
                <p className="text-muted-ink text-sm mt-2 leading-relaxed">Express air freight and dedicated vehicles for urgent, time-sensitive cargo.</p>
              </div>
            </motion.div>

            {/* Card 4 — Real-Time Tracking: wide bottom band, col-span-2 */}
            <motion.div
              className="col-span-1 lg:col-span-2 relative bg-white border border-border-subtle rounded-2xl p-8 overflow-hidden group cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{
                y: -6,
                boxShadow: "0 24px 64px oklch(17% 0.048 239.763 / 0.11), 0 6px 16px oklch(17% 0.048 239.763 / 0.06)",
                borderColor: "oklch(73% 0.160 64 / 0.30)",
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              {/* Amber corner glow */}
              <div
                className="absolute bottom-0 right-0 w-80 h-40 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at bottom right, oklch(73% 0.160 64 / 0.08) 0%, transparent 65%)" }}
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-8">

                {/* Left: icon + label */}
                <div className="flex-shrink-0 flex flex-col gap-4">
                  <div className="flex items-center justify-between sm:justify-start gap-4">
                    <div className="text-trade-wind">
                      <TrendIcon />
                    </div>
                    <span
                      className="text-4xl font-black leading-none select-none sm:hidden"
                      style={{ color: "oklch(92% 0.010 239.763)" }}
                      aria-hidden="true"
                    >04</span>
                  </div>
                  {/* Live badge */}
                  <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-[#FBAD1F]/8 border border-[#FBAD1F]/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBAD1F] opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FBAD1F]" />
                    </span>
                    <span className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#FBAD1F]">Live</span>
                  </div>
                </div>

                {/* Right: heading + route waypoints */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-[lab(7.78673_1.82346_-15.0537)] leading-snug">Real-Time Tracking</h3>
                    <span
                      className="text-4xl font-black leading-none select-none hidden sm:block flex-shrink-0"
                      style={{ color: "oklch(92% 0.010 239.763)" }}
                      aria-hidden="true"
                    >04</span>
                  </div>
                  <p className="text-muted-ink text-sm leading-relaxed mb-6" style={{ maxWidth: "44ch" }}>
                    Advanced analytics and live tracking for full supply chain visibility, from pickup to final-mile delivery.
                  </p>

                  {/* Route progress strip — loops continuously */}
                  <RouteStrip />
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — Scrollytelling: sticky heading + services list
          Left (heading) is short → sticky. Right (6 rows) scrolls.
      ══════════════════════════════════════════════════════════ */}
      <section aria-labelledby="smart-grid-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative">

            {/* LEFT: Sticky heading */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start flex flex-col gap-6">
              <p className="text-eyebrow text-dispatch-amber">Full Stack Logistics</p>

              <h2
                id="smart-grid-heading"
                className="font-extrabold text-[lab(7.78673_1.82346_-15.0537)] leading-[1.03] tracking-[-0.035em]"
                style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)" }}
              >
                Every advantage.<br />One partner.
              </h2>

              <p className="text-muted-ink text-base leading-relaxed" style={{ maxWidth: "34ch" }}>
                Six specialised services — engineered to move anything, anywhere.
              </p>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[lab(7.78673_1.82346_-15.0537)] hover:text-trade-wind transition-colors duration-200 group/link w-fit"
              >
                Explore all services
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                  className="transition-transform duration-200 group-hover/link:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* RIGHT: Scrolling services list */}
            <div className="lg:col-span-7 flex flex-col">
              <p className="text-eyebrow text-muted-ink/50 mb-0">Our Services</p>
              <div className="svc-list border-t border-slate-200 mt-6">
                {services.map((svc) => (
                  <a
                    key={svc.title}
                    href={svc.href}
                    className="svc-row grid grid-cols-[auto_auto_1fr_auto] gap-4 items-center py-5 border-b border-slate-100 group cursor-pointer"
                    aria-label={`${svc.title} — ${svc.tagline}`}
                  >
                    <div className="shrink-0">
                      <span className="text-sm font-bold text-[#FBAD1F]/60 group-hover:text-[#FBAD1F] transition-colors duration-200 tabular-nums">
                        {svc.number}
                      </span>
                    </div>

                    <div className="shrink-0">
                      <div className="p-2 rounded-lg bg-surface-tinted text-trade-wind group-hover:bg-dispatch-amber/10 group-hover:text-dispatch-amber transition-all duration-200">
                        <svc.icon className="w-4.5 h-4.5" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-[lab(7.78673_1.82346_-15.0537)] text-[0.9375rem] leading-snug group-hover:text-trade-wind transition-colors duration-200">
                        {svc.title}
                      </p>
                      <p className="text-sm text-muted-ink hidden sm:block mt-0.5">{svc.tagline}</p>
                    </div>

                    <div className="flex justify-end shrink-0">
                      <span
                        className="text-muted-ink/30 group-hover:text-[lab(7.78673_1.82346_-15.0537)] group-hover:translate-x-1 transition-all duration-200 text-base"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
