import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { generateToken } from "@/app/libs/auth";

export async function POST(request: Request) {
  try {
    const Data = await request.json();
    const { email, password } = Data;

    if (!email || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse("Invalid email or password", { status: 400 });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!isCorrectPassword) {
      return new NextResponse("Incorrect email or password", { status: 400 });
    }

    const session = await generateToken(user.id);

    const response = NextResponse.json(
      { id: user.id, email: user.email },
      { status: 200 }
    );

    response.cookies.set({
      name: "session",
      value: session,
      httpOnly: true,
      maxAge: 30 * 86400,
    });

    return response;
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
