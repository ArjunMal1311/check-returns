import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";

export async function GET(request: Request, response: Response) {
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const query = queryParams.get("query");

    try {
        if (!query) {
            const searchResults = await prisma.calculatorDetails.findMany({})
            return NextResponse.json({ success: true, data: searchResults })
        }

        const searchResults = await prisma.calculatorDetails.findMany({
            where: {
                calculatorName: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
        });

        return NextResponse.json({ success: true, data: searchResults })
    } catch (error) {
        console.error('Error while searching:', error);
        return NextResponse.json({ success: true, route: "Search" });
    }
}
