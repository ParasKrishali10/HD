import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request, { params }: { params: { id: string } }){
    try{
        const {id}=await params
                if(!id){
            return NextResponse.json({error:"Id is requried"},{status:400})
        }
        const experience=await prisma.experience.findUnique({
            where:{
                id
            }
        })
        return NextResponse.json(experience,{status:200})
    }catch(error)
    {
        console.log(error)
            return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
    }
}
