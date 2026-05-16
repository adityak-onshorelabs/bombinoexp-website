"use client";

import React from "react";
import accountKycData from "@/data/account-kyc-form.json";

export default function KycPrintTemplatePage() {
	const { pageTitle, subtitle } = accountKycData;

	return (
		<>
			{/* Strict A4 Print Margins & Overflow Safeguards:
        Using 12mm top/bottom to prevent accidental overflow onto Page 3
      */}
			<style>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm 15mm;
          }
          /* Completely hide global website layout components (headers, footers, navs) from the PDF */
          header, footer, nav, aside {
            display: none !important;
          }
          html, body {
            height: auto !important;
            min-height: auto !important;
            overflow-x: hidden;
            background-color: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

			{/* Non-Printing Floating Action Button for easy PDF generation */}
			<div className="fixed top-6 right-6 z-50 print:hidden">
				<button
					onClick={() => window.print()}
					className="flex items-center gap-2 bg-admiralty text-white font-bold px-5 py-3 rounded-xl shadow-xl border border-slate-700 hover:bg-[oklch(0.38 0.08 240)] active:scale-95 transition-all cursor-pointer">
					<svg
						className="w-5 h-5 text-[#FBAD1F]"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
						/>
					</svg>
					Save as PDF / Print
				</button>
			</div>

			{/* Main Container */}
			<div className="w-full max-w-[210mm] mx-auto bg-white text-black p-6 print:p-0 print:m-0 text-xs leading-snug font-sans">
				{/* ================= PAGE 1 ================= */}
				<div className="print:block">
					{/* Corporate Header */}
					<div className="flex justify-between items-end border-b-2 border-admiralty pb-3 mb-4">
						<div>
							<h1 className="text-xl font-black tracking-wider text-foreground">
								BOMBINO
							</h1>
							<p className="text-[9px] font-bold tracking-widest uppercase text-[#FBAD1F]">
								EXPRESS
							</p>
						</div>
						<div className="text-right">
							<h2 className="text-sm font-bold text-foreground">{pageTitle}</h2>
							<p className="text-[10px] text-slate-600">{subtitle}</p>
						</div>
					</div>

					{/* Form Fields: Grid Layout with tightly controlled writable line heights (h-5) */}
					<div className="space-y-3">
						{/* Name */}
						<div>
							<label className="block font-bold uppercase text-[10px] text-slate-700">
								Name of Entity:
							</label>
							<div className="border-b border-black h-5 w-full"></div>
						</div>

						{/* Category Checkboxes */}
						<div>
							<label className="block font-bold uppercase text-[10px] text-slate-700 mb-1">
								Category:
							</label>
							<div className="grid grid-cols-2 gap-1.5">
								{[
									"Individual/Proprietary firm",
									"Company",
									"Trust/Foundation",
									"Partnership firm/LLP",
									"Institutions (Embassy/Govt)",
								].map((cat) => (
									<div key={cat} className="flex items-center gap-1.5">
										<div className="w-3 h-3 border border-black shrink-0"></div>
										<span className="text-[11px] text-slate-800 truncate">
											{cat}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Address */}
						<div>
							<label className="block font-bold uppercase text-[10px] text-slate-700">
								Principal Business Address/es:
							</label>
							<div className="border-b border-black h-5 w-full mt-1"></div>
							<div className="border-b border-black h-5 w-full mt-1"></div>
						</div>

						{/* Contact Info */}
						<div className="grid grid-cols-2 gap-3">
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									Telephone No:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									Mobile No:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									Website:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									Email ID:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
						</div>

						{/* Authorized Signatory */}
						<div className="grid grid-cols-2 gap-3">
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									Authorized Signatory Name & Title:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									Signatory Email ID:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
						</div>

						{/* Tax Info */}
						<div className="grid grid-cols-3 gap-3">
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									IEC No:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									PAN No:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									TAN No:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
						</div>

						{/* GST Details */}
						<div className="grid grid-cols-3 gap-3 items-end">
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700 mb-1">
									Registered under GST?
								</label>
								<div className="flex gap-3">
									<div className="flex items-center gap-1">
										<div className="w-3 h-3 border border-black"></div>
										<span>YES</span>
									</div>
									<div className="flex items-center gap-1">
										<div className="w-3 h-3 border border-black"></div>
										<span>NO</span>
									</div>
								</div>
							</div>
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									GSTIN / UIN:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									State:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
						</div>

						{/* GST Exemption */}
						<div className="grid grid-cols-3 gap-3 items-end">
							<div>
								<label className="block font-bold uppercase text-[10px] text-slate-700 mb-1">
									GST Exemption?
								</label>
								<div className="flex gap-3">
									<div className="flex items-center gap-1">
										<div className="w-3 h-3 border border-black"></div>
										<span>YES</span>
									</div>
									<div className="flex items-center gap-1">
										<div className="w-3 h-3 border border-black"></div>
										<span>NO</span>
									</div>
								</div>
							</div>
							<div className="col-span-2">
								<label className="block font-bold uppercase text-[10px] text-slate-700">
									Reason for Exemption:
								</label>
								<div className="border-b border-black h-5 w-full"></div>
							</div>
						</div>

						{/* Office Use */}
						<div className="bg-slate-50 p-2 border border-slate-300 rounded mt-2">
							<label className="block font-bold uppercase text-[9px] text-slate-500">
								Office Use Only:
							</label>
							<div className="flex items-end gap-2 mt-1">
								<span className="font-bold text-[11px]">
									Bombino Account No:
								</span>
								<div className="border-b border-black h-4 flex-1"></div>
							</div>
						</div>
					</div>

					{/* Page 1 Declaration & Signatures */}
					<div className="mt-4 pt-3 border-t border-slate-300">
						<p className="text-[10px] text-justify leading-tight text-slate-800 mb-6">
							I/We hereby declare that the particulars given herein above are
							true, correct and complete to the best of my/our knowledge and
							belief. In case of any change in any of the aforementioned
							particulars, I/we undertake to notify you in writing.
						</p>

						<div className="grid grid-cols-4 gap-4 items-end">
							<div>
								<div className="border-b border-black h-6 w-full"></div>
								<span className="block text-[10px] text-center mt-1 text-slate-600">
									Place
								</span>
							</div>
							<div>
								<div className="border-b border-black h-6 w-full"></div>
								<span className="block text-[10px] text-center mt-1 text-slate-600">
									Date
								</span>
							</div>
							<div>
								<div className="border-b border-black h-6 w-full"></div>
								<span className="block text-[10px] text-center mt-1 text-slate-600">
									Signature & Name
								</span>
							</div>
							<div className="h-14 border border-black flex items-center justify-center">
								<span className="text-[9px] text-slate-400 font-bold uppercase">
									Official Seal
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Force a strict print page break */}
				<div className="break-before-page m-0 p-0 h-0 block"></div>

				{/* ================= PAGE 2 ================= */}
				<div className="print:block pt-0">
					{/* Header */}
					<div className="border-b-2 border-admiralty pb-1 mb-2">
						<h2 className="text-base font-bold text-foreground">
							KNOW YOUR CUSTOMER FORM
						</h2>
						<p className="text-[10px] text-slate-600">
							As mandated by Indian Customs vide CBEC Circulars 09/2010, 33/2010
							and 07/2015
						</p>
					</div>

					{/* Checklist */}
					<div className="space-y-1.5">
						{/* Identity */}
						<div>
							<label className="block font-bold uppercase text-[11px] text-foreground mb-1 border-b border-slate-100 pb-0.5">
								1. To Verify Identity (Check attached):
							</label>
							<div className="grid grid-cols-2 gap-1.5 pl-1">
								<div className="flex items-center gap-2">
									<div className="w-3.5 h-3.5 border border-black shrink-0"></div>
									<span>PAN Card Copy</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3.5 h-3.5 border border-black shrink-0"></div>
									<span>Unique Identification Number (UIN)</span>
								</div>
							</div>
						</div>

						{/* Address */}
						<div>
							<label className="block font-bold uppercase text-[11px] text-foreground mb-1 border-b border-slate-100 pb-0.5">
								2. To Verify Address (Check attached):
							</label>
							<div className="space-y-1.5 pl-1">
								<div className="flex items-center gap-2">
									<div className="w-3.5 h-3.5 border border-black shrink-0"></div>
									<span>
										Utility bill (not more than 2 months old -
										landline/mobile/electricity/water/gas)
									</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3.5 h-3.5 border border-black shrink-0"></div>
									<span>
										Bank Account statement (not more than 2 months old)
									</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3.5 h-3.5 border border-black shrink-0"></div>
									<span>Shops and Establishment Act registration</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3.5 h-3.5 border border-black shrink-0"></div>
									<span>
										Registered lease or leave and license agreement (with 6
										months validity)
									</span>
								</div>
							</div>
						</div>

						{/* Authority */}
						<div>
							<label className="block font-bold uppercase text-[11px] text-foreground mb-1 border-b border-slate-100 pb-0.5">
								3. To Verify Authority of Signatory:
							</label>
							<div className="flex items-start gap-2 pl-1">
								<div className="w-3.5 h-3.5 border border-black shrink-0 mt-0.5"></div>
								<span className="leading-tight">
									Power of Attorney / Letter of Authority / Resolution granted
									to its managers, officers or employees to transact business on
									its behalf
								</span>
							</div>
						</div>
					</div>

					{/* Final Declaration & Signatures */}
					<div className="mt-3 pt-2 border-t border-slate-300">
						<p className="text-[10px] text-justify leading-tight text-slate-800 mb-4">
							I/We hereby declare that the particulars given herein above and
							the documents attached as per the checklist above are true,
							correct and complete to the best of my/our knowledge and belief,
							and the documents submitted in support of this KYC Form are
							genuine and obtained legally from the respective issuing
							authority. In case of any change in any of the aforementioned
							particulars, I/we undertake to notify you in writing. I/We hereby
							authorize you to submit the above particulars to the customs and
							other regulatory authorities on my/our behalf as may be required
							in order to transport and customs clear my/our shipments.
						</p>

						<div className="grid grid-cols-4 gap-4 items-end">
							<div>
								<div className="border-b border-black h-6 w-full"></div>
								<span className="block text-[10px] text-center mt-1 text-slate-600">
									Place
								</span>
							</div>
							<div>
								<div className="border-b border-black h-6 w-full"></div>
								<span className="block text-[10px] text-center mt-1 text-slate-600">
									Date
								</span>
							</div>
							<div>
								<div className="border-b border-black h-6 w-full"></div>
								<span className="block text-[10px] text-center mt-1 text-slate-600">
									Signature & Name
								</span>
							</div>
							<div className="h-12 border border-black flex items-center justify-center">
								<span className="text-[9px] text-slate-400 font-bold uppercase">
									Official Seal
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
