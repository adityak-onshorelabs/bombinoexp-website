"use client";

import { motion } from "framer-motion";
import { PlayCircle, Clock, Building2, ArrowRight } from "lucide-react";
import Image from "next/image";

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
    <main className="font-sans text-[#112330]">

      {/* ═══ SECTION 1: Introduction ═════════════════════════════ */}
      <section className="bg-white pt-24 lg:pt-36 pb-24 lg:pb-36 border-b border-slate-100 overflow-hidden">
        <div className="flex flex-col items-center pt-0 pb-12 w-full max-w-7xl mx-auto px-6">

          {/* ── Title: left-aligned, commanding ─────────────────── */}
          <div className="flex flex-col items-start text-left mb-16 w-full">
            <FadeUp>
              <p className="text-eyebrow text-[#F2A123] mb-5">Who We Are</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1
                className="font-black text-[#112330] leading-[0.9] tracking-[-0.04em] text-6xl md:text-8xl lg:whitespace-nowrap"
              >
                Bombino Express
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p
                className="font-semibold leading-snug mt-5"
                style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", color: "#F2A123" }}
              >
                Providing Swift, Safe, and Secure Service
              </p>
            </FadeUp>
          </div>

          {/* ── Panoramic SVG Map ─────────────────────────────── */}
          <div className="relative w-full max-w-5xl mx-auto h-[350px] lg:h-[500px]" aria-hidden="true">
            <svg
              viewBox="0 0 800 600"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                  <pattern id="dotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" className="fill-slate-300" />
                  </pattern>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* The Map Grid Background */}
                <rect width="800" height="600" fill="url(#dotGrid)" />

                {/* Static Faint Tracks (always-on ghost routes from India) */}
                <g fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 7" opacity="0.45">
                  <path d="M 430,340 Q 260,170 90,280" />
                  <path d="M 430,340 Q 315,200 200,160" />
                  <path d="M 430,340 Q 360,322 290,305" />
                  <path d="M 430,340 Q 535,262 640,220" />
                </g>

                {/* Animated routes — all originate from India */}
                <motion.path
                  d="M 430,340 Q 260,170 90,280"
                  fill="none" stroke="#F2A123" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.9, 0.9, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0, times: [0, 0.45, 0.72, 1] }}
                  filter="url(#glow)"
                />
                <motion.path
                  d="M 430,340 Q 315,200 200,160"
                  fill="none" stroke="#F2A123" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.9, 0.9, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.9, times: [0, 0.45, 0.72, 1] }}
                  filter="url(#glow)"
                />
                <motion.path
                  d="M 430,340 Q 360,322 290,305"
                  fill="none" stroke="#F2A123" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.9, 0.9, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.8, times: [0, 0.45, 0.72, 1] }}
                  filter="url(#glow)"
                />
                <motion.path
                  d="M 430,340 Q 535,262 640,220"
                  fill="none" stroke="#F2A123" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.9, 0.9, 0] }}
                  transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut", delay: 2.7, times: [0, 0.45, 0.72, 1] }}
                  filter="url(#glow)"
                />

                {/* Destination nodes */}
                <g>
                  {/* USA */}
                  <circle cx="90" cy="280" r="7" fill="#112330" />
                  <circle cx="90" cy="280" r="3.5" fill="#F2A123" />
                  <motion.circle cx="90" cy="280" r="13" fill="none" stroke="#F2A123" strokeWidth="1.2"
                    animate={{ r: [13, 26, 13], opacity: [0.55, 0, 0.55] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: 0.5 }} />

                  {/* UK */}
                  <circle cx="200" cy="160" r="7" fill="#112330" />
                  <circle cx="200" cy="160" r="3.5" fill="#F2A123" />
                  <motion.circle cx="200" cy="160" r="13" fill="none" stroke="#F2A123" strokeWidth="1.2"
                    animate={{ r: [13, 26, 13], opacity: [0.55, 0, 0.55] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: 1.1 }} />

                  {/* Middle East */}
                  <circle cx="290" cy="305" r="7" fill="#112330" />
                  <circle cx="290" cy="305" r="3.5" fill="#F2A123" />
                  <motion.circle cx="290" cy="305" r="13" fill="none" stroke="#F2A123" strokeWidth="1.2"
                    animate={{ r: [13, 26, 13], opacity: [0.55, 0, 0.55] }}
                    transition={{ duration: 2.0, repeat: Infinity, delay: 1.7 }} />

                  {/* China */}
                  <circle cx="640" cy="220" r="7" fill="#112330" />
                  <circle cx="640" cy="220" r="3.5" fill="#F2A123" />
                  <motion.circle cx="640" cy="220" r="13" fill="none" stroke="#F2A123" strokeWidth="1.2"
                    animate={{ r: [13, 26, 13], opacity: [0.55, 0, 0.55] }}
                    transition={{ duration: 2.3, repeat: Infinity, delay: 2.3 }} />
                </g>

                {/* India — origin hub (larger, double-pulse) */}
                <circle cx="430" cy="340" r="14" fill="#112330" />
                <circle cx="430" cy="340" r="7" fill="#F2A123" />
                <motion.circle cx="430" cy="340" r="18" fill="none" stroke="#F2A123" strokeWidth="1.5"
                  animate={{ r: [18, 36, 18], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2.0, repeat: Infinity }} />
                <motion.circle cx="430" cy="340" r="18" fill="none" stroke="#F2A123" strokeWidth="1"
                  animate={{ r: [18, 48, 18], opacity: [0.35, 0, 0.35] }}
                  transition={{ duration: 2.0, repeat: Infinity, delay: 0.4 }} />

                {/* Labels */}
                <g fontFamily="inherit" fontSize="11" fontWeight="700" fill="#112330" opacity="0.6">
                  <text x="104" y="276">USA</text>
                  <text x="214" y="156">UK</text>
                  <text x="304" y="301">Middle East</text>
                  <text x="655" y="216">China</text>
                </g>
                <text x="430" y="368" fontFamily="inherit" fontSize="13" fontWeight="800" fill="#F2A123" opacity="0.9" textAnchor="middle">India</text>
              </svg>
            </div>

          {/* ── Editorial content ─────────────────────────────── */}
          <div className="max-w-4xl mr-auto px-6 mt-20 flex flex-col gap-12">

            {/* Story block 1 — Origins */}
            <FadeUp delay={0.22}>
              <div className="flex flex-col gap-4">
                <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#F2A123]/70">Est. 1995 — The Beginning</p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  When corporations and industries were expanding under economic liberalization,
                  they needed a dependable, economic courier service that had an extensive network
                  and was trustworthy in its delivery and time efficiency. The Bombino Brand saw
                  this need and chose to be the solution for courier services.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Founded in 1995, Bombino Express has become one of the oldest and most
                  preferred courier companies in India — showing steady growth in both volume
                  and revenue, a reflection of the confidence and trust bestowed on them by
                  their valued customers worldwide.
                </p>
              </div>
            </FadeUp>

            {/* Story block 2 — Global reach */}
            <FadeUp delay={0.30}>
              <div className="border-t border-slate-200 pt-8 flex flex-col gap-4">
                <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#F2A123]/70">Global Reach — 150+ Countries</p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Whether looking to import or export, Bombino Express is the best choice for
                  shipments within or between India, USA, UK, China, the Middle East, and the rest
                  of the world. With a corporate office in Hackensack, New Jersey, they serve
                  domestic, international, and intra-city needs from a truly global platform.
                </p>
              </div>
            </FadeUp>

            {/* Story block 3 — Standards */}
            <FadeUp delay={0.38}>
              <div className="border-t border-slate-200 pt-8 flex flex-col gap-4">
                <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#F2A123]/70">ISO 9001 — Quality & Integrity</p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Headed by motivated professionals who consistently deliver the highest quality
                  service with integrity, Bombino Express holds ISO 9001 certification and
                  continues to exceed customer expectations through innovation, technology,
                  and competitive rates.
                </p>
              </div>
            </FadeUp>

            {/* CTA */}
            <FadeUp delay={0.46}>
              <a
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#112330] hover:text-[#1E567B] transition-colors duration-200 group w-fit"
              >
                View our services
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: Vision & Mission ════════════════════════ */}
      <section className="bg-[#112330] py-24 lg:py-36">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">

          {/* Header */}
          <FadeUp>
            <div className="flex flex-col gap-5 mb-16 lg:mb-20">
              <p className="text-eyebrow text-[#F2A123]/60">Our Commitment</p>
              <h2
                className="font-black text-white leading-[0.92] tracking-[-0.04em]"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
              >
                Bombino's<br />Passion
              </h2>
              <p
                className="font-semibold text-[#F2A123]"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}
              >
                Empowering your business across the globe.
              </p>
            </div>
          </FadeUp>

          {/* Body text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            <FadeUp delay={0.08}>
              <p className="w-full max-w-none text-white/60 text-[1.0625rem] leading-[1.75]">
                Bombino Express passion is to provide Swift, Safe, and Secure service. They are
                determined to "delight customers with quality service through investing in
                innovation, technology, and in our people to develop and deliver comprehensive
                customized logistics solutions."
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="w-full max-w-none text-white/60 text-[1.0625rem] leading-[1.75]">
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
              className="w-full aspect-video bg-slate-800 rounded-3xl overflow-hidden relative group cursor-pointer border border-white/8"
              role="img"
              aria-label="Video placeholder — company story"
            >
              {/* Subtle gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(27% 0.065 248 / 0.8) 0%, oklch(17% 0.048 248 / 0.98) 100%)",
                }}
                aria-hidden="true"
              />

              {/* Grid lines for depth */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, transparent calc(100% - 1px), white 100%), linear-gradient(90deg, transparent calc(100% - 1px), white 100%)",
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
                    className="text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                </motion.div>
                <p className="text-white/35 text-xs font-semibold tracking-[0.12em] uppercase">
                  [Video Upload Placeholder]
                </p>
              </div>

              {/* Corner label */}
              <div className="absolute bottom-6 left-6">
                <span className="text-white/25 text-xs font-mono tracking-widest">16:9 · Cinematic</span>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ═══ SECTION 3: Brand History ════════════════════════════ */}
      <section className="bg-[#F8F9FA] py-24 lg:py-36">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">

          {/* Section header */}
          <FadeUp className="mb-20 lg:mb-28">
            <p className="text-eyebrow text-[#F2A123] mb-4">Our Legacy</p>
            <h2
              className="font-black text-[#112330] leading-[0.92] tracking-[-0.04em]"
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
                  <div className="absolute top-5 left-5 bg-[#112330] text-white px-4 py-2 rounded-full">
                    <span className="text-xs font-bold tracking-[0.12em] uppercase">1980s</span>
                  </div>
                </div>
              </FadeUp>

              {/* Text */}
              <div className="flex flex-col gap-6 w-full">
                <FadeUp delay={0.12}>
                  <div className="flex items-center gap-3">
                    <Building2 size={22} strokeWidth={1.5} className="text-[#F2A123] shrink-0" aria-hidden="true" />
                    <span className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#F2A123]">
                      The Founding
                    </span>
                  </div>
                </FadeUp>

                <FadeUp delay={0.18}>
                  <h3
                    className="font-extrabold text-[#112330] leading-tight tracking-[-0.03em]"
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
              <div className="flex flex-col gap-6 w-full lg:order-1">
                <FadeUp delay={0.06}>
                  <div className="flex items-center gap-3">
                    <Clock size={22} strokeWidth={1.5} className="text-[#F2A123] shrink-0" aria-hidden="true" />
                    <span className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#F2A123]">
                      1992 – Present
                    </span>
                  </div>
                </FadeUp>

                <FadeUp delay={0.12}>
                  <h3
                    className="font-extrabold text-[#112330] leading-tight tracking-[-0.03em]"
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
                        <span className="font-black text-[#112330] text-lg leading-none tracking-tight">
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
              <FadeUp delay={0.10} className="lg:order-2">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=75"
                    alt="Bombino Express global logistics network"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                  {/* Date badge */}
                  <div className="absolute top-5 left-5 bg-[#F2A123] text-[#112330] px-4 py-2 rounded-full">
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
                href="/quick-rates"
                className="inline-flex items-center gap-2 rounded-full bg-[#112330] text-white px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#112330]/40"
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
