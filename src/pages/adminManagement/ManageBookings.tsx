/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetBookingQuery, useUpdateBookingMutation } from '../../redux/features/booking/booking.api';
import { useGetusersQuery } from '../../redux/features/user/user.api';
import { Table, Tag, Button, Select, Space, message, Card } from 'antd';
import Loading from '../../components/Loading';
import moment from 'moment';
import {  HiCheckCircle, HiXCircle } from 'react-icons/hi';

function ManageBookings() {
    const { data: bookingData, isLoading: isBookingLoading } = useGetBookingQuery(undefined);
    const { data: userData, isLoading: isUserLoading } = useGetusersQuery({ role: 'driver' });
    const [updateBooking] = useUpdateBookingMutation();

    if (isBookingLoading || isUserLoading) return <Loading />;

    const drivers = userData?.data?.map((user: any) => ({
        label: user.name,
        value: user._id,
    })) || [];

    const handleUpdate = async (id: string, updateBody: any) => {
        try {
            const res: any = await updateBooking({ id, body: updateBody });
            if (res?.data?.success) {
                message.success('Booking updated successfully');
            } else {
                message.error(res?.error?.data?.message || 'Update failed');
            }
        } catch (error) {
            message.error('Something went wrong');
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
                <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200 mb-0">{record.car?.name}</p>
                    <Tag color="blue" className="text-[9px] font-black uppercase border-none px-2 rounded-full">{record.car?.type}</Tag>
                </div>
            ),
        },
        {
            title: 'Schedule',
            key: 'schedule',
            render: (record: any) => (
                <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200 mb-0">{moment(record.date).format('MMM DD, YYYY')}</p>
                    <p className="text-xs text-blue-600 font-bold">{record.startTime}</p>
                </div>
            ),
        },
        {
            title: 'Driver',
            key: 'driver',
            render: (record: any) => (
                <Select
                    placeholder="Assign Driver"
                    style={{ width: 160 }}
                    defaultValue={record.driver?._id || record.driver}
                    onChange={(value) => handleUpdate(record._id, { driver: value })}
                    options={drivers}
                    className="custom-select"
                />
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
                    {record.status === 'pending' && (
                        <Button 
                            icon={<HiCheckCircle />}
                            onClick={() => handleUpdate(record._id, { status: 'confirmed' })}
                            className="bg-green-600 text-white border-none rounded-xl font-bold flex items-center gap-1"
                        >
                            Confirm
                        </Button>
                    )}
                    {record.status !== 'cancelled' && record.status !== 'completed' && (
                        <Button 
                            icon={<HiXCircle />}
                            onClick={() => handleUpdate(record._id, { status: 'cancelled' })}
                            className="bg-red-50 text-red-600 border-none rounded-xl font-bold flex items-center gap-1 hover:bg-red-100"
                        >
                            Cancel
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Booking <span className="text-blue-600">Management</span></h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Oversee all reservations and coordinate driver assignments.</p>
                </div>
            </div>

            <Card className="rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800" bodyStyle={{ padding: 0 }}>
                <Table 
                    dataSource={bookingData?.data} 
                    columns={columns} 
                    pagination={{ pageSize: 10 }}
                    rowKey="_id"
                    className="custom-table"
                />
            </Card>
        </div>
    );
}

export default ManageBookings;