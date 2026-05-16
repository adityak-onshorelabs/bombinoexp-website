"use client";

import { useState } from "react";
import quoteData from "@/data/get-quote.json";
import { COUNTRIES, COUNTRY_NAME_TO_CODE } from "@/lib/countries";

type FormData = Record<string, string>;

const inputClass =
  "w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#FBAD1F] focus:border-transparent transition";

function FieldInput({ field, value, onChange }: {
  field: { name: string; label: string; type: string; placeholder?: string; options?: string[] };
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={field.name} className="text-xs font-semibold text-slate-600 tracking-wide">
        {field.label}
      </label>
      {field.type === "select" ? (
        <select id={field.name} name={field.name} value={value} onChange={onChange} className={inputClass}>
          <option value="" disabled>Select…</option>
          {field.name.toLowerCase().includes("country")
            ? COUNTRIES.map((c) => <option key={c.value} value={c.label}>{c.label}</option>)
            : field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input
          id={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          className={inputClass}
        />
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-extrabold text-foreground tracking-tight mb-5 pb-3 border-b border-slate-100">
      {children}
    </h2>
  );
}

const COUNTRY_CODES = COUNTRY_NAME_TO_CODE;

const inr = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(v);

export default function GetQuotePage() {
  const { header, form } = quoteData;
  const [formData,         setFormData]        = useState<FormData>({});
  const [submitted,        setSubmitted]        = useState(false);
  const [loading,          setLoading]          = useState(false);
  const [calculatedRange,  setCalculatedRange]  = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const origin      = COUNTRY_CODES[formData.originCountry ?? ""] ?? "IN";
    const destination = COUNTRY_CODES[formData.destCountry   ?? ""] ?? formData.destCountry ?? "US";
    const weight      = formData.weight ?? "1";

    const [ratesRes] = await Promise.allSettled([
      fetch("/api/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination, weight, pieces: "1" }),
      }).then((r) => r.json()),

      fetch("/api/sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "quote", ...formData }),
      }).catch(() => {}),
    ]);

    if (ratesRes.status === "fulfilled") {
      const data = ratesRes.value as Record<string, unknown>;
      const rawRates = Array.isArray(data)        ? data :
                       Array.isArray(data?.data)  ? (data.data as unknown[]) :
                       Array.isArray(data?.rates) ? (data.rates as unknown[]) :
                       Array.isArray(data?.result)? (data.result as unknown[]) : [];

      const sorted = [...rawRates].sort(
        (a, b) => (Number((a as Record<string,unknown>).total) || 0) -
                  (Number((b as Record<string,unknown>).total) || 0)
      );

      if (sorted.length > 0) {
        const low  = Number((sorted[0] as Record<string,unknown>).total)                 || 0;
        const high = Number((sorted[sorted.length - 1] as Record<string,unknown>).total) || 0;
        setCalculatedRange(high > low ? `${inr(low)} – ${inr(high)}` : inr(low));
      }
    }

    setLoading(false);
    setSubmitted(true);
  }

  function reset() {
    setFormData({});
    setSubmitted(false);
    setCalculatedRange(null);
  }


  return (
    <main className="font-sans text-foreground bg-[#F8FAFC] min-h-screen pb-20">
      {/* Header */}
      <section className="bg-white border-b border-slate-100 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-4">
            Instant Rate Estimation
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight mb-4">
            {header.title}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed font-light">
            {header.subtitle}
          </p>
        </div>
      </section>

      {/* Form card */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        {submitted ? (
          /* Success state */
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl m-6 sm:m-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-800 mb-1">Quote Estimate Ready</p>
                  <p className="text-xs text-green-700 leading-relaxed">
                    Based on your shipment details, here is your estimated rate.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-10 pb-10 space-y-6">
              <div className="bg-[#F8FAFC] rounded-xl p-5 border border-slate-100">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#FBAD1F] mb-1">Estimated Rate</p>
                <p className="text-2xl font-black text-foreground">
                  {calculatedRange ?? "Custom Contract Pricing Applies"}
                </p>
                <p className="text-xs text-slate-500 mt-1">Inclusive of fuel surcharge</p>
              </div>

              <div className="bg-admiralty/4 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
                Your shipping inquiry has been successfully captured into our database. An expert logistics coordinator will review your exact dimensional weight profile to apply contracted corporate discounts and follow up with verified itemized tracking options shortly.
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={reset}
                  className="flex-1 bg-admiralty text-white font-bold py-3 rounded-lg hover:bg-[oklch(0.38 0.08 240)] transition-colors duration-200"
                >
                  Calculate Another Quote
                </button>
                <a
                  href="/contact"
                  className="flex-1 text-center border border-slate-200 text-foreground font-semibold py-3 rounded-lg hover:border-[#FBAD1F] hover:text-[#FBAD1F] transition-colors duration-200"
                >
                  Speak to Our Team
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xl p-6 sm:p-10 lg:p-12 space-y-10"
          >
            {/* Origin + Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <SectionTitle>{form.origin.title}</SectionTitle>
                <div className="space-y-4">
                  {form.origin.fields.map((field) => (
                    <FieldInput key={field.name} field={field} value={formData[field.name] ?? ""} onChange={handleChange} />
                  ))}
                </div>
              </div>
              <div>
                <SectionTitle>{form.destination.title}</SectionTitle>
                <div className="space-y-4">
                  {form.destination.fields.map((field) => (
                    <FieldInput key={field.name} field={field} value={formData[field.name] ?? ""} onChange={handleChange} />
                  ))}
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div>
              <SectionTitle>{form.packageDetails.title}</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {form.packageDetails.fields.map((field) => (
                  <FieldInput key={field.name} field={field} value={formData[field.name] ?? ""} onChange={handleChange} />
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 tracking-wide mb-1.5">
                  {form.packageDetails.dimensions.label}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {form.packageDetails.dimensions.fields.map((dim) => (
                    <input
                      key={dim.name}
                      name={dim.name}
                      type="text"
                      placeholder={dim.placeholder}
                      value={formData[dim.name] ?? ""}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <SectionTitle>{form.contact.title}</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {form.contact.fields.map((field) => (
                  <FieldInput key={field.name} field={field} value={formData[field.name] ?? ""} onChange={handleChange} />
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-admiralty text-white font-bold py-3.5 rounded-xl text-base hover:bg-[oklch(0.38 0.08 240)] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <span className="block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin shrink-0" />
                  Analyzing Live Routes...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10H9m3-5h3m-9 5h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                  </svg>
                  {form.submitText}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
