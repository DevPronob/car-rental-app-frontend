import ContainerLayout from "../../components/Layout/ContainerLayout";
import { FaStar } from "react-icons/fa";

function TestomonialSection() {
    const testimonials = [
        {
            name: "Paul Starr",
            role: "Business Traveler",
            image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=150&q=80",
            content: "Renting a car through AVIS was seamless! The booking process was simple, and the customer service team was quick to answer my questions. The vehicle was in pristine condition.",
            rating: 5
        },
        {
            name: "Sarah Collins",
            role: "Adventure Blogger",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            content: "I've used this service multiple times, and they never disappoint. The cars are always clean and well-maintained. What really stands out is their transparent pricing—no hidden fees!",
            rating: 5
        },
        {
            name: "David Rodriguez",
            role: "Family Vacationer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
            content: "The car options were great, and the overall service was exceptional. From the moment I booked online, I felt like a valued customer. I'll definitely be using this service again!",
            rating: 4
        }
    ];

    return (
        <section className="py-24 bg-gray-50 dark:bg-[#0f172a] transition-colors duration-300 overflow-hidden">
            <ContainerLayout>
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                        What Our <span className="text-blue-600">Clients Say</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-medium">
                        Hear from the community of travelers who trust AVIS for their journeys around the world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <div 
                            key={idx} 
                            className="bg-white dark:bg-gray-800 p-10 rounded-[40px] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-gray-700 relative group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                        >
                            <div className="absolute -top-6 left-10 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-600/40">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H20.017C21.1216 4 22.017 4.89543 22.017 6V15C22.017 17.2091 20.2261 19 18.017 19H14.017V21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91243 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H3.017C2.46472 8 2.017 7.55228 2.017 7V5C2.017 4.44772 2.46472 4 3.017 4H8.017C9.12157 4 10.017 4.89543 10.017 6V15C10.017 17.2091 8.22587 19 6.017 19H2.017V21H2.017Z" /></svg>
                            </div>

                            <div className="flex gap-1 mb-6 text-yellow-400">
                                {[...Array(t.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic mb-8 font-medium">
                                "{t.content}"
                            </p>

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-50 dark:border-gray-700">
                                <img 
                                    src={t.image} 
                                    alt={t.name} 
                                    className="w-14 h-14 rounded-2xl object-cover ring-4 ring-blue-50 dark:ring-blue-900/20"
                                />
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{t.name}</h4>
                                    <p className="text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ContainerLayout>
        </section>
    );
}

export default TestomonialSection;