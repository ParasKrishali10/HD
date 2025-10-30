import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const validatePromoCode = async (req: Request, res: Response) => {
  try {
    const { code, totalAmount } = await req.json();

    if (!code) {
      return NextResponse.json({error: 'Promo code is required'},{status:400})
    }

    const promo = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!promo) {
      return NextResponse.json({error: 'Invalid promo code'},{status:404})

    }

    if (!promo.isActive) {
      return NextResponse.json({error: 'Promo code is no longer active'},{status:400})
    }

    const now = new Date();
    if (promo.expiryDate && promo.expiryDate < now) {
      return NextResponse.json({ error: 'Promo code has expired'},{status:400})
    }

    let discount = 0;
    let finalAmount = totalAmount || 0;

    if (promo.discountType === 'percentage') {
      discount = (finalAmount * promo.discountValue) / 100;
    } else if (promo.discountType === 'fixed') {
      discount = promo.discountValue;
    }

    finalAmount = Math.max(0, finalAmount - discount);

    return NextResponse.json({message: 'Promo code applied successfully'},{status:200})
  } catch (error) {
    console.error('Error validating promo code:', error);
    return NextResponse.json({error: 'Failed to validate promo code'},{status:500})
  }
};