import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request,res:Response){
    try{
          const { code, discountType, discountValue, expiryDate, isActive } = await req.json();
          if(!code || !discountType || !discountValue)
          {
            return NextResponse.json({error:"Missing Fields"},{status:400});
          }

          const promo=await prisma.promoCode.create({
            data: {
        code: code.toUpperCase(),
        discountType,
        discountValue: parseFloat(discountValue),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        isActive: isActive !== undefined ? isActive : true,
      }
          })

          return NextResponse.json(promo,{status:200})

    }catch(error:any)
    {
        console.log(error)
        if(error.code==='P20002')
        {
            return NextResponse.json({error:"Promo code already exist"},{status:405})

        }
        return NextResponse.json({error:"Failed to add the promo"},{status:500})
    }
}