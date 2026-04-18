import { useState } from "react";
import { useRouter } from "next/router";
import { User, Lock, Shield, UserPlus } from "lucide-react";

export default function SignUp() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "", password: "", isAdmin: false });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: form.username,
                    email: form.username + "@clinx.com", // Fallback email since original form had it
                    password: form.password,
                    isAdmin: form.isAdmin
                })
            });
            
            const data = await response.json();

            if (response.ok) {
                router.push("/auth/signin");
            } else {
                setError(data.message || "Registration failed");
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
                        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                        <p className="text-sm text-gray-500 mt-2">Join the ClinX hospital management network</p>
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
                                    placeholder="Choose a username"
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

                        <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-100 italic1">
                            <input
                                id="isAdmin"
                                name="isAdmin"
                                type="checkbox"
                                checked={form.isAdmin}
                                onChange={handleChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="isAdmin" className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                                <Shield className="w-4 h-4 mr-1.5 text-teal-600" /> Register as Admin
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center items-center py-3 bg-[#00C9A7] text-white font-bold rounded-lg hover:bg-teal-600 transition-all ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? "Creating account..." : "Create Account"}
                            {!loading && <UserPlus className="ml-2 h-4 w-4" />}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/auth/signin" className="text-teal-600 font-semibold hover:underline">
                            Sign In
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