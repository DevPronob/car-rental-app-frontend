import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContainerLayout from '../../components/Layout/ContainerLayout'
import ReactImageMagnifier from 'simple-image-magnifier/react'
import FeatureInput from '../../components/FeatureInput'
import { Button } from 'antd'
import { useGetSingleCarQuery } from '../../redux/features/car/car.api'

function CarDetail() {
    const { id } = useParams()
    const { data: carData } = useGetSingleCarQuery((id) as string)
    const [childSeat, setChildSeat] = useState(0)
    const [gps, setGps] = useState(0)
    const [mobileWifi, setMobileWifi] = useState(0)

    const [imgActive, setImgActive] = useState(0)
    console.log(childSeat, gps, mobileWifi)
    const navigate = useNavigate();
    const calculateTotalWithFeature = (childSeat: number, gps: number, mobileWifi: number, price: number) => {
        const childSeatFind = childSeat * 10;
        let gpsFind = 0
        let mobileWifiFind = 0
        if (gps !== 0) {
            gpsFind = gps * 5
        }
        if (mobileWifi !== 0) {

            mobileWifiFind = mobileWifi * 5
        }
        const total = childSeatFind + gpsFind + mobileWifiFind
        const totalPrice = total + price
        return totalPrice
    }
    console.log(calculateTotalWithFeature(childSeat, gps, mobileWifi, carData?.data.pricePerHour))

    const handleBooking = () => {
        // const data = {
        //     carId: id,
        //     totalPrice:
        // }
        navigate('/booking', {
            state: {
                carId: id,
                totalPrice: calculateTotalWithFeature(childSeat, gps, mobileWifi, 80),
                childSeat: childSeat > 0,
                gps: gps > 0,
                mobileWifi: mobileWifi > 0
            }
        })

    }
    console.log(carData)
    return (
        <div className='dark:bg-[#141D2E] text-white'>
            <ContainerLayout>
                <div className=' grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4  justify-center'>
                    <div>
                        <div className='flex items-center justify-between pr-7'>
                            <h2 className='text-4xl font-bold pb-6 text-black dark:text-white'>{carData?.data.name}</h2>

                            <p className='text-2xl font-bold text-black dark:text-white'>Price Per Hour <span className='text-blue-800'>{carData?.data.pricePerHour} BDT</span></p>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-col gap-2'>
                                {carData?.data?.images.map((src: string | undefined, i: number) => (
                                    <img
                                        key={'preview-' + i}
                                        src={src}
                                        alt=''
                                        className='object-cover w-16 h-16 rounded cursor-pointer'
                                        onClick={() => setImgActive(i)} // No TypeScript error here
                                    />
                                ))}
                            </div>

                            <ReactImageMagnifier
                                srcPreview={carData?.data?.images[imgActive]}
                                srcOriginal={carData?.data?.images[imgActive]}
                                width={700}
                                height={400}
                                className=''
                            />
                        </div>
                        <div className='py-6 text-black dark:text-white'>
                            <h2 className='text-4xl font-bold my-2'>Vehicle overview</h2>
                            <p>{carData?.data.description}</p>
                            <div>
                                <h3 className='text-2xl py-4 font-bold'>Features</h3>
                                <div className=''>
                                    <p className='flex items-center gap-4 p-2'><span className=' text-blue-800'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                    </span>Fuel-efficient engine</p>
                                    <p className='flex items-center gap-4 p-2'><span className=' text-blue-800'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    </span>Comfortable interior</p>
                                    <p className='flex items-center gap-4 p-2'><span className=' text-blue-800'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    </span>Advanced safety features</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div>
                        <div className='shadow-lg p-8 mt-14 text-black dark:text-white'>
                            <div className='flex items-center justify-between py-2'><p className='font-light'>color</p> <p className='font-bold'>{carData?.data.color}</p></div>
                            <hr />
                            <div className='flex items-center justify-between py-2'><p className='font-light'>Transmission</p> <p className='font-bold'>Automatic</p></div>
                            <hr />
                            <div className='flex items-center justify-between py-2'><p className='font-light'>Mileage</p> <p className='font-bold'>100</p></div>
                            <hr />
                            <div className='flex items-center justify-between py-2'><p className='font-light'>Type</p> <p className='font-bold'>{carData?.data.type}</p></div>
                            <hr />
                            <div className='flex items-center justify-between py-2'><p className='font-light'>status</p> <p className='font-bold'>{carData?.data.status}</p></div>
                            <hr />
                            <div className='flex items-center justify-between py-2'><p className='font-light'>GPS </p> <p className='font-bold'>+$10/day</p></div>
                            <hr />
                            <div className='flex items-center justify-between py-2'><p className='font-light'>Child Seat</p> <p className='font-bold'>+$5/day</p></div>
                        </div>
                        <div>
                            <h3 className='text-2xl font-bold py-4 text-black dark:text-white'>Add extras, complete your trip</h3>
                            <div>
                                <FeatureInput mobileWifi={mobileWifi} setMobileWifi={setMobileWifi} gps={gps} setGps={setGps} childSeat={childSeat} setChildSeat={setChildSeat} />
                            </div>
                            <Button onClick={handleBooking} className=' my-4 py-6 text-white w-full bg-blue-800'>Book</Button>

                        </div>
                    </div>

                </div>
            </ContainerLayout>
        </div>
    )
}

export default CarDetail