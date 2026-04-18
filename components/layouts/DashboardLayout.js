import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { 
    LayoutDashboard, 
    Stethoscope, 
    Pill, 
    FlaskConical, 
    BedDouble, 
    FileText, 
    BarChart3, 
    BriefcaseMedical,
    LogOut,
    Menu,
    X,
    User,
    Bell
} from "lucide-react";

export default function DashboardLayout({ children, title }) {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
                setIsMobile(true);
            } else {
                setSidebarOpen(true);
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
            router.push("/auth/signin");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, path: "/admin-dashboard" },
        { name: "OPD", icon: Stethoscope, path: "/dashboards/opd" },
        { name: "EMR", icon: FileText, path: "/dashboards/emr" },
        { name: "Pharmacy", icon: Pill, path: "/dashboards/pharmacy" },
        { name: "Laboratory", icon: FlaskConical, path: "/dashboards/labs" },
        { name: "IPD", icon: BedDouble, path: "/dashboards/ipd" },
        { name: "CMS & Website", icon: FileText, path: "/dashboards/cms" },
        { name: "Analytics", icon: BarChart3, path: "/dashboards/analytics" },
        { name: "Hiring", icon: BriefcaseMedical, path: "/dashboards/hiring" },
    ];

    return (
        <div className="flex bg-slate-50 min-h-screen">
            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 bg-[#00C9A7] text-white w-64 shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col 
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0`}
            >
                <div className="flex items-center justify-between p-4 border-b border-teal-600/50">
                    <h1 className="text-2xl font-bold tracking-tight">Clin<span className="text-white">X</span> Portal</h1>
                    {isMobile && (
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white hover:text-gray-200">
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                <nav className="flex-1 overflow-y-auto py-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = router.pathname.includes(item.path);
                        return (
                            <a 
                                key={item.name} 
                                href={item.path}
                                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors
                                    ${isActive 
                                        ? "bg-white/20 border-l-4 border-white text-white" 
                                        : "text-teal-50 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </a>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-teal-600/50">
                    <button 
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg hover:bg-white/10"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Navbar */}
                <header className="bg-white shadow-sm border-b px-4 lg:px-8 py-3 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center">
                        <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="mr-4 lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800">{title || "Dashboard"}</h2>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="text-gray-400 hover:text-teal-600 transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold border border-teal-200">
                            <User className="w-5 h-5" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Overlay */}
            {sidebarOpen && isMobile && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
