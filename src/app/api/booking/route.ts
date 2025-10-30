import prisma from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";
export async function GET(req:Request,res:Response) {
 try{
    const booking=await prisma.booking.findMany()
    return NextResponse.json(booking,{status:200})
 }catch(error)
     {
        console.log(error)
             return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
     }
}

export async function POST(req:Request,res:Response)
{
    try{
       const {experienceId,slotId,firstName,lastName,email,phone,numberOfSeats,promoCode} =await req.json();
        if (!experienceId || !slotId || !firstName || !lastName || !email || !phone || !numberOfSeats)
        {
            return NextResponse.json({error:"Missing Req Fields"},{status:400})
        }
        const slot=await prisma.slot.findUnique({
            where:{id:slotId}
        })
        if(!slot)
        {
            return NextResponse.json({error:"No slot is there"},{status:401})
        }

        if(slot.availableSeats<numberOfSeats)
        {
            return NextResponse.json({error:`Only ${slot.availableSeats} are available`},{status:402})
        }

        const totalPrice=slot.price*numberOfSeats;
        let discount=0;
        let finalPrice=totalPrice

        if(promoCode)
        {
            const promo=await prisma.promoCode.findUnique({
                where:{
                    code:promoCode.toUpperCase(0)
                }
            })
            if(promoCode && promo?.isActive)
            {
                const now=new Date()
                if(!promo.expiryDate || promo.expiryDate > now)
                {
                    if(promo.discountType==="percentage")
                    {
                        discount=(totalPrice*promo.discountValue)/100
                    }else if(promo.discountType === 'fixed')
                    {
                        discount=promo.discountValue
                    }
                    finalPrice=totalPrice-discount
                }
            }
        }

        const booking=await prisma.slot.update({
            where:{
                id:slotId
            },
            data:{
                availableSeats:{
                    decrement:numberOfSeats
                }
            }
        })
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
          status: 'confirmed',
        },
        include: {
          experience: true,
          slot: true,
        },
      });

      return NextResponse.json(newBooking,{status:200});

    }catch(error)
     {
        console.log(error)
             return NextResponse.json({ error: "Failed to create bookings" }, { status: 500 });
     }
}