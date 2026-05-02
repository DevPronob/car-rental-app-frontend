import { useState } from 'react';
import ContainerLayout from '../../components/Layout/ContainerLayout';
import { useGetCarsQuery } from '../../redux/features/car/car.api';
import { TCar } from '../../types/car.type';
import SearchFilterContainer from '../../components/SearchFilterContainer';
import { Button } from 'antd';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
//k
function CarListing() {
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [priceRange, setPriceRange] = useState<number[]>([]);
    const [sort, setSort] = useState<string>('');
    const [model, setModel] = useState<string>('');

    const { data: carData, isLoading, isError, error } = useGetCarsQuery({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        color: sort || undefined,
        searchTerm: search || undefined,
        type: model || undefined
    });

    const handleReset = () => {
        setSearch('');
        setSort('');
        setModel('');
        setPriceRange([]);
    };

    const handleNavigate = (id: string) => {
        navigate(`/car/${id}`);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-[#0f172a] bg-gray-50">
                <div className="text-center space-y-4 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
                    <h2 className="text-2xl font-black text-red-500 tracking-tight">Oops! Something went wrong</h2>
                    <p className="text-gray-500 font-medium">{(error as any)?.data?.message || 'Failed to connect to the server'}</p>
                    <Button onClick={() => window.location.reload()} className="h-12 px-8 bg-blue-600 text-white rounded-xl font-bold">Retry</Button>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen py-16 dark:bg-[#0f172a] bg-gray-50 text-gray-900 dark:text-white transition-colors duration-300'>
            <ContainerLayout>
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
                    {/* Filter Sidebar */}
                    <aside className="space-y-8">
                        <div className="sticky top-28 bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black tracking-tight text-blue-600">Filters</h3>
                                <button onClick={handleReset} className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors">
                                    Reset
                                </button>
                            </div>
                            <SearchFilterContainer 
                                setModel={setModel} 
                                setPriceRange={setPriceRange} 
                                setSearch={setSearch} 
                                setSort={setSort} 
                            />
                        </div>
                    </aside>

                    {/* Listings Grid */}
                    <main className="space-y-8">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-500 font-medium">Showing <span className="text-gray-900 dark:text-white font-bold">{carData?.data?.length || 0}</span> luxury vehicles</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            {carData?.data && carData.data.length > 0 ? (
                                carData.data.map((items: TCar) => (
                                    <div 
                                        key={items._id} 
                                        className="group bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500 transform hover:-translate-y-1"
                                    >
                                        <div className="flex flex-col xl:flex-row">
                                            {/* Image Section */}
                                            <div className="relative w-full xl:w-[40%] h-[300px] overflow-hidden">
                                                <img
                                                    src={items.images[0]}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    alt={items.name}
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600">
                                                        {items.type}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Info Section */}
                                            <div className="flex-1 p-8 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h2 className="text-3xl font-black mb-2 group-hover:text-blue-600 transition-colors">{items.name}</h2>
                                                            <div className="flex gap-2">
                                                                <span className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded ${items.status === 'available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                                    {items.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-4xl font-black text-blue-600 tracking-tighter">${items.pricePerHour}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Per Hour</p>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 text-sm">
                                                        {items.description}
                                                    </p>

                                                    <div className="grid grid-cols-3 gap-4 border-t border-gray-50 dark:border-gray-700 pt-6">
                                                        <div className="text-center">
                                                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Fuel</p>
                                                            <p className="text-sm font-bold text-gray-900 dark:text-gray-200">{items.isElectric ? 'Electric' : 'Petrol'}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Color</p>
                                                            <p className="text-sm font-bold text-gray-900 dark:text-gray-200">{items.color}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Year</p>
                                                            <p className="text-sm font-bold text-gray-900 dark:text-gray-200">{items.year || '2023'}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-8 flex justify-end">
                                                    <Button 
                                                        onClick={() => handleNavigate(items._id)} 
                                                        className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl font-bold flex items-center gap-2 transition-all group/btn"
                                                    >
                                                        Details
                                                        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-[40px] shadow-lg border border-gray-100 dark:border-gray-700">
                                    <div className="text-6xl mb-6">🔍</div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No cars found</h3>
                                    <p className="text-gray-500 font-medium">Try adjusting your filters or search terms.</p>
                                    <Button onClick={handleReset} className="mt-6 h-12 px-8 bg-blue-600 text-white rounded-xl font-bold border-none">Clear Filters</Button>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </ContainerLayout>
        </div>
    );
}

export default CarListing;
