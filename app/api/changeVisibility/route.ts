import { db as prisma } from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const user = await getCurrentUser();
    const body = await request.json();

    if (!user) return NextResponse.error()

    const { id: transactionID, access: transactionAccess } = body;

    try {
        const transaction = await prisma.historicalData.findUnique({
            where: {
                id: transactionID,
            },
        });

        if (!transaction) {
            return NextResponse.json({ success: false, message: "Transaction not found" });
        }

        if (transaction.userId !== user.id) {
            return NextResponse.json({ success: false, message: "User unauthorized" });
        }

        const updatedAccess = !transactionAccess;

        await prisma.historicalData.update({
            where: {
                id: transactionID,
            },
            data: {
                access: updatedAccess,
            },
        });

        return NextResponse.json({ success: true, updatedAccess });

    } catch (error) {
        return NextResponse.error();
    }
}