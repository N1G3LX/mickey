import React from 'react'
import { Button } from '../ui/button'
import JobSearch from './JobSearch'

const Hero = () => {
    return (
        <div>
            <div className='generalContainer flex flex-col space-y-6'>
                <div className='mt-20 flow-root sm:mt-24'>
                    <h3 className='text-[32px] md:text-[40px] font-semibold'>FIND DREAM JOB WITH JOB PORTAL</h3>
                    <p className=' text-[24px] md:text-[30px] text-blue-400 font-semibold'>OWN A GOOD Resume-CV AND DREAM JOB</p>
                    <p className='text-xl'>10,000+ job opportunities are successfully connected every day</p>
                </div>
                <div className='flex gap-3 md:flex-row flex-col'>
                    <Button
                        size={'lg'}
                        className='bg-[#4353ff] font-bold'
                    >
                        Analyze Resume online
                    </Button>
                    <Button
                         className='bg-[#4353ff] font-bold'
                    >
                        Find Jobs Online
                    </Button>
                </div>
                <div>

                </div>
            </div>
            <JobSearch />
            {/* <div className='relative isolate'>
                <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                    />
                </div>

                <div>

                </div>

                <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
                    />
                </div>
            </div> */}
        </div>
    )
}

export default Hero