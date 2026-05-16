"use client";

import { useState } from "react";
import pickupData from "@/data/pickup-request.json";

type FormData = Record<string, string>;

const inputClass =
  "w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#112330] placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#F2A123] focus:border-transparent transition";

const badgeClass =
  "bg-slate-50 text-[#112330] px-3 py-1.5 rounded mb-6 text-sm font-extrabold tracking-wider inline-block uppercase";

type Field = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
  fullWidth?: boolean;
};

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className={`flex flex-col gap-1.5${field.fullWidth ? " md:col-span-2" : ""}`}>
      <label htmlFor={field.name} className="text-xs font-semibold text-slate-600 tracking-wide">
        {field.label}
      </label>
      {field.type === "select" ? (
        <select id={field.name} name={field.name} value={value} onChange={onChange} className={inputClass}>
          <option value="" disabled>Select…</option>
          {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
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

function FormCard({
  accent,
  icon,
  title,
  subtitle,
  children,
}: {
  accent: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
      {/* Card header stripe */}
      <div className={`px-6 sm:px-10 py-5 border-b border-slate-100 flex items-center gap-4 ${accent}`}>
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/70 mb-0.5">{subtitle}</p>
          <h2 className="text-base font-extrabold text-white leading-tight">{title}</h2>
        </div>
      </div>
      <div className="p-6 sm:p-10">{children}</div>
    </div>
  );
}

function genRef() {
  return `#PRK-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function PickupRequestPage() {
  const { header, form } = pickupData;
  const [formData, setFormData] = useState<FormData>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [refNumber] = useState(genRef);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "pickup", ...formData }),
      });
    } catch { /* silent fail */ }
    setLoading(false);
    setSubmitted(true);
  }

  function reset() {
    setFormData({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <main className="font-sans text-[#112330] bg-[#F8F9FA] min-h-screen pb-20">
        <section className="bg-white border-b border-slate-100 py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#F2A123] mb-4">Door-to-Door Dispatch</p>
            <h1 className="text-4xl lg:text-5xl font-black text-[#112330] tracking-tight leading-tight mb-4">{header.title}</h1>
            <p className="text-lg text-slate-500 leading-relaxed font-light">{header.subtitle}</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 mt-12">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
            <div className="m-6 sm:m-10">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-800 mb-1">Pickup Request Confirmed</p>
                    <p className="text-xs text-green-700 leading-relaxed">
                      Your pickup has been scheduled. Our courier will arrive within your selected time window.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-100">
                  <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#F2A123] mb-1">Reference Number</p>
                  <p className="text-2xl font-black text-[#112330] tracking-tight">{refNumber}</p>
                  <p className="text-xs text-slate-500 mt-1">Save this for tracking</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-100">
                  <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#F2A123] mb-1">Pickup Date</p>
                  <p className="text-2xl font-black text-[#112330] tracking-tight">{formData.pickupDate || "—"}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formData.readyTime && formData.closingTime
                      ? `${formData.readyTime} – ${formData.closingTime}`
                      : "Time window as specified"}
                  </p>
                </div>
              </div>

              <div className="bg-[#112330]/4 rounded-xl p-4 text-sm text-slate-600 leading-relaxed mb-6">
                A confirmation will be sent to{" "}
                <span className="font-semibold text-[#112330]">{formData.pickupEmail || "your email"}</span>. Our team will reach out if any details need verification.
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={reset} className="flex-1 bg-[#112330] text-white font-bold py-3 rounded-lg hover:bg-[#1a3347] transition-colors duration-200">
                  Schedule Another Pickup
                </button>
                <a href="/contact" className="flex-1 text-center border border-slate-200 text-[#112330] font-semibold py-3 rounded-lg hover:border-[#F2A123] hover:text-[#F2A123] transition-colors duration-200">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="font-sans text-[#112330] bg-[#F8F9FA] min-h-screen pb-20">
      {/* Header */}
      <section className="bg-white border-b border-slate-100 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#F2A123] mb-4">
            Door-to-Door Dispatch
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-[#112330] tracking-tight leading-tight mb-4">
            {header.title}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed font-light">
            {header.subtitle}
          </p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 mt-12 space-y-6">

        {/* Card 1: Pickup Location */}
        <FormCard
          accent="bg-[#112330]"
          title={form.pickupLocation.title}
          subtitle="Where we collect"
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {form.pickupLocation.fields.map((field) => (
              <FieldInput key={field.name} field={field} value={formData[field.name] ?? ""} onChange={handleChange} />
            ))}
          </div>
        </FormCard>

        {/* Connector arrow */}
        <div className="flex items-center justify-center py-2">
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <div className="w-px h-4 bg-slate-300" />
            <svg className="w-6 h-6 text-[#F2A123]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-slate-400">Delivering To</p>
            <svg className="w-6 h-6 text-[#F2A123]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            <div className="w-px h-4 bg-slate-300" />
          </div>
        </div>

        {/* Card 2: Drop Location */}
        <FormCard
          accent="bg-[#1a3347]"
          title={form.dropLocation.title}
          subtitle="Where we deliver"
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {form.dropLocation.fields.map((field) => (
              <FieldInput key={field.name} field={field} value={formData[field.name] ?? ""} onChange={handleChange} />
            ))}
          </div>
        </FormCard>

        {/* Shipment + Schedule + Notes in single card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl p-6 sm:p-10 space-y-10">
          {/* Section 3: Shipment */}
          <div>
            <span className={badgeClass}>{form.shipment.title}</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {form.shipment.fields.map((field) => (
                <FieldInput key={field.name} field={field} value={formData[field.name] ?? ""} onChange={handleChange} />
              ))}
            </div>
          </div>

          {/* Section 4: Schedule */}
          <div>
            <span className={badgeClass}>{form.schedule.title}</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {form.schedule.fields.map((field) => (
                <FieldInput key={field.name} field={field} value={formData[field.name] ?? ""} onChange={handleChange} />
              ))}
            </div>
          </div>

          {/* Section 5: Special Instructions */}
          <div>
            <span className={badgeClass}>{form.specialInstructions.title}</span>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="specialInstructions" className="text-xs font-semibold text-slate-600 tracking-wide">
                {form.specialInstructions.label}
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                rows={4}
                placeholder={form.specialInstructions.placeholder}
                value={formData.specialInstructions ?? ""}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-[#112330] placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#F2A123] focus:border-transparent transition resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#112330] text-white font-bold py-3.5 rounded-xl text-base hover:bg-[#1a3347] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading ? (
              <span className="block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17h6m-6 0a2 2 0 11-4 0m4 0a2 2 0 104 0m0 0a2 2 0 104 0m-4 0h2m-2 0V9m0 0h4l2 3v5m-6-8H7a2 2 0 00-2 2v6h2" />
                </svg>
                {form.submitText}
              </>
            )}
          </button>
        </div>

      </form>
    </main>
  );
}
