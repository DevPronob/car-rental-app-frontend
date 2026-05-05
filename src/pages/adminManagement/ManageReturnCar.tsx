/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useGetBookingQuery, useReturnCarBookingMutation } from '../../redux/features/booking/booking.api';
import { Table, Tag, Button,  message, Modal,  Card } from 'antd';
import Loading from '../../components/Loading';
import moment from 'moment';
import { HiOutlineArrowCircleDown, HiOutlineClock } from 'react-icons/hi';

function ManageReturnCar() {
    const { data: bookingData, isLoading } = useGetBookingQuery(undefined);
    const [returnCar] = useReturnCarBookingMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);

    if (isLoading) return <Loading />;

    const handleReturn = async (values: any) => {
        try {
            const res: any = await returnCar({
                bookingId: selectedBooking._id,
                endTime: values.endTime,
            }).unwrap();
            
            if (res.success) {
                message.success('Car returned and booking completed!');
                setIsModalOpen(false);
            }
        } catch (error: any) {
            message.error(error?.data?.message || 'Failed to return car');
        }
    };

    const columns = [
        {
            title: 'Customer',
            key: 'customer',
            render: (record: any) => (
                <div>
                    <p className="font-bold text-gray-900 dark:text-white mb-0">{record.customerDetails?.name}</p>
                    <p className="text-xs text-gray-500">{record.customerDetails?.email}</p>
                </div>
            ),
        },
        {
            title: 'Vehicle',
            key: 'vehicle',
            render: (record: any) => (
                <div className="flex items-center gap-3">
                    <img src={record.car?.images?.[0]} alt="" className="w-10 h-8 object-cover rounded" />
                    <p className="font-bold text-gray-800 dark:text-gray-200 mb-0">{record.car?.name}</p>
                </div>
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
            title: 'Schedule',
            key: 'schedule',
            render: (record: any) => (
                <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200 mb-0">{moment(record.date).format('MMM DD')}</p>
                    <p className="text-xs text-blue-600 font-bold">{record.startTime} - {record.endTime || '...'}</p>
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <Button 
                    disabled={record.status === 'completed' || record.status === 'cancelled'}
                    onClick={() => {
                        setSelectedBooking(record);
                        setIsModalOpen(true);
                    }}
                    icon={<HiOutlineArrowCircleDown />}
                    className={`flex items-center gap-2 border-none font-bold rounded-xl h-10 px-4 ${
                        record.status === 'completed' 
                        ? 'bg-gray-100 text-gray-400' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20'
                    }`}
                >
                    {record.status === 'completed' ? 'Returned' : 'Return Car'}
                </Button>
            ),
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Return <span className="text-indigo-600">Vehicle</span></h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Process car returns and finalize booking costs.</p>
            </div>

            <Card className="rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800" bodyStyle={{ padding: 0 }}>
                <Table 
                    dataSource={bookingData?.data} 
                    columns={columns} 
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                    className="custom-table"
                />
            </Card>

            <Modal
                title={<span className="text-2xl font-black tracking-tight">Finalize <span className="text-indigo-600">Return</span></span>}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
            >
                <div className="p-4 space-y-6 text-center">
                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-indigo-600">
                        <HiOutlineClock size={40} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Specify End Time</h3>
                        <p className="text-gray-500">Please provide the actual return time for <b>{selectedBooking?.car?.name}</b></p>
                    </div>
                    
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleReturn({ endTime: formData.get('endTime') });
                    }} className="space-y-4">
                        <input 
                            type="time" 
                            name="endTime" 
                            required 
                            className="w-full h-14 bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 font-bold text-lg focus:border-indigo-600 outline-none transition-all"
                        />
                        <Button 
                            htmlType="submit" 
                            className="w-full h-14 bg-indigo-600 text-white border-none rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/20"
                        >
                            Complete Return Process
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default ManageReturnCar;