"use client";

import { FormEvent, useState } from "react";
import kycData from "@/data/kyc.json";

const INPUT_CLASS =
  "w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-foreground placeholder:text-slate-400 outline-none focus:border-[#FBAD1F] focus:ring-1 focus:ring-[#FBAD1F] transition-all duration-150";

const LABEL_CLASS =
  "text-[0.7rem] font-bold tracking-[0.12em] uppercase text-foreground/50";

const CARD_CLASS =
  "rounded-[2rem] border border-slate-100 bg-white p-8 lg:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)]";

export default function KycPage() {
  const { hero, contact, documentRules } = kycData;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="font-sans text-foreground bg-[#F8FAFC]">
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto py-12 px-6 lg:px-12">
          <h1 className="text-4xl lg:text-6xl font-black text-foreground tracking-[-0.03em] mb-6">
            {hero.title}
          </h1>
          <div className="space-y-4 text-slate-600 text-base lg:text-lg leading-relaxed max-w-5xl">
            {hero.description.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 text-sm lg:text-base text-slate-600">
            {contact.text}{" "}
            <a
              href={`mailto:${contact.email}`}
              className="font-semibold text-foreground underline decoration-[#FBAD1F]/70 underline-offset-4 hover:text-[#FBAD1F] transition-colors"
            >
              {contact.email}
            </a>{" "}
            <span className="text-slate-500">{contact.downloadText}</span>{" "}
            <a
              href="/pdf/kyc_form.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FBAD1F] hover:underline font-medium"
            >
              Click here
            </a>
          </p>
        </div>
      </section>

      <section className="py-10 lg:py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className={`${CARD_CLASS} bg-[#FFFCF2] border-[#FBAD1F]/25`}>
            <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-3">
              Document Rules
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-[-0.03em] mb-4">
              {documentRules.title}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">{documentRules.description}</p>
            <p className="font-semibold text-foreground mb-5">{documentRules.requirement}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {documentRules.acceptedIds.map((idProof) => (
                <div
                  key={idProof}
                  className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3"
                >
                  <svg className="w-4.5 h-4.5 text-[#FBAD1F] shrink-0" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 9 L7 13 L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm font-medium text-foreground">{idProof}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 leading-relaxed">
              {documentRules.note}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className={`${CARD_CLASS} space-y-8`}>
              <div>
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-4">
                Tracking Details
              </p>
              <div className="space-y-2">
                <label htmlFor="airwayBill" className={LABEL_CLASS}>
                  Airway Bill / Reference No. *
                </label>
                <input id="airwayBill" name="airwayBill" required className={INPUT_CLASS} placeholder="Enter AWB / Reference Number" />
              </div>
              </div>

              <div>
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-4">
                Consignee Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label htmlFor="consigneeName" className={LABEL_CLASS}>Consignee Name *</label>
                  <input id="consigneeName" name="consigneeName" required className={INPUT_CLASS} placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="mobileNo" className={LABEL_CLASS}>Mobile No. *</label>
                  <input id="mobileNo" name="mobileNo" required className={INPUT_CLASS} placeholder="+91" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="emailId" className={LABEL_CLASS}>Email ID *</label>
                  <input id="emailId" name="emailId" type="email" required className={INPUT_CLASS} placeholder="name@email.com" />
                </div>
              </div>
              </div>

              <div>
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-4">
                Identity Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="selectType" className={LABEL_CLASS}>Select Type *</label>
                  <select id="selectType" name="selectType" required defaultValue="" className={INPUT_CLASS}>
                    <option value="" disabled>Select consignee type</option>
                    <option value="individual">Individual</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="typeId" className={LABEL_CLASS}>Type Id *</label>
                  <select id="typeId" name="typeId" required defaultValue="" className={INPUT_CLASS}>
                    <option value="" disabled>Select ID type</option>
                    {documentRules.acceptedIds.map((idProof) => (
                      <option key={idProof} value={idProof}>
                        {idProof}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="idNumber" className={LABEL_CLASS}>ID Number / PAN No. *</label>
                  <input id="idNumber" name="idNumber" required className={INPUT_CLASS} placeholder="Enter ID number" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="uploadId" className={LABEL_CLASS}>Upload Id *</label>
                  <input id="uploadId" name="uploadId" type="file" required className={`${INPUT_CLASS} file:mr-3 file:rounded-md file:border-0 file:bg-admiralty file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-[oklch(0.38 0.08 240)]`} />
                </div>
              </div>
              </div>

              <div>
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-4">
                Consignee Address Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="addressLine1" className={LABEL_CLASS}>Address Line 1 *</label>
                  <input id="addressLine1" name="addressLine1" required className={INPUT_CLASS} placeholder="Street, Building, Area" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="addressLine2" className={LABEL_CLASS}>Address Line 2</label>
                  <input id="addressLine2" name="addressLine2" className={INPUT_CLASS} placeholder="Apartment, Landmark (optional)" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="country" className={LABEL_CLASS}>Country *</label>
                  <input id="country" name="country" required className={INPUT_CLASS} placeholder="Country" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="state" className={LABEL_CLASS}>State *</label>
                  <input id="state" name="state" required className={INPUT_CLASS} placeholder="State" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className={LABEL_CLASS}>City *</label>
                  <input id="city" name="city" required className={INPUT_CLASS} placeholder="City" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="pincode" className={LABEL_CLASS}>Pincode *</label>
                  <input id="pincode" name="pincode" required className={INPUT_CLASS} placeholder="Pincode" />
                </div>
              </div>
              </div>

              <div className="flex flex-col items-start gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-admiralty text-white rounded-xl px-8 py-4 text-sm lg:text-base font-bold tracking-wide hover:bg-[oklch(0.38 0.08 240)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAD1F]"
                >
                  Submit KYC Form
                </button>
                {submitted && (
                  <p className="text-sm text-slate-500">
                    Form captured locally. Backend submission is not connected yet.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
