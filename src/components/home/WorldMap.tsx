"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MAP_DOTS } from "./map-dots";

export function WorldMap() {
	const svgRef = useRef<SVGSVGElement>(null);

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
				<filter id="wm-glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="10" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
				<linearGradient id="wm-route-grad" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#FBAD1F" stopOpacity="0.90" />
					<stop offset="100%" stopColor="#FBAD1F" stopOpacity="1" />
				</linearGradient>
			</defs>

			{/* Amber dot landmass */}
			<g className="landmass" fill="#FBAD1F" fillOpacity="0.15">
				{MAP_DOTS.map(([x, y]) => (
					<circle key={`${x},${y}`} cx={x} cy={y} r={3.8} />
				))}
			</g>

			{/* Route arcs */}
			<path
				className="route-path"
				d="M 680,300 C 560,70 360,70 245,225"
				fill="none"
				stroke="url(#wm-route-grad)"
				strokeWidth="4.5"
				strokeLinecap="round"
			/>
			<path
				className="route-path"
				d="M 680,300 C 618,120 530,120 465,185"
				fill="none"
				stroke="rgba(242, 161, 35, 0.6)"
				strokeWidth="3.5"
				strokeLinecap="round"
			/>
			<path
				className="route-path"
				d="M 680,300 C 660,272 640,268 608,282"
				fill="none"
				stroke="rgba(242, 161, 35, 0.4)"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeDasharray="4 7"
			/>

			{/* Moving shipment dot */}
			<circle cx="0" cy="0" r="8" fill="#FBAD1F" filter="url(#wm-glow)">
				<animateMotion
					dur="7s"
					repeatCount="indefinite"
					begin="2.5s"
					path="M 680,300 C 560,70 360,70 245,225"
					calcMode="spline"
					keySplines="0.42 0 0.58 1"
					keyTimes="0;1"
				/>
			</circle>

			{/* Mumbai hub */}
			<g className="city-node" filter="url(#wm-glow)">
				<circle cx="680" cy="300" r="12" fill="#FBAD1F" />
				<circle
					cx="680" cy="300" r="34"
					fill="none" stroke="#FBAD1F"
					strokeOpacity="0.5" strokeWidth="1.5"
					style={{ animation: "orbit-ping 2.4s ease-out infinite" }}
				/>
				<text x="680" y="350" fill="#FBAD1F" fontSize="20" fontWeight="700"
					fontFamily="var(--font-poppins)" letterSpacing="-0.01em" textAnchor="middle">
					MUMBAI
				</text>
			</g>

			{/* New York */}
			<g className="city-node">
				<circle cx="245" cy="225" r="6" fill="white" />
				<text x="245" y="268" fill="white" fontSize="20" fontWeight="700"
					opacity="0.9" fontFamily="var(--font-poppins)" letterSpacing="-0.01em" textAnchor="middle">
					NEW YORK
				</text>
			</g>

			{/* London */}
			<g className="city-node">
				<circle cx="465" cy="185" r="6" fill="white" />
				<text x="465" y="228" fill="white" fontSize="20" fontWeight="700"
					opacity="0.9" fontFamily="var(--font-poppins)" letterSpacing="-0.01em" textAnchor="middle">
					LONDON
				</text>
			</g>

			{/* Dubai */}
			<g className="city-node">
				<circle cx="608" cy="282" r="6" fill="white" />
				<text x="608" y="325" fill="white" fontSize="20" fontWeight="700"
					opacity="0.9" fontFamily="var(--font-poppins)" letterSpacing="-0.01em" textAnchor="middle">
					DUBAI
				</text>
			</g>
		</svg>
	);
}
