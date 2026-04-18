import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/admin-dashboard");
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <DashboardLayout title="Admin Overview">
            {dashboardData ? (
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    {/* Metrics Cards */}
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800">
                        <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{dashboardData.patientCount}</p>
                        </div>
                    </div>

                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800">
                        <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total Doctors</p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{dashboardData.doctorCount}</p>
                        </div>
                    </div>

                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800">
                        <div className="p-3 mr-4 text-emerald-500 bg-emerald-100 rounded-full dark:text-emerald-100 dark:bg-emerald-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Earnings Today</p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">₹{dashboardData.totalEarningsToday}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                </div>
            )}
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mt-4">
                <h3 className="text-lg font-semibold mb-4">Welcome to ClinX Admin Portal</h3>
                <p className="text-gray-600">Use the sidebar to navigate to specific hospital modules including OPD, EMR, Pharmacy, and more.</p>
            </div>
        </DashboardLayout>
    );
}