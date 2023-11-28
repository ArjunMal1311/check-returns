import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";

export async function PATCH(request: Request) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "No user" });
    }

    try {
        const body = await request.json();
        const { id, name, price, method } = body;

        const item = await prisma.item.findUnique({
            where: {
                id: id,
            },
            include: {
                category: true,
            },
        });

        if (!item) {
            return NextResponse.json({ success: false, message: "Item not found" });
        }

        const oldPrice = item.price;
        const newPrice = parseFloat(price);
        const priceChange = newPrice - oldPrice;

        await prisma.item.update({
            where: {
                id: id,
            },
            data: { name, price: newPrice, method },
        });

        const categoryId = item.category.id;
        const newTotalAmount = item.category.TotalAmount + priceChange;

        await prisma.category.update({
            where: {
                id: categoryId,
                userId: user.id
            },
            data: {
                TotalAmount: newTotalAmount,
            },
        });

        return NextResponse.json({ success: true, message: "Updated" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error" });
    }
}
