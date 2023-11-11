import { db as prisma } from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request,) {
    const user = await getCurrentUser();
    const body = await request.json();

    if (!user) return NextResponse.error()
    const { investment, rateOfInterest, timePeriod, investmentType, timeUnit, returns, totalValue } = body;

    const roi = parseFloat(rateOfInterest)
    await prisma.historicalData.create({ data: { investmentType, investmentAmount: parseFloat(investment), rateOfInterest: roi, timePeriod: timePeriod + timeUnit, return: returns, totalReturns: totalValue, userId: user.id } })
    return NextResponse.json({ success: true })
}

export async function GET(request: Request) {
    const user = await getCurrentUser();
    const queryParams = new URLSearchParams(request?.url?.split("?")[1]);
    var id = queryParams.get("id") || '';

    if (!id) {
        return NextResponse.json({ success: false, message: "No ID or wrong ID" });
    }

    const transactionData = await prisma.historicalData.findFirst({
        where: {
            id: id as string
        }
    })

    if (!transactionData) {
        return NextResponse.json({ success: false, message: "Transaction not found" })
    }

    if (user?.id === transactionData.userId || transactionData.access) {
        return NextResponse.json({ success: true, data: transactionData });
    }

    return NextResponse.json({ success: false, message: "Unauthorized Access" });
}
