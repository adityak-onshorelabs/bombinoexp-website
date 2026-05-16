import downloadableData from "@/data/downloadable-documents.json";
import documentsData from "@/data/documents.json";

export default function DocumentsPage() {
  const { header } = documentsData;
  const { sectionTitle, sectionSubtitle, columnOne, columnTwo } = downloadableData;

  return (
    <main className="font-sans text-[#112330] bg-[#F8F9FA] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto py-12 px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#112330] tracking-tight leading-tight mb-2">
              {header.title}
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">{header.subtitle}</p>
          </div>

          <a
            href={header.pdfButton.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F2A123] text-[#112330] font-bold px-6 py-3 rounded-lg hover:bg-[#e0921b] transition-colors inline-flex items-center gap-2 shadow-sm shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            {header.pdfButton.text}
          </a>
        </div>
      </div>

      {/* Downloadable Documents Library */}
      <section className="bg-[#F8F9FA] py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#112330] mb-2">{sectionTitle}</h2>
          <p className="text-slate-500 text-base leading-relaxed">{sectionSubtitle}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-8">
            {/* Column One */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {columnOne.map((doc) => (
                <a
                  key={doc.name}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-white p-4 lg:p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#F2A123] transition-all duration-200"
                >
                  <div className="flex items-center gap-3 pr-4 overflow-hidden">
                    <svg className="w-6 h-6 text-[#F2A123] shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm lg:text-base font-semibold text-[#112330] group-hover:text-[#F2A123] transition-colors truncate">
                      {doc.name}
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-[#112330] group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Column Two */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {columnTwo.map((doc) => (
                <a
                  key={doc.name}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-white p-4 lg:p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#F2A123] transition-all duration-200"
                >
                  <div className="flex items-center gap-3 pr-4 overflow-hidden">
                    <svg className="w-6 h-6 text-[#F2A123] shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm lg:text-base font-semibold text-[#112330] group-hover:text-[#F2A123] transition-colors truncate">
                      {doc.name}
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-[#112330] group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
