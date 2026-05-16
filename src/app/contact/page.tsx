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
      className="min-h-[420px] bg-white rounded-[2rem] p-10 flex flex-col justify-between relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-[#FBAD1F]/30 transition-all duration-500"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.65, ease: EXPO_OUT, delay }}
    >
      {/* Watermark number */}
      <div className="absolute -bottom-6 -right-6 text-[12rem] font-black text-[#FBAD1F]/15 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Status bar */}
      <div className="flex justify-between items-center relative z-10 mb-8">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBAD1F] opacity-50" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FBAD1F]" />
          </span>
          <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-foreground">
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
        <h3 className="font-black text-foreground leading-tight tracking-[-0.03em] mb-6 text-3xl">
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
              className="text-slate-500 text-sm hover:text-[#FBAD1F] transition-colors duration-150"
            >
              {office.phone}
            </a>
          </li>
          <li className="flex gap-3 items-center">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
            <a
              href={`mailto:${office.email}`}
              className="text-slate-500 text-sm hover:text-[#FBAD1F] transition-colors duration-150 truncate"
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
  "w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-foreground placeholder:text-slate-400 outline-none focus:border-[#FBAD1F] focus:ring-1 focus:ring-[#FBAD1F] transition-all duration-150";

const LABEL_CLASS =
  "text-[0.7rem] font-bold tracking-[0.12em] uppercase text-foreground/50";

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
    <main className="font-sans text-foreground">

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
      <section className="bg-[#F8FAFC] py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Form Centered */}
          <div className="lg:col-span-2 max-w-2xl mx-auto w-full">
            <FadeUp>
              <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <p className="text-eyebrow text-[#FBAD1F] mb-3">Send a Message</p>
                <h2 className="font-black text-foreground tracking-[-0.03em] text-3xl lg:text-4xl mb-8 leading-tight">
                  We&#39;d love to hear<br />from you.
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EXPO_OUT }}
                    className="flex flex-col items-start gap-4 py-10"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FBAD1F]/15 flex items-center justify-center">
                      <Send className="w-5 h-5 text-[#FBAD1F]" aria-hidden="true" />
                    </div>
                    <h3 className="font-black text-foreground text-2xl">
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
                      className="text-sm font-semibold text-[#FBAD1F] hover:underline underline-offset-2 transition-all"
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
                      className="self-start inline-flex items-center gap-2 bg-admiralty text-white rounded-full px-8 py-3.5 text-sm font-bold tracking-wide hover:bg-[oklch(0.38 0.08 240)] hover:-translate-y-px hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-60 disabled:pointer-events-none"
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
          </div>

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
              className="text-headline text-[lab(7.78673_1.82346_-15.0537)]"
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
