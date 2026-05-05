/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUnassignedBookingsQuery, useClaimBookingMutation } from '../../redux/features/booking/booking.api';
import Loading from '../../components/Loading';
import { Table, Button, message, Tag } from 'antd';
import moment from 'moment';
import { HiOutlineSearch, HiOutlineLightningBolt } from 'react-icons/hi';

function AvailableTrips() {
    const { data: bookingData, isLoading } = useGetUnassignedBookingsQuery(undefined);
    const [claimBooking] = useClaimBookingMutation();

    if (isLoading) return <Loading />;

    const handleClaim = async (id: string) => {
        try {
            const res: any = await claimBooking(id);
            if (res?.data?.success) {
                message.success('Trip assigned to you successfully!');
            } else {
                message.error(res?.error?.data?.message || 'Failed to claim trip');
            }
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    const columns = [
        {
            title: 'Vehicle',
            dataIndex: 'car',
            key: 'car',
            render: (car: any) => (
                <div className="flex items-center gap-3">
                    <img src={car?.images?.[0]} alt={car?.name} className="w-12 h-8 object-cover rounded-lg" />
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white mb-0">{car?.name}</p>
                        <Tag color="blue" className="text-[9px] font-black uppercase border-none px-2 rounded-full">{car?.type}</Tag>
                    </div>
                </div>
            ),
        },
        {
            title: 'Location',
            dataIndex: 'pickUpLocation',
            key: 'location',
            render: (loc: string) => (
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 max-w-[200px] line-clamp-1">{loc}</p>
            )
        },
        {
            title: 'Date & Time',
            key: 'schedule',
            render: (record: any) => (
                <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200 mb-0">{moment(record.date).format('MMM DD, YYYY')}</p>
                    <p className="text-xs text-blue-600 font-bold">{record.startTime}</p>
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <Button 
                    onClick={() => handleClaim(record._id)}
                    className="bg-indigo-600 text-white border-none rounded-xl font-bold h-10 px-6 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
                >
                    <HiOutlineLightningBolt />
                    Assign to Me
                </Button>
            ),
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Available <span className="text-indigo-600">Trips</span></h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Find and claim new booking assignments in your area.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <Table 
                    dataSource={bookingData?.data} 
                    columns={columns} 
                    pagination={false}
                    className="custom-table"
                    rowKey="_id"
                />
            </div>

            {bookingData?.data?.length === 0 && (
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[40px] p-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <HiOutlineSearch size={64} className="mx-auto text-gray-300 mb-6" />
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No Available Trips</h3>
                    <p className="text-gray-500">All bookings are currently assigned. Check back later for new tasks!</p>
                </div>
            )}
        </div>
    );
}

export default AvailableTrips;
