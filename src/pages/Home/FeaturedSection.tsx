/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCarsQuery } from '../../redux/features/car/car.api';
// import { TCar } from '../../types/car.type';
import ContainerLayout from '../../components/Layout/ContainerLayout';
import { useNavigate } from 'react-router-dom';
import { TCar } from '../../types/car.type';

function FeaturedSection() {
    const { data: carData } = useGetCarsQuery(undefined)
    const navigate = useNavigate();
    console.log(carData, "carData")

    const handleNavigate = (id: string) => {
        navigate(`/car/${id}`);
    };
    const trimDescription = (description: string, limit = 200) => {
        if (description.length > limit) {
            return description.slice(0, limit) + '...';
        }
        return description;
        
    };
    return (
        <div className='dark:bg-[#141D2E] text-white'>
            <ContainerLayout>
                <div className="py-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Cars</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {carData?.data?.filter((i: TCar) => i.featured).map((item: any) => (
                        <div key={item._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full">
                            <a href="#">
                                <img className="rounded-t-lg w-full h-64 object-cover" src={item.images[0]} alt="" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                </a>
                                <hr />
                                <div>
                                    <p className="mb-3 font-normal text-gray-600 dark:text-white">{trimDescription(item.description)}</p>
                                    <h3 className="text-xl text-gray-900 mb-2 dark:text-white">
                                        <span className="text-2xl">{item.pricePerHour} BDT </span>/ Per Hour
                                    </h3>
                                    <div>
                                        <a onClick={() => handleNavigate(item._id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Details
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ContainerLayout>
        </div>
    );
}

export default FeaturedSection;
