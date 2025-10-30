import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(req:Request,res:Response) {
 try{

 }catch(error)
     {
             return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
     }
}