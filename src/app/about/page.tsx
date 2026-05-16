"use client";

import { motion } from "framer-motion";
import { PlayCircle, Clock, Building2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { WorldMap } from "@/components/shared/WorldMap";

const EXPO = [0.22, 1, 0.36, 1] as const;

/* ─── Shared animation wrapper ───────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}


/* ─── Page ───────────────────────────────────────────────────── */
export default function AboutUsPage() {
  return (
    <main className="font-sans text-foreground">

      {/* ═══ SECTION 1: Introduction ═════════════════════════════ */}
      <section className="bg-admiralty pt-24 lg:pt-36 pb-24 lg:pb-36 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6">

          {/* ── Two-column: header left, map right ───────────────── */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

            {/* Left — header */}
            <div className="flex flex-col items-start text-left">
              <FadeUp>
                <p className="text-eyebrow text-[#FBAD1F] mb-5">Who We Are</p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h1
                  className="font-black text-freight-paper leading-[0.9] tracking-[-0.04em]"
                  style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
                >
                  Bombino Express
                </h1>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p
                  className="font-semibold leading-snug mt-5"
                  style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", color: "#FBAD1F" }}
                >
                  Providing Swift, Safe, and Secure Service
                </p>
              </FadeUp>
            </div>

            {/* Right — world map SVG */}
            <div className="w-full" style={{ aspectRatio: "16/9" }}>
              <WorldMap theme="amber" />
            </div>

          </div>

          {/* ── Editorial content ─────────────────────────────── */}
          <div className="max-w-4xl mr-auto flex flex-col gap-12">

            {/* Story block 1 — Origins */}
            <FadeUp delay={0.22}>
              <div className="flex flex-col gap-4">
                <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#FBAD1F]/70">Est. 1995 — The Beginning</p>
                <p className="text-freight-paper/60 text-lg leading-relaxed">
                  When corporations and industries were expanding under economic liberalization,
                  they needed a dependable, economic courier service that had an extensive network
                  and was trustworthy in its delivery and time efficiency. The Bombino Brand saw
                  this need and chose to be the solution for courier services.
                </p>
                <p className="text-freight-paper/60 text-lg leading-relaxed">
                  Founded in 1995, Bombino Express has become one of the oldest and most
                  preferred courier companies in India — showing steady growth in both volume
                  and revenue, a reflection of the confidence and trust bestowed on them by
                  their valued customers worldwide.
                </p>
              </div>
            </FadeUp>

            {/* Story block 2 — Global reach */}
            <FadeUp delay={0.30}>
              <div className="border-t border-freight-paper/10 pt-8 flex flex-col gap-4">
                <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#FBAD1F]/70">Global Reach — 150+ Countries</p>
                <p className="text-freight-paper/60 text-lg leading-relaxed">
                  Whether looking to import or export, Bombino Express is the best choice for
                  shipments within or between India, USA, UK, China, the Middle East, and the rest
                  of the world. With a corporate office in Hackensack, New Jersey, they serve
                  domestic, international, and intra-city needs from a truly global platform.
                </p>
              </div>
            </FadeUp>

            {/* Story block 3 — Standards */}
            <FadeUp delay={0.38}>
              <div className="border-t border-freight-paper/10 pt-8 flex flex-col gap-4">
                <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#FBAD1F]/70">ISO 9001 — Quality & Integrity</p>
                <p className="text-freight-paper/60 text-lg leading-relaxed">
                  Headed by motivated professionals who consistently deliver the highest quality
                  service with integrity, Bombino Express holds ISO 9001 certification and
                  continues to exceed customer expectations through innovation, technology,
                  and competitive rates.
                </p>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: Vision & Mission ════════════════════════ */}
      <section className="bg-white py-24 lg:py-36">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">

          {/* Header */}
          <FadeUp>
            <div className="flex flex-col gap-5 mb-16 lg:mb-20">
              <p className="text-eyebrow text-dispatch-amber">Our Commitment</p>
              <h2
                className="font-black text-[lab(7.78673_1.82346_-15.0537)] leading-[0.92] tracking-[-0.04em]"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
              >
                Bombino's<br />Passion
              </h2>
              <p
                className="font-semibold text-dispatch-amber"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}
              >
                Empowering your business across the globe.
              </p>
            </div>
          </FadeUp>

          {/* Body text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            <FadeUp delay={0.08}>
              <p className="w-full max-w-none text-slate-600 text-[1.0625rem] leading-[1.75]">
                Bombino Express passion is to provide Swift, Safe, and Secure service. They are
                determined to "delight customers with quality service through investing in
                innovation, technology, and in our people to develop and deliver comprehensive
                customized logistics solutions."
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="w-full max-w-none text-slate-600 text-[1.0625rem] leading-[1.75]">
                Keeping superior services tailored to meet customers' individual needs and provide
                globally integrated door-to-door services is their top priority. Bombino Express
                is constantly rising to improve and exceed their customers' expectations, providing
                the best logistic solutions possible.
              </p>
            </FadeUp>
          </div>

          {/* Video placeholder */}
          <FadeUp delay={0.1}>
            <div
              className="w-full aspect-video bg-slate-100 rounded-3xl overflow-hidden relative group cursor-pointer border border-slate-200"
              role="img"
              aria-label="Video placeholder — company story"
            >
              {/* Subtle gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.15_0.05_240 / 0.06) 0%, transparent 100%)",
                }}
                aria-hidden="true"
              />

              {/* Grid lines for depth */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, transparent calc(100% - 1px), oklch(0.15_0.05_240) 100%), linear-gradient(90deg, transparent calc(100% - 1px), oklch(0.15_0.05_240) 100%)",
                  backgroundSize: "80px 80px",
                }}
                aria-hidden="true"
              />

              {/* Play button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                <motion.div
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                >
                  <PlayCircle
                    size={88}
                    strokeWidth={0.9}
                    className="text-[lab(7.78673_1.82346_-15.0537)] opacity-25 group-hover:opacity-40 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                </motion.div>
                <p className="text-slate-400 text-xs font-semibold tracking-[0.12em] uppercase">
                  [Video Upload Placeholder]
                </p>
              </div>

              {/* Corner label */}
              <div className="absolute bottom-6 left-6">
                <span className="text-slate-400 text-xs font-mono tracking-widest">16:9 · Cinematic</span>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ═══ SECTION 3: Brand History ════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-24 lg:py-36">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">

          {/* Section header */}
          <FadeUp className="mb-20 lg:mb-28">
            <p className="text-eyebrow text-[#FBAD1F] mb-4">Our Legacy</p>
            <h2
              className="font-black text-foreground leading-[0.92] tracking-[-0.04em]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
            >
              Brand History:<br />The Bombino Express
            </h2>
          </FadeUp>

          {/* Timeline blocks */}
          <div className="flex flex-col gap-24 lg:gap-32">

            {/* ── Block 1: 1980s origin ─────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Image */}
              <FadeUp delay={0.06}>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=75"
                    alt="Bombino Express operations — historical archive"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                  {/* Date badge */}
                  <div className="absolute top-5 left-5 bg-admiralty text-white px-4 py-2 rounded-full">
                    <span className="text-xs font-bold tracking-[0.12em] uppercase">1980s</span>
                  </div>
                </div>
              </FadeUp>

              {/* Text */}
              <div className="flex flex-col gap-6 w-full">
                <FadeUp delay={0.12}>
                  <div className="flex items-center gap-3">
                    <Building2 size={22} strokeWidth={1.5} className="text-[#FBAD1F] shrink-0" aria-hidden="true" />
                    <span className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#FBAD1F]">
                      The Founding
                    </span>
                  </div>
                </FadeUp>

                <FadeUp delay={0.18}>
                  <h3
                    className="font-extrabold text-foreground leading-tight tracking-[-0.03em]"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                  >
                    Three brothers,<br />one storefront.
                  </h3>
                </FadeUp>

                <FadeUp delay={0.24}>
                  <p className="w-full max-w-none text-slate-500 text-[1.0625rem] leading-[1.75]">
                    The Bombino Corporate Group began humbly in the 1980s with three brothers and
                    a storefront. There, they started by distributing audio cassettes. Their
                    services grew to include video distribution and movies.
                  </p>
                </FadeUp>

                <FadeUp delay={0.30}>
                  <p className="w-full max-w-none text-slate-500 text-[1.0625rem] leading-[1.75]">
                    Since that foundation, the Bombino brand has acquired over 5,000 movies in
                    Hindi, English, and other languages — establishing a reputation for reliability
                    and reach that would define every chapter that followed.
                  </p>
                </FadeUp>
              </div>
            </div>

            {/* ── Block 2: 1992 – Present ───────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Text — reversed order on desktop */}
              <div className="flex flex-col gap-6 w-full order-2 lg:order-1">
                <FadeUp delay={0.06}>
                  <div className="flex items-center gap-3">
                    <Clock size={22} strokeWidth={1.5} className="text-[#FBAD1F] shrink-0" aria-hidden="true" />
                    <span className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#FBAD1F]">
                      1992 – Present
                    </span>
                  </div>
                </FadeUp>

                <FadeUp delay={0.12}>
                  <h3
                    className="font-extrabold text-foreground leading-tight tracking-[-0.03em]"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                  >
                    Swift. Safe.<br />Secure.
                  </h3>
                </FadeUp>

                <FadeUp delay={0.18}>
                  <p className="w-full max-w-none text-slate-500 text-[1.0625rem] leading-[1.75]">
                    Since 1992, Bombino has diversified further by focusing on importing and
                    exporting, manufacturing, travel, and tourism (IATA). Providing courier
                    services for international, domestic, and intra-city parcels around the world
                    has become their passion.
                  </p>
                </FadeUp>

                <FadeUp delay={0.24}>
                  <p className="w-full max-w-none text-slate-500 text-[1.0625rem] leading-[1.75]">
                    Providing swift, safe, and secure service remains the founding promise — carried
                    forward from a humble storefront to a global logistics network serving 150+
                    countries and over one million shipments delivered.
                  </p>
                </FadeUp>

                {/* Stat pills */}
                <FadeUp delay={0.30}>
                  <div className="flex flex-wrap gap-4 pt-2">
                    {[
                      { value: "1995", label: "Founded" },
                      { value: "ISO 9001", label: "Certified" },
                      { value: "150+", label: "Countries" },
                      { value: "24–48h", label: "USA Delivery" },
                    ].map(({ value, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-start px-4 py-3 rounded-xl border border-slate-200 bg-white min-w-[90px]"
                      >
                        <span className="font-black text-foreground text-lg leading-none tracking-tight">
                          {value}
                        </span>
                        <span className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-slate-400 mt-1">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </FadeUp>
              </div>

              {/* Image */}
              <FadeUp delay={0.10} className="order-1 lg:order-2">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=75"
                    alt="Bombino Express global logistics network"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                  {/* Date badge */}
                  <div className="absolute top-5 left-5 bg-[#FBAD1F] text-foreground px-4 py-2 rounded-full">
                    <span className="text-xs font-bold tracking-[0.12em] uppercase">Today</span>
                  </div>
                </div>
              </FadeUp>

            </div>

          </div>

          {/* Bottom CTA row */}
          <FadeUp delay={0.1} className="mt-24 pt-16 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 w-full">
              <p className="w-full max-w-none text-slate-400 text-sm font-medium">
                Trusted by exporters, e-commerce sellers, and businesses worldwide since 1995.
              </p>
              <a
                href="/booking/get-quote"
                className="inline-flex items-center gap-2 rounded-full bg-admiralty text-white px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Get a Rate
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </FadeUp>

        </div>
      </section>

    </main>
  );
}
