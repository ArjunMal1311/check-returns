"use client"
import React, { useState } from 'react'
import AddCategory from './AddCategory';
import ExpenseCard from './ExpenseCard';
import MFPieChart from './Charts/MFPieChart';

interface Card {
    categories: Response | ({
        items: {
            id: string;
            name: string;
            price: number;
            method: string;
            categoryId: string;
        }[];
    } & {
        id: string;
        name: string;
        TotalAmount: number;
        userId: string;
    })[] | undefined
}

const Items = ({ categories }: Card) => {
    const [use, currentUse] = useState("Transactions")

    const simplifiedData = categories && Array.isArray(categories)
        ? categories.map(category => ({
            name: category.name,
            TotalAmount: category.TotalAmount
        }))
        : [];

    return (
        <div>
            <div className='flex justify-between items-center sm:flex-row flex-col mb-8'>
                <h2 className="text-4xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-l from-[#E23A3A] to-[#E58A00]">Your Transactions</h2>
                <div className='flex items-center mt-4 space-x-2'>
                    {use === "Transactions" ? <>
                        <div className='border-2 px-4 py-2 rounded-lg w-fit hover:bg-gray-200 cursor-pointer' onClick={() => currentUse("Graphical")}>Graphical View</div>
                    </> : <>
                        <div className='border-2 px-4 py-2 rounded-lg w-fit hover:bg-gray-200 cursor-pointer' onClick={() => currentUse("Transactions")}>Transactions</div>

                    </>}

                    <div className=''><AddCategory /></div>
                </div>
            </div>

            {use === "Transactions" && <div className="overflow-x-scroll example">
                <div>
                    {Array.isArray(categories) &&
                        <div>
                            <div className='flex example'>
                                {
                                    categories.map((category) => (
                                        <div key={category.id}>
                                            <ExpenseCard cardinfo={category} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
                <div className='italic text-xl'>(Scroll right to view more)</div>
            </div>}

            {use === "Graphical" &&
                <div className='w-full flex justify-center items-center'>
                    <div className='  sm:w-[600px] sm:h-[600px] w-fit h-fit'>
                        <MFPieChart categories={simplifiedData} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Items