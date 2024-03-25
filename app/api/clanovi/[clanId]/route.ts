import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { clanId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, email, birthdate } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.clanId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const member = await prismadb.member.updateMany({
      where: {
        id: params.clanId,
      },
      data: {
        name,
        email,
        birthdate,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.log("[member_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { clanId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.clanId) {
      return new NextResponse("member id is required", { status: 400 });
    }

    const member = await prismadb.member.deleteMany({
      where: {
        id: params.clanId,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
