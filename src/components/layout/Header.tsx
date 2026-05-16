"use client";

import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, ChevronDown, User, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; disabled?: boolean };

const navLinks: NavItem[] = [
  { href: "/",        label: "Home" },
  { href: "/about",   label: "About" },
  { href: "/contact", label: "Contact" },
];

const MEGA_SERVICES: { label: string; items: NavItem[] }[] = [
  {
    label: "Freight & Transit",
    items: [
      { label: "Air Freight",   href: "/services/air-freight" },
      { label: "Ocean Freight", href: "/services/ocean-freight" },
      { label: "Parcel",        href: "/services/parcel" },
      { label: "Door to Door",  href: "/services/door-to-door" },
    ],
  },
  {
    label: "Specialized Logistics",
    items: [
      { label: "E-commerce",       href: "/services/ecommerce" },
      { label: "Warehousing",      href: "/services/warehousing" },
      { label: "Cross Border",     href: "/services/cross-border" },
      { label: "Custom Clearance", href: "/services/custom-clearance" },
    ],
  },
];

const MEGA_UTILITIES: NavItem[] = [
  { label: "Documents", href: "/utilities/documents" },
  { label: "Prohibited Items", href: "/utilities/prohibited-items" },
];

const MEGA_BOOKING = [
  {
    label: "Get Quote",
    href: "/booking/get-quote",
    description: "Calculate estimated rates and shipping times.",
    icon: (
      <svg className="w-4 h-4 text-[#FBAD1F] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10H9m3-5h3m-9 5h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    label: "Track Shipment",
    href: "/track",
    description: "Get real-time status updates on your shipment.",
    icon: (
      <svg className="w-4 h-4 text-[#FBAD1F] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
];

export function Header() {
  const pathname = usePathname();

  const isLightPage  = pathname === "/" || ["/booking", "/rates", "/utilities"]
    .some(p => pathname.startsWith(p));
  const isImageHero  = ["/services", "/contact"]
    .some(p => pathname.startsWith(p));

  const textActive   = isLightPage ? "text-[lab(7.78673_1.82346_-15.0537)]"                              : "text-white";
  const textMuted    = isLightPage ? "text-slate-600 hover:text-[#FBAD1F]"         : "text-white/75 hover:text-white";
  const logoFill     = isLightPage ? "bg-admiralty"                                : "bg-dispatch-amber";
  const hamburgerCls = isLightPage ? "text-[lab(7.78673_1.82346_-15.0537)] hover:bg-black/5"             : "text-white hover:bg-white/10";
  const headerBg     = isImageHero    ? "bg-black/15 backdrop-blur-sm"
                     : isLightPage    ? "bg-white/90 backdrop-blur-sm border-b border-slate-100"
                     : "bg-transparent";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen,   setMegaOpen]   = useState(false);
  const [utilitiesOpen, setUtilitiesOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const utilitiesCloseTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const bookingCloseTimer = useRef<ReturnType<typeof setTimeout>>(undefined);


  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const openMega  = () => {
    clearTimeout(closeTimer.current);
    setUtilitiesOpen(false);
    setBookingOpen(false);
    setMegaOpen(true);
  };
  const delayClose = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 120); };
  const openUtilities = () => {
    clearTimeout(utilitiesCloseTimer.current);
    setMegaOpen(false);
    setBookingOpen(false);
    setUtilitiesOpen(true);
  };
  const delayUtilitiesClose = () => {
    utilitiesCloseTimer.current = setTimeout(() => setUtilitiesOpen(false), 120);
  };
  const openBooking = () => {
    clearTimeout(bookingCloseTimer.current);
    setMegaOpen(false);
    setUtilitiesOpen(false);
    setBookingOpen(true);
  };
  const delayBookingClose = () => {
    bookingCloseTimer.current = setTimeout(() => setBookingOpen(false), 120);
  };

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-admiralty focus:text-[#F8FAFC] focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold focus:text-sm focus:outline-none"
      >
        Skip to main content
      </a>

      {/* ── Header ────────────────────────────────────────────── */}
      <header
        role="banner"
        className={cn("absolute top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 md:px-12 py-4 border-none transition-colors duration-300", headerBg)}
      >

        {/* ── LEFT: Logo ──────────────────────────────────────── */}
        <Link
          href="/"
          aria-label="Bombino Express — Home"
          className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAD1F]/50 rounded"
        >
          <div
            className={`w-[200px] h-[48px] md:w-[240px] md:h-[58px] transition-colors duration-200 ${logoFill}`}
            style={{
              maskImage: "url('/bombino-logo-01.png')",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "left center",
              WebkitMaskImage: "url('/bombino-logo-01.png')",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
            }}
            role="img"
            aria-label="Bombino Express Logo"
          />
        </Link>

        {/* ── CENTER: Nav links (desktop) ───────────────────── */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8"
        >
          {navLinks.map(({ href, label, disabled }) => {
            const active = href === "/" ? pathname === href : pathname.startsWith(href);
            if (disabled) {
              return (
                <span
                  key={href}
                  className={cn("relative text-sm font-semibold opacity-30 cursor-not-allowed select-none", textActive)}
                >
                  {label}
                </span>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm font-semibold transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAD1F]/40 rounded",
                  active
                    ? cn("after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-px after:bg-[#FBAD1F] after:rounded-full", textActive)
                    : textMuted
                )}
              >
                {label}
              </Link>
            );
          })}

          {/* Services mega trigger */}
          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={delayClose}
          >
            <button
              aria-haspopup="true"
              aria-expanded={megaOpen}
              className={cn(
                "flex items-center gap-1 text-sm font-semibold transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAD1F]/40 rounded",
                megaOpen || pathname.startsWith("/services")
                  ? textActive
                  : textMuted
              )}
            >
              Services
              <motion.span
                animate={{ rotate: megaOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
              </motion.span>
            </button>

            {/* ── Mega Menu Panel ──────────────────────────── */}
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  onMouseEnter={openMega}
                  onMouseLeave={delayClose}
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  className={cn(
                    "absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2",
                    "w-[580px] rounded-2xl overflow-hidden",
                    "bg-white/95 backdrop-blur-xl",
                    "border border-slate-100",
                    "shadow-[0_8px_40px_rgba(17,35,48,0.10),0_1px_3px_rgba(17,35,48,0.05)]"
                  )}
                  role="menu"
                  aria-label="Services menu"
                >
                  {/* Top amber accent line */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#FBAD1F]/40 to-transparent" />

                  <div className="grid grid-cols-2 gap-0 p-6">
                    {MEGA_SERVICES.map((col) => (
                      <div key={col.label} className="flex flex-col gap-1">
                        {/* Column header */}
                        <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-slate-400 mb-3 px-3">
                          {col.label}
                        </p>
                        {col.items.map((item) => (
                          item.disabled ? (
                            <span
                              key={item.href}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-foreground/30 opacity-40 cursor-not-allowed select-none"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-200 shrink-0" />
                              {item.label}
                            </span>
                          ) : (
                            <Link
                              key={item.href}
                              href={item.href}
                              role="menuitem"
                              onClick={() => setMegaOpen(false)}
                              className={cn(
                                "group flex items-center gap-2.5 px-3 py-2.5 rounded-xl",
                                "text-sm font-semibold text-foreground/75",
                                "hover:text-[#FBAD1F] hover:bg-[#FBAD1F]/6",
                                "transition-colors duration-150"
                              )}
                            >
                              {/* Amber dot */}
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-[#FBAD1F] transition-colors duration-150 shrink-0" />
                              <motion.span
                                className="inline-block"
                                initial={false}
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                              >
                                {item.label}
                              </motion.span>
                            </Link>
                          )
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Footer CTA strip */}
                  <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/60">
                    <p className="text-xs text-slate-400 font-medium">
                      Swift · Safe · Secure — Est. 1995
                    </p>
                    <Link
                      href="/services"
                      onClick={() => setMegaOpen(false)}
                      className="text-xs font-bold text-[#FBAD1F] hover:underline underline-offset-2 transition-all"
                    >
                      View all services →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Utilities mega trigger */}
          <div
            className="relative"
            onMouseEnter={openUtilities}
            onMouseLeave={delayUtilitiesClose}
          >
            <button
              aria-haspopup="true"
              aria-expanded={utilitiesOpen}
              className={cn(
                "flex items-center gap-1 text-sm font-semibold transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAD1F]/40 rounded",
                utilitiesOpen || pathname.startsWith("/utilities")
                  ? textActive
                  : textMuted
              )}
            >
              Utilities
              <motion.span
                animate={{ rotate: utilitiesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
              </motion.span>
            </button>

            <AnimatePresence>
              {utilitiesOpen && (
                <motion.div
                  onMouseEnter={openUtilities}
                  onMouseLeave={delayUtilitiesClose}
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  className={cn(
                    "absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2",
                    "w-[320px] rounded-2xl overflow-hidden",
                    "bg-white/95 backdrop-blur-xl",
                    "border border-slate-100",
                    "shadow-[0_8px_40px_rgba(17,35,48,0.10),0_1px_3px_rgba(17,35,48,0.05)]"
                  )}
                  role="menu"
                  aria-label="Utilities menu"
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-[#FBAD1F]/40 to-transparent" />

                  <div className="p-6 flex flex-col gap-1">
                    {MEGA_UTILITIES.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setUtilitiesOpen(false)}
                        className={cn(
                          "group flex items-center gap-2.5 px-3 py-2.5 rounded-xl",
                          "text-sm font-semibold text-foreground/75",
                          "hover:text-[#FBAD1F] hover:bg-[#FBAD1F]/6",
                          "transition-colors duration-150"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-[#FBAD1F] transition-colors duration-150 shrink-0" />
                        <motion.span
                          className="inline-block"
                          initial={false}
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 500, damping: 28 }}
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking dropdown trigger */}
          <div
            className="relative"
            onMouseEnter={openBooking}
            onMouseLeave={delayBookingClose}
          >
            <button
              aria-haspopup="true"
              aria-expanded={bookingOpen}
              className={cn(
                "flex items-center gap-1 text-sm font-semibold transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAD1F]/40 rounded",
                bookingOpen || pathname.startsWith("/booking")
                  ? textActive
                  : textMuted
              )}
            >
              Booking
              <motion.span
                animate={{ rotate: bookingOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
              </motion.span>
            </button>

            <AnimatePresence>
              {bookingOpen && (
                <motion.div
                  onMouseEnter={openBooking}
                  onMouseLeave={delayBookingClose}
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  className={cn(
                    "absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2",
                    "w-[320px] rounded-2xl overflow-hidden",
                    "bg-white/95 backdrop-blur-xl",
                    "border border-slate-100",
                    "shadow-[0_8px_40px_rgba(17,35,48,0.10),0_1px_3px_rgba(17,35,48,0.05)]"
                  )}
                  role="menu"
                  aria-label="Booking menu"
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-[#FBAD1F]/40 to-transparent" />

                  <div className="p-4 flex flex-col gap-1">
                    {MEGA_BOOKING.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setBookingOpen(false)}
                        className={cn(
                          "group flex items-start gap-3 px-3 py-3 rounded-xl",
                          "hover:bg-[#FBAD1F]/6 transition-colors duration-150"
                        )}
                      >
                        <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#FBAD1F]/10 flex items-center justify-center shrink-0 group-hover:bg-[#FBAD1F]/20 transition-colors duration-150">
                          {item.icon}
                        </span>
                        <span className="flex flex-col">
                          <motion.span
                            className="text-sm font-semibold text-foreground/80 group-hover:text-[#FBAD1F] transition-colors duration-150 inline-block"
                            initial={false}
                            whileHover={{ x: 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 28 }}
                          >
                            {item.label}
                          </motion.span>
                          <span className="text-xs text-slate-400 leading-snug mt-0.5">{item.description}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* ── RIGHT: Actions (desktop) ─────────────────────────── */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="https://bombino.onshorelabs.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FBAD1F] text-foreground rounded-full px-6 py-2.5 text-sm font-bold tracking-wide hover:bg-[#E59C17] hover:-translate-y-px hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAD1F]/50"
          >
            <User className="w-3.5 h-3.5" />
            <span>Client Login</span>
          </a>
        </div>

        {/* ── Mobile hamburger ─────────────────────────────────── */}
        <button
          className={cn("lg:hidden p-2 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAD1F]/40", hamburgerCls)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </header>

      {/* ── Mobile full-screen overlay ────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-40 h-[100dvh] bg-admiralty flex flex-col pt-20 px-6 pb-24 overflow-y-auto overscroll-contain"
          >
            <button
              className="absolute top-4 right-6 p-2 text-white/60 hover:text-white transition-colors"
              onClick={closeMobile}
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.3 }}
              className="mb-6 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between mt-2"
            >
              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 rounded-xl bg-[#FBAD1F]/10 flex items-center justify-center text-[#FBAD1F]">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/50 uppercase tracking-widest font-bold">Corporate Accounts</span>
                  <span className="text-sm font-bold text-white">Client Dashboard</span>
                </div>
              </div>
              <a
                href="https://bombino.onshorelabs.co.in"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="text-xs font-bold bg-[#FBAD1F] text-foreground px-3.5 py-2 rounded-xl hover:bg-[#E59C17] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Portal</span>
                <ExternalLink className="w-2.5 h-2.5 text-foreground/70" />
              </a>
            </motion.div>

            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map(({ href, label, disabled }, i) => {
                const active = href === "/" ? pathname === href : pathname.startsWith(href);
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {disabled ? (
                      <span
                        className="block text-2xl font-bold py-4 border-b border-white/8 text-white/20 opacity-40 cursor-not-allowed select-none"
                      >
                        {label}
                      </span>
                    ) : (
                      <Link
                        href={href}
                        onClick={closeMobile}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block text-2xl font-bold py-4 border-b border-white/8 transition-colors duration-150",
                          active ? "text-white" : "text-white/50 hover:text-white"
                        )}
                      >
                        {label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              {/* Mobile Services section */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-2xl font-bold py-4 border-b border-white/8 text-white/50">
                  Services
                </p>
                <div className="grid grid-cols-2 gap-x-4 pt-4 pb-2">
                  {MEGA_SERVICES.map((col) => (
                    <div key={col.label}>
                      <p className="text-[0.6rem] font-bold tracking-[0.16em] uppercase text-[#FBAD1F]/50 mb-2">
                        {col.label}
                      </p>
                      {col.items.map((item) => (
                        item.disabled ? (
                          <span
                            key={item.href}
                            className="block text-sm font-semibold text-white/20 opacity-40 py-2 cursor-not-allowed select-none"
                          >
                            {item.label}
                          </span>
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMobile}
                            className="block text-sm font-semibold text-white/60 hover:text-white py-2 transition-colors duration-150"
                          >
                            {item.label}
                          </Link>
                        )
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mobile Utilities section */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-2xl font-bold py-4 border-b border-white/8 text-white/50">
                  Utilities
                </p>
                <div className="pt-4 pb-2">
                  {MEGA_UTILITIES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="block text-sm font-semibold text-white/60 hover:text-white py-2 transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Mobile Booking section */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.19, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-2xl font-bold py-4 border-b border-white/8 text-white/50">
                  Booking
                </p>
                <div className="pt-4 pb-2">
                  {MEGA_BOOKING.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="block text-sm font-semibold text-white/60 hover:text-white py-2 transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
