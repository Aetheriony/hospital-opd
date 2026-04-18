import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Search, UserPlus, HeartPulse, Stethoscope, FileText, Download } from "lucide-react";

export default function EMRDashboard() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientHistory, setPatientHistory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await axios.get("/api/patients");
                setPatients(res.data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };
        fetchPatients();
    }, []);

    const handleSelectPatient = async (patient) => {
        setSelectedPatient(patient);
        try {
            const res = await axios.get(`/api/emr/patient/${patient._id}`);
            setPatientHistory(res.data);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    const filteredPatients = patients.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.contact.includes(searchTerm)
    );

    return (
        <DashboardLayout title="Electronic Medical Records (EMR)">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Patient Selection Column */}
                <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-8rem)]">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Directory</h3>
                        <div className="relative">
                            <input 
                                type="text"
                                placeholder="Search by name or phone..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-2">
                        {filteredPatients.map(patient => (
                            <div 
                                key={patient._id} 
                                onClick={() => handleSelectPatient(patient)}
                                className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors border ${
                                    selectedPatient?._id === patient._id 
                                        ? "bg-teal-50 border-teal-200" 
                                        : "border-transparent hover:bg-gray-50"
                                }`}
                            >
                                <div className="font-medium text-gray-900">{patient.name}</div>
                                <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                    <span>{patient.gender}, {patient.age}y</span>
                                    <span>OPD: {patient.opdNumber || "N/A"}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                        <button className="w-full py-2 bg-teal-50 text-teal-700 font-medium rounded-lg hover:bg-teal-100 transition-colors flex items-center justify-center text-sm">
                            <UserPlus className="w-4 h-4 mr-2" />
                            New Patient
                        </button>
                    </div>
                </div>

                {/* EMR Detail Column */}
                <div className="col-span-1 lg:col-span-2">
                    {selectedPatient ? (
                        <div className="space-y-6">
                            {/* Patient Profile Header */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {selectedPatient.gender} • {selectedPatient.age} years • Contact: {selectedPatient.contact}
                                    </p>
                                </div>
                                <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors flex items-center text-sm">
                                    <Stethoscope className="w-4 h-4 mr-2" />
                                    Write Prescription
                                </button>
                            </div>

                            {/* Medical History */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800 flex items-center">
                                        <FileText className="w-5 h-5 mr-2 text-teal-600" />
                                        Visit History
                                    </h3>
                                </div>
                                <div className="p-6">
                                    {patientHistory && patientHistory.length > 0 ? (
                                        <div className="space-y-6">
                                            {patientHistory.map((record, index) => (
                                                <div key={index} className="border-l-2 border-teal-100 pl-4 pb-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {new Date(record.date).toLocaleDateString()}
                                                        </div>
                                                        <button className="text-teal-600 hover:text-teal-800 p-1">
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    
                                                    {record.vitals && (
                                                        <div className="flex gap-4 mb-3 text-xs bg-gray-50 p-2 rounded">
                                                            <span className="flex items-center"><HeartPulse className="w-3 h-3 text-red-500 mr-1"/> BP: {record.vitals.bloodPressure || 'N/A'}</span>
                                                            <span>Temp: {record.vitals.temperature || 'N/A'}</span>
                                                            <span>Pulse: {record.vitals.pulseRate || 'N/A'}</span>
                                                        </div>
                                                    )}
                                                    
                                                    <div className="text-sm">
                                                        <p><span className="font-medium">Symptoms:</span> {record.symptoms?.join(", ") || "N/A"}</p>
                                                        <p className="mt-1"><span className="font-medium text-teal-700">Diagnosis:</span> {record.diagnosis?.join(", ") || "N/A"}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            No previous medical records found for this patient.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-8rem)] flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No Patient Selected</h3>
                                <p className="text-gray-500 mt-2">Select a patient from the directory to view their EMR.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
