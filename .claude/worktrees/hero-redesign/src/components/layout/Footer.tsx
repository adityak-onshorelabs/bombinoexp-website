import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const serviceLinks = [
  { label: "Ecommerce Courier", href: "/services/ecommerce" },
  { label: "Cross Border", href: "/services/cross-border" },
  { label: "Customs Clearance", href: "/services/customs" },
  { label: "Warehousing", href: "/services/warehousing" },
  { label: "Parcel Delivery", href: "/services/parcel" },
  { label: "Ocean Freight", href: "/services/ocean-freight" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Track Shipment", href: "/tracking" },
  { label: "Get a Rate", href: "/quick-rates" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer
      className="bg-admiralty text-freight-paper"
      aria-label="Site footer"
    >
      {/* Main grid */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dispatch-amber/50 rounded"
            >
              <Image
                src="/bombino-logo-01.png"
                alt="Bombino Express Logo"
                width={200}
                height={60}
                className="w-auto h-10 object-contain"
              />
            </Link>
            <p className="text-freight-paper/50 text-sm leading-relaxed max-w-[200px]">
              India's trusted international courier since 1995.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-freight-paper/50">
                <Mail className="w-4 h-4 shrink-0 text-dispatch-amber/60" />
                <a
                  href="mailto:bombino@bombinoexp.com"
                  className="hover:text-freight-paper transition-colors truncate"
                >
                  bombino@bombinoexp.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-freight-paper/50">
                <Phone className="w-4 h-4 shrink-0 text-dispatch-amber/60" />
                <a
                  href="tel:+912266400000"
                  className="hover:text-freight-paper transition-colors"
                >
                  +91 22 66400000
                </a>
              </div>
            </div>
          </div>

          {/* Services column */}
          <div>
            <p className="text-eyebrow text-freight-paper/30 mb-5">Services</p>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-freight-paper/55 hover:text-freight-paper transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p className="text-eyebrow text-freight-paper/30 mb-5">Company</p>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-freight-paper/55 hover:text-freight-paper transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices column */}
          <div>
            <p className="text-eyebrow text-freight-paper/30 mb-5">Offices</p>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-freight-paper mb-1.5">Mumbai, India</p>
                <p className="text-freight-paper/45 text-xs leading-relaxed">
                  Corporate Centre B, Marol Pipe Line,<br />
                  Andheri Kurla Road, Mumbai 400 059
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-freight-paper mb-1.5">New Jersey, USA</p>
                <p className="text-freight-paper/45 text-xs leading-relaxed">
                  29 Wysocki Place,<br />
                  Hackensack, NJ 07601
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-freight-paper/8 mt-14 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-freight-paper/30 text-xs">
            © {new Date().getFullYear()} Bombino Express Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-freight-paper/25 text-xs">
            Est. 1995 · Mumbai, India
          </p>
        </div>
      </div>
    </footer>
  );
}
