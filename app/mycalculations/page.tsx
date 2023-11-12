import React from 'react';
import { JetBrains_Mono } from 'next/font/google';
import getCurrentUser from '@/lib/getCurrentUser';
import getTransactionDetails from '@/lib/getTransactionDetails';
import TransactionCard from '@/components/TransactionCards/TransactionCard';
import getCategories from '@/lib/getCategories';
const JetBrains = JetBrains_Mono({ subsets: ['latin'] });

interface Transaction {
    id: string;
    investmentType: string;
    investmentAmount: number;
    rateOfInterest: number | null;
    timePeriod: string | null;
    return: number | null;
    totalReturns: number | null;
    access: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Categories {
    id: string;
    name: string;
    TotalAmount: number;
    userId: string;
}

const page = async () => {
    const user = await getCurrentUser();
    const categories = await getCategories() as Categories[];

    if (!user) {
        return <div>Please login to continue</div>;
    }

    const transactions = await getTransactionDetails() as Transaction[];

    if (!transactions) {
        return <div>No transactions found for this account</div>;
    }

    return (
        <div >
            <div className={`mx-16 text-center text-[35px] my-4 ${JetBrains.className} font-semibold `}>Recent <span className='inline-block bg-clip-text text-transparent bg-gradient-to-l  from-[#5A32A3] to-[#D03592] relative'>Calculations</span></div>
            <div className='flex flex-wrap justify-center'>
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="">
                        <TransactionCard transactionDetails={transaction} categories={categories} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;
