"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RateCalculator } from "./RateCalculator";
import { WorldMap } from "@/components/shared/WorldMap";

function TrustPill({ value, label }: { value: string; label: string }) {
	return (
		<div className="flex items-baseline gap-1.5 min-w-0">
			<span className="font-extrabold text-[lab(7.78673_1.82346_-15.0537)] tracking-tight text-lg sm:text-xl leading-none">
				{value}
			</span>
			<span className="text-[lab(7.78673_1.82346_-15.0537)]/55 text-[0.6rem] sm:text-[0.65rem] font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase">
				{label}
			</span>
		</div>
	);
}

export function Hero() {
	const containerRef = useRef<HTMLElement>(null);
	const counterRef = useRef<HTMLSpanElement>(null);

	useGSAP(
		() => {
			const isMobile = window.innerWidth < 768;

			const obj = { val: 1208 };
			gsap.to(obj, {
				val: 1247,
				duration: 5,
				ease: "power1.out",
				onUpdate: () => {
					if (counterRef.current) {
						counterRef.current.textContent = Math.round(obj.val).toLocaleString();
					}
				},
			});

			const tl = gsap.timeline({ delay: 0.12 });
			tl.fromTo(
				".hero-eyebrow",
				{ y: 14, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.55, ease: "expo.out" },
			)
				.fromTo(
					".hero-h1 > *",
					{ y: 32, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.75, ease: "expo.out", stagger: 0.08 },
					"-=0.3",
				)
				.fromTo(
					".hero-sub",
					{ y: 16, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.6, ease: "expo.out" },
					"-=0.4",
				)
				.fromTo(
					".hero-ctas > *",
					{ y: 12, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.5, ease: "expo.out", stagger: 0.08 },
					"-=0.35",
				)
				.fromTo(
					".hero-proof > *",
					{ y: 10, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.45, ease: "expo.out", stagger: 0.06 },
					"-=0.3",
				);

			if (!isMobile) {
				tl.fromTo(
					".hero-map",
					{ y: 24, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.75, ease: "expo.out" },
					0.35,
				).fromTo(
					".hero-calc",
					{ x: 44, opacity: 0 },
					{ x: 0, opacity: 1, duration: 0.85, ease: "expo.out" },
					0.45,
				);
			} else {
				tl.fromTo(
					".hero-calc",
					{ y: 20, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.6, ease: "expo.out" },
					"-=0.2",
				);
			}
		},
		{ scope: containerRef },
	);

	return (
		<section
			ref={containerRef}
			id="hero"
			className="relative bg-white overflow-hidden">

			<div className="relative z-10 max-w-[1280px] mx-auto w-full px-6 lg:px-8 pt-24 md:pt-36 lg:pt-44 pb-12 lg:pb-28">
				<div className="flex flex-col gap-7 max-w-[68rem]">
					<div className="hero-eyebrow max-w-full">
						<div className="inline-flex max-w-full items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-dispatch-amber/30 bg-dispatch-amber/8">
							<span className="relative flex h-2 w-2 shrink-0">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dispatch-amber opacity-60" />
								<span className="relative inline-flex rounded-full h-2 w-2 bg-dispatch-amber" />
							</span>
							<span className="text-[0.625rem] sm:text-xs font-bold tracking-[0.08em] sm:tracking-[0.16em] uppercase text-dispatch-amber/90 whitespace-nowrap">
								Live · <span ref={counterRef}>1,208</span>
								<span className="hidden sm:inline"> Shipments in Transit</span>
								<span className="sm:hidden"> Shipments</span>
							</span>
						</div>
					</div>

					<div className="hero-h1">
						<h1
							className="font-black text-[lab(7.78673_1.82346_-15.0537)] tracking-[-0.04em] leading-[0.95]"
							style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}>
							<span>Your cargo, </span>
							<span className="text-dispatch-amber">moving</span>
							<span> now.</span>
						</h1>
					</div>

					<p
						className="hero-sub text-[lab(7.78673_1.82346_-15.0537)]/65 text-lg leading-relaxed font-light"
						style={{ maxWidth: "52ch" }}>
						India's trusted international courier since 1995. Express delivery
						to USA, UK, UAE, and 150+ countries worldwide.
					</p>
				</div>

				<div className="mt-8 lg:mt-12 grid lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_480px] gap-6 lg:gap-8 xl:gap-12 items-stretch w-full min-w-0">
					{/* Left column — below calc on mobile, left on desktop */}
					<div className="flex flex-col gap-7 order-2 lg:order-1 min-w-0 w-full">
						<div
							className="hero-map w-full hidden lg:block"
							style={{ aspectRatio: "16 / 9" }}>
							<WorldMap theme="light" />
						</div>

						<div className="hero-ctas flex flex-wrap gap-3">
							<Link
								href="/booking/get-quote"
								className="inline-flex items-center gap-2 rounded-full bg-dispatch-amber px-7 py-3.5 text-sm font-bold tracking-[0.02em] text-[lab(7.78673_1.82346_-15.0537)] transition-all duration-200 hover:bg-dispatch-amber-hover hover:-translate-y-0.5 hover:shadow-xl">
								Get a Quote
								<svg width="13" height="13" viewBox="0 0 16 16" fill="none">
									<path
										d="M3 8h10M9 4l4 4-4 4"
										stroke="currentColor"
										strokeWidth="1.75"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</Link>
							<Link
								href="/services"
								className="inline-flex items-center rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold tracking-[0.02em] text-white transition-all duration-200 hover:bg-slate-800 hover:-translate-y-0.5">
								Our Services
							</Link>
						</div>

						<div className="hero-proof flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-7 pt-1">
							<TrustPill value="1M+" label="Shipments" />
							<div
								className="h-6 w-px bg-slate-200 hidden sm:block"
								aria-hidden="true"
							/>
							<TrustPill value="150+" label="Countries" />
							<div
								className="h-6 w-px bg-slate-200 hidden sm:block"
								aria-hidden="true"
							/>
							<TrustPill value="1995" label="Est." />
						</div>
					</div>

					{/* Calc card — first on mobile, right column on desktop */}
					<div className="hero-calc order-1 lg:order-2 w-full min-w-0">
						<div className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-[0_12px_48px_rgba(15,23,42,0.10),0_4px_16px_rgba(15,23,42,0.05)]">
							<div className="h-[3px] bg-dispatch-amber" aria-hidden="true" />
							<RateCalculator variant="default" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
