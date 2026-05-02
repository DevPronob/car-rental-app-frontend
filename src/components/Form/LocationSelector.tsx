import { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import axios from 'axios';
import { useDebounceValue } from 'usehooks-ts';
import { HiOutlineLocationMarker, HiSearch } from 'react-icons/hi';

interface LocationSelectorProps {
    name: string;
    label: string;
}

const LocationSelector = ({ name, label }: LocationSelectorProps) => {
    const { control, setValue, watch } = useFormContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [debouncedSearch] = useDebounceValue(searchTerm, 500);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (debouncedSearch.length < 3) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${debouncedSearch}&countrycodes=bd&limit=5&addressdetails=1`
                );
                setSuggestions(response.data);
                setIsOpen(true);
            } catch (error) {
                console.error('Error fetching locations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [debouncedSearch]);

    const handleSelect = (suggestion: any) => {
        const displayName = suggestion.display_name;
        const lat = parseFloat(suggestion.lat);
        const lon = parseFloat(suggestion.lon);

        setValue(name, displayName);
        setValue('coordinates', { lat, lng: lon });
        
        setSearchTerm(displayName);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col gap-2 mb-4 relative">
            <label className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest ml-1">
                {label}
            </label>
            
            <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <HiOutlineLocationMarker size={20} />
                </div>
                
                <Controller
                    name={name}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <input
                                {...field}
                                type="text"
                                placeholder="Search location in Bangladesh..."
                                autoComplete="off"
                                className={`
                                    w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-gray-900/50 
                                    border-2 rounded-2xl outline-none transition-all font-bold
                                    ${error 
                                        ? 'border-red-100 dark:border-red-900/30 text-red-600' 
                                        : 'border-gray-100 dark:border-gray-700 focus:border-blue-600 dark:focus:border-blue-500 text-gray-900 dark:text-white'}
                                `}
                                onChange={(e) => {
                                    field.onChange(e);
                                    setSearchTerm(e.target.value);
                                }}
                                onFocus={() => setIsOpen(suggestions.length > 0)}
                            />
                            {error && <span className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-1 ml-2">{error.message}</span>}
                        </>
                    )}
                />

                {loading && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div className="absolute z-50 top-full left-0 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleSelect(suggestion)}
                            className="w-full text-left px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-50 dark:border-gray-700 last:border-none flex items-start gap-3"
                        >
                            <HiSearch className="mt-1 text-gray-400 shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                                    {suggestion.display_name.split(',')[0]}
                                </p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium line-clamp-1 uppercase">
                                    {suggestion.display_name.split(',').slice(1).join(',')}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSelector;
