"use client";

import doorToDoorData from "@/data/door-to-door.json";

const featureIcons = [
  <svg key="box" className="w-6 h-6 text-[#F2A123]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>,
  <svg key="truck" className="w-6 h-6 text-[#F2A123]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17h6m-6 0a2 2 0 11-4 0m4 0a2 2 0 104 0m0 0a2 2 0 104 0m-4 0h2m-2 0V9m0 0h4l2 3v5m-6-8H7a2 2 0 00-2 2v6h2" />
  </svg>,
  <svg key="shield" className="w-6 h-6 text-[#F2A123]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
  </svg>,
  <svg key="check" className="w-6 h-6 text-[#F2A123]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

export default function DoorToDoorPage() {
  const { hero, features } = doorToDoorData;

  return (
    <main className="font-sans text-[#112330]">
      <div className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={hero.heroImage} alt={hero.title} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6 mt-16">
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl">{hero.title}</h1>
        </div>
      </div>

      <div className="bg-white py-10 lg:py-12 px-6 lg:px-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-left space-y-4 text-base lg:text-lg text-slate-600 leading-relaxed">
          {hero.description.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      <section className="bg-[#F8F9FA] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#F2A123] mb-3">Our Advantage</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#112330] leading-tight tracking-[-0.03em]">{features.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.items.map((item, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-[2rem] p-10 lg:p-12 overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#F2A123]/30 transition-all duration-500 flex flex-col h-full"
              >
                <div className="absolute -bottom-6 -right-6 text-[8rem] font-black text-slate-50 leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-[#F2A123]/10 flex items-center justify-center mb-8 shrink-0">
                    {featureIcons[i % featureIcons.length]}
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#112330] mb-4 leading-tight group-hover:text-[#F2A123] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
