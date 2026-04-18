export default function PromiseSection() {
  return (
    <section className="py-12 bg-white border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-8">
          The Promise
        </h3>
        <div className="relative">
          <div
            className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 hidden md:block"
            style={{ width: "calc(100% - 80px)", left: "40px" }}
          ></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            <div className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                </svg>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-1">
                Not an Aggregator
              </h4>
              <p className="text-sm text-neutral-600">
                We don't sell your patients. Your patients stay yours.
              </p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-1">
                100% Data Ownership
              </h4>
              <p className="text-sm text-neutral-600">
                Your data belongs to you. Export anytime, no questions.
              </p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-1">
                No Lock-in
              </h4>
              <p className="text-sm text-neutral-600">
                Leave whenever you want. No contracts, no traps.
              </p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-1">
                Modular Pricing
              </h4>
              <p className="text-sm text-neutral-600">
                Start with free OPD, EMR. Scale up as you grow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
