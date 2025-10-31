import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Promo code is required" }, { status: 400 });
    }

    const promo = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!promo || !promo.isActive) {
      return NextResponse.json({ valid: false, message: "Invalid or inactive code" }, { status: 404 });
    }

    const now = new Date();
    if (promo.expiryDate && promo.expiryDate < now) {
      return NextResponse.json({ valid: false, message: "Promo code expired" }, { status: 410 });
    }

    return NextResponse.json({ valid: true, promo }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to validate promo" }, { status: 500 });
  }
}
