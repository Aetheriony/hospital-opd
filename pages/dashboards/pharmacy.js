import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Pill, Search, AlertTriangle, Plus, ShoppingCart, IndianRupee } from "lucide-react";

export default function PharmacyDashboard() {
    const [inventory, setInventory] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPharmacyData = async () => {
            try {
                const [invRes, alertRes] = await Promise.all([
                    axios.get("/api/pharmacy/inventory"),
                    axios.get("/api/pharmacy/alerts")
                ]);
                setInventory(invRes.data);
                setAlerts(alertRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching pharmacy data:", error);
                setLoading(false);
            }
        };
        fetchPharmacyData();
    }, []);

    const filteredInventory = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.genericName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout title="Pharmacy Management">
            
            {/* Quick Alerts Banner */}
            {alerts.length > 0 && (
                <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
                    <div className="flex items-center">
                        <AlertTriangle className="text-amber-500 w-6 h-6 mr-3" />
                        <div>
                            <h3 className="text-amber-800 font-medium">Inventory Alerts</h3>
                            <p className="text-amber-700 text-sm mt-1">
                                {alerts.length} items require attention (Low stock or near expiry).
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                
                {/* Inventory List */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                            <Pill className="w-5 h-5 mr-2 text-teal-600" />
                            Inventory
                        </h3>
                        <div className="relative w-64">
                            <input 
                                type="text"
                                placeholder="Search inventory..."
                                className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2" />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto h-[calc(100vh-16rem)]">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-600 uppercase bg-white border-b sticky top-0 shadow-sm z-10">
                                <tr>
                                    <th className="px-6 py-3">Medicine</th>
                                    <th className="px-6 py-3">Batch</th>
                                    <th className="px-6 py-3">Stock</th>
                                    <th className="px-6 py-3">Price</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center py-6 text-gray-500">Loading inventory...</td></tr>
                                ) : filteredInventory.map(item => (
                                    <tr key={item._id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-6 py-3">
                                            <div className="font-medium text-gray-900">{item.name}</div>
                                            <div className="text-xs text-gray-500">{item.genericName}</div>
                                        </td>
                                        <td className="px-6 py-3 text-gray-600">{item.batchNumber}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${item.stockQuantity <= item.reorderLevel ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                {item.stockQuantity} units
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-gray-900 font-medium">₹{item.mrp}</td>
                                        <td className="px-6 py-3">
                                            <button className="text-teal-600 hover:text-teal-800 p-1 bg-teal-50 rounded">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Billing / POS */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-10rem)] lg:h-auto">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-teal-600 text-white rounded-t-xl">
                        <h3 className="font-semibold flex items-center">
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Current Sale
                        </h3>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-y-auto flex items-center justify-center border-b border-gray-100">
                        {/* Placeholder for cart items */}
                        <div className="text-center text-gray-400">
                            <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>Cart is empty</p>
                            <p className="text-xs mt-1">Select items from inventory to add</p>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-b-xl">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">₹0.00</span>
                        </div>
                        <div className="flex justify-between text-sm mb-4">
                            <span className="text-gray-600">Discount</span>
                            <span className="font-medium text-green-600">₹0.00</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2 mb-4">
                            <span>Total</span>
                            <span>₹0.00</span>
                        </div>
                        <button className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-md">
                            <IndianRupee className="w-4 h-4 mr-2" />
                            Complete Sale
                        </button>
                    </div>
                </div>
                
            </div>
        </DashboardLayout>
    );
}
