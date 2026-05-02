
import { useGetCarsQuery } from '../redux/features/car/car.api';
import { TCar } from '../types/car.type';
import PriceFilter from './PriceFilter';
import Loading from './Loading';

type TFilterProps = {
    setSearch: (search: string) => void;
    setSort: (sort: string) => void;
    setPriceRange: (range: number[]) => void;
    setModel: (model: string) => void;
};

function SearchFilterContainer({ setSearch, setSort, setPriceRange, setModel }: TFilterProps) {
    const { data: carData, isLoading } = useGetCarsQuery(undefined);

    // Ensure carData?.data is an array of TCar
    const uniqueColor: string[] = [
        ...new Set((carData?.data as TCar[] | undefined)?.map((item) => item.color) || [])
    ];
    const uniqueType: string[] = [
        ...new Set((carData?.data as TCar[] | undefined)?.map((item) => item.type) || [])
    ];

    const handlePriceChange = (range: number[]) => {
        setPriceRange(range);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <form>
                <div className="relative mb-6 w-full sm:flex sm:items-center sm:justify-between rounded-md">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="h-12 w-full sm:w-80 px-4 py-2 border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-xl transition-all"
                        placeholder="Search vehicles..."
                    />
                </div>

                <div className="flex flex-col">
                    <h3 className="text-xl font-bold p-2 text-gray-900 dark:text-white uppercase tracking-wider text-sm">Color</h3>
                    <hr className="border-gray-100 dark:border-gray-700 mb-4" />
                    <div className="space-y-1">
                        {uniqueColor.map((color, index) => (
                            <p
                                key={index}
                                className="text-sm hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                onClick={() => setSort(color)}
                            >
                                {color}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col mt-8">
                    <h3 className="text-xl font-bold p-2 text-gray-900 dark:text-white uppercase tracking-wider text-sm">Model</h3>
                    <hr className="border-gray-100 dark:border-gray-700 mb-4" />
                    <div className="space-y-1">
                        {uniqueType.map((type, index) => (
                            <p
                                key={index}
                                className="text-sm hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                onClick={() => setModel(type)}
                            >
                                {type}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="py-4 mt-8">
                    <h3 className="text-xl font-bold p-2 text-gray-900 dark:text-white uppercase tracking-wider text-sm">Price Range</h3>
                    <hr className="border-gray-100 dark:border-gray-700 mb-4" />
                    <div className="py-1 pt-10 px-2">
                        <PriceFilter
                            minPrice={0}
                            maxPrice={10000}
                            onPriceChange={handlePriceChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchFilterContainer;
