import { Inter } from 'next/font/google';
import React from 'react'
const InterScript = Inter({ subsets: ['latin'] });

const StartCalculating = () => {
    return (
        <div className={`bg-[url("/start_investing_bg.jpg")] h-[350px] bg-center bg-cover mt-16 flex justify-center items-center flex-col ${InterScript.className}`}>
            <div className='bg-gradient-to-r text-[20px] font-extrabold uppercase leading-[24.2px] tracking-widest md:text-[26px] md:leading-[30px] lg:leading-[36px] bg-clip-text mb-4 text-[#414141] lg:text-[32px]'>
                CHECK RETURNS
            </div>
            <div className=" text-gray-50 sm:text-[28px] text-[20px] font-extrabold leading-[34px] tracking-tight md:text-[40px] md:leading-[48px] lg:text-5xl lg:leading-[55px] mt-4">
                <div className="typewriter-text">
                    Check your Returns today!
                </div>
            </div>
            <div className='flex space-x-2 sm:w-[350px] w-[250px] justify-around mt-10'>
                <div className=' w-[150px] text-center rounded-lg bg-white text-[#202020] px-3 py-2 font-semibold'>Calculator</div>
                <div className='w-[150px] text-center bg-[#29abe2] rounded-lg px-4 py-2 text-[16px] font-semibold text-white'>Login</div>
            </div>
        </div>
    )
}

export default StartCalculating