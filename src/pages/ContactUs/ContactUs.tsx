import ContainerLayout from "../../components/Layout/ContainerLayout";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "antd";

function ContactUs() {
    return (
        <div className="min-h-screen py-24 dark:bg-[#0f172a] bg-gray-50 transition-colors duration-300">
            <ContainerLayout>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">Get in <span className="text-blue-600">Touch</span></h1>
                        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
                            Have questions about our fleet or services? Our team is here to help you experience the best in car rentals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] shadow-xl border border-gray-100 dark:border-gray-700 flex items-start gap-6 group hover:border-blue-500/50 transition-all">
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl group-hover:scale-110 transition-transform">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Call Us</h4>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">+1 (234) 567-890</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] shadow-xl border border-gray-100 dark:border-gray-700 flex items-start gap-6 group hover:border-blue-500/50 transition-all">
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl group-hover:scale-110 transition-transform">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Email Us</h4>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">support@avis.com</p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] shadow-xl border border-gray-100 dark:border-gray-700 flex items-start gap-6 group hover:border-blue-500/50 transition-all">
                                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl group-hover:scale-110 transition-transform">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Visit Us</h4>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">123 Luxury Lane, Beverly Hills, CA</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-10 md:p-16 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700">
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Send a Message</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input type="text" className="w-full h-14 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input type="email" className="w-full h-14 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                                    <input type="text" className="w-full h-14 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl px-6 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="How can we help?" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                                    <textarea rows={4} className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl p-6 focus:ring-2 focus:ring-blue-600 transition-all resize-none" placeholder="Write your message here..."></textarea>
                                </div>
                                <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 transition-all active:scale-95">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </ContainerLayout>
        </div>
    );
}

export default ContactUs;
