import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const event = await prisma.event.findUnique({
            where: {
                id: resolvedParams.id,
            },
            include: {
                host: {
                    select: {
                        name: true,
                    },
                },
                bookings: {
                    select: {
                        quantity: true,
                    },
                },
            },
        });

        if (!event) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch event" },
            { status: 500 }
        );
    }
}