import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request, { params }: { params: { id: string } }){
    try{
        const {id}=await params
        const experience=await prisma.experience.findUnique({
            where:{
                id
            }
        })
        return NextResponse.json(experience,{status:200})
    }catch(error)
    {
            return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
    }
}
