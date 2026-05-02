
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetSingleCarQuery } from '../../redux/features/car/car.api';
import ContainerLayout from '../../components/Layout/ContainerLayout';
import InputField from '../../components/Form/InputField';
import FormContainer from '../../components/Form/FormContainer';
import { Button } from 'antd';
import DateField from '../../components/Form/DateField';
import TimeFieldPicker from '../../components/Form/TimeFieldPicker';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useCreateBookingMutation } from '../../redux/features/booking/booking.api';
import toast from 'react-hot-toast';
import moment from 'moment';
import LocationSelector from '../../components/Form/LocationSelector';

function Booking() {
    const [createBooking] = useCreateBookingMutation();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { data: carData, isLoading } = useGetSingleCarQuery((state?.carId) as string);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center dark:bg-[#0f172a] transition-colors"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    if (!carData?.data || !state) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center dark:bg-[#0f172a] bg-gray-50 p-6 text-center">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Reservation Link Expired</h2>
                <p className="text-gray-500 mb-8">We couldn't find the vehicle details for this booking. Please try starting from the fleet page again.</p>
                <Button onClick={() => navigate('/car-listing')} className="h-12 px-8 bg-blue-600 text-white rounded-xl border-none font-bold">Browse Vehicles</Button>
            </div>
        );
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Processing your booking...');
        const formattedDate = moment(new Date(data.date)).format('YYYY-MM-DD');
        const startTime = moment(new Date(data.startTime)).format('HH:mm');

        const bookingInfo = {
            car: carData?.data._id,
            email: data.email,
            date: formattedDate,
            pickUpLocation: data.pickUpLocation,
            coordinates: data.coordinates,
            costWithFeature: state.totalPrice,
            startTime: startTime,
            customerDetails: {
                name: data.name,
                email: data.email,
                nid: data.nid,
                drivingLicense: data.drivingLicense
            },
            additationalFeatures: {
                childSeat: state.childSeat,
                gps: state.gps,
                mobileWifi: state.mobileWifi
            }
        };

        try {
            const res: any = await createBooking(bookingInfo);
            if (res?.data?.success) {
                toast.success('Booking Successful!', { id: toastId });
                navigate('/user/dashboard/booking-management');
            } else {
                toast.error(res?.error?.data?.message || 'Booking failed', { id: toastId });
            }
        } catch (error) {
            toast.error('Something went wrong', { id: toastId });
        }
    };

    return (
        <div className='min-h-screen py-16 dark:bg-[#0f172a] bg-gray-50 transition-colors duration-300'>
            <ContainerLayout>
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-12 tracking-tight">Complete Your <span className="text-blue-600">Booking</span></h1>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-12">
                        {/* Left Column: Summary */}
                        <div className="space-y-8">
                            <div className="bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                                <div className="h-56 relative">
                                    <img src={carData?.data?.images?.[0]} alt={carData?.data?.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6">
                                        <h2 className="text-2xl font-black text-white">{carData?.data?.name}</h2>
                                        <p className="text-blue-400 font-bold text-sm uppercase tracking-widest">{carData?.data?.type}</p>
                                    </div>
                                </div>
                                
                                <div className="p-8 space-y-6">
                                    <div>
                                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Selected Features</h3>
                                        <div className="space-y-3">
                                            {[
                                                { label: 'Child Seat', active: state.childSeat },
                                                { label: 'GPS Navigation', active: state.gps },
                                                { label: 'Mobile WiFi', active: state.mobileWifi }
                                            ].filter(f => f.active).map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                                    <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                                                    </div>
                                                    <span className="font-bold text-sm">{feature.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Investment</p>
                                                <p className="text-4xl font-black text-blue-600 tracking-tighter">${state.totalPrice}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Paid securely via</p>
                                                <div className="flex gap-2 mt-1 grayscale opacity-50">
                                                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-600/20">
                                <h4 className="font-bold mb-2">Safe & Secure</h4>
                                <p className="text-sm text-blue-100 leading-relaxed">Your data is encrypted and protected. Our premium insurance covers all bookings automatically.</p>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div className="bg-white dark:bg-gray-800 p-10 md:p-14 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Customer Information</h3>
                            <FormContainer width="100%" onSubmit={onSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                    <InputField type='text' name='name' label='Full Name' />
                                    <InputField type='text' name='email' label='Email Address' />
                                    <InputField type='text' name='nid' label='National ID / Passport' />
                                    <InputField type='text' name='drivingLicense' label='Driving License' />
                                    <div className="md:col-span-2">
                                        <LocationSelector name='pickUpLocation' label='Pick Up Location' />
                                    </div>
                                    <DateField name='date' label='Pickup Date' />
                                    <TimeFieldPicker name='startTime' label='Pickup Time' />
                                </div>
                                <div className="mt-10">
                                    <Button 
                                        className='w-full h-16 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl font-black text-xl shadow-xl shadow-blue-600/30 transition-all active:scale-95' 
                                        htmlType='submit'
                                    >
                                        Confirm Reservation
                                    </Button>
                                    <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest mt-6">No hidden fees • Free cancellation up to 24h</p>
                                </div>
                            </FormContainer>
                        </div>
                    </div>
                </div>
            </ContainerLayout>
        </div>
    );
}

export default Booking