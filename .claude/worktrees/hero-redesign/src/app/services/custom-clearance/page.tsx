"use client";

import { useState } from "react";
import customClearanceData from "@/data/custom-clearance.json";

const featureIcons = [
	<svg
		key="doc"
		className="w-6 h-6 text-[#F2A123]"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		aria-hidden="true">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
		/>
	</svg>,
	<svg
		key="shield"
		className="w-6 h-6 text-[#F2A123]"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		aria-hidden="true">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"
		/>
	</svg>,
	<svg
		key="check"
		className="w-6 h-6 text-[#F2A123]"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		aria-hidden="true">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>,
	<svg
		key="chart"
		className="w-6 h-6 text-[#F2A123]"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		aria-hidden="true">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
		/>
	</svg>,
];

export default function CustomClearancePage() {
	const { hero, heroForm, features } = customClearanceData;
	const [formData, setFormData] = useState<Record<string, string>>({});

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	return (
		<main className="font-sans text-[#112330]">
			{/* Hero Section */}
			<section className="relative w-full overflow-hidden">
				<div className="absolute inset-0 z-0">
					<img
						src={hero.heroImage}
						alt={hero.title}
						className="w-full h-full object-cover object-center"
					/>
					<div className="absolute inset-0 bg-[#112330]/85" />
				</div>

				{/* Increased gap-20 to give breathing room between text and form */}
				<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center min-h-[55vh]">
					{/* Left Column: Let text flow fully across the available space */}
					<div className="flex-1 text-white">
						<p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#F2A123] mb-4">
							Customs & Compliance
						</p>
						<h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6 drop-shadow-lg">
							{hero.title}
						</h1>
						<p className="text-lg lg:text-xl text-white/90 leading-relaxed font-light">
							{hero.description[0]}
						</p>
					</div>

					{/* Right Column: Enforced strict width (w-[448px]) and shrink-0 so it cannot squeeze */}
					<div className="w-full lg:w-[448px] shrink-0">
						<div className="bg-white text-slate-800 rounded-xl p-6 lg:p-8 shadow-2xl border border-slate-100">
							<h2 className="text-xl font-extrabold text-[#112330] mb-1">
								{heroForm.title}
							</h2>
							<p className="text-sm text-slate-500 mb-5 leading-snug">
								{heroForm.subtitle}
							</p>

							<form onSubmit={handleSubmit} className="space-y-4">
								{heroForm.fields.map((field) => (
									<div key={field.name}>
										<label
											htmlFor={field.name}
											className="block text-xs font-semibold text-slate-600 mb-1">
											{field.label}
										</label>
										{field.type === "select" ? (
											<select
												id={field.name}
												name={field.name}
												value={formData[field.name] ?? ""}
												onChange={handleChange}
												className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#F2A123] focus:border-transparent transition">
												<option value="" disabled>
													Select type
												</option>
												{field.options?.map((opt) => (
													<option key={opt} value={opt}>
														{opt}
													</option>
												))}
											</select>
										) : (
											<input
												id={field.name}
												name={field.name}
												type={field.type}
												placeholder={field.placeholder}
												value={formData[field.name] ?? ""}
												onChange={handleChange}
												className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#F2A123] focus:border-transparent transition"
											/>
										)}
									</div>
								))}

								<button
									type="submit"
									className="w-full mt-2 bg-[#112330] text-white text-sm font-bold py-3 rounded-lg hover:bg-[#1a3347] active:scale-[0.98] transition-all duration-200">
									{heroForm.buttonText}
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>

			{/* Clean White Description Block */}
			<section className="bg-white py-12 lg:py-16 border-b border-slate-100">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="max-w-4xl space-y-6 text-lg text-slate-600 leading-relaxed">
						{hero.description.slice(1).map((para, idx) => (
							<p key={idx}>{para}</p>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-[#F8F9FA] py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="mb-14">
						<p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#F2A123] mb-3">
							What We Offer
						</p>
						<h2 className="text-4xl lg:text-5xl font-bold text-[#112330] leading-tight tracking-[-0.03em]">
							{features.title}
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{features.items.map((item, i) => (
							<div
								key={i}
								className="group relative bg-white rounded-[2rem] p-10 lg:p-12 overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#F2A123]/30 transition-all duration-500 flex flex-col h-full">
								<div className="absolute -bottom-6 -right-6 text-[8rem] font-black text-slate-50 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4">
									{String(i + 1).padStart(2, "0")}
								</div>

								<div className="relative z-10 flex-1 flex flex-col">
									<div className="w-14 h-14 rounded-xl bg-[#F2A123]/10 flex items-center justify-center mb-8 shrink-0">
										{featureIcons[i % featureIcons.length]}
									</div>
									<h3 className="text-2xl font-extrabold text-[#112330] mb-4 leading-tight group-hover:text-[#F2A123] transition-colors duration-300">
										{item.title}
									</h3>
									<p className="text-slate-600 text-lg leading-relaxed">
										{item.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
