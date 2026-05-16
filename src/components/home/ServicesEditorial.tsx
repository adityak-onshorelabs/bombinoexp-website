"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
	ShoppingCart,
	Globe,
	FileCheck2,
	Warehouse,
	Package,
	Ship,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-80px" } as const;

const services: {
	number: string;
	title: string;
	desc: string;
	icon: LucideIcon;
	href: string;
}[] = [
	{
		number: "01",
		title: "Ecommerce Courier",
		desc: "Express delivery and last-mile solutions for online sellers. Real-time tracking and seamless global fulfillment with delivery windows across 150+ countries.",
		icon: ShoppingCart,
		href: "/services/ecommerce",
	},
	{
		number: "02",
		title: "Cross Border",
		desc: "Dedicated global delivery corridors from India to the USA, UK, UAE, Europe, and Southeast Asia. Reliable for both B2B consignments and consumer parcels.",
		icon: Globe,
		href: "/services/cross-border",
	},
	{
		number: "03",
		title: "Customs Clearance",
		desc: "End-to-end customs clearance for all shipment types. We manage documentation, duties, and compliance so your cargo moves without border delays.",
		icon: FileCheck2,
		href: "/services/customs",
	},
	{
		number: "04",
		title: "Warehousing",
		desc: "Modern warehousing with temperature-controlled zones, real-time inventory systems, and efficient barcoding — storage that scales with your business.",
		icon: Warehouse,
		href: "/services/warehousing",
	},
	{
		number: "05",
		title: "Parcel Delivery",
		desc: "Premium and economy options with express, next-day, and door-to-door international service. Every parcel tracked, every delivery confirmed.",
		icon: Package,
		href: "/services/parcel",
	},
	{
		number: "06",
		title: "Ocean Freight",
		desc: "Cost-effective sea freight with full LCL, FCL, and breakbulk options. For large consignments where speed yields to scale and efficiency.",
		icon: Ship,
		href: "/services/ocean-freight",
	},
];

function ServiceRow({
	service,
	index,
}: {
	service: (typeof services)[number];
	index: number;
}) {
	const Icon = service.icon;

	return (
		<motion.a
			href={service.href}
			className="grid grid-cols-[2rem_1fr] lg:grid-cols-12 gap-x-3 lg:gap-6 items-start border-b border-slate-200 py-6 lg:py-12 w-full group cursor-pointer"
			initial={{ opacity: 0, y: 18 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={VIEWPORT}
			transition={{ duration: 0.6, ease: PREMIUM_EASE, delay: index * 0.04 }}>
			{/* Number */}
			<div className="lg:col-span-2 pt-0.5">
				<span className="text-base lg:text-2xl font-bold text-[#FBAD1F]">
					{service.number}
				</span>
			</div>

			{/* Title + description */}
			<div className="lg:col-span-7 flex flex-col gap-2 lg:gap-4 w-full min-w-0">
				<h3 className="text-xl lg:text-4xl font-semibold text-foreground tracking-tight leading-tight group-hover:text-[#1E567B] transition-colors duration-300">
					{service.title}
				</h3>
				<p className="text-sm text-slate-500 leading-relaxed w-full">
					{service.desc}
				</p>
			</div>

			{/* Icon — desktop only */}
			<div className="hidden lg:flex col-span-3 justify-end items-start">
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={VIEWPORT}
					transition={{
						duration: 0.7,
						ease: PREMIUM_EASE,
						delay: index * 0.04 + 0.15,
					}}>
					<Icon
						size={128}
						strokeWidth={1}
						className="text-[#1E567B] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
						aria-hidden="true"
					/>
				</motion.div>
			</div>
		</motion.a>
	);
}

export function ServicesEditorial() {
	return (
		<section
			aria-labelledby="services-heading"
			className="bg-white [&_*]:scroll-smooth lg:[&_*]:scroll-smooth"
			style={{ scrollBehavior: "auto" }}>
			<div className="max-w-[1280px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start relative py-12 lg:py-32">
				{/* LEFT: Sticky header (sticky on desktop only) */}
				<div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "0px" }}
						transition={{ duration: 0.7, ease: PREMIUM_EASE }}
						className="flex flex-col gap-6">
						<p className="text-eyebrow text-dispatch-amber">What We Offer</p>

						<h2
							id="services-heading"
							className="font-extrabold text-[lab(7.78673_1.82346_-15.0537)] leading-[1.03] tracking-[-0.03em]"
							style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)" }}>
							Logistics that fit your needs.
						</h2>

						<p className="text-muted-ink text-lg leading-relaxed">
							From a single parcel to a full freight container — we cover every
							shipping need with speed, precision, and 30 years of expertise.
						</p>

						<Link
							href="/services"
							className="inline-flex items-center gap-2 text-sm font-semibold text-[lab(7.78673_1.82346_-15.0537)] hover:text-trade-wind transition-colors duration-200 group/link w-fit">
							View all services
							<svg
								width="14"
								height="14"
								viewBox="0 0 16 16"
								fill="none"
								aria-hidden="true"
								className="transition-transform duration-200 group-hover/link:translate-x-1">
								<path
									d="M3 8h10M9 4l4 4-4 4"
									stroke="currentColor"
									strokeWidth="1.75"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Link>
					</motion.div>
				</div>

				{/* RIGHT: Scrolling service rows */}
				<div className="lg:col-span-7 flex flex-col w-full">
					<div className="border-t border-slate-200" />
					{services.map((service, i) => (
						<ServiceRow key={service.title} service={service} index={i} />
					))}
				</div>
			</div>
		</section>
	);
}
