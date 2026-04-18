import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';

const BlogsPage = () => {
  const featuredBlogs = [
    {
      id: 1,
      title: "Beyond Compliance: How Going Digital Opens New Opportunities for Doctors",
      date: "Jan 18, 2026",
      image: "https://storage.googleapis.com/neftx_uploads/316a2570-d363-4f5e-b7d7-b1bbc77a1715.png",
      description: "Digitization isn't just about compliance—it's about building a Digital Twin of your practice. With AI, your records can power patient-facing apps and educational tools, creating new income streams. But only if you own your data."
    },
    {
      id: 2,
      title: "The 3P Framework for Future-Ready Clinics and Hospitals: Patients, Processes, Profitability",
      date: "Oct 22, 2025",
      image: "https://storage.googleapis.com/neftx_uploads/af5bb9ce-3b78-4ecb-b7de-6afeb7b84127.png",
      description: "Future-ready doesn't require crores. It doesn't require a CTO or an IT team. It doesn't require you to become a tech expert. It requires getting three things right: Patients, Processes, and Profitability."
    }
  ];

  const moreArticles = [
    {
      id: 3,
      title: "Prescription Templates: Rollout Prescriptions in Under a Minute",
      date: "Oct 12, 2025",
      image: "https://storage.googleapis.com/neftx_uploads/2c06d11b-66f6-4999-b68d-1852f7fba906.png",
      description: "Entering prescriptions in EMRs takes 5-6 minutes per patient. ClinX templates let doctors save common prescriptions and reuse them with one click."
    },
    {
      id: 4,
      title: "Why Digital Marketing Without an Integrated System Fails",
      date: "Feb 2, 2025",
      image: "https://storage.googleapis.com/neftx_uploads/6fcca969-5a56-4b43-9140-94c84a84c828.png",
      description: "Digital marketing without tracking is a waste. Just posting on Facebook won’t bring patients if you don’t know what works. ClinX connects marketing with real patient data."
    },
    {
      id: 5,
      title: "Is Your Clinic Getting Lost in Aggregators? Here’s Why It’s Hurting Your Brand",
      date: "Feb 2, 2025",
      image: "https://storage.googleapis.com/neftx_uploads/b895f546-95d1-4a94-a899-a3970546c4e9.png",
      description: "Clinics relying on aggregators lose their brand identity, patient loyalty, and revenue to middlemen. ClinX helps hospitals own their digital presence."
    },
    {
      id: 6,
      title: "Hospital Growth Insights: What Our AI Reveals About Patient Behavior",
      date: "Feb 2, 2025",
      image: "https://storage.googleapis.com/neftx_uploads/870e9ec1-d901-4f07-9e4e-fb449e457cc8.png",
      description: "Hospitals grow when they understand patient behavior. ClinX AI uncovers trends in bookings, retention, and revenue, helping hospitals act on insights."
    },
    {
      id: 7,
      title: "4 Critical Website Issues That Impact Hospital and Clinic Engagement and SEO",
      date: "Dec 17, 2024",
      image: "https://storage.googleapis.com/neftx_uploads/d6083f7c-42c3-4c67-ba2e-3d4e1787c368.png",
      description: "Many hospital and clinic websites suffer from broken booking systems, poor SEO, and disjointed HMS integration. These issues frustrate patients and hurt growth."
    },
    {
      id: 8,
      title: "Unlocking Potential Savings with ClinX: A Complete Solution for Your Hospital Management",
      date: "Sep 18, 2024",
      image: "https://storage.googleapis.com/neftx_uploads/aa046bfa-e92f-4b16-af47-968158beeabc.png",
      description: "Discover the savings and efficiency ClinX offers! With our integrated platform, you get a complete HMS, website, and patient portal."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>ClinX Blogs | Insights, Tips, and News on Healthcare Solutions</title>
        <meta name="description" content="Discover the latest insights, tips, and news on healthcare solutions from ClinX. Stay updated with our blog for SME hospitals and healthcare management." />
      </Head>

      <Navbar />

      <main className="bg-gradient-to-b from-neutral-50 to-white min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-900 py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest Insights</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Stay updated with clinic management tips, feature updates, and healthcare technology trends
            </p>
          </div>
        </section>

        {/* Featured Blogs */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.map(blog => (
                <article key={blog.id} className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100 h-full flex flex-col hover:shadow-2xl">
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">Featured</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center mb-4">
                        <span className="w-2 h-2 bg-info rounded-full mr-2"></span>
                        <span className="text-info text-sm font-bold uppercase tracking-wider">{blog.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                        {blog.title}
                      </h3>
                      <p className="text-neutral-600 mb-8 leading-relaxed line-clamp-3">
                        {blog.description}
                      </p>
                      <div className="mt-auto flex items-center text-primary font-bold group-hover:text-secondary transition-colors">
                        <span>Read Article</span>
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* More Articles */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Explore More Articles</h2>
              <p className="text-neutral-600 text-lg">Discover insights, tips, and industry updates</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {moreArticles.map(blog => (
                <article key={blog.id} className="group cursor-pointer transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-100 h-full flex flex-col hover:shadow-xl">
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-info text-xs font-bold uppercase tracking-widest">{blog.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-4 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-neutral-600 text-sm mb-6 leading-relaxed line-clamp-3">
                        {blog.description}
                      </p>
                      <div className="mt-auto flex items-center text-primary font-bold text-sm group-hover:text-secondary transition-colors">
                        <span>Read More</span>
                        <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-16 flex justify-center items-center space-x-2">
              <button className="w-10 h-10 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:border-primary hover:text-primary transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold flex items-center justify-center shadow-md">1</button>
              <button className="w-10 h-10 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-primary hover:text-primary transition-all">2</button>
              <button className="w-10 h-10 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-primary hover:text-primary transition-all">3</button>
              <span className="px-2 text-neutral-400">...</span>
              <button className="w-10 h-10 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:border-primary hover:text-primary transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogsPage;
