/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom"
import { useSignUpDriverMutation } from "../redux/features/auth/auth.api"
import { FieldValues, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import FormContainer from "../components/Form/FormContainer"
import InputField from "../components/Form/InputField"
import { Button } from "antd"


function RequestForDriver() {
    const [signUpDriver, { isLoading }] = useSignUpDriverMutation()
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
        
        const toastId = toast.loading('Submitting application...');
        try {
            const res: any = await signUpDriver(userInfo)
            console.log('Driver Signup Response:', res);

            if (res.error) {
                const errorMsg = (res.error as any)?.data?.message || "Submission failed. Please check your details.";
                toast.error(errorMsg, { id: toastId });
                return;
            }

            if (res.data?.success) {
                toast.success('Application submitted! Please wait for admin approval.', { id: toastId });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(res.data?.message || "Something went wrong", { id: toastId });
            }

        } catch (error) {
            toast.error("Something went wrong", { id: toastId })
        }
    }
  return (
    <div>
         <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a] transition-all duration-500 font-['Inter']">
            <div className="flex w-full max-w-6xl h-[850px] overflow-hidden bg-white dark:bg-[#1e293b] rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50 dark:border-gray-800/50 m-4 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                
                {/* Left Side: Image & Content */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80"
                        alt="Professional Driver"
                        className="absolute inset-0 w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent"></div>
                    <div className="relative z-10 p-20 flex flex-col justify-end h-full text-white">
                        <div className="space-y-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">Become a Partner</span>
                            <h2 className="text-6xl font-black leading-tight tracking-tight">Drive with <br /><span className="text-blue-400">Excellence.</span></h2>
                            <p className="text-lg text-blue-100/80 font-medium max-w-sm leading-relaxed">Join our team of professional drivers and experience a new standard in the rental industry.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Application Form */}
                <div className="w-full lg:w-1/2 p-12 md:p-16 flex flex-col justify-center bg-white dark:bg-[#1e293b] z-20 overflow-y-auto">
                    <div className="mb-8">
                        <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Driver Application</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Enter your details to apply for a driver account.</p>
                    </div>

                    <FormContainer width="100%" onSubmit={onSubmit}>
                        <div className="space-y-4">
                            <InputField type='text' name='name' label='Full Name' />
                            <InputField type='text' name='email' label='Email Address' />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField type='password' name='password' label='Password' />
                                <InputField type='password' name='confirmPassword' label='Confirm Password' />
                            </div>
                            <InputField type='text' name='phone' label='Phone Number' />

                            <div className="flex items-center gap-3 py-1">
                                <input id="agreement" type="checkbox" required className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500/20 transition-all cursor-pointer" />
                                <label htmlFor="agreement" className="text-sm text-gray-500 dark:text-gray-400 font-semibold cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors">I agree to the driver terms of service</label>
                            </div>

                            <Button
                                className={`w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(59,130,246,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                                htmlType='submit'
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Submitting...' : 'Submit Application'}
                            </Button>

                            <p className="text-center text-gray-500 dark:text-gray-400 font-medium">
                                Already have an account?
                                <Link to="/login" className="ml-2 text-blue-600 dark:text-blue-400 font-black hover:text-indigo-600 transition-colors underline-offset-8 decoration-2 hover:underline">Sign In</Link>
                            </p>
                        </div>
                    </FormContainer>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RequestForDriver