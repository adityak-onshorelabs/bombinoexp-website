"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    prefix: "",
    target: 96.2,
    suffix: "%",
    decimals: 1,
    label: "On-time delivery rate",
    sub: "Measured across all international shipments, 2023–2024.",
  },
  {
    prefix: "",
    target: 1000000,
    suffix: "+",
    decimals: 0,
    label: "Shipments delivered",
    sub: "Since operations began in 1995.",
  },
  {
    prefix: "",
    target: 150,
    suffix: "+",
    decimals: 0,
    label: "Countries served",
    sub: "Active freight corridors across six continents.",
  },
] as const;

export function ScrollyStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    // Recalculate trigger positions after layout settles.
    requestAnimationFrame(refresh);

    window.addEventListener("load", refresh);
    window.addEventListener("pageshow", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("pageshow", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        numRefs.current.forEach((el, i) => {
          if (!el) return;
          const s = STATS[i];
          const v = s.decimals > 0 ? s.target.toFixed(s.decimals) : s.target.toLocaleString();
          el.textContent = `${s.prefix}${v}${s.suffix}`;
        });
        return;
      }

      // Amber rule extends on scroll-enter
      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "expo.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Count-up on scroll-enter — no pin
      STATS.forEach((stat, i) => {
        const obj = { val: 0 };
        const el  = numRefs.current[i];
        gsap.to(obj, {
          val: stat.target,
          ease: "expo.out",
          duration: 1.6,
          delay: i * 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
          onUpdate() {
            if (!el) return;
            const v = stat.decimals > 0
              ? obj.val.toFixed(stat.decimals)
              : Math.round(obj.val).toLocaleString();
            el.textContent = `${stat.prefix}${v}${stat.suffix}`;
          },
        });
      });

      // Stat blocks fade up
      gsap.from(".stat-block", {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="stats-heading"
      className="relative bg-admiralty py-28 lg:py-36"
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">

        {/* Eyebrow */}
        <p className="text-eyebrow text-dispatch-amber/55 mb-10" id="stats-heading">
          The Numbers Behind Every Delivery
        </p>

        {/* Amber rule */}
        <div className="mb-16">
          <div
            ref={ruleRef}
            className="h-px bg-dispatch-amber"
            style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
            aria-hidden="true"
          />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 lg:gap-24">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="stat-block flex flex-col gap-3">

              {/* Counter number */}
              <div
                className="font-black text-freight-paper leading-[1.1] tracking-[-0.04em]"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                aria-label={`${stat.target}${stat.suffix} ${stat.label}`}
              >
                <span ref={(el) => { numRefs.current[i] = el; }} aria-hidden="true">
                  {stat.prefix}0{stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="text-freight-paper font-semibold text-base leading-snug">
                {stat.label}
              </p>

              {/* Sub */}
              <p className="text-freight-paper/40 text-sm leading-relaxed">
                {stat.sub}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
