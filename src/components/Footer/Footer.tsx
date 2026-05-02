import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-[#0f172a] text-gray-300 pt-20 transition-colors duration-300">
            <div className="mx-auto w-full max-w-screen-xl px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter italic">AVIS</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-xs">
                            Redefining the car rental experience with luxury, convenience, and unparalleled service across the globe.
                        </p>
                        <div className="flex gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors cursor-pointer"></div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-6 text-sm font-bold text-white uppercase tracking-widest">Company</h2>
                        <ul className="space-y-4">
                            <li><Link to="/about-us" className="hover:text-blue-500 transition-colors duration-300">About Us</Link></li>
                            <li><Link to="/car-listing" className="hover:text-blue-500 transition-colors duration-300">Our Fleet</Link></li>
                            <li><Link to="/contact-us" className="hover:text-blue-500 transition-colors duration-300">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-6 text-sm font-bold text-white uppercase tracking-widest">Support</h2>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-blue-500 transition-colors duration-300">Help Center</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors duration-300">Safety Info</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors duration-300">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-6 text-sm font-bold text-white uppercase tracking-widest">Newsletter</h2>
                        <p className="text-sm text-gray-400 mb-4 font-medium">Subscribe for exclusive offers and updates.</p>
                        <div className="relative group">
                            <input 
                                type="text" 
                                placeholder="Your email" 
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-600 transition-all"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-xl font-bold text-xs hover:bg-blue-700 transition-all">
                                JOIN
                            </button>
                        </div>
                    </div>
                </div>

                <div className="py-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 font-medium">© 2024 AVIS Premium Rentals. All rights reserved.</p>
                    <div className="flex gap-8 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                        <a href="#" className="hover:text-white transition-colors">Licensing</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer