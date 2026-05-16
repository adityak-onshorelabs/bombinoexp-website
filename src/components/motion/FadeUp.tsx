"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

const MOBILE_STATIC = "max-md:!opacity-100 max-md:![transform:none] max-md:!transition-none";

interface FadeUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  children: React.ReactNode;
}

export function FadeUp({ children, delay = 0, className, ...rest }: FadeUpProps) {
  const mobile = useMobile();
  return (
    <motion.div
      initial={mobile ? false : { opacity: 0, y: 22 }}
      whileInView={mobile ? undefined : { opacity: 1, y: 0 }}
      animate={mobile ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "0px 0px -70px 0px" }}
      transition={{ duration: 0.65, ease: EXPO_OUT, delay }}
      className={cn(MOBILE_STATIC, className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0, className, ...rest }: FadeUpProps) {
  const mobile = useMobile();
  return (
    <motion.div
      initial={mobile ? false : { opacity: 0 }}
      whileInView={mobile ? undefined : { opacity: 1 }}
      animate={mobile ? { opacity: 1 } : undefined}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.55, ease: EXPO_OUT, delay }}
      className={cn(MOBILE_STATIC, className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerChildren({ children, className, staggerDelay = 0.1 }: StaggerProps) {
  const mobile = useMobile();
  return (
    <motion.div
      className={cn(MOBILE_STATIC, className)}
      initial={mobile ? false : "hidden"}
      whileInView={mobile ? undefined : "visible"}
      animate={mobile ? "visible" : undefined}
      viewport={{ once: true, margin: "0px 0px -70px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn(MOBILE_STATIC, className)}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO_OUT } },
      }}
    >
      {children}
    </motion.div>
  );
}
