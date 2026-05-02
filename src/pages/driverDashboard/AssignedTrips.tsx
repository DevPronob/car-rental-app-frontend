import { useGetDriverBookingsQuery, useUpdateBookingMutation } from '../../redux/features/booking/booking.api';
import Loading from '../../components/Loading';
import { Table, Tag, Button, Space, message, Tabs, Modal, Descriptions, Divider } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { HiOutlineTruck, HiOutlineClock, HiOutlineCheckCircle, HiOutlineDocumentText, HiOutlineCurrencyDollar } from 'react-icons/hi';

function AssignedTrips() {
    const { data: bookingData, isLoading, error } = useGetDriverBookingsQuery(undefined);
    const [updateBooking] = useUpdateBookingMutation();
    const [selectedTrip, setSelectedTrip] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) return <Loading />;
    
    if (error) {
        console.log('Booking Fetch Error:', error);
        const errorMsg = (error as any)?.data?.message || 'Failed to fetch trips. Please ensure you have the correct permissions.';
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 text-center">
                <p className="text-red-500 font-bold mb-4">{errorMsg}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    const bookings = bookingData?.data || [];
    const activeTrips = bookings.filter((b: any) => b.status !== 'completed' && b.status !== 'cancelled');
    const pastTrips = bookings.filter((b: any) => b.status === 'completed' || b.status === 'cancelled');

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            const res: any = await updateBooking({ id, body: { status } });
            if (res?.data?.success) {
                message.success(`Trip status updated to ${status}`);
            } else {
                message.error(res?.error?.data?.message || 'Update failed');
            }
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    const showTripDetails = (record: any) => {
        setSelectedTrip(record);
        setIsModalOpen(true);
    };

    const columns = (showActions: boolean) => [
        {
            title: 'Vehicle',
            key: 'vehicle',
            render: (record: any) => (
                <div className="flex items-center gap-3">
                    {record.car?.images?.[0] ? (
                        <img src={record.car.images[0]} alt="" className="w-12 h-8 object-cover rounded-lg" />
                    ) : (
                        <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                            <HiOutlineTruck size={20} />
                        </div>
                    )}
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white mb-0">{record.car?.name || 'N/A'}</p>
                        <Tag color="blue" className="text-[9px] font-black uppercase border-none px-2 rounded-full">{record.car?.type}</Tag>
                    </div>
                </div>
            ),
        },
        {
            title: 'Customer',
            key: 'customer',
            render: (record: any) => (
                <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200 mb-0">{record.customerDetails?.name}</p>
                    <p className="text-xs text-gray-500">{record.customerDetails?.email}</p>
                </div>
            ),
        },
        {
            title: 'Schedule',
            key: 'schedule',
            render: (record: any) => (
                <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200 mb-0">{moment(record.date).format('MMM DD, YYYY')}</p>
                    <p className="text-xs text-blue-600 font-bold">{record.startTime} - {record.endTime || 'Ongoing'}</p>
                </div>
            ),
        },
        {
            title: 'Cost',
            key: 'cost',
            render: (record: any) => (
                <span className="font-black text-gray-900 dark:text-white">
                    {record.costWithFeature ? `$${Math.floor(record.costWithFeature)}` : 'Pending'}
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const colors: Record<string, string> = {
                    pending: 'gold',
                    confirmed: 'blue',
                    ongoing: 'orange',
                    completed: 'green',
                    cancelled: 'red',
                };
                return (
                    <Tag color={colors[status]} className="font-black uppercase text-[10px] px-3 py-0.5 rounded-full border-none">
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <Space size="middle">
                    {showActions && (record.status === 'confirmed' || record.status === 'pending') && (
                        <Button 
                            onClick={() => handleStatusUpdate(record._id, 'ongoing')}
                            className="bg-blue-600 text-white border-none rounded-xl font-bold h-10 px-6 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                        >
                            Start Trip
                        </Button>
                    )}
                    {showActions && record.status === 'ongoing' && (
                        <Button 
                            onClick={() => handleStatusUpdate(record._id, 'completed')}
                            className="bg-green-600 text-white border-none rounded-xl font-bold h-10 px-6 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
                        >
                            Complete Trip
                        </Button>
                    )}
                    <Button 
                        icon={<HiOutlineDocumentText size={18} />}
                        onClick={() => showTripDetails(record)}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-none rounded-xl font-bold h-10 px-4 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                        Details
                    </Button>
                </Space>
            ),
        },
    ];

    const tabItems = [
        {
            key: 'active',
            label: (
                <span className="flex items-center gap-2 px-4">
                    <HiOutlineClock />
                    Active Trips
                </span>
            ),
            children: (
                <div className="bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <Table 
                        dataSource={activeTrips} 
                        columns={columns(true)} 
                        pagination={false}
                        rowKey="_id"
                        locale={{ emptyText: <div className="p-20 text-center text-gray-400">No active trips found.</div> }}
                    />
                </div>
            ),
        },
        {
            key: 'history',
            label: (
                <span className="flex items-center gap-2 px-4">
                    <HiOutlineCheckCircle />
                    Trip History
                </span>
            ),
            children: (
                <div className="bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <Table 
                        dataSource={pastTrips} 
                        columns={columns(false)} 
                        pagination={{ pageSize: 10 }}
                        rowKey="_id"
                        locale={{ emptyText: <div className="p-20 text-center text-gray-400">No trip history yet.</div> }}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">My <span className="text-blue-600">Trips</span></h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Manage your current schedule and review your driving history.</p>
            </div>

            <Tabs defaultActiveKey="active" items={tabItems} className="premium-tabs" />

            {/* Trip Details Modal */}
            <Modal
                title={<span className="text-2xl font-black tracking-tight">Trip <span className="text-blue-600">Summary</span></span>}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
                width={600}
                className="premium-modal"
            >
                {selectedTrip && (
                    <div className="pt-4 space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-[32px] border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-6">
                                <img src={selectedTrip.car?.images?.[0]} className="w-24 h-16 object-cover rounded-xl shadow-lg" alt="" />
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-0">{selectedTrip.car?.name}</h3>
                                    <p className="text-blue-600 font-bold uppercase text-xs tracking-widest">{selectedTrip.car?.type}</p>
                                </div>
                            </div>
                        </div>

                        <Descriptions column={1} bordered className="custom-descriptions">
                            <Descriptions.Item label="Customer">{selectedTrip.customerDetails?.name}</Descriptions.Item>
                            <Descriptions.Item label="Pick-up Location">{selectedTrip.pickUpLocation}</Descriptions.Item>
                            <Descriptions.Item label="Date">{moment(selectedTrip.date).format('MMMM DD, YYYY')}</Descriptions.Item>
                            <Descriptions.Item label="Duration">{selectedTrip.startTime} - {selectedTrip.endTime || 'Ongoing'}</Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color={selectedTrip.status === 'completed' ? 'green' : 'blue'} className="font-bold uppercase text-[10px]">
                                    {selectedTrip.status}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider className="my-0" />

                        <div className="flex justify-between items-center bg-blue-600 p-6 rounded-[32px] text-white shadow-xl shadow-blue-600/20">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Bill Amount</p>
                                <h2 className="text-3xl font-black mb-0">${Math.floor(selectedTrip.costWithFeature || 0)}</h2>
                            </div>
                            <HiOutlineCurrencyDollar size={48} className="opacity-20" />
                        </div>

                        <p className="text-center text-gray-400 text-xs font-medium">
                            * Total cost is calculated based on hours driven and additional features.
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default AssignedTrips;
