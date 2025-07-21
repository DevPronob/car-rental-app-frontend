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

    const { data: carData, isLoading } = useGetCarsQuery({
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

    if (isLoading) {
        return <Loading />;
    }

    const handleNavigate = (id: string) => {
        navigate(`/car/${id}`);
    };

    return (
        <div className='text-black dark:bg-[#141D2E] text-white'>
            <ContainerLayout>
                <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-8">
                    {/* First Column - Search Options */}
                    <div>
                        <div className="bg-white p-4 shadow-md rounded-lg dark:bg-[#141D2E] text-white">
                            <h3 className="text-blue-800 font-bold mb-4 text-lg md:text-xl">Search Option</h3>
                            <SearchFilterContainer setModel={setModel} setPriceRange={setPriceRange} setSearch={setSearch} setSort={setSort} />
                            <Button onClick={handleReset} className="w-full bg-blue-800 py-3 text-white mt-5">
                                Reset
                            </Button>
                        </div>
                    </div>

                    {/* Second Column - Car Listings */}
                    <div className="space-y-8">
                        {Array.isArray(carData?.data) && carData.data.map((items: TCar) => (
                            <div key={items._id} className="border border-gray-300 shadow-lg rounded-lg overflow-hidden text-black dark:text-white">
                                <div className="flex flex-col md:flex-row items-center">
                                    {/* Image Section */}
                                    <div className="w-full md:w-1/3 p-4">
                                        <img
                                            src={items.images[0]}
                                            className="w-full h-auto rounded-lg"
                                            alt={items.name}
                                        />
                                    </div>

                                    {/* Car Information Section */}
                                    <div className="w-full md:w-2/3 p-6 text-black dark:text-white">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-xl md:text-2xl font-bold text-blue-800">{items.name}</h2>
                                            <h4 className="text-blue-800  p-2 md:p-4 rounded-lg text-sm md:text-lg">
                                                ${items.pricePerHour} / Per Hour
                                            </h4>
                                        </div>

                                        {/* <p className="text-sm md:text-base text-gray-600 mb-4 dark:text-white">{items.description}</p> */}

                                        <div className="grid grid-cols-3 gap-3 md:gap-6 text-center">
                                            <div>
                                                <p className="text-xs md:text-sm text-gray-400">Fuel Type</p>
                                                <h5 className="text-base font-semibold text-black dark:text-white">{items.isElectric ? 'Electric' : 'Not Electric'}</h5>
                                            </div>
                                            <div>
                                                <p className="text-xs md:text-sm text-gray-400">Status</p>
                                                <h5 className="text-base font-semibold text-black dark:text-white">{items.status}</h5>
                                            </div>
                                            <div>
                                                <p className="text-xs md:text-sm text-gray-400">Color</p>
                                                <h5 className="text-base font-semibold text-black dark:text-white">{items.color}</h5>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-3">
                                            {/* <Button className="bg-blue-800 text-white py-2 px-4 rounded-md w-full md:w-auto">
                                                Add to Compare
                                            </Button> */}
                                            <Button onClick={() => handleNavigate(items._id)} className="bg-blue-500 text-white py-4 px-4 rounded-md w-full md:w-auto">
                                                More Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ContainerLayout>
        </div>
    );
}

export default CarListing;
