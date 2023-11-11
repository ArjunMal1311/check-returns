import { NextResponse } from "next/server";
import { db as prisma } from "./db";
import getCurrentUser from "./getCurrentUser";


export default async function getTransactionDetails() {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.error();
    }

    try {
        const transactionData = await prisma.historicalData.findMany({
            where: {
                userId: user.id
            }
        })

        return transactionData
    } catch (error) {
        NextResponse.error();
    }
}