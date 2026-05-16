"use client";

import { motion } from "framer-motion";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const highlights = [
  { value: "1M+", label: "Shipments Delivered" },
  { value: "150+", label: "Countries Served" },
  { value: "1995", label: "Year Established" },
];

export function ProofNarrative() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="py-24 lg:py-36 bg-admiralty relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, oklch(73% 0.160 64 / 0.30) 50%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(73% 0.160 64 / 0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">

        {/* Eyebrow */}
        <motion.p
          className="text-eyebrow text-dispatch-amber/60 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.55, ease: EXPO_OUT }}
        >
          30 Years of Excellence
        </motion.p>

        {/* Narrative statement */}
        <motion.p
          id="proof-heading"
          className="font-light leading-[1.45] text-freight-paper/75"
          style={{ maxWidth: "56rem", fontSize: "clamp(1.35rem, 2.5vw, 2rem)" }}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.7, ease: EXPO_OUT, delay: 0.1 }}
        >
          Since 1995, Bombino Express has delivered over{" "}
          <strong className="text-freight-paper font-bold">1,000,000 shipments</strong>{" "}
          to{" "}
          <strong className="text-freight-paper font-bold">150+ countries</strong>{" "}
          worldwide — making us India's most trusted international courier for{" "}
          <strong className="text-dispatch-amber font-bold">three decades</strong>.
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-16 pt-14 border-t border-freight-paper/10 max-sm:grid-cols-1 max-sm:gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.65, ease: EXPO_OUT, delay: 0.25 }}
        >
          {highlights.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-2">
              <span
                className="font-extrabold tracking-tight text-freight-paper"
                style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}
              >
                {value}
              </span>
              <span className="text-eyebrow text-freight-paper/35">{label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
