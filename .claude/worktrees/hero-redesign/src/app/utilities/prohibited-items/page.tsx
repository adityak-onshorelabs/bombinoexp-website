"use client";

import React from "react";
import prohibitedData from "@/data/prohibited-items.json";

export default function ProhibitedItemsPage() {
	// Safe fallback to prevent destructuring errors
	const header = prohibitedData?.header || {
		title: "Prohibited & Banned Items",
		subtitle:
			"To comply with international safety laws and carrier regulations, the following commodities are strictly prohibited from being shipped via Bombino Express.",
	};

	const categories = prohibitedData?.categories || [];

	// Safe inline icon renderer
	const renderIcon = (iconType: string) => {
		const baseClass = "w-7 h-7 text-[#F2A123]";

		switch (iconType) {
			case "dollar-sign":
				return (
					<svg
						className={baseClass}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2 .8 2 1.77M12 8v8m0-8V6m0 10v2"
						/>
					</svg>
				);
			case "shield-off":
				return (
					<svg
						className={baseClass}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
						/>
					</svg>
				);
			case "battery-charging":
				return (
					<svg
						className={baseClass}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				);
			case "file-minus":
				return (
					<svg
						className={baseClass}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				);
			default:
				return (
					<svg
						className={baseClass}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				);
		}
	};

	return (
		<main className="font-sans bg-[#F8F9FA] min-h-screen pb-20">
			{/* Beautifully Centered & Balanced Header */}
			<section className="bg-white py-16 lg:py-20 border-b border-slate-100 shadow-sm text-center">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="max-w-4xl mx-auto">
						<div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
							<span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
							Strict Compliance Notice
						</div>
						<h1 className="text-4xl lg:text-5xl font-black text-[#112330] tracking-tight mb-4">
							{header.title}
						</h1>
						<p className="text-lg text-slate-600 leading-relaxed font-light">
							{header.subtitle}
						</p>
					</div>
				</div>
			</section>

			{/* Grid of Prohibited Categories */}
			<section className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 lg:mt-16">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{categories.map((cat, idx) => (
						<div
							key={idx}
							className="group relative bg-white rounded-[2rem] p-8 lg:p-10 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-red-500/20 transition-all duration-500 flex flex-col justify-between overflow-hidden">

							{/* Ghost number watermark */}
							<div className="absolute -bottom-4 -right-4 text-[7rem] font-black text-slate-50 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-3">
								{String(idx + 1).padStart(2, "0")}
							</div>

							<div className="relative z-10">
								{/* Category Header */}
								<div className="flex items-center gap-4 mb-7">
									<div className="w-14 h-14 rounded-xl bg-[#F2A123]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
										{renderIcon(cat.icon)}
									</div>
									<h2 className="text-xl lg:text-2xl font-extrabold text-[#112330] group-hover:text-red-600 transition-colors duration-300">
										{cat.title}
									</h2>
								</div>

								{/* Items Checklist */}
								<ul className="space-y-4">
									{cat.items?.map((item, itemIdx) => (
										<li
											key={itemIdx}
											className="flex items-start gap-3 text-slate-600 leading-relaxed">
											<span className="mt-0.5 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
												<svg
													className="w-3 h-3 text-red-500"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2.5"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</span>
											<span className="text-sm lg:text-base font-medium">
												{item}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>

				{/* Global Footer Warning Box */}
				<div className="mt-12 bg-white rounded-2xl p-6 lg:p-8 border-l-4 border-[#F2A123] shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
					<div>
						<h3 className="text-base font-bold text-[#112330] mb-1">
							Unsure about a specific commodity?
						</h3>
						<p className="text-sm text-slate-500">
							Regulations can vary heavily depending on destination laws and
							carrier licensing.
						</p>
					</div>
					<a
						href="mailto:bombino@bombinoexp.com"
						className="bg-[#112330] text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-[#1a3347] transition-colors shrink-0 inline-block text-center">
						Contact Regulatory Team
					</a>
				</div>
			</section>
		</main>
	);
}
