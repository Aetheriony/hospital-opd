import { useState } from "react";
import { useRouter } from "next/router";
import { User, Lock, ArrowRight } from "lucide-react";

export default function SignIn() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            
            const data = await response.json();

            if (response.ok) {
                if (data.isAdmin) {
                    router.push("/admin-dashboard");
                } else {
                    router.push("/dashboard");
                }
            } else {
                setError(data.message || "Invalid credentials");
                setLoading(false);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 shadow-sm sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-10 px-8 border border-gray-200 shadow-xl rounded-2xl">
                    <div className="text-center mb-10">
                        <a href="/" className="inline-block mb-4">
                            <span className="font-bold text-3xl">
                                <span className="text-neutral-900">Clin</span>
                                <span className="text-[#00C9A7]">X</span>
                            </span>
                        </a>
                        <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                        <p className="text-sm text-gray-500 mt-2">Access your hospital portal</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-700 border-l-4 border-red-400 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <User className="h-4 w-4" />
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    value={form.username}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <Lock className="h-4 w-4" />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center items-center py-3 bg-[#00C9A7] text-white font-bold rounded-lg hover:bg-teal-600 transition-all ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        New to ClinX?{" "}
                        <a href="/auth/signup" className="text-teal-600 font-semibold hover:underline">
                            Create Account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    return { props: {} };
}