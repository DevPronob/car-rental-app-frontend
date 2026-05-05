/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMeQuery } from '../../redux/features/user/user.api';
import { useGetDriverBookingsQuery } from '../../redux/features/booking/booking.api';
import Loading from '../../components/Loading';
import { HiOutlineClipboardList, HiOutlineTruck, HiOutlineCurrencyDollar } from 'react-icons/hi';

function DriverOverview() {
    const { data: meData, isLoading: isMeLoading } = useGetMeQuery(undefined);
    const { data: bookingData, isLoading: isBookingLoading, error: bookingError } = useGetDriverBookingsQuery(undefined);


    if (isMeLoading || isBookingLoading) return <Loading />;

    if (bookingError) {
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 text-center">
                <p className="text-red-500 font-bold">Failed to load dashboard data. Please try again later.</p>
            </div>
        );
    }

    const bookings = bookingData?.data || [];
    const completedTrips = bookings.filter((b: any) => b.status === 'completed');
    const ongoingTrips = bookings.filter((b: any) => b.status === 'ongoing' || b.status === 'confirmed');

    const totalEarnings = completedTrips.reduce((acc: number, curr: any) => acc + (curr.costWithFeature || 0), 0);

    const stats = [
        { label: 'Active Trips', value: ongoingTrips.length.toString(), icon: <HiOutlineTruck size={24} />, color: 'bg-blue-500' },
        { label: 'Total Completed', value: completedTrips.length.toString(), icon: <HiOutlineClipboardList size={24} />, color: 'bg-green-500' },
        { label: 'Total Earnings', value: `$${Math.floor(totalEarnings)}`, icon: <HiOutlineCurrencyDollar size={24} />, color: 'bg-purple-500' },
    ];

    console.log(bookingData, meData)

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-[40px] p-8 shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/40 rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-4xl border-2 border-white dark:border-gray-800 shadow-xl">
                    {meData?.data.name?.[0].toUpperCase()}
                </div>
                <div className="text-center md:text-left flex-1">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">{meData?.data.name}</h1>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">
                            Professional Driver
                        </span>
                        <span className="px-4 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-black uppercase tracking-widest border border-green-100 dark:border-green-800">
                            Active Status
                        </span>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Driver Rating</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">5.0 <span className="text-yellow-400 text-xl">★</span></p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform cursor-default">
                        <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-${stat.color.split('-')[1]}-500/20`}>
                            {stat.icon}
                        </div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity or Welcome Message */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl font-black mb-4 tracking-tight">Great job today!</h2>
                    <p className="text-blue-100 text-lg font-medium leading-relaxed mb-8">
                        You have completed <b>{completedTrips.length} trips</b> and earned <b>${Math.floor(totalEarnings)}</b> so far. Check your "My Trips" section to see your full history or start new assignments.
                    </p>
                    <button className="h-14 px-8 bg-white text-blue-600 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform active:scale-95">
                        View Trip History
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-colors"></div>
            </div>
        </div>
    );
}

export default DriverOverview;
