import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { lokacijaId: string } }
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

    if (!params.lokacijaId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const location = await prismadb.location.updateMany({
      where: {
        id: params.lokacijaId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.log("[location_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { lokacijaId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.lokacijaId) {
      return new NextResponse("location id is required", { status: 400 });
    }

    const location = await prismadb.location.deleteMany({
      where: {
        id: params.lokacijaId,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
