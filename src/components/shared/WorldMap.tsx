"use client";

import { useRef, useId } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MAP_DOTS } from "@/components/home/map-dots";

interface WorldMapProps {
	theme?: "amber" | "white" | "light";
	showLandmass?: boolean;
}

export function WorldMap({
	theme = "amber",
	showLandmass = true,
}: WorldMapProps) {
	const svgRef = useRef<SVGSVGElement>(null);
	const uid = useId().replace(/:/g, "");

	const isAmber = theme === "amber";
	const isLight = theme === "light";

	const accent = isAmber ? "#FBAD1F" : isLight ? "#475569" : "white";
	const dotFill = isLight ? "#94a3b8" : accent;
	const dotOpacity = isAmber ? "0.15" : isLight ? "0.45" : "0.10";
	const cityAccent = isLight ? "#1e293b" : accent;
	const routePrimary = isAmber
		? `url(#${uid}-grad)`
		: isLight
			? `url(#${uid}-grad)`
			: "rgba(255,255,255,0.55)";
	const routeSecondary = isAmber
		? "rgba(242,161,35,0.6)"
		: isLight
			? "rgba(251,173,31,0.65)"
			: "rgba(255,255,255,0.35)";
	const routeTertiary = isAmber
		? "rgba(242,161,35,0.4)"
		: isLight
			? "rgba(251,173,31,0.4)"
			: "rgba(255,255,255,0.20)";

	useGSAP(
		() => {
			const routes = gsap.utils.toArray<SVGPathElement>(".route-path");
			routes.forEach((path, i) => {
				const len = path.getTotalLength();
				gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
				gsap.to(path, {
					strokeDashoffset: 0,
					duration: 2.2,
					delay: 0.6 + i * 0.35,
					ease: "power2.out",
				});
			});
			gsap.from(".city-node", {
				scale: 0,
				opacity: 0,
				stagger: 0.12,
				delay: 1.2,
				duration: 0.45,
				ease: "back.out(2)",
			});
			gsap.from(".landmass", {
				opacity: 0,
				duration: 1.5,
				delay: 0.2,
				ease: "power2.out",
			});
		},
		{ scope: svgRef },
	);

	return (
		<svg
			ref={svgRef}
			className="w-full h-full block"
			viewBox="0 0 1200 600"
			preserveAspectRatio="xMidYMid meet"
			aria-hidden="true">
			<defs>
				<filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="10" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
				<linearGradient id={`${uid}-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#FBAD1F" stopOpacity="0.90" />
					<stop offset="100%" stopColor="#FBAD1F" stopOpacity="1" />
				</linearGradient>
			</defs>

			{/* Landmass dots */}
			{showLandmass && (
				<g className="landmass" fill={dotFill} fillOpacity={dotOpacity}>
					{MAP_DOTS.map(([x, y]) => (
						<circle key={`${x},${y}`} cx={x} cy={y} r={3.8} />
					))}
				</g>
			)}

			{/* Route arcs — all from India hub (680,300) */}
			{/* India → USA */}
			<path
				className="route-path"
				d="M 840,315 C 710,120 500,105 300,260"
				fill="none"
				stroke={routePrimary}
				strokeWidth="4.5"
				strokeLinecap="round"
			/>
			{/* India → UK */}
			<path
				className="route-path"
				d="M 840,315 C 810,170 710,130 600,175"
				fill="none"
				stroke={routeSecondary}
				strokeWidth="3.5"
				strokeLinecap="round"
			/>
			{/* India → China */}
			<path
				className="route-path"
				d="M 840,315 C 865,285 905,270 950,280"
				fill="none"
				stroke={routeSecondary}
				strokeWidth="3.5"
				strokeLinecap="round"
			/>
			{/* India → Australia */}
			<path
				className="route-path"
				d="M 840,315 C 900,360 970,430 1020,470"
				fill="none"
				stroke={routeSecondary}
				strokeWidth="3.0"
				strokeLinecap="round"
			/>
			{/* India → UAE */}
			<path
				className="route-path"
				d="M 840,315 C 815,308 790,312 750,320"
				fill="none"
				stroke={routeTertiary}
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeDasharray="4 7"
			/>

			{/* Moving shipment dot — India → USA */}
			<circle cx="0" cy="0" r="8" fill="#FBAD1F" filter={`url(#${uid}-glow)`}>
				<animateMotion
					dur="7s"
					repeatCount="indefinite"
					begin="2.5s"
					path="M 840,315 C 710,120 500,105 300,260"
					calcMode="spline"
					keySplines="0.42 0 0.58 1"
					keyTimes="0;1"
				/>
			</circle>

			{/* India hub — always amber */}
			<g className="city-node" filter={`url(#${uid}-glow)`}>
				<circle cx="840" cy="315" r="12" fill="#FBAD1F" />
				<circle
					cx="840"
					cy="315"
					r="34"
					fill="none"
					stroke="#FBAD1F"
					strokeOpacity="0.5"
					strokeWidth="1.5"
					style={{ animation: "orbit-ping 2.4s ease-out infinite" }}
				/>
				<text
					x="840"
					y="350"
					fill="#FBAD1F"
					fontSize="20"
					fontWeight="700"
					fontFamily="var(--font-poppins)"
					letterSpacing="-0.01em"
					textAnchor="middle">
					INDIA
				</text>
			</g>

			{/* USA */}
			<g className="city-node">
				<circle cx="300" cy="260" r="6" fill={cityAccent} />
				<text
					x="300"
					y="295"
					fill={cityAccent}
					fontSize="20"
					fontWeight="700"
					opacity="0.9"
					fontFamily="var(--font-poppins)"
					letterSpacing="-0.01em"
					textAnchor="middle">
					USA
				</text>
			</g>

			{/* UK */}
			<g className="city-node">
				<circle cx="600" cy="175" r="6" fill={cityAccent} />
				<text
					x="600"
					y="210"
					fill={cityAccent}
					fontSize="20"
					fontWeight="700"
					opacity="0.9"
					fontFamily="var(--font-poppins)"
					letterSpacing="-0.01em"
					textAnchor="middle">
					UK
				</text>
			</g>

			{/* UAE */}
			<g className="city-node">
				<circle cx="750" cy="320" r="6" fill={cityAccent} />
				<text
					x="750"
					y="355"
					fill={cityAccent}
					fontSize="20"
					fontWeight="700"
					opacity="0.9"
					fontFamily="var(--font-poppins)"
					letterSpacing="-0.01em"
					textAnchor="middle">
					UAE
				</text>
			</g>

			{/* China */}
			<g className="city-node">
				<circle cx="950" cy="280" r="6" fill={cityAccent} />
				<text
					x="950"
					y="315"
					fill={cityAccent}
					fontSize="20"
					fontWeight="700"
					opacity="0.9"
					fontFamily="var(--font-poppins)"
					letterSpacing="-0.01em"
					textAnchor="middle">
					CHINA
				</text>
			</g>

			{/* Australia */}
			<g className="city-node">
				<circle cx="1020" cy="470" r="6" fill={cityAccent} />
				<text
					x="1020"
					y="505"
					fill={cityAccent}
					fontSize="20"
					fontWeight="700"
					opacity="0.9"
					fontFamily="var(--font-poppins)"
					letterSpacing="-0.01em"
					textAnchor="middle">
					AUSTRALIA
				</text>
			</g>
		</svg>
	);
}
