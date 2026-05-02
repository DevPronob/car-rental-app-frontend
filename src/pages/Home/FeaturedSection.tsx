/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCarsQuery } from '../../redux/features/car/car.api';
// import { TCar } from '../../types/car.type';
import ContainerLayout from '../../components/Layout/ContainerLayout';
import { useNavigate } from 'react-router-dom';
import { TCar } from '../../types/car.type';

function FeaturedSection() {
    const { data: carData } = useGetCarsQuery(undefined)
    const navigate = useNavigate();

    const handleNavigate = (id: string) => {
        navigate(`/car/${id}`);
    };

    const trimDescription = (description: string, limit = 100) => {
        if (description.length > limit) {
            return description.slice(0, limit) + '...';
        }
        return description;
    };

    return (
        <section className='py-20 dark:bg-[#0f172a] bg-gray-50 transition-colors duration-300'>
            <ContainerLayout>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Featured <span className="text-blue-600 dark:text-blue-500">Cars</span>
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
                            Experience the pinnacle of automotive engineering with our handpicked selection of premium vehicles.
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate('/car-listing')}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                    >
                        View All Cars
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {carData?.data?.filter((i: TCar) => i.featured).slice(0, 3).map((item: any) => (
                        <div 
                            key={item._id} 
                            className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    src={item.images[0]} 
                                    alt={item.name} 
                                />
                                <div className="absolute top-4 right-4 px-4 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-blue-600 dark:text-blue-400 font-bold text-sm shadow-sm">
                                    {item.type}
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                                    <span className="text-white font-semibold text-lg">{item.pricePerHour} BDT <span className="text-sm font-normal opacity-80">/hr</span></span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h5 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {item.name}
                                </h5>
                                <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed min-h-[4rem]">
                                    {trimDescription(item.description)}
                                </p>
                                
                                <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex gap-2">
                                        {item.features.slice(0, 2).map((feature: string, idx: number) => (
                                            <span key={idx} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => handleNavigate(item._id)} 
                                        className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ContainerLayout>
        </section>
    );
}

export default FeaturedSection;
