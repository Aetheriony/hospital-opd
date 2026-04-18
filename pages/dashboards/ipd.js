import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { BedDouble, UserPlus, FileOutput } from "lucide-react";

export default function IPDDashboard() {
    const [beds, setBeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIPDData = async () => {
            try {
                const res = await axios.get("/api/ipd/beds");
                setBeds(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching IPD data:", error);
                setLoading(false);
            }
        };
        fetchIPDData();
    }, []);

    // Group beds by ward
    const groupedBeds = beds.reduce((acc, bed) => {
        if (!acc[bed.wardName]) acc[bed.wardName] = [];
        acc[bed.wardName].push(bed);
        return acc;
    }, {});

    const totalBeds = beds.length;
    const occupiedBeds = beds.filter(b => b.isOccupied).length;
    const freeBeds = totalBeds - occupiedBeds;

    return (
        <DashboardLayout title="In-Patient Department (IPD)">
            
            {/* IPD Stats */}
            <div className="grid gap-6 mb-8 md:grid-cols-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                    <p className="text-gray-500 font-medium mb-2">Overall Occupancy</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-4xl font-bold text-gray-900">{totalBeds > 0 ? Math.round((occupiedBeds/totalBeds)*100) : 0}%</span>
                        </div>
                        <div className="text-sm text-gray-500 text-right">
                            <span className="text-emerald-600 font-medium">{freeBeds} Free</span> / {totalBeds} Total
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${totalBeds > 0 ? (occupiedBeds/totalBeds)*100 : 0}%` }}></div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between col-span-1 md:col-span-2">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">IPD Actions</h3>
                        <p className="text-sm text-gray-500 mb-4">Manage patient admissions and discharges</p>
                        <div className="flex space-x-3">
                            <button className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm">
                                <UserPlus className="w-4 h-4 mr-2" /> Admit Patient
                            </button>
                            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-sm transition-colors">
                                <FileOutput className="w-4 h-4 mr-2" /> Discharge Patient
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:block opacity-20">
                        <BedDouble className="w-24 h-24 text-teal-900" />
                    </div>
                </div>
            </div>

            {/* Visual Bed Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <BedDouble className="w-6 h-6 mr-3 text-teal-600" />
                    Live Bed Map
                </h3>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                    </div>
                ) : Object.keys(groupedBeds).length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No beds configured in the system.</p>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(groupedBeds).map(([wardName, wardBeds]) => (
                            <div key={wardName}>
                                <div className="flex items-center mb-4">
                                    <h4 className="font-semibold text-lg text-gray-800">{wardName}</h4>
                                    <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                        {wardBeds.filter(b => !b.isOccupied).length} Available
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                                    {wardBeds.map(bed => (
                                        <div 
                                            key={bed._id} 
                                            className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer group 
                                                ${bed.isOccupied 
                                                    ? 'border-red-200 bg-red-50 hover:border-red-300' 
                                                    : 'border-emerald-200 bg-emerald-50 hover:border-emerald-300'}`}
                                        >
                                            <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${bed.isOccupied ? 'bg-red-500' : 'bg-emerald-500'} animate-pulse`}></div>
                                            <BedDouble className={`w-8 h-8 mx-auto mb-2 ${bed.isOccupied ? 'text-red-400' : 'text-emerald-500'}`} />
                                            <p className={`text-center font-bold text-sm ${bed.isOccupied ? 'text-red-900' : 'text-emerald-900'}`}>
                                                {bed.bedNumber}
                                            </p>
                                            <p className={`text-center text-xs mt-1 ${bed.isOccupied ? 'text-red-600' : 'text-emerald-600'}`}>
                                                {bed.isOccupied ? 'Occupied' : 'Free'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
        </DashboardLayout>
    );
}
