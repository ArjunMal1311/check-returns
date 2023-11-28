"use client"
import React, { useState } from 'react';
import { JetBrains_Mono } from 'next/font/google';
import { AiFillLock, AiFillUnlock, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
const JetBrains = JetBrains_Mono({ subsets: ['latin'] });
import { motion } from "framer-motion"

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

    categories: {
        id: string;
        name: string;
        TotalAmount: number;
        userId: string;
    }[] | any
}

interface Category {
    id: string;
    name: string;
    TotalAmount: number;
    userId: string;
}

const TransactionCard = ({ transactionDetails, categories }: Transactions) => {
    const router = useRouter();

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handleCategorySelection = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
        } else {
            setSelectedCategories((prevCategories) => (prevCategories as string[]).filter((id) => id !== categoryId));
        }
    };


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

    const saveToCategories = async () => {
        await toast.promise(
            (async () => {
                if (selectedCategories.length === 0) {
                    toast.error("Select at least one")
                    throw new Error();
                }

                const savePromises = selectedCategories.map(async (cardNumber) => {
                    const response = await axios.post('/api/view', {
                        cardNumber: cardNumber,
                        name: transactionDetails.investmentType,
                        price: transactionDetails.investmentAmount,
                    });

                    return response.data.success;
                });

                await Promise.all(savePromises);
            })(),
            {
                loading: "Updating",
                success: "Success",
                error: "Try again"
            }
        );

        router.refresh();
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
                    <div className='rounded-lg px-1 py-1 border-2 hover:bg-white hover:text-black cursor-pointer transition duration-500' onClick={togglePopup}><AiOutlinePlus /></div>
                    <div className='rounded-lg px-1 py-1 border-2 hover:bg-white hover:text-black cursor-pointer transition duration-500' onClick={copyToClipboard}><FiShare2 size={20} /></div>
                    <div className='rounded-lg px-3 py-1 border-2 text-[14px] select-none hover:bg-white hover:text-black transition duration-500 cursor-pointer' onClick={() => { router.push("/fixed-deposit") }}>Calculator</div>
                </div>
            </div>

            <AnimatePresence>
                {isPopupVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="popup fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div className="popup-content bg-white p-4 rounded-lg shadow-lg w-[300px] h-[200px] flex flex-col justify-between border-2">
                            <div className='flex justify-between items-center'>
                                <h2 className="text-xl font-semibold">Categories</h2>
                                <h2 className="text-xl font-semibold cursor-pointer" onClick={togglePopup}><AiOutlineClose /></h2>
                            </div>
                            <ul>
                                {categories.isArray && categories.map((category: Category) => (
                                    <li key={category.id}>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value={category.id}
                                                onChange={(e) => handleCategorySelection(e, category.id)}
                                                className="form-checkbox text-blue-500  mx-2 mr-2"
                                            />
                                            {category.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={saveToCategories}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                            >
                                Save
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TransactionCard;
