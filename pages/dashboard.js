import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { UserPlus, Users, ClipboardList, Search, MoreVertical, Edit, Trash2 } from "lucide-react";

export default function Dashboard() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get("/api/doctors");
                if (res.data) {
                    setDoctors(res.data);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching doctors:", err);
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <DashboardLayout title="Staff Portal | Overview">
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <button 
                    onClick={() => router.push("/add-doctor")}
                    className="flex items-center p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all transform hover:-translate-y-1 group"
                >
                    <div className="p-4 bg-teal-50 text-teal-600 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-inner">
                        <UserPlus className="w-7 h-7" />
                    </div>
                    <div className="ml-5 text-left">
                        <h4 className="text-base font-bold text-gray-900">Add Doctor</h4>
                        <p className="text-xs text-gray-500 mt-1">Register new medical staff</p>
                    </div>
                </button>

                <button 
                    onClick={() => router.push("/add-patient")}
                    className="flex items-center p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all transform hover:-translate-y-1 group"
                >
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                        <Users className="w-7 h-7" />
                    </div>
                    <div className="ml-5 text-left">
                        <h4 className="text-base font-bold text-gray-900">New Patient</h4>
                        <p className="text-xs text-gray-500 mt-1">Register for OPD visit</p>
                    </div>
                </button>

                <button 
                    onClick={() => router.push("/patient-list")}
                    className="flex items-center p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all transform hover:-translate-y-1 group"
                >
                    <div className="p-4 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-inner">
                        <ClipboardList className="w-7 h-7" />
                    </div>
                    <div className="ml-5 text-left">
                        <h4 className="text-base font-bold text-gray-900">Patient Directory</h4>
                        <p className="text-xs text-gray-500 mt-1">View all patient records</p>
                    </div>
                </button>
            </div>

            {/* Doctors List Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-lg font-bold text-gray-900">Medical Practitioners</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search doctors..." 
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-full sm:w-64"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Doctor Name</th>
                                    <th className="px-6 py-4 font-semibold">Department</th>
                                    <th className="px-6 py-4 font-semibold">Consultation Fee</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 italic1 text-sm">
                                {doctors.length > 0 ? doctors.map((doc) => (
                                    <tr key={doc._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold mr-3 border border-teal-200 uppercase">
                                                    {doc.name ? doc.name.charAt(0) : "D"}
                                                </div>
                                                <span className="font-medium text-gray-900">{doc.name || "Unknown Doctor"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                {doc.department}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">₹{(doc.consultationFee || 0).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-teal-600 p-1">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-500 italic">
                                            No doctors found in the directory.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing {doctors.length} results</p>
                    <button className="text-sm font-semibold text-teal-600 hover:text-teal-700">
                        Export Report
                    </button>
                </div>
            </div>

        </DashboardLayout>
    );
}