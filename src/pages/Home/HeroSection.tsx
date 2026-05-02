/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'antd'



import DateField from '../../components/Form/DateField'
import ContainerLayout from '../../components/Layout/ContainerLayout'

import FormContainer from '../../components/Form/FormContainer'
import { useNavigate } from 'react-router-dom'
import LocationSelector from '../../components/Form/LocationSelector'


function HeroSection() {
    const navigate = useNavigate();
    
    const onSubmit = (data: any) => {
        const queryParams = new URLSearchParams({ 
            location: data['location']?.trim(), 
            date: data['date'] 
        }).toString();
        navigate(`/car-listing?${queryParams}`);
    }

    return (
        <div className='relative min-h-screen overflow-hidden bg-[#0f172a]'>
            {/* Background with parallax-like effect */}
            <div className='absolute inset-0 bg-hero bg-cover bg-center bg-no-repeat scale-105 transform transition-transform duration-[10s] hover:scale-100'></div>
            
            {/* Multi-layered Overlay */}
            <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent'></div>
            <div className='absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-black/20'></div>

            <ContainerLayout>
                <div className='relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-between py-20 gap-12'>
                    {/* Hero Text */}
                    <div className='w-full lg:w-1/2 text-center lg:text-left space-y-8'>
                        <div className="inline-block px-4 py-1.5 mb-4 border border-blue-500/30 bg-blue-500/10 backdrop-blur-md rounded-full">
                            <span className="text-blue-400 text-sm font-bold tracking-widest uppercase">Premium Car Rental</span>
                        </div>
                        <h1 className='text-5xl md:text-7xl font-black text-white leading-tight tracking-tight'>
                            Drive Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Dreams</span> Today
                        </h1>
                        <p className='text-xl text-gray-300 max-w-xl leading-relaxed'>
                            Experience the thrill of the open road with our exclusive collection of luxury and performance vehicles. 
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                            <Button 
                                onClick={() => navigate('/car-listing')}
                                className='h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/30 transition-all active:scale-95'
                            >
                                Browse Inventory
                            </Button>
                            <Button 
                                className='h-14 px-8 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md rounded-2xl font-bold text-lg transition-all active:scale-95'
                            >
                                How It Works
                            </Button>
                        </div>
                    </div>

                    {/* Search Form Card */}
                    <div className='w-full lg:w-[450px] animate-fade-in-up bg-white backdrop-blur-2xl p-4 rounded-[32px] border border-white/10 shadow-2xl shadow-black/50'>
                        <div className=' rounded-[32px]  shadow-black/50'>
                            <h3 className="text-2xl font-bold text-white mb-6">Find Your Vehicle</h3>
                            <FormContainer width='100%' onSubmit={onSubmit}>
                                <div className="space-y-4">
                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-1">
                                        <LocationSelector name='pickUpLocation' label='Pick Up Location' />
                                    </div>
                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-1">
                                        <DateField name="date" label="Pickup Date" />
                                    </div>
                                    <Button 
                                        className='w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-none rounded-2xl font-bold text-lg mt-4 shadow-lg shadow-blue-600/40' 
                                        htmlType='submit'
                                    >
                                        Search Available Cars
                                    </Button>
                                </div>
                            </FormContainer>
                        </div>
                    </div>
                </div>
            </ContainerLayout>
        </div>
    )
}

export default HeroSection