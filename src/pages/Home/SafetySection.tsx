import ContainerLayout from "../../components/Layout/ContainerLayout";
import { FaShieldAlt, FaBriefcaseMedical, FaCheckCircle } from "react-icons/fa";

function SafetySection() {
    const safetyFeatures = [
        {
            icon: <FaShieldAlt />,
            title: "Safe & Secure",
            description: "Every vehicle undergoes a rigorous 150-point inspection and sanitization process before each rental."
        },
        {
            icon: <FaBriefcaseMedical />,
            title: "24/7 Roadside Assistance",
            description: "No matter where you are, our emergency support team is just a call away to help you get back on the road."
        },
        {
            icon: <FaCheckCircle />,
            title: "Contactless Pickup",
            description: "Enjoy a completely digital experience with our contactless key handover and mobile-first documentation."
        }
    ];

    return (
        <section className="py-24 bg-blue-600 text-white overflow-hidden relative">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

            <ContainerLayout>
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">
                            Our Commitment
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            Your Safety is <br /> <span className="text-blue-200">Our Priority</span>
                        </h2>
                        <p className="text-xl text-blue-100 font-medium leading-relaxed">
                            We've implemented industry-leading safety protocols to ensure that every journey you take with AVIS is as secure as it is comfortable.
                        </p>
                        <div className="pt-4">
                            <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform active:scale-95">
                                Learn Our Protocols
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 grid grid-cols-1 gap-6">
                        {safetyFeatures.map((feature, idx) => (
                            <div key={idx} className="bg-white/10 backdrop-blur-md p-8 rounded-[32px] border border-white/10 flex gap-6 group hover:bg-white/20 transition-all duration-300">
                                <div className="text-4xl text-blue-200 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-blue-100 font-medium leading-relaxed text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ContainerLayout>
        </section>
    );
}

export default SafetySection;
