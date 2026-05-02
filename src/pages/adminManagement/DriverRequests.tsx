import { Button, Table, TableColumnsType, Tag, Space } from 'antd'
import toast from 'react-hot-toast'
import { TUser } from '../../types/user.type'
import { useGetDriverRequestsQuery, useUpdateUserMutation } from '../../redux/features/user/user.api'
import '../style.css'
import Loading from '../../components/Loading'

function DriverRequests() {
    const { data: requestData, isLoading } = useGetDriverRequestsQuery(undefined)
    const [updateUser] = useUpdateUserMutation()

    const tableData = requestData?.data?.map(({ _id, name, email, phone, role, address, status }: TUser) => ({
        key: _id,
        name, email, phone, role, address, status
    }))

    if (isLoading) {
        return <Loading />
    }

    const handleAction = async (id: string, role: string, status: string) => {
        const updateData = {
            id,
            role,
            status,
            isDriverRequested: false
        }
        const toastId = toast.loading('Processing request...')
        try {
            await updateUser(updateData).unwrap()
            toast.success(`Request ${status === 'ACTIVE' ? 'approved' : 'rejected'} successfully`, { id: toastId })
        } catch (error) {
            toast.error('Something went wrong', { id: toastId })
        }
    }

    const columns: TableColumnsType<TUser> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color="orange">{status}</Tag>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (item) => (
                <Space size="middle">
                    <Button 
                        type="primary" 
                        className="bg-green-600 hover:bg-green-700 border-none"
                        onClick={() => handleAction(item.key, 'driver', 'ACTIVE')}
                    >
                        Approve
                    </Button>
                    <Button 
                        danger 
                        onClick={() => handleAction(item.key, 'user', 'REJECTED')}
                    >
                        Reject
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Driver Requests</h2>
                <Tag color="blue" className="px-4 py-1 rounded-full font-bold uppercase">{tableData?.length || 0} Pending</Tag>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={{ pageSize: 10 }}
                    className="custom-table"
                />
            </div>
        </div>
    )
}

export default DriverRequests
