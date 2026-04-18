import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white mx-auto border-t border-gray-200 py-12">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Logo & Description */}
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-4">
                            <span className="font-bold text-2xl tracking-tight">
                                <span className="text-neutral-900">Clin</span>
                                <span className="text-[#00C9A7]">X</span>
                            </span>
                        </div>
                        <p className="text-gray-600 max-w-sm">
                            The all-in-one operating system for modern healthcare practices. 
                            Streamlining OPD, EMR, IPD, and Pharmacy operations.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Platform</h3>
                        <ul className="space-y-2">
                            <li><Link href="/pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="/blogs" className="text-gray-600 hover:text-primary transition-colors">Blogs</Link></li>
                            <li><Link href="/faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="/careers" className="text-gray-600 hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} ClinX. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;