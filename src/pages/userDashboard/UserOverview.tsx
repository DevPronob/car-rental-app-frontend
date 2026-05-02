import { useState } from 'react'
import { useGetMeQuery, useUpdateUserMutation } from '../../redux/features/user/user.api'
import { Button, Col, Modal, Row } from 'antd'
import FormContainer from '../../components/Form/FormContainer'
import InputField from '../../components/Form/InputField'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'

function UserOverview() {
    const { data: meData, isLoading } = useGetMeQuery(undefined);

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                <div className="px-10 pb-12">
                    <div className="relative flex justify-center -mt-16 mb-6">
                        <div className="w-32 h-32 bg-white dark:bg-gray-900 rounded-3xl p-1 shadow-xl">
                            <div className="w-full h-full bg-blue-100 dark:bg-blue-900/40 rounded-[22px] flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-4xl border-2 border-white dark:border-gray-800">
                                {meData?.data.name?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{meData?.data.name}</h1>
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">
                                {meData?.data.role}
                            </span>
                            <span className="px-4 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-black uppercase tracking-widest border border-green-100 dark:border-green-800">
                                {meData?.data.status || 'Active'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-left">
                            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-700">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                                <p className="font-bold text-gray-900 dark:text-white truncate">{meData?.data.email}</p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-700">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Physical Address</p>
                                <p className="font-bold text-gray-900 dark:text-white">{meData?.data.address || "Address not provided"}</p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <UpdateUserModal item={meData?.data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const UpdateUserModal = ({ item }: any) => {
    const [updateUser] = useUpdateUserMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Updating profile...');
        try {
            const res: any = await updateUser({ id: item?._id, ...data });
            if (res?.data?.success) {
                toast.success("Profile Updated Successfully", { id: toastId });
                setIsModalOpen(false);
            } else {
                toast.error(res?.error?.data?.message || "Update failed", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <>
            <Button 
                onClick={() => setIsModalOpen(true)} 
                className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-95"
            >
                Edit Profile
            </Button>
            <Modal
                title={null}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
                className="custom-modal"
                width={500}
            >
                <div className="p-4">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Update Profile</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">Maintain your personal information to ensure a smooth rental experience.</p>
                    
                    <FormContainer onSubmit={handleSubmit} width={'100%'}>
                        <div className="space-y-4">
                            <InputField defaultValue={item?.name} type={'text'} name={'name'} label='Full Name' />
                            <InputField defaultValue={item?.email} type={'text'} name={'email'} label={'Email Address'} />
                            <InputField defaultValue={item?.address} type={'text'} name={'address'} label={'Residential Address'} />
                            
                            <div className="pt-4 flex gap-4">
                                <Button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 h-12 rounded-xl font-bold text-gray-500 border-gray-200"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    htmlType="submit" 
                                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl font-bold shadow-lg shadow-blue-600/20"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </FormContainer>
                </div>
            </Modal>
        </>
    );
};

export default UserOverview