"use client"

import React, { useState } from 'react';
import { FaCalculator } from "react-icons/fa";
import VersatileTools from '../LandingPageTools/VersatileTools';
import ChartAccurate from '../LandingPageTools/ChartAccurate';
import DynamicChart from '../LandingPageTools/DynamicChart';
import ScreenFriendly from '../LandingPageTools/ScreenFriendly';


const InvestorPage = () => {
    const [Index, setIndex] = useState(1);

    const handleItemClick = (index: number) => {
        setIndex(index);
    };


    return (
        <div className='mt-16 flex justify-center items-center flex-col'>
            <div className='text-4xl font-bold text-center'>Let's calculate your returns through <span className='inline-block bg-clip-text text-transparent bg-gradient-to-l  from-[#5A32A3] to-[#D03592] '>CR</span></div>
            <div className='mt-4 text-center md:w-2/3 lg:w-1/3 px-8 font-medium text-[18px]'>With our investment calculator tools, individuals and investors can effortlessly plan and optimize their financial future, making informed investment decisions on multiple platforms</div>

            <div className='w-full flex mt-8 md:flex-row flex-col'>
                <div className='md:w-1/2 flex justify-center items-center w-full my-4'>
                    <div className='flex md:flex-col flex-row overflow-scroll'>
                        <div
                            className={`md:w-[250px] w-fit text-[17px] text-[#29373D] px-4 m-4 py-3 rounded-2xl font-semibold border-2 flex items-center space-x-2 h-[68px] transform transition duration-[2000] ease-linear cursor-pointer hover:bg-gray-200 ${Index === 1 && "bg-gradient-to-r from-[#f1efef] to-[#c6e4ee]  border-[#FF0078] "}`}
                            onClick={() => handleItemClick(1)}
                        >
                            <FaCalculator />
                            <div>
                                Versatile Tools
                            </div>
                        </div>

                        <div
                            className={`md:w-[250px] w-fit text-[17px] text-[#29373D] px-4 m-4 py-3 rounded-2xl font-semibold border-2 flex items-center space-x-2 h-[68px] transform transition duration-[2000] ease-linear cursor-pointer hover:bg-gray-200 ${Index === 2 && "bg-gradient-to-r from-[#f1efef] to-[#c6e4ee]  border-[#FF0078] "}`}
                            onClick={() => handleItemClick(2)}
                        >
                            <FaCalculator />
                            <div>
                                Accurate Calculations
                            </div>
                        </div>
                        <div
                            className={`md:w-[250px] w-fit text-[17px] text-[#29373D] px-4 m-4 py-3 rounded-2xl font-semibold border-2 flex items-center space-x-2 h-[68px] transform transition duration-[2000] ease-linear cursor-pointer hover:bg-gray-200 ${Index === 3 && "bg-gradient-to-r from-[#f1efef] to-[#c6e4ee]  border-[#FF0078] "}`}
                            onClick={() => handleItemClick(3)}
                        >
                            <FaCalculator />
                            <div>
                                Dynamic Charts
                            </div>
                        </div>
                        <div
                            className={`md:w-[250px] text-[17px] text-[#29373D] px-4 m-4 py-3 rounded-2xl font-semibold border-2 flex items-center space-x-2 h-[68px] transform transition duration-[2000] ease-linear cursor-pointer hover:bg-gray-200 ${Index === 4 && "bg-gradient-to-r from-[#f1efef] to-[#c6e4ee]  border-[#FF0078] "}`}
                            onClick={() => handleItemClick(4)}
                        >
                            <FaCalculator />
                            <div>
                                User Friendly
                            </div>
                        </div>
                    </div>
                </div>

                <div className='lg:w-[700px] lg:h-[400px] border-[18px] rounded-lg bg-white flex items-center justify-center md:w-[400px] h-[400px] overflow-scroll px-4 w-full'>
                    {Index === 1 && <VersatileTools />}
                    {Index === 2 && <ChartAccurate />}
                    {Index === 3 && <DynamicChart />}
                    {Index === 4 && <ScreenFriendly />}
                </div>
            </div>
        </div>
    );
}

export default InvestorPage;
