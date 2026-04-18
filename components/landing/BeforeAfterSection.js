import Footer from "../Footer";

export default function BeforeAfterSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-teal-100 via-cyan-50 to-teal-100 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
            Before & After ClinX
          </h2>
        </div>
        <div className="space-y-6">
          
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="bg-red-50 rounded-2xl p-5 border-2 border-red-200 shadow-sm relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-red-600 font-semibold text-sm mb-1">Challenge:</p>
                  <p className="text-neutral-800 font-medium">Relying on aggregators to acquire patients?</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-12 h-12 text-teal-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
            <div className="bg-green-50 rounded-2xl p-5 border-2 border-green-200 shadow-sm relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-green-600">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-sm mb-1">Solution:</p>
                  <p className="text-neutral-800 font-medium">Direct patient acquisition</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="bg-red-50 rounded-2xl p-5 border-2 border-red-200 shadow-sm relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                   <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-red-600 font-semibold text-sm mb-1">Challenge:</p>
                  <p className="text-neutral-800 font-medium">Confused about EMR complexity?</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-12 h-12 text-teal-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
            <div className="bg-green-50 rounded-2xl p-5 border-2 border-green-200 shadow-sm relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-green-600">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-sm mb-1">Solution:</p>
                  <p className="text-neutral-800 font-medium">Simple, intuitive EMR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
