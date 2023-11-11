"use client"
import React from 'react';
import { JetBrains_Mono } from 'next/font/google';
import { useRouter } from 'next/navigation';
const JetBrains = JetBrains_Mono({ subsets: ['latin'] });
import { motion } from "framer-motion"
import { FaCopy, FaShare } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface CalculatorProps {
    calculatorDetails: {
        calculatorName: string,
        calculatorDescription: string,
        calculatorLink: string
    };
}

const CalculatorCard = ({ calculatorDetails }: CalculatorProps) => {
    const router = useRouter();

    const handleCopyLink = () => {
        const url = `checkreturns.vercel.app/calculator/${calculatorDetails.calculatorName}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success("Copied to clipboard");
            })
            .catch((error) => {
                toast.error("Failed to copy to clipboard");
                console.error("Copy to clipboard error:", error);
            });
    };

    return (
        <motion.div
            className="calculator-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`w-[220px] h-[300px] bg-white border mx-8 my-8 rounded-lg ${JetBrains.className}`}>
                <div className='flex space-x-2 px-4 py-3 '>
                    <div className='w-[12px] h-[12px] bg-red-400 rounded-full hover:bg-red-600 cursor-pointer'></div>
                    <div className='w-[12px] h-[12px] bg-yellow-300 rounded-full hover:bg-yellow-600 cursor-pointer'></div>
                    <div className='w-[12px] h-[12px] bg-green-500 rounded-full hover:bg-green-600 cursor-pointer'></div>
                </div>

                <div className='font-semibold mt-4 text-center text-[20px] px-4 h-[80px]'>
                    {calculatorDetails.calculatorName}
                </div>

                <div className='mt-5 font-bold h-[170px]  w-full rounded-lg bg-black border-2 text-white px-4 py-2 flex flex-col justify-between mb-2'>
                    <div>{calculatorDetails.calculatorDescription}</div>

                    <div className='mt-8 flex justify-between  w-full mb-1'>
                        <div className={`rounded-lg px-3 py-1 border-2 text-[14px] select-none hover:bg-white hover:text-black transition duration-500 cursor-pointer items-center flex justify-center`} onClick={handleCopyLink}><FaCopy /></div>
                        <div className='rounded-lg px-3 py-1 border-2 text-[14px] select-none hover:bg-white hover:text-black transition duration-500 cursor-pointer' onClick={() => { router.push(`calculator/${calculatorDetails.calculatorLink}`) }}>Calculator</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CalculatorCard;
