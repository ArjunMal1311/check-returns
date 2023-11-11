import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";

export async function PATCH(request: Request,) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "No user" })
    }

    try {
        const body = await request.json();
        const { id } = body;

        console.log(id)

        const res = await prisma.category.delete({
            where: {
                id: id,
                userId: user.id
            }
        })

        console.log(res)

        return NextResponse.json({ success: true, message: "Updated" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Error" })
    }
}
