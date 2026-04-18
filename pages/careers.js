import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: "full-stack",
      title: "Full Stack Engineer",
      location: "Hyderabad",
      type: "Full-time",
      pay: "10,00,000 to 15,00,000",
      badges: ["Nodejs", "Ruby on rails", "Angular", "Web components"],
      description: "NeftX is a suite of applications for hospitals, clinics and practitioners. We are getting into exciting features which include one click launch of websites, complete CMS and custom theme selection.",
      applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdM9LtXAGiA7s2FQi9tWRsyPujcR2RuLlFl4weMPfMYpFz0BA/viewform"
    },
    {
      id: "ux-designer",
      title: "User Experience Designer",
      location: "Hyderabad",
      type: "Full-time",
      badges: ["UX", "UXDesigner"],
      description: "This candidate will be responsible for building a clean and effective user experience for our customers. By working cross-functionally, this candidate will understand needs from the product management, engineering, and business stakeholders.",
      applyEmail: "career@neftx.com"
    },
    {
      id: "frontend",
      title: "Frontend Developer",
      location: "Hyderabad",
      type: "Full-time",
      badges: ["Angular", "Handlebars", "Html", "Css"],
      description: "The ideal candidate will be responsible for designing, developing, testing, and debugging responsive web and mobile applications for the company.",
      applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdM9LtXAGiA7s2FQi9tWRsyPujcR2RuLlFl4weMPfMYpFz0BA/viewform"
    },
    {
      id: "bdm",
      title: "Business Development Manager",
      location: "Hyderabad",
      type: "Full-time",
      badges: ["Business development"],
      description: "NeftX is looking for a dynamic Business Development Manager who is an expert in Software Sales for B2B Industries for a fast-paced company.",
      applyEmail: "career@neftx.com"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>NeftX | Careers - Join Our Mission</title>
      </Head>

      <Navbar />

      <main>
        <section className="pt-24 pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                We're Hiring
              </h1>
              <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
                Join our mission to transform healthcare for SME clinics & hospitals across India.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl shadow-md border border-neutral-100 overflow-hidden transition-all hover:shadow-lg">
                  <button 
                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-1">{job.title}</h2>
                      <div className="flex items-center text-sm text-neutral-500 space-x-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <svg 
                      className={`w-6 h-6 transform transition-transform duration-300 ${selectedJob === job.id ? 'rotate-180 text-primary' : 'text-secondary'}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${selectedJob === job.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 pt-0 border-t border-neutral-50">
                      <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-4 py-4">
                        <p>{job.description}</p>
                        
                        {job.pay && (
                          <p className="font-bold text-neutral-900 italic">
                            Pay range: ₹{job.pay} based on experience.
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                          {job.badges.map(badge => (
                            <span key={badge} className="px-3 py-1 bg-info/10 text-info text-xs font-bold rounded-full border border-info/20">
                              {badge}
                            </span>
                          ))}
                        </div>

                        <div className="pt-6 border-t border-neutral-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <p className="text-sm font-medium text-neutral-600">
                            Apply via: <span className="text-primary font-bold">{job.applyEmail || 'Online Form'}</span>
                          </p>
                          <a 
                            href={job.applyUrl || `mailto:${job.applyEmail}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-colors shadow-md hover:shadow-lg"
                          >
                            Apply Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;
