import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, locationId, programId, memberIds } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const group = await prismadb.group.create({
      data: {
        name,
        locationId,
        programId,
        members: {
          connect: memberIds.map((memberId: string) => ({ id: memberId })),
        },
      },
      include: { members: true },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.log("[GOUPS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const groups = await prismadb.group.findMany({});

    return NextResponse.json(groups);
  } catch (error) {
    console.log("[GOUPS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
