import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{id:string}},res:Response)
{
    try{
        const {id}=await params
        if(!id){
            return NextResponse.json({error:"Id is requried"},{status:400})
        }

        const booking=await prisma.booking.findUnique({
            where:{
                id
            },
            include:{
                experience:true,
                slot:true
            }
        })

        if(!booking)
        {
            return NextResponse.json({error:"Booking Not Found"},{status:404})
        }

        return NextResponse.json(booking,{status:200})

    }catch(error){
        console.log(error)
                 return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
         }
}