"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Globe, ShieldCheck, Clock } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CARD_LIFT = { y: -8, transition: { duration: 0.3, ease: PREMIUM } };
const CARD_TAP  = { scale: 0.98 };

/* ─── Card 1 Globe: slows/speeds based on parent hover ──────── */
function RotatingGlobe() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ rotate: 360, transition: { repeat: Infinity, duration: 12, ease: "linear" } });
  }, [controls]);

  return (
    <motion.div
      className="w-fit"
      animate={controls}
      onHoverStart={() =>
        controls.start({ rotate: 360, transition: { repeat: Infinity, duration: 2.5, ease: "linear" } })
      }
      onHoverEnd={() =>
        controls.start({ rotate: 360, transition: { repeat: Infinity, duration: 12, ease: "linear" } })
      }
      aria-hidden="true"
    >
      <Globe className="w-8 h-8 text-dispatch-amber" />
    </motion.div>
  );
}

/* ─── Card 4 Line Graph ──────────────────────────────────────── */
const LINE_PTS = [
  [0, 85], [40, 68], [80, 72], [120, 44], [160, 50], [200, 26], [240, 12],
] as const;

const LINE_D = LINE_PTS.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x},${y}`).join(" ");
const FILL_D = `${LINE_D} L 240,100 L 0,100 Z`;

function LineGraph({ cardHovered }: { cardHovered: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true, margin: "-60px" });

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 240 100"
      className="hidden lg:block w-44 h-[72px] shrink-0"
      overflow="visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lg-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1E567B" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#1E567B" stopOpacity="0"    />
        </linearGradient>
      </defs>

      {/* Area fill — appears after line completes */}
      <motion.path
        d={FILL_D}
        fill="url(#lg-area)"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 1.7 }}
      />

      {/* The line — path draws from left to right */}
      <motion.path
        d={LINE_D}
        fill="none"
        stroke="#1E567B"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, strokeWidth: 2 }}
        animate={
          isInView
            ? { pathLength: 1, strokeWidth: cardHovered ? 3 : 2 }
            : { pathLength: 0, strokeWidth: 2 }
        }
        transition={{
          pathLength:  { duration: 1.6, ease: PREMIUM },
          strokeWidth: { duration: 0.25 },
        }}
      />

      {/* Dots — staggered after the line reveals them */}
      {LINE_PTS.slice(1).map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={cardHovered ? 4 : 3}
          fill="#1E567B"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.28 + i * 0.19, duration: 0.28, ease: PREMIUM }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
}

/* ─── Main section ───────────────────────────────────────────── */
export function CapabilitiesBento() {
  const [card4Hovered, setCard4Hovered] = useState(false);

  return (
    <section
      aria-labelledby="capabilities-heading"
      className="py-24 lg:py-32 bg-freight-paper"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">

        <FadeUp className="mb-14">
          <p className="text-eyebrow text-dispatch-amber mb-3">Why Bombino Express</p>
          <h2 id="capabilities-heading" className="text-headline text-admiralty">
            Built for every shipping scenario.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* ── Card 1: Global Reach ───────────────────────────────── */}
          <motion.div
            className="md:row-span-2 lg:row-span-2 relative overflow-hidden rounded-2xl bg-admiralty flex flex-col cursor-default"
            style={{ minHeight: "clamp(280px, 40vw, 460px)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.65, ease: EXPO_OUT }}
            whileHover={CARD_LIFT}
            whileTap={CARD_TAP}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=55"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
              loading="lazy"
              aria-hidden="true"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(170deg, transparent 25%, oklch(17% 0.048 248 / 0.88) 70%)" }}
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 right-0 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, oklch(73% 0.160 64 / 0.15) 0%, transparent 70%)", transform: "translate(35%, 35%)" }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col h-full p-8">
              <RotatingGlobe />
              <div className="mt-auto">
                <span className="block text-8xl font-black leading-none text-freight-paper/8 mb-3 select-none" aria-hidden="true">01</span>
                <h3 className="text-2xl font-bold text-freight-paper">Global Reach</h3>
                <p className="text-freight-paper/55 text-sm mt-3 leading-relaxed">
                  Seamless freight corridors connecting India to 150+ countries worldwide.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Card 2: Secure Handling ────────────────────────────── */}
          <motion.div
            className="rounded-2xl bg-white border border-border-subtle p-7 flex flex-col cursor-default"
            style={{
              minHeight: 210,
              boxShadow: "0 2px 8px oklch(17% 0.048 248 / 0.05), 0 1px 2px oklch(17% 0.048 248 / 0.04)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.65, ease: EXPO_OUT, delay: 0.1 }}
            whileHover={{
              ...CARD_LIFT,
              boxShadow: "0 24px 64px oklch(17% 0.048 248 / 0.13), 0 6px 16px oklch(17% 0.048 248 / 0.07)",
              borderColor: "oklch(73% 0.160 64 / 0.30)",
            }}
            whileTap={CARD_TAP}
          >
            <div className="flex justify-between items-start">
              {/* Shield: scale-up "locking" then y-thud vibration */}
              <motion.div
                className="w-fit"
                style={{ color: "oklch(37% 0.092 245)" }}
                whileHover={{
                  scale: [1, 1.12, 1.10, 1.10, 1.10, 1.0],
                  y:     [0,   0,    2,   -1,   1,    0],
                  color: "#F2A123",
                  transition: { duration: 0.5, times: [0, 0.28, 0.48, 0.64, 0.80, 1], ease: "easeOut" },
                }}
                aria-hidden="true"
              >
                <ShieldCheck className="w-7 h-7" style={{ color: "inherit" }} />
              </motion.div>
              <span className="text-5xl font-black leading-none select-none" style={{ color: "oklch(92% 0.010 246)" }} aria-hidden="true">02</span>
            </div>
            <div className="mt-auto pt-10">
              <h3 className="text-xl font-bold text-admiralty">Secure Handling</h3>
              <p className="text-muted-ink text-sm mt-2 leading-relaxed">
                Bank-grade security protocols and real-time monitoring for every shipment.
              </p>
            </div>
          </motion.div>

          {/* ── Card 3: Time Critical ──────────────────────────────── */}
          <motion.div
            className="rounded-2xl bg-white border border-border-subtle p-7 flex flex-col cursor-default"
            style={{
              minHeight: 210,
              boxShadow: "0 2px 8px oklch(17% 0.048 248 / 0.05), 0 1px 2px oklch(17% 0.048 248 / 0.04)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.65, ease: EXPO_OUT, delay: 0.15 }}
            whileHover={{
              ...CARD_LIFT,
              boxShadow: "0 24px 64px oklch(17% 0.048 248 / 0.13), 0 6px 16px oklch(17% 0.048 248 / 0.07)",
              borderColor: "oklch(73% 0.160 64 / 0.30)",
            }}
            whileTap={CARD_TAP}
          >
            <div className="flex justify-between items-start">
              {/* Clock: rhythmic tick — repeats while hovered */}
              <motion.div
                className="w-fit"
                style={{ color: "oklch(37% 0.092 245)" }}
                whileHover={{
                  scale: [1, 1.08, 1, 1.08, 1],
                  transition: { duration: 0.38, repeat: Infinity, ease: "easeInOut" },
                }}
                aria-hidden="true"
              >
                <Clock className="w-7 h-7" style={{ color: "inherit" }} />
              </motion.div>
              <span className="text-5xl font-black leading-none select-none" style={{ color: "oklch(92% 0.010 246)" }} aria-hidden="true">03</span>
            </div>
            <div className="mt-auto pt-10">
              <h3 className="text-xl font-bold text-admiralty">Time Critical</h3>
              <p className="text-muted-ink text-sm mt-2 leading-relaxed">
                Express air freight and dedicated vehicles for urgent, time-sensitive cargo.
              </p>
            </div>
          </motion.div>

          {/* ── Card 4: Real-Time Tracking — live line graph ─────────── */}
          <motion.div
            className="md:col-span-2 lg:col-span-2 rounded-2xl bg-white border border-border-subtle p-7 flex items-center gap-6 cursor-default relative overflow-hidden"
            style={{
              boxShadow: "0 2px 8px oklch(17% 0.048 248 / 0.05), 0 1px 2px oklch(17% 0.048 248 / 0.04)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.65, ease: EXPO_OUT, delay: 0.2 }}
            whileHover={{
              ...CARD_LIFT,
              boxShadow: "0 24px 64px oklch(17% 0.048 248 / 0.11), 0 6px 16px oklch(17% 0.048 248 / 0.06)",
              borderColor: "oklch(73% 0.160 64 / 0.30)",
            }}
            whileTap={CARD_TAP}
            onHoverStart={() => setCard4Hovered(true)}
            onHoverEnd={() => setCard4Hovered(false)}
          >
            {/* Subtle amber corner glow */}
            <div
              className="absolute bottom-0 right-0 w-64 h-32 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at bottom right, oklch(73% 0.160 64 / 0.07) 0%, transparent 70%)" }}
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                {/* Trending-up icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="oklch(37% 0.092 245)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span className="text-5xl font-black leading-none select-none" style={{ color: "oklch(90% 0.010 246)" }} aria-hidden="true">04</span>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-admiralty">Real-Time Tracking</h3>
                <p className="text-muted-ink text-sm mt-2 leading-relaxed" style={{ maxWidth: "38ch" }}>
                  Advanced shipment analytics and live tracking for full supply chain visibility.
                </p>
              </div>
            </div>

            <LineGraph cardHovered={card4Hovered} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
