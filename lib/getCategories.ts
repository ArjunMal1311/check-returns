import { NextResponse } from "next/server";
import { db as prisma } from "./db";
import getCurrentUser from "./getCurrentUser";


export default async function getCategories() {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.error();
    }

    try {
        const res = await prisma.category.findMany({
            where: {
                userId: user.id
            },
            include: {
                items: true
            }
        });

        return res;
    } catch (error) {
        NextResponse.error();
    }
}