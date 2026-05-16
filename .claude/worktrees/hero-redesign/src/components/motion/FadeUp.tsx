"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface FadeUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  children: React.ReactNode;
}

export function FadeUp({ children, delay = 0, className, ...rest }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -70px 0px" }}
      transition={{ duration: 0.65, ease: EXPO_OUT, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0, className, ...rest }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.55, ease: EXPO_OUT, delay }}
      className={className}
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
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
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
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO_OUT } },
      }}
    >
      {children}
    </motion.div>
  );
}
