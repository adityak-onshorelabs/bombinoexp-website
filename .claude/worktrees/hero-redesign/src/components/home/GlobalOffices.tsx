"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const offices = [
  {
    countryCode: "🇮🇳",
    country: "India",
    city: "Mumbai",
    address: "Corporate Centre B, 1 & 2, Ground Floor, Marol Pipe Line, Andheri Kurla Road, Mumbai – 400 059",
    phone: "+91 22 66400000",
    email: "bombino@bombinoexp.com",
  },
  {
    countryCode: "🇺🇸",
    country: "United States",
    city: "New Jersey",
    address: "29 Wysocki Place, Hackensack, NJ 07601",
    phone: "+1 646 224 0700",
    email: "bombino@bombinoexp.com",
  },
];

function OfficeCard({ office, index, delay }: { office: (typeof offices)[number]; index: number; delay: number }) {
  return (
    <motion.div
      className="min-h-[420px] bg-white rounded-[2rem] p-10 flex flex-col justify-between relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-[#F2A123]/30 transition-all duration-500"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.65, ease: EXPO_OUT, delay }}
    >
      {/* Watermark number */}
      <div className="absolute -bottom-6 -right-6 text-[12rem] font-black text-slate-50 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Status bar */}
      <div className="flex justify-between items-center relative z-10 mb-8">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2A123] opacity-50" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F2A123]" />
          </span>
          <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#112330]">
            <span role="img" aria-label={office.country}>{office.countryCode}</span> {office.country}
          </span>
        </div>
        <span className="text-[0.65rem] font-bold tracking-[0.2em] text-slate-300">
          {String(index + 1).padStart(2, "0")} / {String(offices.length).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <h3 className="font-black text-[#112330] leading-tight tracking-[-0.03em] mb-6 text-3xl">
          {office.city}
        </h3>
        <ul className="space-y-3">
          <li className="flex gap-3 items-start">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-slate-500 text-sm leading-relaxed">{office.address}</p>
          </li>
          <li className="flex gap-3 items-center">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
            <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-slate-500 text-sm hover:text-[#F2A123] transition-colors duration-150">
              {office.phone}
            </a>
          </li>
          <li className="flex gap-3 items-center">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
            <a href={`mailto:${office.email}`} className="text-slate-500 text-sm hover:text-[#F2A123] transition-colors duration-150 truncate">
              {office.email}
            </a>
          </li>
        </ul>
      </div>

    </motion.div>
  );
}

export function GlobalOffices() {
  return (
    <section
      aria-labelledby="offices-heading"
      className="py-24 lg:py-32 bg-freight-paper"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">

        <FadeUp className="mb-12">
          <p className="text-eyebrow text-dispatch-amber mb-3">Our Presence</p>
          <h2 id="offices-heading" className="text-headline text-admiralty">
            Global head offices.
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {offices.map((office, i) => (
            <OfficeCard key={office.city} office={office} index={i} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}
