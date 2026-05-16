"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Send } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const OFFICES = [
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

function OfficeCard({
  office,
  index,
  delay,
}: {
  office: (typeof OFFICES)[number];
  index: number;
  delay: number;
}) {
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
            <span role="img" aria-label={office.country}>{office.countryCode}</span>{" "}
            {office.country}
          </span>
        </div>
        <span className="text-[0.65rem] font-bold tracking-[0.2em] text-slate-300">
          {String(index + 1).padStart(2, "0")} / {String(OFFICES.length).padStart(2, "0")}
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
            <a
              href={`tel:${office.phone.replace(/\s/g, "")}`}
              className="text-slate-500 text-sm hover:text-[#F2A123] transition-colors duration-150"
            >
              {office.phone}
            </a>
          </li>
          <li className="flex gap-3 items-center">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
            <a
              href={`mailto:${office.email}`}
              className="text-slate-500 text-sm hover:text-[#F2A123] transition-colors duration-150 truncate"
            >
              {office.email}
            </a>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

const INPUT_CLASS =
  "w-full rounded-xl border border-slate-200 bg-[#F8F9FA] px-4 py-3 text-sm text-[#112330] placeholder:text-slate-400 outline-none focus:border-[#F2A123] focus:ring-1 focus:ring-[#F2A123] transition-all duration-150";

const LABEL_CLASS =
  "text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#112330]/50";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...form }),
      });
    } catch { /* silent fail */ }
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main className="font-sans text-[#112330]">

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <div className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/warehouse-bg.png"
            className="w-full h-full object-cover object-center"
            alt="Bombino Express contact"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 text-center px-6 mt-16">
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
            Get in Touch
          </h1>
        </div>
      </div>

      {/* ══ DESCRIPTION ═════════════════════════════════════════════ */}
      <div className="bg-white py-10 lg:py-12 px-6 lg:px-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-left space-y-4 text-base lg:text-lg text-slate-600 leading-relaxed">
          <p>
            Whether you&#39;re shipping a parcel across town or moving freight
            across continents, Bombino Express is ready to support your
            logistics needs. Reach out for shipment inquiries, rate quotes, or
            general support — we&#39;ve been connecting businesses to the world
            since 1995.
          </p>
        </div>
      </div>

      {/* ══ FORM + DIRECT CONTACT ════════════════════════════════════ */}
      <section className="bg-[#F8F9FA] py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT: Form */}
          <FadeUp>
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <p className="text-eyebrow text-[#F2A123] mb-3">Send a Message</p>
              <h2 className="font-black text-[#112330] tracking-[-0.03em] text-3xl lg:text-4xl mb-8 leading-tight">
                We&#39;d love to hear<br />from you.
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EXPO_OUT }}
                  className="flex flex-col items-start gap-4 py-10"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F2A123]/15 flex items-center justify-center">
                    <Send className="w-5 h-5 text-[#F2A123]" aria-hidden="true" />
                  </div>
                  <h3 className="font-black text-[#112330] text-2xl">
                    Message sent.
                  </h3>
                  <p className="text-slate-500 text-base leading-relaxed">
                    Thanks for reaching out. Our team will get back to you
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        message: "",
                      });
                      setSubmitted(false);
                    }}
                    className="text-sm font-semibold text-[#F2A123] hover:underline underline-offset-2 transition-all"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className={LABEL_CLASS}>
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className={LABEL_CLASS}>
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className={LABEL_CLASS}>
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000 0000"
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className={LABEL_CLASS}>
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className={LABEL_CLASS}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your shipment or inquiry..."
                      className={`${INPUT_CLASS} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="self-start inline-flex items-center gap-2 bg-[#112330] text-white rounded-full px-8 py-3.5 text-sm font-bold tracking-wide hover:bg-[#1a3347] hover:-translate-y-px hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#112330]/40 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <span className="block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <>Send Message <ArrowRight size={14} strokeWidth={2} aria-hidden="true" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </FadeUp>

          {/* RIGHT: Direct Contact */}
          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-6 h-full">

              {/* HQ dark card */}
              <div className="bg-[#112330] rounded-[2rem] p-10 flex flex-col gap-8 flex-1">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2A123] opacity-50" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F2A123]" />
                  </span>
                  <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#F2A123]/70">
                    Global Headquarters
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-white text-3xl tracking-[-0.03em] mb-2 leading-tight">
                    Mumbai,<br />India
                  </h3>
                  <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/30">
                    Est. 1995 · ISO 9001 Certified
                  </p>
                </div>

                <ul className="space-y-5">
                  <li className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-[#F2A123]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-white/30 mb-1">
                        Address
                      </p>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Corporate Centre B, 1 &amp; 2, Ground Floor,<br />
                        Marol Pipe Line, Andheri Kurla Road,<br />
                        Mumbai – 400 059, India
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-center">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#F2A123]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-white/30 mb-0.5">
                        Phone
                      </p>
                      <a
                        href="tel:+912266400000"
                        className="text-white/70 text-sm hover:text-[#F2A123] transition-colors duration-150"
                      >
                        +91 22 66400000
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4 items-center">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#F2A123]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-white/30 mb-0.5">
                        Email
                      </p>
                      <a
                        href="mailto:info@bombinoexpress.com"
                        className="text-white/70 text-sm hover:text-[#F2A123] transition-colors duration-150"
                      >
                        info@bombinoexpress.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick-action tiles */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="/quick-rates"
                  className="group rounded-2xl bg-[#F2A123] px-6 py-5 flex items-center justify-between hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                >
                  <div>
                    <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#112330]/50 mb-1">
                      Quick
                    </p>
                    <p className="text-[#112330] font-black text-base">
                      Get a Rate
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    className="text-[#112330] group-hover:translate-x-1 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </a>
                <span
                  className="rounded-2xl bg-white border border-slate-200 px-6 py-5 flex items-center justify-between opacity-40 cursor-not-allowed select-none"
                  aria-disabled="true"
                >
                  <div>
                    <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#112330]/40 mb-1">
                      Track
                    </p>
                    <p className="text-[#112330] font-black text-base">
                      Shipment
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    className="text-[#112330]/40"
                    aria-hidden="true"
                  />
                </span>
              </div>

            </div>
          </FadeUp>

        </div>
      </section>

      {/* ══ GLOBAL OFFICES ══════════════════════════════════════════ */}
      <section
        aria-labelledby="contact-offices-heading"
        className="py-24 lg:py-32 bg-freight-paper"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <FadeUp className="mb-12">
            <p className="text-eyebrow text-dispatch-amber mb-3">
              Our Presence
            </p>
            <h2
              id="contact-offices-heading"
              className="text-headline text-admiralty"
            >
              Global offices.
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {OFFICES.map((office, i) => (
              <OfficeCard
                key={office.city}
                office={office}
                index={i}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
