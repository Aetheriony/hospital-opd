import React from 'react';

export default function ModulesSection() {
  const modules = [
    { title: 'OPD', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>, active: true },
    { title: 'EMR', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> },
    { title: 'Pharmacy', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path> },
    { title: 'Labs', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path> },
    { title: 'IPD', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path> },
    { title: 'Website', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"></path> },
    { title: '360 Analytics', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path> },
    { title: 'Hiring', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745V20a2 2 0 002 2h14a2 2 0 002-2v-6.745zM16 8V5a2 2 0 00-2-2H10a2 2 0 00-2 2v3H4a2 2 0 00-2 2v3a2 2 0 002 2h16a2 2 0 002-2v-3a2 2 0 00-2-2h-4zM10 8V5h4v3h-4z"></path> }
  ];

  return (
    <section id="modules" className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Connected by Design.
          </h2>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto">
            OPD, Pharmacy, Labs, IPD, Website — all in sync. No copy-pasting.
          </p>
        </div>

        <div className="hidden lg:flex gap-8 items-start">
          <div className="w-[30%] flex flex-col gap-3">
            {modules.map((m, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300 border ${
                  m.active
                    ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg border-transparent transform scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-200 hover:bg-teal-50'
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        m.active
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-400 group-hover:bg-teal-100 group-hover:text-teal-600'
                      }`}
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        {m.icon}
                      </svg>
                    </div>
                    <span className="font-bold text-lg">{m.title}</span>
                  </div>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-5 h-5 transition-transform duration-300 ${
                      m.active ? 'text-white rotate-0' : 'text-slate-300 -rotate-90 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="w-[70%]">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative min-h-[500px] transition-all duration-500">
              <div className="bg-gradient-to-r from-teal-500 to-teal-400 px-8 py-5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-wide">OPD</h3>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-3/5 relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500"></div>
                    <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/10] flex justify-center items-center">
                      <span className="text-gray-400">UI Mockup Interface</span>
                    </div>
                  </div>
                  <div className="w-full md:w-2/5 space-y-8">
                    <ul className="space-y-3">
                      {['E-Prescriptions in under 60 seconds', 'Appointment scheduling with reminders', 'Billing & comprehensive day reports'].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-teal-100 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                          </div>
                          <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-gradient-to-br from-[#128C7E] to-[#075E54] rounded-xl p-5 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                          <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118 .571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                          </svg>
                        </div>
                        <div>
                          <h5 className="text-white font-bold text-sm mb-1">WhatsApp Integration</h5>
                          <p className="text-green-50 text-xs leading-relaxed opacity-90">
                            Send appointment reminders &amp; Rx instantly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View mapping roughly matches functionality */}
        <div className="lg:hidden flex flex-col gap-6">
           <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden text-center p-8">
               <span className="text-gray-500 font-semibold">Multiple tailored modules inside (OPD, EMR, Labs...)</span>
           </div>
        </div>
      </div>
    </section>
  );
}
