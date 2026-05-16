"use client";

import { useEffect, useState } from "react";
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

function useIsMobile() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

export function SmoothScrolling({ children }: SmoothScrollingProps) {
  const mobile = useIsMobile();

  // Skip Lenis entirely on mobile — use native scroll
  if (mobile) {
    return <>{children}</>;
  }

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
