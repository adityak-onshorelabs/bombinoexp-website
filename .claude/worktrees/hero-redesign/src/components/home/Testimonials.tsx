"use client";

import { motion } from "framer-motion";

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const testimonials = [
  {
    quote:
      "Bombino Express transformed our international shipping. Our customers in the USA receive their orders within days, and real-time tracking gives us complete peace of mind.",
    name: "Priya Sharma",
    company: "Kala Kraft Studio",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  },
  {
    quote:
      "We've been exporting to 30+ countries through Bombino for five years. Their customs clearance expertise has saved us countless headaches and costly delays at the border.",
    name: "Rajesh Mehta",
    company: "Mehta Export House",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&q=80",
  },
  {
    quote:
      "The warehousing team is exceptional. Inventory is always accurate, and their temperature-controlled storage keeps our organic products in perfect condition year-round.",
    name: "Anita Desai",
    company: "NatureBest Organics",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80",
  },
  {
    quote:
      "Fast, reliable, and genuinely professional. Bombino's ocean freight rates are competitive, and their team handles every detail from pickup to final delivery abroad.",
    name: "Vikram Nair",
    company: "IndiaTech Exports",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
  },
];

function QuoteMark() {
  return (
    <svg
      width="36"
      height="28"
      viewBox="0 0 36 28"
      fill="none"
      aria-hidden="true"
      className="mb-5 shrink-0"
    >
      <path
        d="M0 28V16.8C0 12.187 0.933 8.4 2.8 5.44C4.667 2.48 7.653 0.747 11.76 0.24L13.44 0V7.84L11.76 8.08C9.52 8.32 7.92 9.2 6.96 10.72C6 12.24 5.573 14.267 5.68 16.8H11.76V28H0ZM22.4 28V16.8C22.4 12.187 23.333 8.4 25.2 5.44C27.067 2.48 30.053 0.747 34.16 0.24L35.84 0V7.84L34.16 8.08C31.92 8.32 30.32 9.2 29.36 10.72C28.4 12.24 27.973 14.267 28.08 16.8H34.16V28H22.4Z"
        fill="oklch(73% 0.160 64)"
        fillOpacity="0.25"
      />
    </svg>
  );
}

function TestimonialCard({
  quote,
  name,
  company,
  avatar,
  delay = 0,
}: {
  quote: string;
  name: string;
  company: string;
  avatar: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-8 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: EXPO_OUT, delay }}
    >
      <QuoteMark />
      <p className="text-slate-600 leading-relaxed flex-1 text-[0.9375rem]">{quote}</p>
      <div className="flex items-center gap-3 mt-7 pt-6 border-t border-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt={name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover shrink-0"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="font-semibold text-[#112330] text-sm leading-snug">{name}</p>
          <p className="text-sm text-slate-500 leading-snug">{company}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="w-full py-24 bg-freight-paper">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full">

        {/* Header — sits completely outside and above the grid */}
        <div className="flex flex-col gap-6 mb-16 w-full" style={{ maxWidth: "48rem" }}>
          <h2
            id="testimonials-heading"
            className="text-5xl md:text-6xl tracking-tighter text-[#112330] font-semibold leading-tight"
          >
            What Our Clients Say
          </h2>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed w-full">
            From Indian exporters to global e-commerce sellers — thousands of businesses trust
            Bombino Express to move what matters most.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              quote={t.quote}
              name={t.name}
              company={t.company}
              avatar={t.avatar}
              delay={i * 0.08}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
