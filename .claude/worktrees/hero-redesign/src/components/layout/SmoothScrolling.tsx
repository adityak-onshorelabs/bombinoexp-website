"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollingProps {
  children: React.ReactNode;
}

function LenisGSAPSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    return () => { lenis.off("scroll", ScrollTrigger.update); };
  }, [lenis]);

  return null;
}

export function SmoothScrolling({ children }: SmoothScrollingProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      }}
    >
      <LenisGSAPSync />
      {children}
    </ReactLenis>
  );
}
