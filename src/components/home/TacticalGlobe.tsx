"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";

/* ── Constants ───────────────────────────────────────────────── */
const D2R    = Math.PI / 180;
const AMBER  = "#FBAD1F";
const OCEAN  = "#0e1419";
const LAND   = "#1c2530";
const BORDER = "#2a3a47";
const GRID   = "rgba(242,161,35,0.10)";

/* ── City markers ────────────────────────────────────────────── */
const MARKERS = [
	{ lat: 19.076, lng:  72.878, label: "Mumbai",    hub: true  },
	{ lat: 40.713, lng: -74.006, label: "New York",  hub: false },
	{ lat: 51.507, lng:  -0.128, label: "London",    hub: false },
	{ lat: 25.205, lng:  55.271, label: "Dubai",     hub: false },
	{ lat:  1.352, lng: 103.820, label: "Singapore", hub: false },
];

/* ── Great-circle arc interpolation ─────────────────────────── */
const ARC_STEPS = 80;

function greatCirclePoints(
	lng1: number, lat1: number,
	lng2: number, lat2: number,
	steps: number,
): [number, number][] {
	const p1 = lat1 * D2R, l1 = lng1 * D2R;
	const p2 = lat2 * D2R, l2 = lng2 * D2R;
	const x1 = Math.cos(p1) * Math.cos(l1), y1 = Math.cos(p1) * Math.sin(l1), z1 = Math.sin(p1);
	const x2 = Math.cos(p2) * Math.cos(l2), y2 = Math.cos(p2) * Math.sin(l2), z2 = Math.sin(p2);
	const dot   = Math.max(-1, Math.min(1, x1*x2 + y1*y2 + z1*z2));
	const angle = Math.acos(dot);
	const sinA  = Math.sin(angle);
	return Array.from({ length: steps + 1 }, (_, i) => {
		const t = i / steps;
		if (sinA < 1e-6) return [lng1, lat1] as [number, number];
		const fa = Math.sin((1 - t) * angle) / sinA;
		const fb = Math.sin(t * angle) / sinA;
		const x = fa * x1 + fb * x2;
		const y = fa * y1 + fb * y2;
		const z = fa * z1 + fb * z2;
		return [Math.atan2(y, x) / D2R, Math.asin(z) / D2R] as [number, number];
	});
}

// Pre-compute arc point arrays once
const ARCS_GC = MARKERS.slice(1).map((dest, i) => ({
	label:    dest.label,
	phase:    i * 1400,          // stagger start
	duration: 4000 + i * 600,   // slightly different speeds
	points:   greatCirclePoints(19.076, 72.878, dest.lng, dest.lat, ARC_STEPS),
}));

/* ── Seeded stars ────────────────────────────────────────────── */
function mulberry32(seed: number) {
	let s = seed >>> 0;
	return () => {
		s = (s + 1831565813) >>> 0;
		let t = s;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}
const STARS = (() => {
	const rng = mulberry32(1584243068);
	return Array.from({ length: 70 }, () => ({
		x: rng(), y: rng(), r: 0.4 + rng() * 1.1, o: 0.3 + rng() * 0.65,
	}));
})();

/* ── Orthographic projection ─────────────────────────────────── */
function project(
	lng: number, lat: number,
	lambda: number, phi: number,
	R: number, cx: number, cy: number,
): { sx: number; sy: number; z: number } {
	const dl = (lng - lambda) * D2R;
	const lr = lat * D2R;
	const pr = phi * D2R;
	const cosLr = Math.cos(lr), sinLr = Math.sin(lr);
	const cosDl = Math.cos(dl), sinDl = Math.sin(dl);
	const cosPr = Math.cos(pr), sinPr = Math.sin(pr);
	return {
		sx: cx + cosLr * sinDl * R,
		sy: cy - (cosPr * sinLr - sinPr * cosLr * cosDl) * R,
		z:       sinPr * sinLr + cosPr * cosLr * cosDl,
	};
}

/* ── GeoJSON ring type ───────────────────────────────────────── */
type Ring = [number, number][];
function getRings(geom: { type: string; coordinates: unknown }): Ring[] {
	if (geom.type === "Polygon")      return geom.coordinates as Ring[];
	if (geom.type === "MultiPolygon") return (geom.coordinates as Ring[][]).flat();
	return [];
}

/* ── Draw a ring — each visible segment closed independently ─── */
function drawRing(
	ctx: CanvasRenderingContext2D,
	ring: Ring,
	lambda: number, phi: number,
	R: number, cx: number, cy: number,
) {
	const pts = ring.map(([lng, lat]) => project(lng, lat, lambda, phi, R, cx, cy));
	const n   = pts.length;
	let seg: [number, number][] = [];

	const flush = () => {
		if (seg.length < 2) { seg = []; return; }
		ctx.moveTo(seg[0][0], seg[0][1]);
		for (let j = 1; j < seg.length; j++) ctx.lineTo(seg[j][0], seg[j][1]);
		ctx.closePath();
		seg = [];
	};

	for (let i = 0; i < n; i++) {
		const a = pts[i];
		const b = pts[(i + 1) % n];

		if (a.z >= 0 && b.z >= 0) {
			if (seg.length === 0) seg.push([a.sx, a.sy]);
			seg.push([b.sx, b.sy]);
		} else if (a.z >= 0 && b.z < 0) {
			// exit — add horizon point, close this segment
			if (seg.length === 0) seg.push([a.sx, a.sy]);
			const t = a.z / (a.z - b.z);
			seg.push([a.sx + t * (b.sx - a.sx), a.sy + t * (b.sy - a.sy)]);
			flush();
		} else if (a.z < 0 && b.z >= 0) {
			// entry — start new segment from horizon
			const t = a.z / (a.z - b.z);
			seg = [[a.sx + t * (b.sx - a.sx), a.sy + t * (b.sy - a.sy)], [b.sx, b.sy]];
		}
		// both invisible: nothing
	}

	flush(); // close any trailing segment
}

/* ── Component ───────────────────────────────────────────────── */
const TacticalGlobe = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef    = useRef<HTMLCanvasElement>(null);
	const [dims, setDims] = useState({ w: 700, h: 500 });
	const featRef  = useRef<{ geometry: { type: string; coordinates: unknown } }[]>([]);
	const rotRef   = useRef({ lambda: -72, phi: 15 });
	const dragRef  = useRef({ on: false });
	const rafRef   = useRef(0);
	const lastRef  = useRef(0);
	const t0Ref    = useRef(0);
	const idleRef  = useRef(0);

	/* Resize */
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const ro = new ResizeObserver(([e]) => {
			setDims({ w: e.contentRect.width, h: e.contentRect.height });
		});
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	/* Fetch TopoJSON */
	useEffect(() => {
		fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
			.then(r => r.json())
			.then((topo: Topology) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const col = feature(topo, (topo.objects as any).countries) as any;
				featRef.current = col.features ?? [];
			})
			.catch(() => {});
	}, []);

	/* Draw */
	const draw = useCallback((W: number, H: number, now: number) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const dpr = window.devicePixelRatio || 1;

		const R  = Math.max(20, Math.min(W, H) / 2 - 8);
		const cx = W / 2;
		const cy = H / 2;
		const { lambda, phi } = rotRef.current;
		const elapsed = now - t0Ref.current;

		ctx.clearRect(0, 0, W * dpr, H * dpr);
		ctx.save();
		ctx.scale(dpr, dpr);

		/* Stars */
		STARS.forEach(s => {
			ctx.beginPath();
			ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(255,255,255,${s.o * 0.45})`;
			ctx.fill();
		});

		/* Ocean */
		ctx.beginPath();
		ctx.arc(cx, cy, R, 0, Math.PI * 2);
		ctx.fillStyle = OCEAN;
		ctx.fill();

		/* Countries — clip to sphere */
		ctx.save();
		ctx.beginPath();
		ctx.arc(cx, cy, R, 0, Math.PI * 2);
		ctx.clip();

		featRef.current.forEach(feat => {
			ctx.beginPath();
			getRings(feat.geometry).forEach(ring =>
				drawRing(ctx, ring, lambda, phi, R, cx, cy),
			);
			ctx.fillStyle = LAND;
			ctx.fill();
			ctx.strokeStyle = BORDER;
			ctx.lineWidth = 0.45;
			ctx.stroke();
		});

		/* Graticule */
		ctx.beginPath();
		for (let lat = -60; lat <= 60; lat += 30) {
			let mv = false;
			for (let lng = -180; lng <= 180; lng += 3) {
				const { sx, sy, z } = project(lng, lat, lambda, phi, R, cx, cy);
				if (z < 0) { mv = false; continue; }
				if (!mv) { ctx.moveTo(sx, sy); mv = true; } else ctx.lineTo(sx, sy);
			}
		}
		for (let lng = -180; lng < 180; lng += 30) {
			let mv = false;
			for (let lat = -90; lat <= 90; lat += 3) {
				const { sx, sy, z } = project(lng, lat, lambda, phi, R, cx, cy);
				if (z < 0) { mv = false; continue; }
				if (!mv) { ctx.moveTo(sx, sy); mv = true; } else ctx.lineTo(sx, sy);
			}
		}
		ctx.strokeStyle = GRID;
		ctx.lineWidth = 0.6;
		ctx.stroke();

		/* Animated arcs */
		ARCS_GC.forEach((arc) => {
			const progress = ((elapsed + arc.phase) % arc.duration) / arc.duration;
			const headIdx  = Math.floor(progress * ARC_STEPS);
			const TRAIL    = 18; // visible trail length in steps

			// Dim full arc
			ctx.beginPath();
			let mv = false;
			arc.points.forEach(([lng, lat]) => {
				const { sx, sy, z } = project(lng, lat, lambda, phi, R, cx, cy);
				if (z < 0) { mv = false; return; }
				if (!mv) { ctx.moveTo(sx, sy); mv = true; } else ctx.lineTo(sx, sy);
			});
			ctx.strokeStyle = "rgba(242,161,35,0.15)";
			ctx.lineWidth = 1;
			ctx.stroke();

			// Bright animated trail
			ctx.beginPath();
			mv = false;
			for (let i = Math.max(0, headIdx - TRAIL); i <= Math.min(headIdx, ARC_STEPS); i++) {
				const [lng, lat] = arc.points[i];
				const { sx, sy, z } = project(lng, lat, lambda, phi, R, cx, cy);
				if (z < 0) { mv = false; continue; }
				if (!mv) { ctx.moveTo(sx, sy); mv = true; } else ctx.lineTo(sx, sy);
			}
			ctx.strokeStyle = AMBER;
			ctx.lineWidth = 1.8;
			ctx.stroke();

			// Moving dot at head
			const [hLng, hLat] = arc.points[Math.min(headIdx, ARC_STEPS)];
			const head = project(hLng, hLat, lambda, phi, R, cx, cy);
			if (head.z >= 0) {
				ctx.beginPath();
				ctx.arc(head.sx, head.sy, 3.5, 0, Math.PI * 2);
				ctx.fillStyle = AMBER;
				ctx.fill();
			}
		});

		ctx.restore(); // remove clip

		/* Globe outline */
		ctx.beginPath();
		ctx.arc(cx, cy, R, 0, Math.PI * 2);
		ctx.strokeStyle = "rgba(242,161,35,0.18)";
		ctx.lineWidth = 0.8;
		ctx.stroke();

		/* Markers */
		MARKERS.forEach(m => {
			const { sx, sy, z } = project(m.lng, m.lat, lambda, phi, R, cx, cy);
			if (z < 0.05) return;
			const size   = m.hub ? 6 : 4;
			const tPulse = (elapsed % 2400) / 2400;
			const pulse  = Math.sin(tPulse * Math.PI * 2) * 0.5 + 0.5;

			/* Pulsing ring */
			ctx.beginPath();
			ctx.arc(sx, sy, size * 1.4 * (1 + pulse * 0.7), 0, Math.PI * 2);
			ctx.strokeStyle = `rgba(242,161,35,${0.55 * (1 - pulse * 0.9)})`;
			ctx.lineWidth = 1.2;
			ctx.stroke();

			/* Core */
			ctx.beginPath();
			ctx.arc(sx, sy, size, 0, Math.PI * 2);
			ctx.fillStyle = AMBER;
			ctx.fill();

			/* Highlight */
			ctx.beginPath();
			ctx.arc(sx - size * 0.33, sy - size * 0.33, size * 0.32, 0, Math.PI * 2);
			ctx.fillStyle = "rgba(255,255,255,0.55)";
			ctx.fill();

			/* Label */
			ctx.font = `${m.hub ? 700 : 600} ${m.hub ? 11 : 9}px var(--font-poppins, system-ui, sans-serif)`;
			ctx.fillStyle = AMBER;
			ctx.fillText(m.label, sx + size + 5, sy + 4);
		});

		ctx.restore();
	}, []);

	/* Animation loop */
	useEffect(() => {
		const SPEED   = 6;
		const IDLE_MS = 1200;
		const { w, h } = dims;

		const loop = (now: number) => {
			const dt = Math.min(0.05, (now - lastRef.current) / 1000);
			lastRef.current = now;
			if (now - idleRef.current > IDLE_MS && !dragRef.current.on) {
				rotRef.current.lambda += SPEED * dt;
			}
			draw(w, h, now);
			rafRef.current = requestAnimationFrame(loop);
		};

		rafRef.current = requestAnimationFrame(now => {
			lastRef.current = now;
			t0Ref.current   = now;
			idleRef.current = 0;
			rafRef.current  = requestAnimationFrame(loop);
		});
		return () => cancelAnimationFrame(rafRef.current);
	}, [dims, draw]);

	const { w, h } = dims;
	const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

	return (
		<div
			ref={containerRef}
			className="w-full h-full select-none -mt-8"
			style={{ pointerEvents: "none" }}>
			<canvas
				ref={canvasRef}
				width={w * dpr}
				height={h * dpr}
				style={{ width: w, height: h, display: "block" }}
			/>
		</div>
	);
};

export default TacticalGlobe;
