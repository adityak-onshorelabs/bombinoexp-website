"use client";

import { useState, useRef, useId } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/* ─── Constants ─────────────────────────────────────────────── */
const DESTINATIONS = [
	{ value: "US", label: "United States" },
	{ value: "GB", label: "United Kingdom" },
	{ value: "AE", label: "UAE" },
	{ value: "CA", label: "Canada" },
	{ value: "AU", label: "Australia" },
	{ value: "SG", label: "Singapore" },
	{ value: "OT", label: "Other" },
];

/* ─── Style atoms ───────────────────────────────────────────── */
function makeAtoms(glass: boolean) {
	const fieldBase = cn(
		"!h-12 w-full rounded-xl text-[0.9375rem] font-[family-name:var(--font-poppins)]",
		"transition-[border-color,box-shadow,background-color] duration-150",
		"focus:ring-0 focus-visible:outline-none",
		glass
			? cn(
					"border border-white/18 bg-white/8 text-freight-paper",
					"placeholder:text-freight-paper/35",
					"focus:border-white/40 focus:bg-white/12",
				)
			: cn(
					"border border-[oklch(88%_0.010_246)] bg-[oklch(97%_0.004_246)] text-admiralty",
					"placeholder:text-muted-ink",
					"focus:border-trade-wind focus-visible:shadow-input",
				),
	);

	const labelCls = cn(
		"block text-[0.6875rem] font-semibold tracking-[0.09em] uppercase mb-1.5",
		glass ? "text-freight-paper/50" : "text-muted-ink",
	);

	const errCls = cn(
		"mt-1 text-xs",
		glass ? "text-red-400" : "text-destructive",
	);

	return { fieldBase, labelCls, errCls };
}

const ctaBase = cn(
	"w-full h-12 flex items-center justify-center gap-2",
	"rounded-full font-semibold tracking-wide text-sm",
	"bg-dispatch-amber text-admiralty",
	"hover:bg-[oklch(79%_0.155_64)] hover:-translate-y-0.5 hover:shadow-lg",
	"active:translate-y-0 active:shadow-none",
	"transition-[background-color,transform,box-shadow] duration-200",
	"disabled:opacity-50 disabled:pointer-events-none",
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dispatch-amber/50",
);

/* ─── Types ──────────────────────────────────────────────────── */
interface QuoteErrors {
	destination?: string;
	weight?: string;
	pieces?: string;
}

interface RateOption {
	id?: string | number;
	code?: string;
	service_name?: string;
	total?: number | string;
	rate?: number | string;
	[key: string]: unknown;
}

/* ─── Component ──────────────────────────────────────────────── */
interface RateCalculatorProps {
	variant?: "default" | "glass";
}

export function RateCalculator({ variant = "default" }: RateCalculatorProps) {
	const glass = variant === "glass";
	const { fieldBase, labelCls, errCls } = makeAtoms(glass);
	const quoteId = useId();
	const trackId = useId();

	const [origin, setOrigin] = useState("IN");
	const [destination, setDestination] = useState("");
	const [weight, setWeight] = useState("");
	const [pieces, setPieces] = useState("1");
	const [quoteLoading, setQuoteLoading] = useState(false);
	const [quoteErrors, setQuoteErrors] = useState<QuoteErrors>({});

	const [ratesResult, setRatesResult] = useState<RateOption[] | null>(null);
	const [ratesError, setRatesError] = useState<string | null>(null);

	const [trackingNo, setTrackingNo] = useState("");
	const [trackLoading, setTrackLoading] = useState(false);
	const [trackError, setTrackError] = useState("");
	const [trackResult, setTrackResult] = useState<{
		awb: string;
		status: string;
		latestDesc: string;
		latestLoc: string;
	} | null>(null);
	const trackRef = useRef<HTMLInputElement>(null);

	function validateQuote(): boolean {
		const errs: QuoteErrors = {};
		if (!destination) errs.destination = "Select a destination.";
		if (!weight || parseFloat(weight) <= 0)
			errs.weight = "Enter a valid weight.";
		if (!pieces || parseInt(pieces, 10) <= 0)
			errs.pieces = "Enter valid pieces.";
		setQuoteErrors(errs);
		return Object.keys(errs).length === 0;
	}

	async function handleQuoteSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!validateQuote()) return;
		setQuoteLoading(true);

		setRatesError(null);
		try {
			const response = await fetch("/api/rates", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ origin, destination, weight, pieces }),
			});

			const data = await response.json();

			const options: RateOption[] =
				Array.isArray(data) ? data :
				Array.isArray(data?.rates) ? data.rates :
				Array.isArray(data?.data) ? data.data :
				Array.isArray(data?.result) ? data.result :
				Array.isArray(data?.results) ? data.results :
				[];

			if (options.length === 0) {
				setRatesError("No rates available for this route. Try a different destination or weight.");
				return;
			}

			const seen = new Set<string>();
			const unique = options.filter((r) => {
				const key = String(r.id ?? r.code);
				if (seen.has(key)) return false;
				seen.add(key);
				return true;
			});

			const sorted = unique
				.sort((a, b) => {
					const priceA = parseFloat(String(a.total).replace(/[^0-9.]/g, "")) || 0;
					const priceB = parseFloat(String(b.total).replace(/[^0-9.]/g, "")) || 0;
					return priceA - priceB;
				})
				.slice(0, 2);

			setRatesResult(sorted);
		} catch (error) {
			console.error("Rates fetch failed:", error);
			setRatesError("Failed to load rates. Please try again.");
		} finally {
			setQuoteLoading(false);
		}
	}

	async function handleTrackSubmit(e: React.FormEvent) {
		e.preventDefault();
		const val = trackingNo.trim();
		if (!val) {
			setTrackError("Enter a tracking number.");
			trackRef.current?.focus();
			return;
		}
		setTrackError("");
		setTrackLoading(true);
		try {
			const res  = await fetch(`/api/track/${encodeURIComponent(val)}`);
			const raw  = await res.json();

			/* Normalise response shape */
			const findPayload = (v: unknown): Record<string, unknown> | null => {
				if (!v || typeof v !== "object") return null;
				const o = v as Record<string, unknown>;
				if (Array.isArray(o.docket_info) || Array.isArray(o.docket_events)) return o;
				if (Array.isArray(v)) for (const item of v as unknown[]) { const p = findPayload(item); if (p) return p; }
				for (const k of ["data", "result", "results", "tracking", "response"]) { const p = findPayload(o[k]); if (p) return p; }
				return null;
			};
			const payload = findPayload(raw);

			const info: [string, string][]   = Array.isArray(payload?.docket_info)   ? (payload!.docket_info as [string, string][])   : [];
			const evts: Record<string,unknown>[] = Array.isArray(payload?.docket_events) ? (payload!.docket_events as Record<string,unknown>[]) : [];

			const getVal = (key: string) => {
				const hit = info.find(([k]) => k.trim().toLowerCase() === key.toLowerCase());
				return hit ? String(hit[1] ?? "").trim() : "";
			};

			const latest  = evts[0] ?? {};
			const latestDesc = String(latest.scan_type ?? latest.event_description ?? latest.description ?? latest.event ?? "").trim();
			const latestLoc  = String(latest.event_location ?? latest.city ?? latest.location ?? "").trim();

			if (!payload || (!info.length && !evts.length)) {
				setTrackError("No tracking data found. Verify the AWB number.");
			} else {
				setTrackResult({ awb: val, status: getVal("Status"), latestDesc, latestLoc });
			}
		} catch {
			setTrackError("Could not reach the tracking service. Try again.");
		} finally {
			setTrackLoading(false);
		}
	}

	return (
		<div
			className="p-6 sm:p-7"
			aria-label="Rate calculator and shipment tracker">
			{/* Section label */}
			<p
				className={cn(
					"text-xs font-semibold tracking-[0.10em] uppercase mb-4",
					glass ? "text-freight-paper/40" : "text-muted-ink",
				)}>
				Quick Tools
			</p>

			<Tabs defaultValue="quote">
				{/* Tab switcher */}
				<TabsList
					className={cn(
						"w-full grid grid-cols-2 !h-auto min-h-[44px] p-1.5 gap-1 mb-5 rounded-xl border-0",
						glass ? "!bg-white/10" : "!bg-[#F8F9FA]",
					)}>
					{(["quote", "track"] as const).map((val) => (
						<TabsTrigger
							key={val}
							value={val}
							className={cn(
								"h-9 w-full rounded-lg text-sm font-semibold border-transparent",
								"transition-[background,color,box-shadow] duration-150",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trade-wind/40",
								glass
									? "text-freight-paper/50 data-active:bg-white/16 data-active:text-freight-paper hover:text-freight-paper/80"
									: "text-muted-ink data-active:bg-white data-active:text-admiralty data-active:[box-shadow:0_1px_4px_oklch(17%_0.048_248_/_0.12),0_0_0_1px_oklch(88%_0.010_246)] hover:text-admiralty",
							)}>
							{val === "quote" ? "Check Quick Rate" : "Track Shipment"}
						</TabsTrigger>
					))}
				</TabsList>

				{/* ── Check Quick Rate ──────────────────────────────────── */}
				<TabsContent value="quote" className="mt-0">
					{ratesResult ? (
						/* Compact Inline Summary View */
						<div className="flex flex-col gap-4 animate-fadeIn">
							<p
								className={cn(
									"text-xs font-medium mb-1",
									glass ? "text-freight-paper/80" : "text-admiralty",
								)}>
								Estimated Rates for{" "}
								<span className="font-bold">{weight}kg</span> ({pieces}{" "}
								{parseInt(pieces, 10) === 1 ? "piece" : "pieces"}) to{" "}
								<span className="font-bold">
									{DESTINATIONS.find((d) => d.value === destination)?.label ||
										destination}
								</span>
								:
							</p>

							<div className="flex flex-col gap-2.5">
								{ratesResult.map((rate, idx) => (
									<div
										key={idx}
										className={cn(
											"flex items-center justify-between p-3.5 rounded-xl border",
											glass
												? "bg-white/10 border-white/20 text-white"
												: "bg-white border-slate-200 text-admiralty shadow-sm",
										)}>
										<div className="flex flex-col truncate pr-2">
											<span className="text-[0.65rem] uppercase tracking-wider font-bold text-dispatch-amber">
												{idx === 0 ? "Best Value" : "Alternative"}
											</span>
											<span className="text-xs font-semibold truncate">
												{rate.code ?? rate.service_name ?? "BOMBINO EXPRESS"}
											</span>
										</div>
										<span className="text-sm font-black shrink-0">
											{new Intl.NumberFormat("en-IN", {
												style: "currency",
												currency: "INR",
												maximumFractionDigits: 0,
											}).format(Number(rate.total) || 0)}
										</span>
									</div>
								))}
							</div>

							{/* Funnel CTA button taking user to full detailed breakdown */}
							<button
								onClick={() => {
									window.location.href = `/rates?origin=${origin}&destination=${destination}&weight=${weight}&pieces=${pieces}`;
								}}
								className={cn(ctaBase, "mt-2")}>
								Know More / View Breakdown
							</button>

							<button
								onClick={() => { setRatesResult(null); setRatesError(null); }}
								className={cn(
									"text-center text-xs underline cursor-pointer",
									glass
										? "text-freight-paper/60 hover:text-freight-paper"
										: "text-muted-ink hover:text-admiralty",
								)}>
								Calculate Another Quote
							</button>
						</div>
					) : (
						/* Standard Input Form */
						<form
							id={quoteId}
							onSubmit={handleQuoteSubmit}
							noValidate
							className="flex flex-col gap-3.5">
							{/* Row 1: Origin / Destination */}
							<div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
								<div>
									<label htmlFor="origin" className={labelCls}>
										Origin
									</label>
									<Select
										value={origin}
										onValueChange={(v) => setOrigin(v ?? "IN")}>
										<SelectTrigger
											id="origin"
											className={cn(fieldBase, "cursor-pointer")}>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="IN">India</SelectItem>
											<SelectItem value="US">United States</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<label htmlFor="destination" className={labelCls}>
										Destination
									</label>
									<Select
										value={destination}
										onValueChange={(v) => {
											setDestination(v ?? "");
											setQuoteErrors((p) => ({ ...p, destination: undefined }));
										}}>
										<SelectTrigger
											id="destination"
											aria-invalid={!!quoteErrors.destination}
											className={cn(
												fieldBase,
												"cursor-pointer",
												quoteErrors.destination && "!border-destructive",
											)}>
											<SelectValue placeholder="Select country" />
										</SelectTrigger>
										<SelectContent>
											{DESTINATIONS.map((d) => (
												<SelectItem key={d.value} value={d.value}>
													{d.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{quoteErrors.destination && (
										<p className={errCls} role="alert">
											{quoteErrors.destination}
										</p>
									)}
								</div>
							</div>

							{/* Row 2: Weight / Pieces */}
							<div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
								<div>
									<label htmlFor="weight" className={labelCls}>
										Weight
									</label>
									<div className="relative flex items-center">
										<Input
											id="weight"
											type="number"
											min="0.1"
											step="0.1"
											placeholder="0.5"
											value={weight}
											onChange={(e) => {
												setWeight(e.target.value);
												setQuoteErrors((p) => ({ ...p, weight: undefined }));
											}}
											aria-invalid={!!quoteErrors.weight}
											className={cn(
												fieldBase,
												"pr-10",
												quoteErrors.weight && "!border-destructive",
											)}
										/>
										<span
											className="pointer-events-none absolute right-3.5 select-none text-[0.8125rem] font-semibold text-muted-ink"
											aria-hidden="true">
											kg
										</span>
									</div>
									{quoteErrors.weight && (
										<p className={errCls} role="alert">
											{quoteErrors.weight}
										</p>
									)}
								</div>

								<div>
									<label htmlFor="pieces" className={labelCls}>
										Pieces
									</label>
									<Input
										id="pieces"
										type="number"
										min="1"
										step="1"
										placeholder="1"
										value={pieces}
										onChange={(e) => {
											setPieces(e.target.value);
											setQuoteErrors((p) => ({ ...p, pieces: undefined }));
										}}
										aria-invalid={!!quoteErrors.pieces}
										className={cn(
											fieldBase,
											quoteErrors.pieces && "!border-destructive",
										)}
									/>
									{quoteErrors.pieces && (
										<p className={errCls} role="alert">
											{quoteErrors.pieces}
										</p>
									)}
								</div>
							</div>

							{/* API error */}
							{ratesError && (
								<p className={errCls} role="alert">{ratesError}</p>
							)}

							{/* CTA */}
							<button
								type="submit"
								disabled={quoteLoading}
								className={cn(ctaBase, "mt-1")}>
								{quoteLoading ? (
									<span className="block h-4 w-4 rounded-full border-2 border-admiralty/25 border-t-admiralty animate-spin" />
								) : (
									<>
										Get a Rate
										<svg
											width="14"
											height="14"
											viewBox="0 0 16 16"
											fill="none"
											aria-hidden="true">
											<path
												d="M3 8h10M9 4l4 4-4 4"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</>
								)}
							</button>
						</form>
					)}
				</TabsContent>

				{/* ── Track Shipment ─────────────────────────────── */}
				<TabsContent value="track" className="mt-0">
					{trackResult ? (
						<div className="flex flex-col gap-4">
							<p className={cn("text-xs font-medium mb-1", glass ? "text-freight-paper/80" : "text-admiralty")}>
								Live status for AWB <span className="font-bold">{trackResult.awb}</span>:
							</p>

							<div className={cn(
								"flex flex-col gap-2 p-3.5 rounded-xl border",
								glass ? "bg-white/10 border-white/20" : "bg-white border-slate-200",
							)}>
								{/* Status row */}
								<div className="flex items-center justify-between gap-2">
									<span className={cn("text-[0.65rem] uppercase tracking-wider font-bold text-dispatch-amber")}>
										Status
									</span>
									{trackResult.status ? (
										<span className={cn(
											"text-xs font-bold px-2 py-0.5 rounded-full",
											glass ? "bg-white/15 text-freight-paper" : "bg-slate-100 text-admiralty",
										)}>
											{trackResult.status}
										</span>
									) : (
										<span className={cn("text-xs", glass ? "text-freight-paper/50" : "text-muted-ink")}>—</span>
									)}
								</div>

								{/* Latest event */}
								{trackResult.latestDesc && (
									<div className="flex flex-col gap-0.5 pt-1 border-t border-dashed border-current/10">
										<span className={cn("text-[0.65rem] uppercase tracking-wider font-bold text-dispatch-amber")}>
											Latest Update
										</span>
										<span className={cn("text-xs font-semibold", glass ? "text-freight-paper" : "text-admiralty")}>
											{trackResult.latestDesc}
										</span>
										{trackResult.latestLoc && (
											<span className={cn("text-[0.75rem]", glass ? "text-freight-paper/50" : "text-muted-ink")}>
												{trackResult.latestLoc}
											</span>
										)}
									</div>
								)}
							</div>

							<button
								onClick={() => { window.location.href = `/track?tracking_no=${encodeURIComponent(trackResult.awb)}`; }}
								className={cn(ctaBase, "mt-1")}>
								Know More / Full Timeline
							</button>

							<button
								onClick={() => { setTrackResult(null); setTrackingNo(""); }}
								className={cn(
									"text-center text-xs underline cursor-pointer",
									glass ? "text-freight-paper/60 hover:text-freight-paper" : "text-muted-ink hover:text-admiralty",
								)}>
								Track Another Shipment
							</button>
						</div>
					) : (
						<form
							id={trackId}
							onSubmit={handleTrackSubmit}
							noValidate
							className="flex flex-col gap-4">
							<div>
								<label htmlFor="tracking-number" className={labelCls}>
									Tracking Number
								</label>
								<Input
									ref={trackRef}
									id="tracking-number"
									type="text"
									placeholder="e.g. BE1234567890"
									autoComplete="off"
									spellCheck={false}
									value={trackingNo}
									onChange={(e) => {
										setTrackingNo(e.target.value);
										if (trackError) setTrackError("");
									}}
									aria-invalid={!!trackError}
									className={cn(
										fieldBase,
										"tracking-[0.03em]",
										trackError && "!border-destructive",
									)}
								/>
								{trackError && (
									<p className={errCls} role="alert">
										{trackError}
									</p>
								)}
							</div>
							<button
								type="submit"
								disabled={trackLoading}
								className={cn(ctaBase)}>
								{trackLoading ? (
									<span className="block h-4 w-4 rounded-full border-2 border-admiralty/25 border-t-admiralty animate-spin" />
								) : (
									"Track Shipment"
								)}
							</button>
							<p className="text-center text-[0.8125rem] text-muted-ink">
								Also accepts reference numbers and AWB numbers.
							</p>
						</form>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
}
