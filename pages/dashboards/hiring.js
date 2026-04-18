import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Briefcase, Users, FilePlus, ExternalLink, ShieldCheck, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";

export default function HiringDashboard() {
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState({});
    const [loading, setLoading] = useState(true);
    const [expandedJob, setExpandedJob] = useState(null);

    useEffect(() => {
        const fetchHiringData = async () => {
            try {
                // Fetch basic jobs
                const res = await axios.get("/api/hiring/jobs");
                setJobs(res.data);
                
                // For demonstration, simulating fetching applicants for each job.
                // In a true system, we might fetch only when a job is clicked to save bandwidth,
                // or fetch a bundled response.
                const applicantsMap = {};
                for (const job of res.data) {
                    applicantsMap[job._id] = job.applicants || [];
                }
                setApplicants(applicantsMap);
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching hiring data:", error);
                setLoading(false);
            }
        };
        fetchHiringData();
    }, []);

    const toggleJob = (jobId) => {
        if (expandedJob === jobId) {
            setExpandedJob(null);
        } else {
            setExpandedJob(jobId);
        }
    };

    return (
        <DashboardLayout title="Hiring & Recruitment">
            
            <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
                <div className="flex gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center min-w-[200px]">
                        <div className="p-3 bg-teal-100 text-teal-600 rounded-full mr-4">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-gray-500 font-medium text-sm">Open Positions</h4>
                            <p className="text-2xl font-bold text-gray-900">{jobs.filter(j => j.status === 'Open').length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center min-w-[200px]">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-gray-500 font-medium text-sm">Total Applicants</h4>
                            <p className="text-2xl font-bold text-gray-900">
                                {Object.values(applicants).flat().length}
                            </p>
                        </div>
                    </div>
                </div>
                
                <button className="flex items-center justify-center px-6 py-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors shadow-md self-stretch">
                    <FilePlus className="w-5 h-5 mr-3" />
                    Post New Job
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-semibold text-gray-800 text-lg">Job Listings & Applications</h3>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading recruitment data...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        No job postings found. Create one to start hiring.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {jobs.map(job => {
                            const jobApplicants = applicants[job._id] || [];
                            const isExpanded = expandedJob === job._id;
                            
                            return (
                                <div key={job._id} className="transition-all">
                                    <div 
                                        className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center ${isExpanded ? 'bg-teal-50/30' : ''}`}
                                        onClick={() => toggleJob(job._id)}
                                    >
                                        <div className="mb-4 md:mb-0">
                                            <div className="flex items-center">
                                                <h4 className="text-lg font-bold text-gray-900 mr-3">{job.title}</h4>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${job.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {job.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1 flex items-center space-x-4">
                                                <span>{job.department}</span>
                                                <span className="flex items-center"><Briefcase className="w-3 h-3 mr-1" /> {job.experienceRequired} exp.</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-teal-600">{jobApplicants.length}</p>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide">Applicants</p>
                                            </div>
                                            {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                        </div>
                                    </div>

                                    {/* Expanded Applicants View */}
                                    {isExpanded && (
                                        <div className="bg-gray-50 border-t border-gray-100 p-6">
                                            {jobApplicants.length === 0 ? (
                                                <p className="text-center text-gray-500 py-4">No applicants yet for this position.</p>
                                            ) : (
                                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                    {jobApplicants.map(applicant => (
                                                        <div key={applicant._id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                                            <div className="flex justify-between items-start mb-3">
                                                                <div>
                                                                    <h5 className="font-semibold text-gray-900">{applicant.name}</h5>
                                                                    <p className="text-xs text-gray-500 mt-0.5">{applicant.experience} yrs experience</p>
                                                                </div>
                                                                <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 text-xs font-medium">
                                                                    {applicant.status}
                                                                </span>
                                                            </div>
                                                            <div className="space-y-2 mt-4 text-sm text-gray-600">
                                                                <p className="flex items-center"><Mail className="w-3.5 h-3.5 mr-2" /> {applicant.email}</p>
                                                                <p className="flex items-center"><Phone className="w-3.5 h-3.5 mr-2" /> {applicant.phone}</p>
                                                            </div>
                                                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                                                                <a href={applicant.resumeLink || '#'} target="_blank" rel="noreferrer" className="text-teal-600 hover:text-teal-800 text-sm font-medium flex items-center">
                                                                    Resume <ExternalLink className="w-3.5 h-3.5 ml-1" />
                                                                </a>
                                                                <button className="text-gray-500 hover:text-emerald-600 transition-colors" title="Shortlist">
                                                                    <ShieldCheck className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
