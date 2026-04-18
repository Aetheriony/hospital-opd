import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { FlaskConical, Search, CheckCircle, Clock, FilePlus2, ChevronRight } from "lucide-react";

export default function LabsDashboard() {
    const [catalog, setCatalog] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLabData = async () => {
            try {
                const [catRes, ordRes] = await Promise.all([
                    axios.get("/api/labs/catalog"),
                    axios.get("/api/labs/order")
                ]);
                setCatalog(catRes.data);
                setOrders(ordRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching lab data:", error);
                setLoading(false);
            }
        };
        fetchLabData();
    }, []);

    const pendingOrders = orders.filter(o => o.status === 'Pending');
    const completedOrders = orders.filter(o => o.status === 'Completed');

    return (
        <DashboardLayout title="Laboratory Services">
            
            {/* Top Metrics */}
            <div className="grid gap-6 mb-8 md:grid-cols-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Available Tests</p>
                        <h4 className="text-3xl font-bold text-gray-900">{catalog.length}</h4>
                    </div>
                    <div className="bg-teal-100 p-4 rounded-full text-teal-600">
                        <FlaskConical className="w-8 h-8" />
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Pending Reports</p>
                        <h4 className="text-3xl font-bold text-amber-600">{pendingOrders.length}</h4>
                    </div>
                    <div className="bg-amber-100 p-4 rounded-full text-amber-600">
                        <Clock className="w-8 h-8" />
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Completed Today</p>
                        <h4 className="text-3xl font-bold text-emerald-600">
                            {completedOrders.filter(o => new Date(o.lastUpdated).toDateString() === new Date().toDateString()).length}
                        </h4>
                    </div>
                    <div className="bg-emerald-100 p-4 rounded-full text-emerald-600">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                
                {/* Pending Orders (Kanban Style Board) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-18rem)]">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-amber-500" />
                            Pending Result Entry
                        </h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
                        {loading ? (
                            <p className="text-center text-gray-500 py-8">Loading pending orders...</p>
                        ) : pendingOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <CheckCircle className="w-12 h-12 mb-3 text-emerald-300" />
                                <p>All caught up! No pending results.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pendingOrders.map(order => (
                                    <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:border-teal-300 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-medium text-gray-900">{order.test?.testName || 'Unknown Test'}</h4>
                                            <span className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 mb-4">
                                            <p>Patient: <span className="font-medium text-gray-700">{order.patient?.name || 'Unknown'}</span></p>
                                            <p>Ref By: Dr. {order.doctor?.name || 'Unknown'}</p>
                                        </div>
                                        <div className="flex justify-end">
                                            <button className="flex items-center text-sm font-medium text-teal-600 group-hover:text-teal-700 transition-colors bg-teal-50 px-3 py-1.5 rounded pr-2">
                                                Enter Result <ChevronRight className="w-4 h-4 ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Test Catalog */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-18rem)]">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                            <FlaskConical className="w-5 h-5 mr-2 text-teal-600" />
                            Test Catalog
                        </h3>
                        <button className="flex items-center text-sm font-medium text-teal-600 hover:text-teal-800">
                            <FilePlus2 className="w-4 h-4 mr-1" /> Add New
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-600 uppercase bg-white border-b sticky top-0 shadow-sm z-10">
                                <tr>
                                    <th className="px-6 py-3">Test Name</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="3" className="text-center py-6 text-gray-500">Loading catalog...</td></tr>
                                ) : catalog.map(test => (
                                    <tr key={test._id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{test.testName}</div>
                                            <div className="text-xs text-gray-500 mt-1">Ref: {test.normalRange}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-medium">
                                                {test.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            ₹{test.price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
