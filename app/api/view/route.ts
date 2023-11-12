import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";


export async function POST(request: Request) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "No user" });
    }

    try {
        const body = await request.json();
        const { cardNumber, name, price } = body;

        const itemData = {
            name: name || "Name",
            categoryId: cardNumber,
            price: price || 500,
            method: "UPI",
        };

        await prisma.item.create({
            data: itemData,
        });

        const category = await prisma.category.findUnique({
            where: {
                id: cardNumber,
            },
        });

        if (!category) {
            return NextResponse.json({ success: false, message: "Category not found" });
        }

        const newTotalAmount = category.TotalAmount + itemData.price;

        await prisma.category.update({
            where: {
                id: cardNumber,
            },
            data: {
                TotalAmount: newTotalAmount,
            },
        });

        return NextResponse.json({ success: true, message: "Created" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error" });
    }
}


export async function PATCH(request: Request,) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "No user" })
    }

    try {
        const body = await request.json();
        const { viewInfo } = body;

        console.log(viewInfo)

        await prisma.item.delete({
            where: {
                id: viewInfo
            }
        })

        return NextResponse.json({ success: true, message: "Deleted" })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error" })
    }
}
