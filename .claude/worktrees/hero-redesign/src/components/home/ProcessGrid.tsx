"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Get an Instant Quote",
    desc: "Enter your destination and weight. Our calculator returns live rates in seconds — no registration needed.",
  },
  {
    num: "02",
    title: "Book & Confirm",
    desc: "Choose your preferred service. Schedule a pickup from your door, and receive a booking confirmation instantly.",
  },
  {
    num: "03",
    title: "Track in Real Time",
    desc: "End-to-end tracking with live status updates at every checkpoint — from pickup to customs to delivery.",
  },
  {
    num: "04",
    title: "Delivered Safe",
    desc: "Door-to-door delivery with signature confirmation. Every shipment insured and handled by trained logistics partners.",
  },
];

export function ProcessGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gridRef.current?.querySelectorAll<HTMLElement>(".step-card").forEach((el) => {
            el.style.opacity = "1"; el.style.transform = "none";
          });
          return;
        }

        const cards = gridRef.current?.querySelectorAll(".step-card");
        if (!cards?.length) return;
        gsap.set(cards, { y: 28, opacity: 0 });
        gsap.to(cards, {
          opacity: 1, y: 0, stagger: 0.09, duration: 0.65, ease: "expo.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 74%", once: true },
        });
      } catch { /* reveal anyway */ }
    };
    init();
  }, []);

  return (
    <section
      aria-labelledby="process-heading"
      className="bg-freight-paper py-24 px-6"
    >
      <div className="max-w-[1280px] mx-auto">

        <header className="mb-14">
          <p className="text-[0.6875rem] font-semibold tracking-[0.10em] uppercase text-muted-ink mb-3">
            How it works
          </p>
          <h2
            id="process-heading"
            className="font-bold text-admiralty"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: "1.2" }}
          >
            Ship internationally<br className="hidden sm:block" />
            in four simple steps.
          </h2>
        </header>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ num, title, desc }) => (
            <article
              key={num}
              className="step-card opacity-0 bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-md"
            >
              {/* Step number */}
              <span className="text-xs font-bold tracking-[0.08em] text-dispatch-amber">
                {num}
              </span>

              <div className="flex flex-col gap-2">
                <h3 className="text-[1rem] font-semibold text-admiralty leading-[1.35]">
                  {title}
                </h3>
                <p className="text-[0.875rem] font-normal text-muted-ink leading-relaxed">
                  {desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
