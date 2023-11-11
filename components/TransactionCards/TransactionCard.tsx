"use client"
import React from 'react';
import { JetBrains_Mono } from 'next/font/google';
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const JetBrains = JetBrains_Mono({ subsets: ['latin'] });

interface Transactions {
    transactionDetails: {
        id: string;
        investmentType: string;
        investmentAmount: number;
        rateOfInterest: number | null;
        timePeriod: string | null;
        access: boolean;
        return: number | null;
        totalReturns: number | null;
    };
}

const TransactionCard = ({ transactionDetails }: Transactions) => {
    const router = useRouter();

    const changeVisibilityFunction = async () => {
        await axios.patch("/api/changeVisibility", transactionDetails);
    };

    const changeVisibility = async () => {
        await toast.promise(changeVisibilityFunction(), {
            loading: "Loading...",
            success: "Success",
            error: "Try again",
        });
        router.refresh();
    };

    const copyToClipboard = () => {
        const url = `checkreturns.vercel.app/transactions/${transactionDetails.id}`;
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
        <div className={`w-[250px] h-fit bg-white border mx-8 my-8 rounded-lg ${JetBrains.className}`}>
            <div className='flex px-4 py-3 justify-between'>
                <div className='flex space-x-2'>
                    <div className='w-[12px] h-[12px] bg-red-400 rounded-full hover:bg-red-600 cursor-pointer'></div>
                    <div className='w-[12px] h-[12px] bg-yellow-300 rounded-full hover:bg-yellow-600 cursor-pointer'></div>
                    <div className='w-[12px] h-[12px] bg-green-500 rounded-full hover:bg-green-600 cursor-pointer'></div>
                </div>

                <div className='border-2 p-1 rounded-lg cursor-pointer' onClick={changeVisibility}>
                    {transactionDetails.access ? <AiFillUnlock size={20} /> : <AiFillLock size={20} />}
                </div>
            </div>

            <div className='font-semibold mt-4 text-center text-[20px] px-4 '>
                {transactionDetails.investmentType}
            </div>

            <div className='text-center mt-4 text-[16px] px-4 '>
                <span className='text-[12px]'>₹</span>{transactionDetails.investmentAmount}
            </div>

            <div className='flex justify-between mt-4 px-4 '>
                <div>{transactionDetails.rateOfInterest}%</div>
                <div>{transactionDetails.timePeriod}</div>
            </div>

            <div className='mt-5 font-bold  w-full h-[50%] rounded-lg bg-black border-2 text-white px-4 py-2'>
                <div className='mb-2'>Returns</div>
                <div>Returns : {transactionDetails.return ? <>{transactionDetails.return.toFixed(2)}</> : <>N.A.</>}</div>
                <div>Total : {transactionDetails.totalReturns ? <>{transactionDetails.totalReturns.toFixed(2)}</> : <>N.A.</>}</div>

                <div className='mt-8 flex justify-between w-full items-center mb-2'>
                    <div className='rounded-lg px-1 py-1 border-2 hover:bg-white hover:text-black cursor-pointer' onClick={copyToClipboard}><FiShare2 size={20} /></div>
                    <div className='rounded-lg px-3 py-1 border-2 text-[14px] select-none hover:bg-white hover:text-black transition duration-500 cursor-pointer'>Calculator</div>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;
