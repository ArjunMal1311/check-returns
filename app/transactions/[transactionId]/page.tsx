"use client"

import TransactionCard from '@/components/TransactionCards/TransactionCard';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

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

const page = () => {
    const params = useParams();
    const [transaction, setTransaction] = useState<Transaction | null>(null);

    useEffect(() => {
        const transactionfetch = async () => {
            try {
                const response = await axios.get(`/api/transaction?id=${params.transactionId}`);
                console.log(response)
                setTransaction(response.data.data)
            } catch (error) {
                console.log("Error")
            }
        }
        transactionfetch()
    }, []);

    return (
        <div>
            {transaction && <TransactionCard transactionDetails={transaction} />}
        </div>
    );

}

export default page