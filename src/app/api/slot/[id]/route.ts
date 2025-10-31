import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const slot = await prisma.slot.findUnique({
      where: { id },
      include: { experience: true },
    });

    if (!slot) {
      return NextResponse.json({ error: "Slot not found" }, { status: 404 });
    }

    return NextResponse.json(slot);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch slot" }, { status: 500 });
  }
}
