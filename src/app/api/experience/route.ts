import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany();
    console.log(experiences);
    return NextResponse.json(experiences, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req:Request){
    try{
           const {
      title,
      description,
      location,
      price,
      rating,
      reviewCount,
      image,
      category,
      duration,
      highlights,
      included,
    } = await req.json();

    if(!title || !description || !location || !price || !image || !category || !duration)
    {
      return NextResponse.json({error:"Missing Req Fields"},{status:400})
    }

    const experience = await prisma.experience.create({
      data: {
        title,
        description,
        location,
        price: parseFloat(price),
        rating: parseFloat(rating) || 0,
        reviewCount: parseInt(reviewCount) || 0,
        image,
        category,
        duration,
        highlights: highlights || [],
        included: included || [],
      },
    });

        return NextResponse.json(experience,{status:200})

    }catch(error)
    {
      console.log(error)
            return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
    }
}