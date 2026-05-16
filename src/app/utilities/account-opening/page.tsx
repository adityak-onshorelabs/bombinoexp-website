"use client";

import { FormEvent, useMemo, useState } from "react";
import formSchema from "@/data/account-kyc-form.json";

type Field = {
  name: string;
  label: string;
  type: "text" | "select" | "textarea" | "tel" | "email" | "url" | "radio" | "file";
  required?: boolean;
  options?: string[];
};

type Section = {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
};

const INPUT_CLASS =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-foreground placeholder:text-slate-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-[#FBAD1F] focus:border-transparent";

const LABEL_CLASS = "text-[0.7rem] font-bold tracking-[0.12em] uppercase text-foreground/50";

export default function AccountOpeningPage() {
  const { pageTitle, subtitle, instructions, sections } = formSchema as {
    pageTitle: string;
    subtitle: string;
    instructions: string;
    sections: Section[];
  };
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const initialFiles = useMemo(() => {
    const files: Record<string, string> = {};
    sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === "file") files[field.name] = "";
      });
    });
    return files;
  }, [sections]);

  const [fileNames, setFileNames] = useState<Record<string, string>>(initialFiles);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!declarationChecked) return;
    setSubmitted(true);
  };

  const renderField = (field: Field) => {
    const requiredMark = field.required ? " *" : "";

    if (field.type === "textarea") {
      return (
        <div className="space-y-2">
          <label htmlFor={field.name} className={LABEL_CLASS}>
            {field.label}
            {requiredMark}
          </label>
          <textarea
            id={field.name}
            name={field.name}
            required={field.required}
            rows={4}
            className={`${INPUT_CLASS} resize-y min-h-[110px]`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div className="space-y-2">
          <label htmlFor={field.name} className={LABEL_CLASS}>
            {field.label}
            {requiredMark}
          </label>
          <select id={field.name} name={field.name} required={field.required} defaultValue="" className={INPUT_CLASS}>
            <option value="" disabled>
              Select {field.label}
            </option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field.type === "radio") {
      return (
        <fieldset className="space-y-3">
          <legend className={LABEL_CLASS}>
            {field.label}
            {requiredMark}
          </legend>
          <div className="flex flex-wrap items-center gap-6">
            {field.options?.map((option) => (
              <label key={option} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  required={field.required}
                  className="h-4 w-4 accent-[#FBAD1F]"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      );
    }

    if (field.type === "file") {
      return (
        <div className="space-y-2">
          <p className={LABEL_CLASS}>
            {field.label}
            {requiredMark}
          </p>
          <label
            htmlFor={field.name}
            className="group relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition-colors hover:border-[#FBAD1F]/70 hover:bg-[#fffaf0]"
          >
            <svg className="mb-3 h-6 w-6 text-slate-400 group-hover:text-[#FBAD1F]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 16V8m0 0l-3 3m3-3l3 3M5 16.5A4.5 4.5 0 019.5 12h.38A5.5 5.5 0 0120 14.5 3.5 3.5 0 0116.5 18H8a3 3 0 01-3-3 3 3 0 013-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold text-foreground">Drag & drop file here or click to upload</span>
            <span className="mt-1 text-xs text-slate-500">{fileNames[field.name] || "PDF, JPG, JPEG, PNG"}</span>
          </label>
          <input
            id={field.name}
            name={field.name}
            type="file"
            required={field.required}
            className="sr-only"
            onChange={(e) =>
              setFileNames((prev) => ({
                ...prev,
                [field.name]: e.target.files?.[0]?.name || "",
              }))
            }
          />
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label htmlFor={field.name} className={LABEL_CLASS}>
          {field.label}
          {requiredMark}
        </label>
        <input
          id={field.name}
          name={field.name}
          type={field.type}
          required={field.required}
          className={INPUT_CLASS}
          placeholder={`Enter ${field.label.toLowerCase()}`}
        />
      </div>
    );
  };

  return (
    <main className="bg-[#F8FAFC] text-foreground font-sans">
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto py-12 px-6">
          <h1 className="text-4xl font-black text-foreground tracking-[-0.03em]">{pageTitle}</h1>
          <p className="mt-3 text-lg font-semibold text-slate-700">{subtitle}</p>
          <p className="mt-4 text-slate-600 leading-relaxed">{instructions}</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-white shadow-sm border border-slate-200 rounded-xl p-8 mb-8"
              >
                <h2 className="text-2xl font-bold text-foreground tracking-[-0.02em] mb-2">{section.title}</h2>
                {section.description ? (
                  <p className="text-slate-600 mb-6 leading-relaxed">{section.description}</p>
                ) : (
                  <div className="mb-6" />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {section.fields.map((field) => (
                    <div
                      key={field.name}
                      className={field.type === "textarea" || field.type === "radio" || field.type === "file" ? "md:col-span-2" : ""}
                    >
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-8">
              <label className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                <input
                  type="checkbox"
                  checked={declarationChecked}
                  onChange={(e) => setDeclarationChecked(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-[#FBAD1F]"
                  required
                />
                <span>
                  I/We hereby declare that the particulars given herein above and the documents attached are true,
                  correct and complete... I/We authorize you to submit the above particulars to customs.
                </span>
              </label>

              <button
                type="submit"
                className="mt-6 w-full inline-flex items-center justify-center rounded-xl bg-admiralty px-6 py-4 text-white font-bold tracking-wide transition-colors duration-200 hover:bg-[oklch(0.38 0.08 240)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAD1F]"
              >
                Submit Account Opening & KYC Form
              </button>

              {submitted && (
                <p className="mt-3 text-sm text-slate-500">
                  Form captured locally. Backend integration is intentionally not connected yet.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
