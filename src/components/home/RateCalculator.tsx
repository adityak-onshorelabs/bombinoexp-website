"use client";

import { useState, useRef, useId, useEffect } from "react";
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
import { COUNTRIES } from "@/lib/countries";

/* ─── Constants ─────────────────────────────────────────────── */
const COUNTRIES_PLACEHOLDER_DELETE_ME = [
	{ value: "AF", label: "Afghanistan" },
	{ value: "AL", label: "Albania" },
	{ value: "DZ", label: "Algeria" },
	{ value: "AD", label: "Andorra" },
	{ value: "AO", label: "Angola" },
	{ value: "AG", label: "Antigua & Barbuda" },
	{ value: "AR", label: "Argentina" },
	{ value: "AM", label: "Armenia" },
	{ value: "AU", label: "Australia" },
	{ value: "AT", label: "Austria" },
	{ value: "AZ", label: "Azerbaijan" },
	{ value: "BS", label: "Bahamas" },
	{ value: "BH", label: "Bahrain" },
	{ value: "BD", label: "Bangladesh" },
	{ value: "BB", label: "Barbados" },
	{ value: "BY", label: "Belarus" },
	{ value: "BE", label: "Belgium" },
	{ value: "BZ", label: "Belize" },
	{ value: "BJ", label: "Benin" },
	{ value: "BT", label: "Bhutan" },
	{ value: "BO", label: "Bolivia" },
	{ value: "BA", label: "Bosnia & Herzegovina" },
	{ value: "BW", label: "Botswana" },
	{ value: "BR", label: "Brazil" },
	{ value: "BN", label: "Brunei" },
	{ value: "BG", label: "Bulgaria" },
	{ value: "BF", label: "Burkina Faso" },
	{ value: "BI", label: "Burundi" },
	{ value: "CV", label: "Cabo Verde" },
	{ value: "KH", label: "Cambodia" },
	{ value: "CM", label: "Cameroon" },
	{ value: "CA", label: "Canada" },
	{ value: "CF", label: "Central African Republic" },
	{ value: "TD", label: "Chad" },
	{ value: "CL", label: "Chile" },
	{ value: "CN", label: "China" },
	{ value: "CO", label: "Colombia" },
	{ value: "KM", label: "Comoros" },
	{ value: "CG", label: "Congo" },
	{ value: "CD", label: "Congo (DRC)" },
	{ value: "CR", label: "Costa Rica" },
	{ value: "HR", label: "Croatia" },
	{ value: "CU", label: "Cuba" },
	{ value: "CY", label: "Cyprus" },
	{ value: "CZ", label: "Czech Republic" },
	{ value: "DK", label: "Denmark" },
	{ value: "DJ", label: "Djibouti" },
	{ value: "DM", label: "Dominica" },
	{ value: "DO", label: "Dominican Republic" },
	{ value: "EC", label: "Ecuador" },
	{ value: "EG", label: "Egypt" },
	{ value: "SV", label: "El Salvador" },
	{ value: "GQ", label: "Equatorial Guinea" },
	{ value: "ER", label: "Eritrea" },
	{ value: "EE", label: "Estonia" },
	{ value: "SZ", label: "Eswatini" },
	{ value: "ET", label: "Ethiopia" },
	{ value: "FJ", label: "Fiji" },
	{ value: "FI", label: "Finland" },
	{ value: "FR", label: "France" },
	{ value: "GA", label: "Gabon" },
	{ value: "GM", label: "Gambia" },
	{ value: "GE", label: "Georgia" },
	{ value: "DE", label: "Germany" },
	{ value: "GH", label: "Ghana" },
	{ value: "GR", label: "Greece" },
	{ value: "GD", label: "Grenada" },
	{ value: "GT", label: "Guatemala" },
	{ value: "GN", label: "Guinea" },
	{ value: "GW", label: "Guinea-Bissau" },
	{ value: "GY", label: "Guyana" },
	{ value: "HT", label: "Haiti" },
	{ value: "HN", label: "Honduras" },
	{ value: "HK", label: "Hong Kong" },
	{ value: "HU", label: "Hungary" },
	{ value: "IS", label: "Iceland" },
	{ value: "IN", label: "India" },
	{ value: "ID", label: "Indonesia" },
	{ value: "IR", label: "Iran" },
	{ value: "IQ", label: "Iraq" },
	{ value: "IE", label: "Ireland" },
	{ value: "IL", label: "Israel" },
	{ value: "IT", label: "Italy" },
	{ value: "JM", label: "Jamaica" },
	{ value: "JP", label: "Japan" },
	{ value: "JO", label: "Jordan" },
	{ value: "KZ", label: "Kazakhstan" },
	{ value: "KE", label: "Kenya" },
	{ value: "KI", label: "Kiribati" },
	{ value: "KW", label: "Kuwait" },
	{ value: "KG", label: "Kyrgyzstan" },
	{ value: "LA", label: "Laos" },
	{ value: "LV", label: "Latvia" },
	{ value: "LB", label: "Lebanon" },
	{ value: "LS", label: "Lesotho" },
	{ value: "LR", label: "Liberia" },
	{ value: "LY", label: "Libya" },
	{ value: "LI", label: "Liechtenstein" },
	{ value: "LT", label: "Lithuania" },
	{ value: "LU", label: "Luxembourg" },
	{ value: "MO", label: "Macao" },
	{ value: "MG", label: "Madagascar" },
	{ value: "MW", label: "Malawi" },
	{ value: "MY", label: "Malaysia" },
	{ value: "MV", label: "Maldives" },
	{ value: "ML", label: "Mali" },
	{ value: "MT", label: "Malta" },
	{ value: "MH", label: "Marshall Islands" },
	{ value: "MR", label: "Mauritania" },
	{ value: "MU", label: "Mauritius" },
	{ value: "MX", label: "Mexico" },
	{ value: "FM", label: "Micronesia" },
	{ value: "MD", label: "Moldova" },
	{ value: "MC", label: "Monaco" },
	{ value: "MN", label: "Mongolia" },
	{ value: "ME", label: "Montenegro" },
	{ value: "MA", label: "Morocco" },
	{ value: "MZ", label: "Mozambique" },
	{ value: "MM", label: "Myanmar" },
	{ value: "NA", label: "Namibia" },
	{ value: "NR", label: "Nauru" },
	{ value: "NP", label: "Nepal" },
	{ value: "NL", label: "Netherlands" },
	{ value: "NZ", label: "New Zealand" },
	{ value: "NI", label: "Nicaragua" },
	{ value: "NE", label: "Niger" },
	{ value: "NG", label: "Nigeria" },
	{ value: "NO", label: "Norway" },
	{ value: "OM", label: "Oman" },
	{ value: "PK", label: "Pakistan" },
	{ value: "PW", label: "Palau" },
	{ value: "PA", label: "Panama" },
	{ value: "PG", label: "Papua New Guinea" },
	{ value: "PY", label: "Paraguay" },
	{ value: "PE", label: "Peru" },
	{ value: "PH", label: "Philippines" },
	{ value: "PL", label: "Poland" },
	{ value: "PT", label: "Portugal" },
	{ value: "QA", label: "Qatar" },
	{ value: "RO", label: "Romania" },
	{ value: "RU", label: "Russia" },
	{ value: "RW", label: "Rwanda" },
	{ value: "KN", label: "Saint Kitts & Nevis" },
	{ value: "LC", label: "Saint Lucia" },
	{ value: "VC", label: "Saint Vincent & Grenadines" },
	{ value: "WS", label: "Samoa" },
	{ value: "SM", label: "San Marino" },
	{ value: "ST", label: "São Tomé & Príncipe" },
	{ value: "SA", label: "Saudi Arabia" },
	{ value: "SN", label: "Senegal" },
	{ value: "RS", label: "Serbia" },
	{ value: "SC", label: "Seychelles" },
	{ value: "SL", label: "Sierra Leone" },
	{ value: "SG", label: "Singapore" },
	{ value: "SK", label: "Slovakia" },
	{ value: "SI", label: "Slovenia" },
	{ value: "SB", label: "Solomon Islands" },
	{ value: "SO", label: "Somalia" },
	{ value: "ZA", label: "South Africa" },
	{ value: "SS", label: "South Sudan" },
	{ value: "ES", label: "Spain" },
	{ value: "LK", label: "Sri Lanka" },
	{ value: "SD", label: "Sudan" },
	{ value: "SR", label: "Suriname" },
	{ value: "SE", label: "Sweden" },
	{ value: "CH", label: "Switzerland" },
	{ value: "SY", label: "Syria" },
	{ value: "TW", label: "Taiwan" },
	{ value: "TJ", label: "Tajikistan" },
	{ value: "TZ", label: "Tanzania" },
	{ value: "TH", label: "Thailand" },
	{ value: "TL", label: "Timor-Leste" },
	{ value: "TG", label: "Togo" },
	{ value: "TO", label: "Tonga" },
	{ value: "TT", label: "Trinidad & Tobago" },
	{ value: "TN", label: "Tunisia" },
	{ value: "TR", label: "Turkey" },
	{ value: "TM", label: "Turkmenistan" },
	{ value: "TV", label: "Tuvalu" },
	{ value: "UG", label: "Uganda" },
	{ value: "UA", label: "Ukraine" },
	{ value: "AE", label: "United Arab Emirates" },
	{ value: "GB", label: "United Kingdom" },
	{ value: "US", label: "United States" },
	{ value: "UY", label: "Uruguay" },
	{ value: "UZ", label: "Uzbekistan" },
	{ value: "VU", label: "Vanuatu" },
	{ value: "VE", label: "Venezuela" },
	{ value: "VN", label: "Vietnam" },
	{ value: "YE", label: "Yemen" },
	{ value: "ZM", label: "Zambia" },
	{ value: "ZW", label: "Zimbabwe" },
]; // replaced by import above

/* ─── Style atoms ───────────────────────────────────────────── */
function makeAtoms(glass: boolean) {
	const fieldBase = cn(
		"!h-10 sm:!h-12 w-full rounded-xl text-[0.875rem] sm:text-[0.9375rem] font-[family-name:var(--font-poppins)]",
		"transition-[border-color,box-shadow,background-color] duration-150",
		"focus:ring-0 focus-visible:outline-none",
		glass
			? cn(
					"border border-white/20 bg-white/10 text-white",
					"placeholder:text-white/40",
					"focus:border-white/40 focus:bg-white/12",
				)
			: cn(
					"border border-[oklch(88%_0.010_239.763)] bg-[oklch(97%_0.004_239.763)] text-[lab(7.78673_1.82346_-15.0537)]",
					"placeholder:text-muted-ink",
					"focus:border-trade-wind focus-visible:shadow-input",
				),
	);

	const labelCls = cn(
		"block text-[0.6875rem] font-semibold tracking-[0.09em] uppercase mb-1.5",
		glass ? "text-slate-200" : "text-muted-ink",
	);

	const errCls = cn(
		"mt-1 text-xs",
		glass ? "text-red-400" : "text-destructive",
	);

	return { fieldBase, labelCls, errCls };
}

const ctaBase = cn(
	"w-full h-10 sm:h-12 flex items-center justify-center gap-2",
	"rounded-full font-semibold tracking-wide text-sm",
	"bg-dispatch-amber text-[lab(7.78673_1.82346_-15.0537)]",
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
	const [originOpen, setOriginOpen] = useState(false);
	const [destinationOpen, setDestinationOpen] = useState(false);
	const [weight, setWeight] = useState("");
	const [pieces, setPieces] = useState("1");
	const [quoteLoading, setQuoteLoading] = useState(false);
	const [quoteErrors, setQuoteErrors] = useState<QuoteErrors>({});

	useEffect(() => {
		const close = () => {
			setOriginOpen(false);
			setDestinationOpen(false);
		};
		window.addEventListener("scroll", close, { passive: true });
		return () => window.removeEventListener("scroll", close);
	}, []);

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

			const options: RateOption[] = Array.isArray(data)
				? data
				: Array.isArray(data?.rates)
					? data.rates
					: Array.isArray(data?.data)
						? data.data
						: Array.isArray(data?.result)
							? data.result
							: Array.isArray(data?.results)
								? data.results
								: [];

			if (options.length === 0) {
				setRatesError(
					"No rates available for this route. Try a different destination or weight.",
				);
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
					const priceA =
						parseFloat(String(a.total).replace(/[^0-9.]/g, "")) || 0;
					const priceB =
						parseFloat(String(b.total).replace(/[^0-9.]/g, "")) || 0;
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
			const res = await fetch(`/api/track/${encodeURIComponent(val)}`);
			const raw = await res.json();

			/* Normalise response shape */
			const findPayload = (v: unknown): Record<string, unknown> | null => {
				if (!v || typeof v !== "object") return null;
				const o = v as Record<string, unknown>;
				if (Array.isArray(o.docket_info) || Array.isArray(o.docket_events))
					return o;
				if (Array.isArray(v))
					for (const item of v as unknown[]) {
						const p = findPayload(item);
						if (p) return p;
					}
				for (const k of ["data", "result", "results", "tracking", "response"]) {
					const p = findPayload(o[k]);
					if (p) return p;
				}
				return null;
			};
			const payload = findPayload(raw);

			const info: [string, string][] = Array.isArray(payload?.docket_info)
				? (payload!.docket_info as [string, string][])
				: [];
			const evts: Record<string, unknown>[] = Array.isArray(
				payload?.docket_events,
			)
				? (payload!.docket_events as Record<string, unknown>[])
				: [];

			const getVal = (key: string) => {
				const hit = info.find(
					([k]) => k.trim().toLowerCase() === key.toLowerCase(),
				);
				return hit ? String(hit[1] ?? "").trim() : "";
			};

			const latest = evts[0] ?? {};
			const latestDesc = String(
				latest.scan_type ??
					latest.event_description ??
					latest.description ??
					latest.event ??
					"",
			).trim();
			const latestLoc = String(
				latest.event_location ?? latest.city ?? latest.location ?? "",
			).trim();

			if (!payload || (!info.length && !evts.length)) {
				setTrackError("No tracking data found. Verify the AWB number.");
			} else {
				setTrackResult({
					awb: val,
					status: getVal("Status"),
					latestDesc,
					latestLoc,
				});
			}
		} catch {
			setTrackError("Could not reach the tracking service. Try again.");
		} finally {
			setTrackLoading(false);
		}
	}

	return (
		<div
			className="p-4 sm:p-6 lg:p-7 w-full max-w-full overflow-hidden"
			aria-label="Rate calculator and shipment tracker">
			{/* Heading */}
			{glass ? (
				<p className="text-base font-bold text-white mb-4">
					Calculate your <span className="text-[#FBAD1F]">Rate</span>
				</p>
			) : (
				<p className="text-xs font-semibold tracking-[0.10em] uppercase mb-4 text-muted-ink">
					Quick Tools
				</p>
			)}

			<Tabs defaultValue="quote">
				{/* Tab switcher */}
				<TabsList
					className={cn(
						"w-full grid grid-cols-2 !h-auto min-h-[44px] p-1.5 gap-1 mb-5 rounded-xl border-0",
						glass ? "!bg-white/10" : "!bg-[#F8FAFC]",
					)}>
					{(["quote", "track"] as const).map((val) => (
						<TabsTrigger
							key={val}
							value={val}
							className={cn(
								"h-9 w-full rounded-lg text-xs sm:text-sm font-semibold border-transparent truncate px-1",
								"transition-[background,color,box-shadow] duration-150",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trade-wind/40",
								glass
									? "text-white/50 data-active:bg-white/16 data-active:text-white hover:text-white/80"
									: "text-muted-ink data-active:bg-white data-active:text-[lab(7.78673_1.82346_-15.0537)] data-active:[box-shadow:0_1px_4px_oklch(17%_0.048_239.763_/_0.12),0_0_0_1px_oklch(88%_0.010_239.763)] hover:text-[lab(7.78673_1.82346_-15.0537)]",
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
									glass ? "text-white/80" : "text-[lab(7.78673_1.82346_-15.0537)]",
								)}>
								Estimated Rates for{" "}
								<span className="font-bold">{weight}kg</span> ({pieces}{" "}
								{parseInt(pieces, 10) === 1 ? "piece" : "pieces"}) to{" "}
								<span className="font-bold">
									{COUNTRIES.find((c) => c.value === destination)?.label ||
										destination}
								</span>
								:
							</p>

							<div className="flex flex-col gap-2.5">
								{ratesResult.map((rate, idx) => (
									<div
										key={idx}
										className={cn(
											"flex items-center justify-between p-3.5 rounded-xl border-2 transition-all duration-300",
											"border-dispatch-amber bg-dispatch-amber/10",
											glass ? "text-white" : "text-[lab(7.78673_1.82346_-15.0537)]",
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
								onClick={() => {
									setRatesResult(null);
									setRatesError(null);
								}}
								className={cn(
									"text-center text-xs underline cursor-pointer",
									glass
										? "text-white/60 hover:text-white"
										: "text-muted-ink hover:text-[lab(7.78673_1.82346_-15.0537)]",
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
							<div className="grid grid-cols-2 gap-2 sm:gap-3">
								<div>
									<label htmlFor="origin" className={labelCls}>
										Origin
									</label>
									<Select
										value={origin}
										open={originOpen}
										onOpenChange={setOriginOpen}
										onValueChange={(v) => setOrigin(v ?? "IN")}>
										<SelectTrigger
											id="origin"
											className={cn(fieldBase, "cursor-pointer")}>
											<SelectValue />
										</SelectTrigger>
										<SelectContent onWheel={(e) => e.stopPropagation()}>
											{COUNTRIES.map((c) => (
												<SelectItem key={c.value} value={c.value}>
													{c.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div>
									<label htmlFor="destination" className={labelCls}>
										Destination
									</label>
									<Select
										value={destination}
										open={destinationOpen}
										onOpenChange={setDestinationOpen}
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
										<SelectContent onWheel={(e) => e.stopPropagation()}>
											{COUNTRIES.map((c) => (
												<SelectItem key={c.value} value={c.value}>
													{c.label}
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
							<div className="grid grid-cols-2 gap-2 sm:gap-3">
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
											className={cn("pointer-events-none absolute right-3.5 select-none text-[0.8125rem] font-semibold", glass ? "text-white/50" : "text-muted-ink")}
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
								<p className={errCls} role="alert">
									{ratesError}
								</p>
							)}

							{/* CTA */}
							<button
								type="submit"
								disabled={quoteLoading}
								className={cn(ctaBase, "mt-1")}>
								{quoteLoading ? (
									<span className="block h-4 w-4 rounded-full border-2 border-white/25 border-t-white animate-spin" />
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
							<p
								className={cn(
									"text-xs font-medium mb-1",
									glass ? "text-white/80" : "text-[lab(7.78673_1.82346_-15.0537)]",
								)}>
								Live status for AWB{" "}
								<span className="font-bold">{trackResult.awb}</span>:
							</p>

							<div
								className={cn(
									"flex flex-col gap-2 p-3.5 rounded-xl border-2 transition-all duration-300",
									"border-dispatch-amber bg-dispatch-amber/10",
									glass ? "text-white" : "text-[lab(7.78673_1.82346_-15.0537)]",
								)}>
								{/* Status row */}
								<div className="flex items-center justify-between gap-2">
									<span
										className={cn(
											"text-[0.65rem] uppercase tracking-wider font-bold text-dispatch-amber",
										)}>
										Status
									</span>
									{trackResult.status ? (
										<span
											className={cn(
												"text-xs font-bold px-2 py-0.5 rounded-full",
												glass
													? "bg-white/15 text-white"
													: "bg-slate-100 text-[lab(7.78673_1.82346_-15.0537)]",
											)}>
											{trackResult.status}
										</span>
									) : (
										<span
											className={cn(
												"text-xs",
												glass ? "text-white/50" : "text-muted-ink",
											)}>
											—
										</span>
									)}
								</div>

								{/* Latest event */}
								{trackResult.latestDesc && (
									<div className="flex flex-col gap-0.5 pt-1 border-t border-dashed border-current/10">
										<span
											className={cn(
												"text-[0.65rem] uppercase tracking-wider font-bold text-dispatch-amber",
											)}>
											Latest Update
										</span>
										<span
											className={cn(
												"text-xs font-semibold",
												glass ? "text-white" : "text-[lab(7.78673_1.82346_-15.0537)]",
											)}>
											{trackResult.latestDesc}
										</span>
										{trackResult.latestLoc && (
											<span
												className={cn(
													"text-[0.75rem]",
													glass ? "text-white/50" : "text-muted-ink",
												)}>
												{trackResult.latestLoc}
											</span>
										)}
									</div>
								)}
							</div>

							<button
								onClick={() => {
									window.location.href = `/track?tracking_no=${encodeURIComponent(trackResult.awb)}`;
								}}
								className={cn(ctaBase, "mt-1")}>
								Know More / Full Timeline
							</button>

							<button
								onClick={() => {
									setTrackResult(null);
									setTrackingNo("");
								}}
								className={cn(
									"text-center text-xs underline cursor-pointer",
									glass
										? "text-white/60 hover:text-white"
										: "text-muted-ink hover:text-[lab(7.78673_1.82346_-15.0537)]",
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
									<span className="block h-4 w-4 rounded-full border-2 border-white/25 border-t-white animate-spin" />
								) : (
									"Track Shipment"
								)}
							</button>
							<p className={cn("text-center text-[0.8125rem]", glass ? "text-white/50" : "text-muted-ink")}>
								Also accepts reference numbers and AWB numbers.
							</p>
						</form>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
}
