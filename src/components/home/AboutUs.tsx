"use client";

import { WorldMap } from "@/components/shared/WorldMap";

const STATS = [
	{ value: "1995", label: "Founded"   },
	{ value: "150+", label: "Countries" },
	{ value: "1M+",  label: "Shipments" },
];

export function AboutUs() {
	return (
		<section id="about" className="bg-admiralty py-24 lg:py-32 overflow-hidden">
			<div className="max-w-[1280px] mx-auto px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

					{/* Left — Story */}
					<div>
						<p className="text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-dispatch-amber mb-4">
							Our Story
						</p>
						<h2
							className="font-extrabold text-freight-paper tracking-[-0.03em] leading-[1.05] mb-6"
							style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
							30 years of moving<br className="hidden lg:block" /> what matters.
						</h2>
						<p
							className="text-freight-paper/60 text-lg leading-relaxed mb-10"
							style={{ maxWidth: "50ch" }}>
							Founded in Mumbai in 1995, Bombino Express has grown from a single
							office into a global freight network spanning 150+ countries. Built
							on one principle: your shipment arrives, on time, every time.
						</p>

						<div className="flex gap-10">
							{STATS.map(({ value, label }) => (
								<div key={label}>
									<p className="text-dispatch-amber text-3xl font-black tabular-nums leading-none">
										{value}
									</p>
									<p className="text-freight-paper/40 text-xs mt-2 font-semibold tracking-[0.10em] uppercase">
										{label}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Right — white-themed map */}
					<div
						className="w-full relative"
						style={{ aspectRatio: "16/9" }}>
						<WorldMap theme="white" />
					</div>

				</div>
			</div>
		</section>
	);
}
