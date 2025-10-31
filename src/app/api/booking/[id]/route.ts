import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/booking/[id]
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 In Next.js 15, params is a Promise
) {
  const { id } = await context.params;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        experience: true,
        slot: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}


export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const data = await req.json();
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
