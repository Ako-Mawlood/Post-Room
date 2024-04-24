import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { activateToken: string } }
) {
  try {
    const token = await prisma.activateToken.findUnique({
      where: {
        token: params.activateToken,
      },
    });

    if (!token) {
      return new NextResponse("Token not valid", { status: 400 });
    }
    const isUserVerified = await prisma.user.findFirst({
      where: {
        id: token.userId,
        isEmailVerified: true,
      },
    });

    if (isUserVerified) {
      return new NextResponse("Email is already verified", { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        id: token.userId,
      },
      data: {
        isEmailVerified: true,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
