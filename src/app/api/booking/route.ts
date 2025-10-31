import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const booking = await prisma.booking.findMany();
    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      experienceId,
      slotId,
      firstName,
      lastName,
      email,
      phone,
      numberOfSeats,
      promoCode,
    } = await req.json();

    if (!experienceId || !slotId || !firstName || !email || !phone || !numberOfSeats) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
    });

    if (!slot) {
      return NextResponse.json({ error: "No slot found" }, { status: 404 });
    }

    if (slot.availableSeats < numberOfSeats) {
      return NextResponse.json(
        { error: `Only ${slot.availableSeats} seats are available` },
        { status: 400 }
      );
    }

    const totalPrice = slot.price * numberOfSeats;
    let discount = 0;
    let finalPrice = totalPrice;

    if (promoCode) {
      const promo = await prisma.promoCode.findUnique({
        where: {
          code: promoCode.toUpperCase(),
        },
      });

      if (promo && promo.isActive) {
        const now = new Date();
        if (!promo.expiryDate || promo.expiryDate > now) {
          if (promo.discountType === "percentage") {
            discount = (totalPrice * promo.discountValue) / 100;
          } else if (promo.discountType === "fixed") {
            discount = promo.discountValue;
          }
          finalPrice = totalPrice - discount;
        }
      }
    }

    await prisma.slot.update({
      where: { id: slotId },
      data: {
        availableSeats: { decrement: numberOfSeats },
      },
    });

    const newBooking = await prisma.booking.create({
      data: {
        experienceId,
        slotId,
        firstName,
        lastName,
        email,
        phone,
        numberOfSeats,
        totalPrice,
        promoCode: promoCode?.toUpperCase() || null,
        discount,
        finalPrice,
        status: "confirmed",
      },
      include: {
        experience: true,
        slot: true,
      },
    });

    return NextResponse.json(newBooking, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
