
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/auth/authSlice';
import { TResponse } from '../../types/global';
import { useChangePasswordMutation } from '../../redux/features/user/user.api';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import FormContainer from '../../components/Form/FormContainer';
import InputField from '../../components/Form/InputField';
import { Button, Row } from 'antd';
import toast from 'react-hot-toast';

function ChangePassword() {
    const [changePassword] = useChangePasswordMutation()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Updating in');
        console.log(data)
        //j
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = (await changePassword(data)) as TResponse<any>;
        if (res?.data?.success) {
            toast.success("User password changed", { id: toastId, duration: 2000 })
            dispatch(logout());
            navigate('/login');
        } else {
            toast.error("User password not changed")
        }
        console.log(res)
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a]">
            <div className="w-full max-w-md p-10 bg-white dark:bg-[#1e293b] rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800">
                <div className="mb-8 text-center">
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Change Password</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Secure your account with a new password.</p>
                </div>
                
                <FormContainer onSubmit={onSubmit} width="100%">
                    <div className="space-y-4">
                        <InputField type="password" name="oldPassword" label="Current Password" />
                        <InputField type="password" name="newPassword" label="New Password" />
                        <Button 
                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 mt-4"
                            htmlType="submit"
                        >
                            Update Password
                        </Button>
                    </div>
                </FormContainer>
            </div>
        </div>
    )
}

export default ChangePassword