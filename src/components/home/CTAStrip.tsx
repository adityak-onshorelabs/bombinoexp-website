"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CTAStrip() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23112330'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Amber glow accent top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-dispatch-amber/30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">

        <motion.div
          className="mx-auto flex flex-col items-center justify-center text-center gap-6"
          style={{ maxWidth: "56rem" }}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: EXPO_OUT }}
        >
          <p className="text-eyebrow text-dispatch-amber text-center">Ready to ship?</p>

          <h2
            id="cta-heading"
            className="font-extrabold tracking-tight text-slate-900 leading-tight text-center"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Move anything, anywhere.
          </h2>

          <p className="text-slate-500 text-base lg:text-lg leading-relaxed text-center max-w-[52ch]">
            Get an instant rate estimate in under a minute. No account required to start.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-3">
            <Link
              href="/booking/get-quote"
              className="inline-flex items-center gap-2 px-8 rounded-full bg-dispatch-amber text-[lab(7.78673_1.82346_-15.0537)] text-sm font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:bg-dispatch-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dispatch-amber/40"
              style={{ height: 52 }}
            >
              Get a Rate
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 rounded-full border-2 border-slate-200 text-slate-700 text-sm font-semibold tracking-wide transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              style={{ height: 52 }}
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
