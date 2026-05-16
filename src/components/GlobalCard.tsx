interface GlobalCardProps {
  title: string;
  description: string;
  index?: number;
  image?: string;
}

export default function GlobalCard({ title, description, index, image }: GlobalCardProps) {
  return (
    <div className="group relative bg-white rounded-[2rem] p-2 overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200 transition-all duration-500 flex flex-col h-full cursor-pointer">

      {/* Top Media Area */}
      <div className="relative h-48 w-full bg-[#F8FAFC] rounded-[1.5rem] overflow-hidden mb-6 flex-shrink-0">
        {image ? (
          <>
            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-admiralty/0 group-hover:bg-admiralty/10 transition-colors duration-500" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#0F172A 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-slate-300 text-xs font-bold tracking-[0.2em] uppercase z-10">Media / Image</span>
            </div>
          </>
        )}
      </div>

      {/* Bottom Content Area */}
      <div className="px-6 pb-8 flex-1 flex flex-col">
        {index !== undefined && (
          <span className="text-[#FBAD1F] text-xs font-black tracking-widest mb-3 block">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        <h3 className="text-2xl font-extrabold text-foreground mb-3 leading-tight group-hover:text-[#FBAD1F] transition-colors duration-300">
          {title}
        </h3>

        <p className="text-slate-500 text-[1.05rem] leading-relaxed line-clamp-3">
          {description}
        </p>

      </div>

    </div>
  );
}
