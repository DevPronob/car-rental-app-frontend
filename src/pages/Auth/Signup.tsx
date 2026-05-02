/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'antd'

import FormContainer from '../../components/Form/FormContainer'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import InputField from '../../components/Form/InputField'

import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSignUpMutation } from '../../redux/features/auth/auth.api'


function Signup() {
    const [signUp, { isLoading }] = useSignUpMutation()
    const navigate = useNavigate()
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
        }
        const toastId = toast.loading('Creating account...');
        try {
            const res: any = await signUp(userInfo)
            if (res.data?.success) {
                toast.success(res.data.message || 'Account created successfully!', { id: toastId })
                setTimeout(() => navigate('/login'), 1500)
            } else {
                toast.error(res.error?.data?.message || 'Something went wrong', { id: toastId })
            }
        } catch (error) {
            toast.error('Something went wrong during sign up', { id: toastId })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a] transition-all duration-500 font-['Inter']">
            <div className="flex flex-row-reverse w-full max-w-6xl h-[850px] overflow-hidden bg-white dark:bg-[#1e293b] rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50 dark:border-gray-800/50 m-4 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                
                {/* Right Side: Image & Content */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80" 
                        alt="Performance Car" 
                        className="absolute inset-0 w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/40 to-transparent"></div>
                    <div className="relative z-10 p-20 flex flex-col justify-end h-full text-white text-right">
                        <div className="space-y-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">Join the Elite</span>
                            <h2 className="text-6xl font-black leading-tight tracking-tight">Your Journey <br /><span className="text-indigo-400">Starts Here.</span></h2>
                            <p className="text-lg text-indigo-100/80 font-medium max-w-sm leading-relaxed ml-auto">Join the elite community of drivers and enjoy exclusive rental privileges with AVIS.</p>
                        </div>
                    </div>
                </div>

                {/* Left Side: Signup Form */}
                <div className="w-full lg:w-1/2 p-12 md:p-16 flex flex-col justify-center bg-white dark:bg-[#1e293b] z-20 overflow-y-auto custom-scrollbar">
                    <div className="mb-8">
                        <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Create Account</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Join AVIS for a premium rental experience.</p>
                    </div>

                    <FormContainer width="100%" onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                            <InputField type='text' name='name' label='Full Name' />
                            <InputField type='text' name='email' label='Email Address' />
                            <InputField type='password' name='password' label='Password' />
                            <InputField type='password' name='confirmPassword' label='Confirm Password' />
                            <div className="md:col-span-2">
                                <InputField type='text' name='phone' label='Phone Number' />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-8 py-1">
                            <input id="terms" type="checkbox" className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500/20 transition-all cursor-pointer" />
                            <label htmlFor="terms" className="text-sm text-gray-500 dark:text-gray-400 font-semibold cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors">I agree to the Terms & Privacy Policy</label>
                        </div>

                        <Button 
                            className={`w-full h-16 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white border-none rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                            htmlType='submit'
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Get Started Now'}
                        </Button>

                        <p className="text-center text-gray-500 dark:text-gray-400 font-medium mt-10">
                            Already have an account? 
                            <Link to="/login" className="ml-2 text-indigo-600 dark:text-indigo-400 font-black hover:text-blue-600 transition-colors underline-offset-8 decoration-2 hover:underline">Sign In</Link>
                        </p>
                    </FormContainer>
                </div>
            </div>
        </div>
    )
}

export default Signup