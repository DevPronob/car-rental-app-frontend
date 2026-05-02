/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, TableColumnsType } from 'antd'

import { useDeleteBookingMutation, useGetMyBookingQuery } from '../../redux/features/booking/booking.api'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'

function BookingManagement() {
    const { data: bookingData, isLoading } = useGetMyBookingQuery(undefined);
    const [deleteBooking] = useDeleteBookingMutation();

    if (isLoading) return <Loading />;

    const handleCancel = async (id: string) => {
        const toastId = toast.loading('Cancelling booking...');
        try {
            await deleteBooking({ id }).unwrap();
            toast.success('Booking cancelled successfully', { id: toastId });
        } catch (error) {
            toast.error('Failed to cancel booking', { id: toastId });
        }
    };

    const columns: TableColumnsType<any> = [
        {
            title: 'VEHICLE',
            key: 'car',
            render: (item) => (
                <div className="flex flex-col">
                    <span className="font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.car?.name}</span>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.car?.type || 'Luxury'}</span>
                </div>
            )
        },
        {
            title: 'SCHEDULE',
            key: 'schedule',
            render: (item) => (
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.date}</span>
                    <span className="text-xs text-gray-400 font-medium">{item.startTime} - {item.endTime || 'Ongoing'}</span>
                </div>
            )
        },
        {
            title: 'TOTAL COST',
            dataIndex: 'costWithFeature',
            render: (cost) => <span className="text-lg font-black text-blue-600 tracking-tighter">${cost}</span>
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            render: (status) => (
                <span className={`
                    px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
                    ${status === 'confirmed' 
                        ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:border-green-800' 
                        : 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800'}
                `}>
                    {status}
                </span>
            )
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <Button 
                        disabled={item.status === 'confirmed'} 
                        onClick={() => handleCancel(item._id)}
                        className={`
                            h-10 px-6 rounded-xl font-bold transition-all
                            ${item.status === 'confirmed' 
                                ? 'bg-gray-100 text-gray-400 border-none' 
                                : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white dark:bg-red-900/20 dark:border-red-800'}
                        `}
                    >
                        Cancel
                    </Button>
                </div>
            )
        },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-gray-700">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Booking <span className="text-blue-600">History</span></h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Manage and track your premium vehicle reservations.</p>
            </div>
            <div className="overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={bookingData?.data}
                    rowKey="_id"
                    pagination={{ pageSize: 6 }}
                    className="custom-table"
                />
            </div>
        </div>
    );
}

export default BookingManagement