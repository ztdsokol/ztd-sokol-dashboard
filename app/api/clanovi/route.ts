import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, email, birthdate } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const member = await prismadb.member.create({
      data: {
        name,
        email,
        birthdate,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.log("[memberS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const members = await prismadb.member.findMany({});

    return NextResponse.json(members);
  } catch (error) {
    console.log("[GOUPS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
