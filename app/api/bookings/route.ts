import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const session: any = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const bookings = await prisma.booking.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                event: true,
            },
        });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session: any = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await request.json();
        const { eventId, quantity } = data;

        // Check event availability
        const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: {
                bookings: true,
            },
        });

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        const totalBookedSeats = event.bookings.reduce((acc: any, booking: any) => acc + booking.quantity, 0);
        if (totalBookedSeats + quantity > event.capacity) {
            return NextResponse.json({ error: "Not enough seats available" }, { status: 400 });
        }

        const booking = await prisma.booking.create({
            data: {
                eventId,
                quantity,
                userId: session.user.id,
                status: "CONFIRMED",
            },
        });

        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}