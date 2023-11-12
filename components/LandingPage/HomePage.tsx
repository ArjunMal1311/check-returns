"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"
import WavyText from '../LandingPageTools/WavyText'

const HomePage = () => {
    return (
        <div className='flex flex-col items-center bg-clip-text'>
            <div className='mt-16 bg-gradient-to-r sm:text-[24px] text-[30px] font-extrabold uppercase leading-[24.2px] tracking-widest md:text-[26px] md:leading-[30px] lg:leading-[36px] bg-clip-text text-transparent from-[#3DBFF5] to-[#6F42C1] lg:text-[32px]'>
                CHECK RETURNS
            </div>
            <h1 className='text-gray-900 text-[28px] font-extrabold leading-[34px] tracking-tight md:text-[40px] md:leading-[48px] lg:text-5xl lg:leading-[55px] w-full max-w-[740px] !whitespace-pre-line text-center mt-8'>
                <div className='flex items-center justify-center'>
                    Maximizing
                    <span className='bg-gradient-to-r bg-clip-text text-transparent ml-2 from-[#8A63D2] to-[#E23A3A]'>
                        <WavyText text="Returns," replay={true} />
                    </span>
                </div>
                <div className='flex items-center justify-center'>
                    Minimizing
                    <span className='bg-gradient-to-r bg-clip-text text-transparent ml-2 from-[#8A63D2] to-[#E23A3A] '>
                        <WavyText text="Efforts" replay={true} />
                    </span>
                </div>
            </h1>

            <div className='text-gray-800 max-w-[740px] text-[16px] leading-[22px] md:text-[19px] md:leading-[26px] lg:text-[24px] lg:leading-[36px] md:font-medium text-center mt-4 px-8'>
                Maximizing financial returns with minimal input, our investment calculator streamlines the process, helping you make informed investment decisions effortlessly
            </div>

            <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ x: 0, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
                className='mt-24 px-8'>
                <Image src={"/homePage.png"} height={680} width={525} alt='homePage.png' />
            </motion.div>
            <div className='w-full bg-[#01669E] sm:h-[120px] h-fit py-4 flex items-center justify-around sm:flex-row flex-col'>
                <div className='text-white text-[25px] font-bold py-2'>Nifty <span className='italic'>50</span></div>
                <div className='text-white text-[25px] font-bold py-2'>Sensex</div>
                <div className='text-white text-[25px] font-bold py-2'>Gold Price</div>
                <div className='text-white text-[25px] font-bold italic py-2'>Currency Exchange</div>
                <div className='text-white text-[25px] font-bold py-2'>Crypto</div>
            </div>
        </div>
    )
}

export default HomePage