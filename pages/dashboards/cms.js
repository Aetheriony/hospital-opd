import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { CopyPlus, Search, Edit, Trash2, Megaphone, CheckCircle2, XCircle } from "lucide-react";

export default function CMSDashboard() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axios.get("/api/website/notices");
                setNotices(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching notices:", error);
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    const filteredNotices = notices.filter(n => 
        n.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        n.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout title="Content Management System (CMS)">
            
            <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1 md:mr-6 flex items-center">
                    <div className="p-3 bg-teal-100 text-teal-600 rounded-full mr-4">
                        <Megaphone className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-gray-500 font-medium text-sm">Active Notices</h4>
                        <p className="text-2xl font-bold text-gray-900">{notices.filter(n => n.isActive).length}</p>
                    </div>
                </div>
                <button className="flex items-center justify-center px-6 py-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors shadow-md h-full self-stretch">
                    <CopyPlus className="w-5 h-5 mr-3" />
                    Publish New Notice
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50">
                    <h3 className="font-semibold text-gray-800 text-lg mb-4 sm:mb-0">Published Content</h3>
                    <div className="relative w-full sm:w-72">
                        <input 
                            type="text"
                            placeholder="Search content..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-600 uppercase bg-white border-b">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold hidden md:table-cell">Target Audience</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Publish Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        <div className="animate-pulse flex flex-col items-center">
                                            <div className="h-6 w-6 bg-teal-200 rounded-full mb-2"></div>
                                            Loading content...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredNotices.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No notices found. Create your first announcement!
                                    </td>
                                </tr>
                            ) : (
                                filteredNotices.map((notice) => (
                                    <tr key={notice._id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 line-clamp-1">{notice.title}</div>
                                            <div className="text-xs text-gray-500 mt-1 line-clamp-1" title={notice.content}>
                                                {notice.content}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell text-gray-600">
                                            {notice.targetAudience || "General Public"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {notice.isActive ? (
                                                <span className="flex items-center text-emerald-600 text-xs font-medium bg-emerald-50 px-2.5 py-1 rounded-full w-max">
                                                    <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-gray-500 text-xs font-medium bg-gray-100 px-2.5 py-1 rounded-full w-max">
                                                    <XCircle className="w-3 h-3 mr-1" /> Draft / Hidden
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(notice.publishDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </DashboardLayout>
    );
}
