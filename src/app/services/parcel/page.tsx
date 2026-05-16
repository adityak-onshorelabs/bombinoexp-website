"use client";

import parcelData from "@/data/parcel.json";

export default function ParcelServicesPage() {
  const { hero, coreServices, shippingTimelines, contactInfo } = parcelData;

  return (
    <main className="font-sans text-foreground">
      {/* ══ HERO SECTION ════════════════════════════════════════════ */}
      <div className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={hero.heroImage}
            alt={hero.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6 mt-16">
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
            {hero.title}
          </h1>
        </div>
      </div>

      {/* ══ GLOBAL DESCRIPTION ══════════════════════════════════════ */}
      <div className="bg-white py-10 lg:py-12 px-6 lg:px-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-justify space-y-4 text-base lg:text-lg text-slate-600 leading-relaxed">
          {hero.description.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* ══ CORE SERVICES (Grid Layout) ═════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-3">Our Offerings</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-[-0.03em] mb-4">
              {coreServices.title}
            </h2>
            <p className="text-slate-500 text-lg">
              {coreServices.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreServices.items.map((item, i) => (
              <div 
                key={i} 
                className="group relative bg-white rounded-[2rem] p-10 lg:p-12 overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#FBAD1F]/30 transition-all duration-500 flex flex-col h-full cursor-pointer"
              >
                {/* Number watermark */}
                <div className="absolute -bottom-6 -right-6 text-[8rem] font-black text-[#FBAD1F]/15 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-[#FBAD1F]/10 flex items-center justify-center mb-8 shrink-0">
                     <svg className="w-6 h-6 text-[#FBAD1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                     </svg>
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground mb-4 leading-tight group-hover:text-[#FBAD1F] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SPEED & RELIABILITY (List/Feature Layout) ═══════════════ */}
      <section className="bg-white py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-14 text-center">
            <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-3">Performance</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-[-0.03em]">
              {shippingTimelines.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingTimelines.features.map((feature, i) => (
              <div 
                key={i}
                className="flex flex-col gap-5 p-8 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:border-[#FBAD1F]/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                    <svg className="w-5 h-5 text-[#FBAD1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#FBAD1F] leading-tight">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-slate-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT CTA BANNER ══════════════════════════════════════ */}
      <section className="bg-admiralty py-20 lg:py-28 relative overflow-hidden">
        {/* Abstract background overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
             <circle cx="80" cy="20" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
             <circle cx="80" cy="20" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
             <circle cx="80" cy="20" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#FBAD1F] mb-4">
            Connect With Us
          </p>
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-[-0.03em] mb-6">
            {contactInfo.title}
          </h2>
          <p className="text-white/70 text-lg lg:text-xl leading-relaxed mb-12">
            {contactInfo.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 w-full justify-center">
            <a 
              href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`} 
              className="group flex flex-col items-center gap-2"
            >
              <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-slate-400 group-hover:text-white transition-colors duration-300">Call Us</span>
              <span className="text-2xl lg:text-3xl font-bold text-[#FBAD1F] group-hover:scale-105 transition-transform duration-300">
                {contactInfo.phone}
              </span>
            </a>
            
            <div className="w-px h-12 bg-white/20 hidden sm:block" />
            
            <a 
              href={`mailto:${contactInfo.email}`} 
              className="group flex flex-col items-center gap-2"
            >
              <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-slate-400 group-hover:text-white transition-colors duration-300">Email Us</span>
              <span className="text-2xl lg:text-3xl font-bold text-[#FBAD1F] group-hover:scale-105 transition-transform duration-300">
                {contactInfo.email}
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
