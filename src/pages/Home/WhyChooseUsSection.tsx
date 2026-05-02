import { FaCarSide, FaHeadset, FaRegSmile } from "react-icons/fa";
import ContainerLayout from "../../components/Layout/ContainerLayout";

function WhyChooseUsSection() {
    const features = [
        {
            icon: <FaCarSide />,
            title: "Premium Fleet",
            description: "Choose from our curated selection of high-end luxury vehicles and performance cars maintained to the highest standards."
        },
        {
            icon: <FaRegSmile />,
            title: "Best Rate Guarantee",
            description: "We provide competitive pricing with absolute transparency. No hidden fees, just straightforward luxury rentals."
        },
        {
            icon: <FaHeadset />,
            title: "24/7 VIP Support",
            description: "Our dedicated concierge team is available around the clock to ensure your journey is seamless and stress-free."
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-[#0f172a] transition-colors duration-300">
            <ContainerLayout>
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                        Why Choose <span className="text-blue-600">AVIS</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-medium">
                        Elevating your travel experience with world-class service and a fleet that defines excellence.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div 
                            key={idx} 
                            className="group p-10 bg-gray-50 dark:bg-gray-800/50 rounded-[40px] border border-gray-100 dark:border-gray-700 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2"
                        >
                            <div className="w-20 h-20 mb-8 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-4xl shadow-xl shadow-blue-600/30 group-hover:scale-110 transition-transform duration-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </ContainerLayout>
        </section>
    );
}

export default WhyChooseUsSection;
