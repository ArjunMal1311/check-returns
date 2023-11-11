import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";

export async function POST(request: Request,) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "No user" })
    }

    try {
        const body = await request.json();
        const { name } = body;

        await prisma.category.create({
            data: { name, userId: user.id }
        })

        return NextResponse.json({ success: true, message: "Created" })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error" })
    }
}

export async function PATCH(request: Request,) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "No user" })
    }

    try {
        const body = await request.json();
        const { id, name } = body;

        await prisma.category.update({
            where: {
                id: id,
                userId: user.id
            },
            data: { name }
        })

        return NextResponse.json({ success: true, message: "Updated" })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error" })
    }
}
