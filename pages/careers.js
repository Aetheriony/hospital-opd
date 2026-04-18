import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import axios from 'axios';
import { 
  Users, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  X, 
  CheckCircle,
  BriefcaseBusiness,
  Building2,
  GraduationCap
} from 'lucide-react';

const CareersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyingJob, setApplyingJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', experience: '', resumeUrl: '' });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/hiring/jobs');
        setJobs(res.data);
        setFilteredJobs(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let result = jobs;
    if (selectedDept !== 'All') {
      result = result.filter(j => j.department === selectedDept);
    }
    if (searchQuery) {
      result = result.filter(j => 
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredJobs(result);
  }, [searchQuery, selectedDept, jobs]);

  const departments = ['All', ...new Set(jobs.map(j => j.department))];

  const handleApply = (job) => {
    setApplyingJob(job);
    setShowApplyModal(true);
    setSubmitStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: 'loading', message: 'Submitting application...' });
    
    try {
      await axios.post('/api/hiring/apply', {
        jobId: applyingJob._id,
        ...formData
      });
      setSubmitStatus({ type: 'success', message: 'Application submitted successfully! Our team will review it and get back to you.' });
      setFormData({ name: '', email: '', phone: '', experience: '', resumeUrl: '' });
      setTimeout(() => {
        setShowApplyModal(false);
        setApplyingJob(null);
      }, 3000);
    } catch (err) {
      setSubmitStatus({ type: 'error', message: err.response?.data?.error || 'Failed to submit application. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>ClinX Careers | Join the Healthcare Revolution</title>
        <meta name="description" content="Explore career opportunities at ClinX. Help us transform hospital management infrastructure with modern technology." />
      </Head>

      <Navbar />

      <main className="bg-gradient-to-br from-blue-50 via-white to-teal-50">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex items-center pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-[120px] -z-10 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center px-5 py-2 rounded-full bg-teal-100 text-[#00C9A7] text-xs font-black uppercase tracking-widest mb-8 shadow-sm">
                JOIN THE REVOLUTION
              </span>
              <h1 className="text-5xl md:text-[84px] font-black mb-8 tracking-tighter leading-[0.95] text-slate-900">
                Shape the Future of <br/>
                <span className="gradient-text">Digital Healthcare.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                We're building the infrastructure that empowers doctors and heals healthcare systems. Are you in?
              </p>
              
              {/* Search Bar */}
              <div className="max-w-3xl mx-auto bg-white p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search roles (e.g. Developer, Doctor)..." 
                    className="w-full bg-slate-50 pl-14 pr-6 py-5 rounded-xl outline-none text-slate-900 placeholder:text-slate-400 font-bold text-lg focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-xl shadow-lg hover:shadow-teal-200 transform hover:scale-[1.02] active:scale-[0.98] transition-all text-lg">
                  {filteredJobs.length} OPEN ROLES
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Explore</span>
            <div className="w-1 h-12 bg-gradient-to-b from-[#00C9A7] to-transparent rounded-full"></div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="sticky top-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-slate-100 py-6 transition-all shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center overflow-x-auto gap-4 no-scrollbar">
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-8 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap border-2 
                    ${selectedDept === dept 
                      ? "bg-slate-900 border-slate-900 text-white shadow-xl scale-105" 
                      : "bg-white text-slate-500 border-slate-50 hover:border-teal-400 hover:text-teal-600 shadow-sm"}`}
                >
                  {dept.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Jobs List */}
        <section id="open-positions" className="py-32">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="max-w-4xl mx-auto space-y-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-white/50 rounded-[2.5rem] animate-pulse border border-slate-100"></div>
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-100 max-w-4xl mx-auto">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
                  <BriefcaseBusiness className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-slate-900">No matching clusters found</h3>
                <p className="text-slate-500 mt-3 text-lg font-medium">Try broadening your search or department filters.</p>
                <button 
                  onClick={() => {setSelectedDept('All'); setSearchQuery('');}}
                  className="mt-10 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-teal-600 transition-all"
                >
                  Reset Clusters
                </button>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto space-y-12">
                {filteredJobs.map((job) => (
                  <div 
                    key={job._id} 
                    className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-teal-200 transition-all duration-700 hover-lift group"
                  >
                    <div className="p-10 md:p-14 flex flex-col lg:flex-row gap-12 lg:items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                           <span className="px-4 py-1.5 bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-[0.1em] rounded-lg">
                             {job.department}
                           </span>
                           <span className="px-4 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-[0.1em] rounded-lg">
                             {job.type}
                           </span>
                        </div>
                        
                        <h3 className="text-4xl font-black text-slate-900 mb-6 group-hover:text-primary transition-colors tracking-tight leading-none">
                          {job.title}
                        </h3>

                        <p className="text-slate-500 text-xl leading-relaxed mb-10 font-medium max-w-2xl">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-x-10 gap-y-4">
                          {job.requirements && job.requirements.slice(0, 3).map(req => (
                            <div key={req} className="flex items-center text-sm text-slate-400 font-black uppercase tracking-tighter">
                              <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                              {req}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:w-80 space-y-6">
                        <div className="bg-slate-50/50 rounded-3xl p-8 border border-white">
                          <div className="flex items-center justify-between mb-2">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Facility Location</span>
                             <MapPin className="w-4 h-4 text-teal-500" />
                          </div>
                          <p className="text-xl font-black text-slate-900">{job.location}</p>
                        </div>

                        <button 
                          onClick={() => handleApply(job)}
                          className="w-full py-6 bg-slate-900 text-white font-black rounded-[1.5rem] hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition-all transform hover:scale-[1.02] shadow-2xl flex items-center justify-center text-xl tracking-wide group/btn"
                        >
                          APPLY FOR ROLE
                          <Send className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#002D27]/90 backdrop-blur-md" onClick={() => setShowApplyModal(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="px-10 pt-10 pb-6 flex items-start justify-between">
              <div className="flex-1">
                <span className="text-xs font-black text-teal-500 uppercase tracking-widest mb-1 block">Application Form</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                  JOIN OUR TEAM
                </h2>
                <div className="h-1 w-20 bg-[#00C9A7] mt-4 rounded-full"></div>
                <p className="text-slate-500 mt-6 font-bold flex items-center">
                  <BriefcaseBusiness className="w-4 h-4 mr-2" />
                  {applyingJob?.title} 
                  <span className="mx-2 text-slate-300">•</span>
                  <span className="text-slate-400">{applyingJob?.department}</span>
                </p>
              </div>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="p-3 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-red-500"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="px-10 pb-10">
              {submitStatus.type === 'success' ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner bounce">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Mission Successful!</h3>
                  <p className="text-slate-600 text-lg font-medium">{submitStatus.message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        type="text" required
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-[#00C9A7] focus:bg-white outline-none transition-all font-bold text-slate-900"
                        placeholder="Ex: Dr. John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        type="email" required
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-[#00C9A7] focus:bg-white outline-none transition-all font-bold text-slate-900"
                        placeholder="john@hospital.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input 
                        type="tel" required
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-[#00C9A7] focus:bg-white outline-none transition-all font-bold text-slate-900"
                        placeholder="+91 000 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Years of Experience</label>
                      <input 
                        type="number" required
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-[#00C9A7] focus:bg-white outline-none transition-all font-bold text-slate-900"
                        placeholder="Ex: 5"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CV / Resume Link</label>
                      <input 
                        type="url" required
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-[#00C9A7] focus:bg-white outline-none transition-all font-bold text-slate-900"
                        placeholder="Google Drive / Dropbox Link"
                        value={formData.resumeUrl}
                        onChange={(e) => setFormData({...formData, resumeUrl: e.target.value})}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={submitStatus.type === 'loading'}
                    className={`w-full py-5 bg-[#002D27] text-white font-black rounded-3xl shadow-2xl transition-all flex items-center justify-center text-xl mt-4
                      ${submitStatus.type === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00C9A7] hover:text-[#002D27] hover:translate-y-[-2px] active:translate-y-[1px]'}`}
                  >
                    {submitStatus.type === 'loading' ? 'PROCESSING...' : 'SUBMIT APPLICATION'}
                  </button>
                  <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                    By submitting, you agree to ClinX Privacy Policy and Data Handling.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .bounce { animation: bounce 1s infinite; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default CareersPage;
