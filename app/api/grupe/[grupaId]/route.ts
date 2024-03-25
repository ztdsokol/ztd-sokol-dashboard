import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { grupaId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, locationId, programId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.grupaId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const group = await prismadb.group.updateMany({
      where: {
        id: params.grupaId,
      },

      data: {
        name,
        locationId,
        programId,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.log("[group_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { grupaId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.grupaId) {
      return new NextResponse("group id is required", { status: 400 });
    }

    const group = await prismadb.group.deleteMany({
      where: {
        id: params.grupaId,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
