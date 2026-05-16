"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: "1M+", label: "Shipments Delivered" },
  { value: "150+", label: "Countries Served" },
  { value: "1995", label: "Est. — 30 Years" },
];

export function TrustStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          sectionRef.current?.querySelectorAll<HTMLElement>(".reveal-item").forEach((el) => {
            el.style.opacity = "1"; el.style.transform = "none";
          });
          return;
        }

        const items = sectionRef.current?.querySelectorAll(".reveal-item");
        if (!items?.length) return;
        gsap.set(items, { y: 20, opacity: 0 });
        gsap.to(items, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        });
      } catch { /* reveal anyway */ }
    };
    init();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Why choose Bombino Express"
      /* pt-56 on desktop to leave room for the floating calculator card overlap */
      className="bg-white pt-12 pb-20 px-6 lg:pt-56"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

        {/* Left: bold heading */}
        <div className="reveal-item opacity-0 max-w-[36ch]">
          <p className="text-[0.6875rem] font-semibold tracking-[0.10em] uppercase text-muted-ink mb-3">
            Why Bombino
          </p>
          <h2
            className="font-bold text-admiralty leading-[1.15]"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            Smart logistics that move<br className="hidden sm:block" />
            your business forward.
          </h2>
        </div>

        {/* Right: stats */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-16">
          {stats.map(({ value, label }) => (
            <div key={value} className="reveal-item opacity-0 flex flex-col gap-1">
              <span
                className="font-extrabold text-admiralty leading-none"
                style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
              >
                {value}
              </span>
              <span className="text-[0.8125rem] font-medium text-muted-ink tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
