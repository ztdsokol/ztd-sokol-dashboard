import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { programId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.programId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const program = await prismadb.program.updateMany({
      where: {
        id: params.programId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    console.log("[program_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { programId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.programId) {
      return new NextResponse("program id is required", { status: 400 });
    }

    const program = await prismadb.program.deleteMany({
      where: {
        id: params.programId,
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
