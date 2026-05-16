"use client";

import { useRef, useLayoutEffect } from "react";
import GlobalCard from "@/components/GlobalCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  // Standard layout (ecommerce / air)
  ecommerceCourier?: { title: string; heroImage?: string; description: string[] };
  howItHelps?: { title: string; items: Array<{ title: string; description: string }> };
  fulfillmentServices?: { title: string; items: Array<{ title: string; description: string; image?: string }> };
  concierge?: { title: string; features: string[] };
  ior?: { title: string; description: string; features: string[] };
  // Ocean layout
  hero?: { title: string; heroImage?: string; description: string[] };
  editorial?: { sections: Array<{ title: string; content: string }> };
  services?: { title: string; items: Array<{ title: string; description: string }> };
  conclusion?: { title: string; description: string; features: string[] };
  // Warehousing layout
  storageTypes?: { title: string; description: string; items: Array<{ title: string; description: string }> };
  safetyAndSecurity?: { title: string; features: Array<{ title: string; description: string }> };
  benefits?: { title: string; items: string[] };
}

interface ServiceLayoutProps {
  data: ServiceData;
  layoutVariant?: "default" | "freight" | "ocean" | "warehousing";
  bottomSectionVariant?: "ecommerce" | "air" | "ocean" | "warehousing" | "default";
}

export default function ServiceLayout({ data, layoutVariant = "default", bottomSectionVariant = "ecommerce" }: ServiceLayoutProps) {
  const horizontalRef  = useRef<HTMLDivElement>(null);
  const cardsTrackRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = cardsTrackRef.current;
    const trigger = horizontalRef.current;
    if (!track || !trigger) return;

    const ctx = gsap.context(() => {
      const scrollDistance = Math.max(0, track.scrollWidth - window.innerWidth);
      const dwell = Math.max(window.innerWidth * 0.25, 1);
      const totalDistance = Math.max(scrollDistance + dwell * 2, 1);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalDistance}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: false,
        },
      });

      tl.to(track, { x: 0, duration: dwell, ease: "none" });
      if (scrollDistance > 0) {
        tl.to(track, { x: -scrollDistance, duration: scrollDistance, ease: "none" });
      }
      tl.to(track, { x: -scrollDistance, duration: dwell, ease: "none" });
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [layoutVariant]);

  const title       = data.ecommerceCourier?.title       ?? data.hero?.title       ?? "";
  const description = data.ecommerceCourier?.description ?? data.hero?.description ?? [];
  const heroImage   = data.ecommerceCourier?.heroImage   ?? data.hero?.heroImage   ?? "/default-placeholder.jpg";

  return (
    <main className="font-sans text-foreground">

      {/* ══ GLOBAL HERO BANNER (Image + Title) ══════════════════════ */}
      <div className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            className="w-full h-full object-cover object-center"
            alt={title}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6 mt-16">
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
            {title}
          </h1>
        </div>
      </div>

      {/* ══ GLOBAL DESCRIPTION (White Background) ═══════════════════ */}
      <div className="bg-white py-10 lg:py-12 px-6 lg:px-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-justify space-y-4 text-base lg:text-lg text-slate-600 leading-relaxed">
          {description.map((paragraph: string, idx: number) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* ══ DEFAULT LAYOUT (ecommerce / air) ════════════════════════ */}
      {(layoutVariant === "default" || layoutVariant === "freight") && (<>

      {/* ══ SECTION 2: Horizontal Scroll ════════════════════════════ */}
      <div ref={horizontalRef} className="overflow-x-hidden bg-[#F8FAFC] pt-20 pb-4 relative">
        {/* Dot-matrix overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hsDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#0F172A" opacity="0.04" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hsDots)" />
          </svg>
        </div>

        {/* Pinned Title Bar */}
        <div className="absolute top-0 left-0 w-full z-10 bg-[#F8FAFC] px-6 lg:px-12 pt-16 pb-8 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-3">
              {data.howItHelps?.title}
            </p>
            <h2 className="font-black text-foreground leading-[0.9] tracking-[-0.04em]" style={{ fontSize: "clamp(1.8rem, 3.8vw, 3rem)" }}>
              {data.howItHelps?.title}
            </h2>
          </div>
        </div>

        <div
          ref={cardsTrackRef}
          className="flex w-[500vw] lg:w-[165vw] pt-48"
        >
          {data.howItHelps?.items.map((card, i) => (
            <div
              key={i}
              className={`relative flex-shrink-0 w-[100vw] lg:w-[33vw] px-4 lg:px-6 ${i === 0 ? "pl-10 lg:pl-14" : ""} ${i === (data.howItHelps?.items.length ?? 0) - 1 ? "pr-10 lg:pr-14" : ""}`}
            >
              <div className="min-h-[480px] lg:min-h-[520px] bg-white rounded-[2rem] p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-[#FBAD1F]/30 transition-all duration-500">

                {/* Watermark number */}
                <div className="absolute -bottom-6 -right-6 text-[12rem] font-black text-[#FBAD1F]/15 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Status bar */}
                <div className="flex justify-between items-center relative z-10 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBAD1F] opacity-50" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FBAD1F]" />
                    </span>
                    <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-foreground">
                      System Active
                    </span>
                  </div>
                  <span className="text-[0.65rem] font-bold tracking-[0.2em] text-slate-300">
                    {String(i + 1).padStart(2, "0")} / {String(data.howItHelps?.items.length ?? 0).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col justify-center w-full">
                  <h3 className="font-black text-foreground leading-tight tracking-[-0.03em] mb-6 text-3xl lg:text-4xl w-full">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-[1.05rem] leading-relaxed w-full">
                    {card.description}
                  </p>
                </div>


              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SECTION 3: Fulfillment Services Bento ══════════════════ */}
      <section className="bg-white py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="mb-16">
            <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-4">
              {data.fulfillmentServices?.title}
            </p>
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground leading-[0.9] tracking-[-0.03em]">
              {data.fulfillmentServices?.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.fulfillmentServices?.items.map((item, i) => (
              <GlobalCard key={i} index={i} title={item.title} description={item.description} image={item.image} />
            ))}
          </div>

        </div>
      </section>

      </>)}

      {/* ══ OCEAN LAYOUT ════════════════════════════════════════════ */}
      {layoutVariant === "ocean" && (<>

        {/* ── Editorial Split ──────────────────────────────────────── */}
        <section className="bg-white py-24 lg:py-36 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-20">
            {data.editorial?.sections.map((section, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <div className="lg:col-span-4">
                  <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground leading-tight tracking-[-0.025em]">
                    {section.title}
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-slate-500 text-lg leading-relaxed">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Horizontal Scroll: Sea Freight Services ──────────────── */}
        <div ref={horizontalRef} className="overflow-x-hidden bg-[#F8FAFC] pt-20 pb-4 relative">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="oceanHsDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#0F172A" opacity="0.04" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#oceanHsDots)" />
            </svg>
          </div>

          <div className="absolute top-0 left-0 w-full z-10 bg-[#F8FAFC] px-6 lg:px-12 pt-16 pb-8 border-b border-slate-200">
            <div className="max-w-7xl mx-auto">
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-3">
                {data.services?.title}
              </p>
              <h2 className="font-black text-foreground leading-[0.9] tracking-[-0.04em]" style={{ fontSize: "clamp(1.8rem, 3.8vw, 3rem)" }}>
                {data.services?.title}
              </h2>
            </div>
          </div>

          <div
            ref={cardsTrackRef}
            className="flex w-[400vw] lg:w-[132vw] pt-48"
          >
            {data.services?.items.map((card, i) => (
              <div
                key={i}
                className={`relative flex-shrink-0 w-[100vw] lg:w-[33vw] px-4 lg:px-6 ${i === 0 ? "pl-10 lg:pl-14" : ""} ${i === (data.services?.items.length ?? 0) - 1 ? "pr-10 lg:pr-14" : ""}`}
              >
                <div className="min-h-[480px] lg:min-h-[520px] bg-white rounded-[2rem] p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-[#FBAD1F]/30 transition-all duration-500">
                  <div className="absolute -bottom-6 -right-6 text-[12rem] font-black text-[#FBAD1F]/15 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex justify-between items-center relative z-10 mb-8">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBAD1F] opacity-50" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FBAD1F]" />
                      </span>
                      <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-foreground">System Active</span>
                    </div>
                    <span className="text-[0.65rem] font-bold tracking-[0.2em] text-slate-300">
                      {String(i + 1).padStart(2, "0")} / {String(data.services?.items.length ?? 0).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative z-10 flex-1 flex flex-col justify-center w-full">
                    <h3 className="font-black text-foreground leading-tight tracking-[-0.03em] mb-6 text-3xl lg:text-4xl w-full">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-[1.05rem] leading-relaxed w-full">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </>)}

      {/* ══ WAREHOUSING LAYOUT ══════════════════════════════════════ */}
      {layoutVariant === "warehousing" && (<>

        {/* ── Storage Types Bento ──────────────────────────────────── */}
        <section className="bg-white py-24 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-14">
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-3">{data.storageTypes?.title}</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-[-0.03em] mb-4">{data.storageTypes?.title}</h2>
              <p className="text-slate-500 text-lg">{data.storageTypes?.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.storageTypes?.items.map((item, i) => {
                const icons = [
                  /* Dedicated — box/cube */
                  <svg key="box" className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="#FBAD1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z"/><path d="M4 12 L20 20 L36 12"/><line x1="20" y1="20" x2="20" y2="36"/></svg>,
                  /* Shared — two overlapping circles */
                  <svg key="share" className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="#FBAD1F" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="14" cy="20" r="10"/><circle cx="26" cy="20" r="10"/></svg>,
                  /* Temperature — thermometer */
                  <svg key="temp" className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="#FBAD1F" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><rect x="16" y="4" width="8" height="22" rx="4"/><circle cx="20" cy="31" r="5"/><line x1="23" y1="10" x2="27" y2="10"/><line x1="23" y1="15" x2="27" y2="15"/><line x1="23" y1="20" x2="27" y2="20"/></svg>,
                  /* Ambient — wave lines */
                  <svg key="wave" className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="#FBAD1F" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M4 16 Q10 10 16 16 Q22 22 28 16 Q34 10 40 16"/><path d="M4 24 Q10 18 16 24 Q22 30 28 24 Q34 18 40 24"/></svg>,
                  /* Bonded — shield */
                  <svg key="shield" className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="#FBAD1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 4 L34 10 L34 22 C34 30 20 37 20 37 C20 37 6 30 6 22 L6 10 Z"/><path d="M14 20 L18 24 L26 16"/></svg>,
                ];
                return (
                  <div key={i} className="border border-slate-200 rounded-2xl p-8 bg-white hover:border-[#FBAD1F]/40 hover:shadow-sm transition-all duration-300 flex flex-col gap-5">
                    <div className="w-14 h-14 rounded-xl bg-[#FBAD1F]/8 flex items-center justify-center">
                      {icons[i % icons.length]}
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-foreground mb-2 leading-tight">{item.title}</h3>
                      <p className="text-slate-500 text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Safety & Security Dashboard ───────────────────────────── */}
        <section className="bg-admiralty py-24 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-14">
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F]/60 mb-3">Safety First</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-[-0.03em]">
                {data.safetyAndSecurity?.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.safetyAndSecurity?.features.map((feat, i) => {
                const safetyIcons = [
                  /* Advanced Infrastructure — rack grid */
                  <svg key="rack" className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#FBAD1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="28" height="6" rx="1"/><rect x="2" y="13" width="28" height="6" rx="1"/><rect x="2" y="22" width="28" height="6" rx="1"/><line x1="8" y1="10" x2="8" y2="13"/><line x1="24" y1="10" x2="24" y2="13"/><line x1="8" y1="19" x2="8" y2="22"/><line x1="24" y1="19" x2="24" y2="22"/></svg>,
                  /* Fire Safety — flame */
                  <svg key="flame" className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#FBAD1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 2 C16 2 22 10 22 16 C22 19.3 19.3 22 16 22 C12.7 22 10 19.3 10 16 C10 13 12 10 12 10 C12 10 13 14 16 14 C16 14 14 10 16 2Z"/><path d="M16 22 C16 22 10 26 10 28 C10 28 16 30 22 28 C22 28 22 24 16 22Z" strokeDasharray="2 2"/></svg>,
                  /* Access & CCTV — camera */
                  <svg key="cctv" className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#FBAD1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="9" width="20" height="14" rx="2"/><path d="M22 13 L30 9 L30 23 L22 19"/><circle cx="12" cy="16" r="3"/></svg>,
                  /* Quality Control — shield check */
                  <svg key="qc" className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#FBAD1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 2 L28 7 L28 18 C28 24 16 30 16 30 C16 30 4 24 4 18 L4 7 Z"/><path d="M11 16 L14 19 L21 12"/></svg>,
                  /* Digital Retrieval — barcode */
                  <svg key="barcode" className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="#FBAD1F" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><line x1="4" y1="6" x2="4" y2="22"/><line x1="8" y1="6" x2="8" y2="22"/><line x1="11" y1="6" x2="11" y2="22"/><line x1="15" y1="6" x2="15" y2="22"/><line x1="18" y1="6" x2="18" y2="22"/><line x1="22" y1="6" x2="22" y2="22"/><line x1="25" y1="6" x2="25" y2="22"/><line x1="28" y1="6" x2="28" y2="22"/><line x1="2" y1="26" x2="14" y2="26"/><line x1="18" y1="26" x2="30" y2="26"/></svg>,
                ];
                return (
                  <div key={i} className="flex flex-col gap-5 p-6 rounded-2xl bg-white/5 border border-white/8 hover:border-[#FBAD1F]/30 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#FBAD1F]/10 flex items-center justify-center">
                      {safetyIcons[i % safetyIcons.length]}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-white mb-2">{feat.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </>)}

      {/* ══ SECTION 4: Variant Bottom Section ═══════════════════════ */}

      {/* ── Ecommerce / default ──────────────────────────────────── */}
      {(bottomSectionVariant === "ecommerce" || bottomSectionVariant === "default") && (
        <section className="bg-[#F8FAFC] py-24 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              <div className="rounded-3xl bg-admiralty p-10 lg:p-12 flex flex-col gap-8">
                <div>
                  <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F]/60 mb-3">VIP Service</p>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight tracking-[-0.03em]">{data.concierge?.title}</h2>
                </div>
                <ul className="flex flex-col gap-5">
                  {data.concierge?.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <span className="shrink-0 mt-[7px] w-2 h-2 rounded-full bg-[#FBAD1F]" />
                      <span className="text-white/70 text-lg leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-10 lg:p-12 flex flex-col gap-8">
                <div>
                  <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F]/60 mb-3">Compliance</p>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-[-0.03em]">{data.ior?.title}</h2>
                </div>
                <p className="text-slate-500 text-lg leading-relaxed">{data.ior?.description}</p>
                <ul className="flex flex-col gap-4">
                  {data.ior?.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <span className="shrink-0 mt-[6px] relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBAD1F] opacity-40" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FBAD1F]" />
                      </span>
                      <span className="text-slate-600 text-lg leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ── Air: Control Tower ───────────────────────────────────── */}
      {bottomSectionVariant === "air" && (
        <section className="bg-white py-24 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">

            <div className="relative rounded-[3rem] bg-admiralty p-12 lg:p-20 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
              <svg className="absolute inset-0 w-full h-full text-white/[0.02] pointer-events-none scale-150 transform translate-x-1/4" viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              <div className="relative z-10 lg:w-1/3">
                <h2 className="font-black text-white text-4xl lg:text-5xl mb-4 tracking-tight">{data.concierge?.title}</h2>
                <p className="text-slate-400 text-lg">24/7 Global Air Monitoring</p>
              </div>
              <div className="relative z-10 lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {data.concierge?.features.map((feat: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-[#FBAD1F] animate-pulse shrink-0" />
                    <span className="text-white/90 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <h2 className="font-black text-foreground text-3xl lg:text-4xl mb-4 tracking-tight">{data.ior?.title}</h2>
                <p className="text-slate-500 leading-relaxed">{data.ior?.description}</p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {data.ior?.features.map((feat: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#FBAD1F] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-slate-700 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ── Ocean: Deep Water Terminal ────────────────────────────── */}
      {bottomSectionVariant === "ocean" && (
        <section className="relative bg-gradient-to-b from-[#0F172A] to-[#081017] py-24 lg:py-36 overflow-hidden">

          {/* Sonar / depth-map SVG background */}
          <div className="absolute inset-0 pointer-events-none opacity-5" aria-hidden="true">
            <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <circle cx="50" cy="50" r="10"  fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="50" cy="50" r="20"  fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="50" cy="50" r="30"  fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="50" cy="50" r="40"  fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="50" cy="50" r="50"  fill="none" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="50" cy="50" r="65"  fill="none" stroke="currentColor" strokeWidth="0.2" />
              <circle cx="50" cy="50" r="80"  fill="none" stroke="currentColor" strokeWidth="0.2" />
              <line x1="50" y1="0"  x2="50"  y2="100" stroke="currentColor" strokeWidth="0.2" />
              <line x1="0"  y1="50" x2="100" y2="50"  stroke="currentColor" strokeWidth="0.2" />
              <line x1="15" y1="15" x2="85"  y2="85"  stroke="currentColor" strokeWidth="0.1" />
              <line x1="85" y1="15" x2="15"  y2="85"  stroke="currentColor" strokeWidth="0.1" />
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

            {/* Asymmetric stacked-container grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4">

              {/* Container 1: Tall VIP card — spans 2 rows */}
              <div
                className="lg:row-span-2 rounded-2xl p-8 lg:p-10 flex flex-col gap-6"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div>
                  <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F]/60 mb-3">Ocean Management</p>
                  <h2 className="font-black text-white text-3xl lg:text-4xl leading-tight tracking-[-0.03em]">
                    {data.conclusion?.title}
                  </h2>
                </div>
                <p className="text-white/55 text-base leading-relaxed flex-1">{data.conclusion?.description}</p>
                {/* Depth indicator */}
                <div className="pt-6 border-t border-white/10 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBAD1F] opacity-50" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FBAD1F]" />
                  </span>
                  <span className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[#FBAD1F]/50">Live Operations</span>
                </div>
              </div>

              {/* Container 2: Wide IOR header */}
              <div
                className="lg:col-span-2 rounded-2xl p-8 lg:p-10 flex flex-col gap-4 backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F]/60">Global Ocean Reliability</p>
                <h2 className="font-black text-white text-3xl lg:text-4xl leading-tight tracking-[-0.03em]">
                  Why Choose Bombino Express?
                </h2>
                <p className="text-white/45 text-base leading-relaxed">{data.conclusion?.description}</p>
              </div>

              {/* Container 3: Wide features metric blocks — buoyancy hover */}
              <div
                className="lg:col-span-2 rounded-2xl p-8 lg:p-10 backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {data.conclusion?.features.map((feat: string, i: number) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 hover:-translate-y-1 transition-transform duration-700 flex items-center gap-3 w-full cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FBAD1F] shrink-0" />
                      <span className="text-white/70 text-sm font-medium leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ── Warehousing: Benefits Grid ───────────────────────────── */}
      {bottomSectionVariant === "warehousing" && (
        <section className="bg-[#F8FAFC] py-24 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-14">
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-3">Why Choose Us</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-[-0.03em]">
                {data.benefits?.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.benefits?.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)] hover:border-[#FBAD1F]/30 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all duration-300"
                >
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-[#FBAD1F]/10 flex items-center justify-center mt-0.5">
                    <svg className="w-4.5 h-4.5" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#FBAD1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 9 L7 13 L15 5" />
                    </svg>
                  </div>
                  <span className="text-foreground font-semibold text-base leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
