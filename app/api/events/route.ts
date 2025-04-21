import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const events = await prisma.event.findMany({
            include: {
                host: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session: any = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await request.json();

        const formattedData = {
            ...data,
            date: new Date(data.date).toISOString(),
        };

        const event = await prisma.event.create({
            data: {
                ...formattedData,
                hostId: session.user.id,
            },
        });
        return NextResponse.json(event);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}