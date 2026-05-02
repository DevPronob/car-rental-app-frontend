/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useCreateCarMutation, useDeleteCarMutation, useGetCarsQuery, useUpdateCarMutation } from '../../redux/features/car/car.api';
import Loading from '../../components/Loading';
import { TCar } from '../../types/car.type';
import { Button, Col, Form, Input, Modal, Row, Table, Tag, Space, Card, Popconfirm } from 'antd';
import FormContainer from '../../components/Form/FormContainer';
import InputField from '../../components/Form/InputField';
import TextAreaField from '../../components/Form/TextAreaField';
import InputFieldWithWatch from '../../components/Form/InputFieldWithWatch';
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ColumnsType } from 'antd/es/table';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlinePhotograph } from 'react-icons/hi';

function ManageCar() {
    const { data: carData, isLoading } = useGetCarsQuery(undefined);
    const [deleteCar] = useDeleteCarMutation();

    if (isLoading) return <Loading />;

    const tableData = Array.isArray(carData?.data)
        ? carData.data.map((car: TCar) => ({
            ...car,
            key: car._id,
            model: car.type,
        }))
        : [];

    const handleDelete = async (id: string) => {
        const toastId = toast.loading('Processing...');
        try {
            const res = await deleteCar(id).unwrap();
            if (res.success) {
                toast.success('Vehicle deleted successfully', { id: toastId });
            }
        } catch (error) {
            toast.error('Failed to delete vehicle', { id: toastId });
        }
    };

    const columns: ColumnsType<any> = [
        {
            title: 'Vehicle',
            key: 'vehicle',
            render: (record) => (
                <div className="flex items-center gap-4">
                    {record.images?.[0] ? (
                        <img src={record.images[0]} alt={record.name} className="w-16 h-12 object-cover rounded-xl shadow-md" />
                    ) : (
                        <div className="w-16 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400">
                            <HiOutlinePhotograph size={24} />
                        </div>
                    )}
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white mb-0">{record.name}</p>
                        <Tag color="blue" className="text-[10px] font-black uppercase border-none px-2 rounded-full">{record.model}</Tag>
                    </div>
                </div>
            ),
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            render: (year) => <span className="font-bold text-gray-600 dark:text-gray-400">{year}</span>,
        },
        {
            title: 'Price / Hour',
            dataIndex: 'pricePerHour',
            key: 'pricePerHour',
            render: (price) => <span className="font-black text-blue-600">${price}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'available' ? 'green' : 'red'} className="font-black uppercase text-[10px] px-3 py-0.5 rounded-full border-none">
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <UpdateCar item={record} />
                    <Popconfirm
                        title="Delete vehicle?"
                        description="Are you sure you want to remove this car from fleet?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button 
                            icon={<HiOutlineTrash />} 
                            className="flex items-center gap-2 bg-red-50 text-red-600 border-none font-bold rounded-xl hover:bg-red-100 h-10 px-4"
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Fleet <span className="text-blue-600">Management</span></h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Manage your luxury vehicle inventory and availability.</p>
                </div>
                <AddCar />
            </div>

            <Card className="rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800" bodyStyle={{ padding: 0 }}>
                <Table 
                    columns={columns} 
                    dataSource={tableData} 
                    pagination={{ pageSize: 10 }}
                    className="custom-table"
                />
            </Card>
        </div>
    );
}

const AddCar = () => {
    const [createCar] = useCreateCarMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feature, setFeature] = useState('');
    const carAllFeatures = ['Bluetooth', "AC", "Sunroof", "Advanced safety features", "Convertible Roof", "Emergency Control"];
    const carFeatureOptions = carAllFeatures.map(f => ({ value: f, label: f }));

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating vehicle...');
        const carPostData = {
            name: data.name,
            description: data.description,
            color: data.color,
            isElectric: data.isElectric,
            features: data.features,
            pricePerHour: Number(data.pricePerHour),
            featured: data.featured,
            type: data.model,
            year: data.year
        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(carPostData));
        if (data.images?.length) {
            data.images.forEach((file: File) => formData.append('files', file));
        }

        try {
            await createCar(formData).unwrap();
            toast.success("Vehicle added to fleet!", { id: toastId });
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Failed to create vehicle", { id: toastId });
        }
    };

    return (
        <>
            <Button 
                onClick={() => setIsModalOpen(true)} 
                icon={<HiOutlinePlus />}
                className="bg-blue-600 text-white border-none rounded-2xl font-black h-14 px-8 flex items-center gap-2 shadow-xl shadow-blue-600/20 hover:scale-105 transition-transform"
            >
                Add New Vehicle
            </Button>
            <Modal
                title={<span className="text-2xl font-black tracking-tight">Add New <span className="text-blue-600">Vehicle</span></span>}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
                width={800}
                className="premium-modal"
            >
                <FormContainer onSubmit={handleSubmit} width={'100%'}>
                    <div className="space-y-6 pt-4">
                        <Row gutter={[24, 24]}>
                            <Col span={24} md={12}><InputField type='text' name='name' label='Vehicle Name' /></Col>
                            <Col span={24} md={12}><InputField type='text' name='model' label='Model / Type' /></Col>
                            <Col span={24} md={8}><InputField type='text' name='color' label='Color' /></Col>
                            <Col span={24} md={8}><InputField type='text' name='year' label='Manufacturing Year' /></Col>
                            <Col span={24} md={8}><InputField type='text' name='pricePerHour' label='Price Per Hour ($)' /></Col>
                            <Col span={24}><TextAreaField name='description' label='Description' /></Col>
                            <Col span={24}>
                                <InputFieldWithWatch
                                    options={carFeatureOptions}
                                    onValueChange={setFeature}
                                    mode='multiple'
                                    label='Premium Features'
                                    name='features'
                                />
                            </Col>
                            <Col span={24}>
                                <Controller
                                    name="images"
                                    render={({ field: { onChange, ...field } }) => (
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest ml-1">Vehicle Images</label>
                                            <div className="relative group">
                                                <input
                                                    type="file"
                                                    multiple
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                    onChange={(e) => onChange(e.target.files ? Array.from(e.target.files) : [])}
                                                />
                                                <div className="h-32 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500 transition-all bg-gray-50 dark:bg-gray-900/50">
                                                    <HiOutlinePhotograph size={32} />
                                                    <p className="text-xs font-bold mt-2 uppercase tracking-widest">Click or Drag images to upload</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<span className="font-bold">Featured Vehicle</span>} name="featured">
                                    <Controller name="featured" render={({ field }) => <Input {...field} type="checkbox" checked={field.value} className="w-6 h-6 rounded-lg text-blue-600" />} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<span className="font-bold">Electric Power</span>} name="isElectric">
                                    <Controller name="isElectric" render={({ field }) => <Input {...field} type="checkbox" checked={field.value} className="w-6 h-6 rounded-lg text-blue-600" />} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button htmlType="submit" className="w-full h-14 bg-blue-600 text-white border-none rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20">Create Vehicle Record</Button>
                    </div>
                </FormContainer>
            </Modal>
        </>
    );
};

const UpdateCar = ({ item }: any) => {
    const [updateCar] = useUpdateCarMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feature, setFeature] = useState('');
    const carAllFeatures = ['Bluetooth', "AC", "Sunroof", "Advanced safety features", "Convertible Roof", "Emergency Control"];
    const carFeatureOptions = carAllFeatures.map(f => ({ value: f, label: f }));
    const statusOptions = [{ label: 'Available', value: 'available' }, { label: 'Unavailable', value: 'unavailable' }];

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Updating vehicle...');
        const carPostData = {
            id: item.key,
            name: data.name,
            description: data.description,
            color: data.color,
            isElectric: data.isElectric,
            features: data.features,
            pricePerHour: Number(data.pricePerHour),
            featured: data.featured,
            type: data.model,
            year: data.year,
            status: data.status
        };

        try {
            await updateCar({ carPostData, images: data.images }).unwrap();
            toast.success("Vehicle updated successfully", { id: toastId });
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Failed to update vehicle", { id: toastId });
        }
    };

    return (
        <>
            <Button 
                onClick={() => setIsModalOpen(true)} 
                icon={<HiOutlinePencil />}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 border-none font-bold rounded-xl hover:bg-blue-100 h-10 px-4"
            >
                Edit
            </Button>
            <Modal
                title={<span className="text-2xl font-black tracking-tight">Update <span className="text-blue-600">Vehicle</span></span>}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
                width={800}
            >
                <FormContainer onSubmit={handleSubmit} width={'100%'}>
                    <div className="space-y-6 pt-4">
                        <Row gutter={[24, 24]}>
                            <Col span={24} md={12}><InputField defaultValue={item.name} type='text' name='name' label='Vehicle Name' /></Col>
                            <Col span={24} md={12}><InputField defaultValue={item.model} type='text' name='model' label='Model / Type' /></Col>
                            <Col span={24} md={12}><InputField defaultValue={item.pricePerHour} type='text' name='pricePerHour' label='Price Per Hour ($)' /></Col>
                            <Col span={24} md={12}>
                                <InputFieldWithWatch
                                    options={statusOptions}
                                    defaultValue={item.status}
                                    onValueChange={setFeature}
                                    label='Availability Status'
                                    name='status'
                                />
                            </Col>
                            <Col span={24}><TextAreaField defaultValue={item.description} name='description' label='Description' /></Col>
                            <Col span={24}>
                                <InputFieldWithWatch
                                    options={carFeatureOptions}
                                    defaultValue={item.features}
                                    onValueChange={setFeature}
                                    mode='multiple'
                                    label='Premium Features'
                                    name='features'
                                />
                            </Col>
                        </Row>
                        <Button htmlType="submit" className="w-full h-14 bg-blue-600 text-white border-none rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 mt-6">Update Record</Button>
                    </div>
                </FormContainer>
            </Modal>
        </>
    );
};

export default ManageCar;
