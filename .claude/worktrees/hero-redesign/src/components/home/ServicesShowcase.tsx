"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: "air",
    category: "Express",
    title: "Air Freight Express",
    desc: "Priority air cargo. India to USA, UK, UAE in 3–5 business days.",
    href: "/services/air-freight",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=75",
    alt: "Air cargo aircraft on the runway at dusk",
  },
  {
    id: "sea",
    category: "Freight",
    title: "Sea & Ocean Freight",
    desc: "Full container and LCL sea freight for bulk commercial shipments.",
    href: "/services/sea-freight",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=75",
    alt: "Container ship at sea during golden hour",
  },
  {
    id: "ecom",
    category: "E-Commerce",
    title: "Cross-Border E-Commerce",
    desc: "FBA prep, marketplace fulfillment, and DTC delivery for Indian sellers.",
    href: "/services/ecommerce",
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=75",
    alt: "Stacked shipping containers in a busy port",
  },
  {
    id: "personal",
    category: "Personal",
    title: "Personal Express",
    desc: "Gifts, documents, personal effects — delivered safely to your loved ones abroad.",
    href: "/services/personal",
    img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=900&q=75",
    alt: "Courier handling packages in a warehouse",
  },
];

export function ServicesShowcase() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gridRef.current?.querySelectorAll<HTMLElement>(".svc-card").forEach((el) => {
            el.style.opacity = "1"; el.style.transform = "none";
          });
          return;
        }

        const cards = gridRef.current?.querySelectorAll(".svc-card");
        if (!cards?.length) return;
        gsap.set(cards, { y: 32, opacity: 0 });
        gsap.to(cards, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "expo.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 72%", once: true },
        });
      } catch { /* reveal anyway */ }
    };
    init();
  }, []);

  return (
    <section
      aria-labelledby="services-heading"
      className="bg-white py-24 px-6"
    >
      <div className="max-w-[1280px] mx-auto">

        <header className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[0.6875rem] font-semibold tracking-[0.10em] uppercase text-muted-ink mb-3">
              Services
            </p>
            <h2
              id="services-heading"
              className="font-bold text-admiralty"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: "1.2" }}
            >
              Fast, reliable services<br className="hidden sm:block" />
              for every need.
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-trade-wind hover:text-admiralty transition-colors duration-150 shrink-0"
          >
            View all services
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </header>

        {/* 2-column asymmetric grid:
            Top row: air (3fr) | sea (2fr)
            Bottom row: ecom (2fr) | personal (3fr)
        */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map(({ id, category, title, desc, href, img, alt }) => (
            <Link
              key={id}
              href={href}
              className={[
                "svc-card group opacity-0 relative overflow-hidden rounded-2xl",
                "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trade-wind",
                // First and last cards are taller for visual asymmetry
                id === "air" || id === "personal" ? "aspect-[4/3]" : "aspect-[5/3]",
              ].join(" ")}
            >
              {/* Image */}
              <Image
                src={img}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />

              {/* Dark gradient overlay — bottom third */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to top, oklch(17% 0.048 248 / 0.90) 0%, oklch(17% 0.048 248 / 0.50) 40%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              {/* Content — anchored to bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex flex-col gap-1.5">
                <span className="text-[0.6875rem] font-semibold tracking-[0.10em] uppercase text-dispatch-amber">
                  {category}
                </span>
                <h3 className="text-xl font-bold text-freight-paper leading-tight">
                  {title}
                </h3>
                <p className="text-sm text-[oklch(98%_0.004_246_/_0.70)] leading-relaxed max-w-[40ch]">
                  {desc}
                </p>
                {/* Arrow indicator */}
                <div
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-dispatch-amber opacity-0 -translate-x-1 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                  aria-hidden="true"
                >
                  Explore service
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
