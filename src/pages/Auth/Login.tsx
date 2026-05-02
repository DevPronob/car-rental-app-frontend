/* eslint-disable @typescript-eslint/no-explicit-any */

import FormContainer from '../../components/Form/FormContainer'
import InputField from '../../components/Form/InputField'
import { Button } from 'antd'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../redux/features/auth/auth.api'
import toast from 'react-hot-toast'
import { useAppDispatch } from '../../redux/hooks'
import {  setUser } from '../../redux/features/auth/authSlice'
import { zodResolver } from '@hookform/resolvers/zod';
import loginScheamaValidation from '../../schemas/LoginScheama'
function Login() {
    const [login, { isLoading }] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleForgetPass = () => {
        navigate('/change-password')
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Authenticating...');
        try {
            const res: any = await login(data)
            console.log('Full Login Response:', res);

            if (res.error) {
                const errorMsg = (res.error as any)?.data?.message || "Login failed. Please check your credentials.";
                toast.error(errorMsg, { id: toastId });
                return;
            }

            const responseData = res.data?.data || res.data;
            const userData = responseData?.user;

            if (!userData) {
                toast.error("Invalid response from server", { id: toastId });
                return;
            }

            const user = {
                userId: userData._id || userData.id,
                name: userData.name,
                email: userData.email,
                role: userData.role,
                phone: userData.phone
            }

            dispatch(setUser({ user: user, token: responseData.accessToken }));
            toast.success('Login successful', { id: toastId });

            const targetDashboard = user.role ? `/${user.role}/dashboard` : '/login';
            setTimeout(() => navigate(targetDashboard), 500);

        } catch (error) {
            toast.error("Something went wrong", { id: toastId })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a] transition-all duration-500 font-['Inter']">
            <div className="flex w-full max-w-6xl h-[750px] overflow-hidden bg-white dark:bg-[#1e293b] rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50 dark:border-gray-800/50 m-4 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                
                {/* Left Side: Image & Content */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                        alt="Luxury Car"
                        className="absolute inset-0 w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent"></div>
                    <div className="relative z-10 p-20 flex flex-col justify-end h-full text-white">
                        <div className="space-y-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">Premium Fleet</span>
                            <h2 className="text-6xl font-black leading-tight tracking-tight">Elegance in <br /><span className="text-blue-400">Every Mile.</span></h2>
                            <p className="text-lg text-blue-100/80 font-medium max-w-sm leading-relaxed">Experience the thrill of driving the world's most exclusive and luxurious vehicles.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full lg:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-white dark:bg-[#1e293b] z-20">
                    <div className="mb-12">
                        <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Welcome Back</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Enter your details to access your dashboard.</p>
                    </div>

                    <FormContainer resolver={zodResolver(loginScheamaValidation)} width="100%" onSubmit={onSubmit}>
                        <div className="space-y-7">
                            <InputField type='text' name='email' label='Email Address' />
                            <div className="relative group/input">
                                <InputField type='password' name='password' label='Password' />
                                <button
                                    type="button"
                                    onClick={handleForgetPass}
                                    className="absolute right-0 top-0 text-xs font-bold text-blue-600 hover:text-indigo-600 uppercase tracking-widest transition-colors"
                                >
                                    Forgot?
                                </button>
                            </div>

                            <div className="flex items-center gap-3 py-1">
                                <input id="remember-me" type="checkbox" className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500/20 transition-all cursor-pointer" />
                                <label htmlFor="remember-me" className="text-sm text-gray-500 dark:text-gray-400 font-semibold cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Remember my session</label>
                            </div>

                            <Button
                                className={`w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(59,130,246,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                                htmlType='submit'
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Verifying...' : 'Sign In Now'}
                            </Button>

                            <div className="relative flex items-center gap-4 py-4">
                                <div className="flex-grow h-px bg-gray-100 dark:bg-gray-800"></div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">or continue with</span>
                                <div className="flex-grow h-px bg-gray-100 dark:bg-gray-800"></div>
                            </div>

                            <p className="text-center text-gray-500 dark:text-gray-400 font-medium">
                                New to AVIS?
                                <Link to="/sign-up" className="ml-2 text-blue-600 dark:text-blue-400 font-black hover:text-indigo-600 transition-colors underline-offset-8 decoration-2 hover:underline">Create Account</Link>
                            </p>
                        </div>
                    </FormContainer>
                </div>
            </div>
        </div>
    )
}

export default Login