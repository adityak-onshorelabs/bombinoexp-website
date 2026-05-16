import { ShoppingCart, Globe, FileCheck2, Warehouse, Package, Ship } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const services: { icon: LucideIcon; title: string; desc: string; href: string }[] = [
  {
    icon: ShoppingCart,
    title: "Ecommerce Courier",
    desc: "Need the best courier service for your e-commerce needs? We offer express delivery, last-mile delivery, and top international e-commerce delivery services. Trust us for seamless, global shipping with real-time tracking.",
    href: "/services/ecommerce",
  },
  {
    icon: Globe,
    title: "Cross Border",
    desc: "Specializing in global deliveries, we offer cost-effective international solutions. We handle everything from cherished items to large machinery, ensuring prompt, reliable delivery worldwide.",
    href: "/services/cross-border",
  },
  {
    icon: FileCheck2,
    title: "Customs Clearance",
    desc: "Facing challenges with customs clearance? We excel in handling all clearance procedures, from complex paperwork to tax obligations, ensuring prompt delivery for both local and international shipments.",
    href: "/services/customs",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    desc: "Top-notch warehousing and inventory management. Our services include temperature-sensitive care, optimized storage, real-time updates, and efficient barcoding systems to meticulously care for your goods.",
    href: "/services/warehousing",
  },
  {
    icon: Package,
    title: "Parcel Delivery",
    desc: "Offering both premium and affordable options, we ensure timely, secure deliveries. Our services include express, next-day delivery, and door-to-door international service for total peace of mind.",
    href: "/services/parcel",
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    desc: "Top-notch sea freight services blending affordability with efficiency. Our range includes container shipping, LCL (Less than Container Load), FCL (Full Container Load), and breakbulk for secure global shipping.",
    href: "/services/ocean-freight",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 space-y-12 md:space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Our Courier Services Include
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Precision logistics and diverse options, making us India&apos;s most trusted courier service.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map(({ icon: Icon, title, desc, href }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col">
              <div className="bg-[#1E567B]/10 p-3 rounded-xl w-fit">
                <Icon className="w-10 h-10 text-[#1E567B]" />
              </div>
              <h3 className="text-xl font-bold text-foreground mt-6 mb-3">{title}</h3>
              <p className="text-slate-600 leading-relaxed flex-1">{desc}</p>
              <a href={href} className="text-[#FBAD1F] font-semibold hover:underline mt-6 inline-block">
                Explore Service →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
