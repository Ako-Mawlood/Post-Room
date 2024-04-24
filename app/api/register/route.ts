import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

import { sendMail } from "@/service/mailService";
import { generateToken } from "@/libs/auth";

export async function POST(request: Request) {
  try {
    const Data = await request.json();
    const { email, password } = Data;

    if (!email || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const doesUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (doesUserExist) {
      return new NextResponse("User already exists. Please sign in instead.", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    const tokenString =
      crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");

    const token = await prisma.activateToken.create({
      data: {
        token: tokenString,
        userId: user.id,
      },
    });

    const activateUrl = `http://localhost:3000/activate/${token.token}`;

    await sendMail({
      subject: "Verify your Post Room account email",
      email: user.email,
      html: `
      <div>
        <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 1rem;">Verify your email to start using Post Room</h1>
        <a href=${activateUrl} target="_blank" style="background-color: #0072dd; font-size: 14px; color: #ffffff; font-weight: 600; border-radius: 0.5rem; padding: 0.75rem; text-decoration: none;">
        Verify Your Email
        </a>
        <div style="margin-top: 5rem;">
          <h2 style="font-size: 14px; margin-bottom: 1rem;">If you can't see the button, Use this link instead:</h2>
          <a href=${activateUrl} target="_blank" style="color: #0072dd;">${activateUrl}</a>
        </div>
      </div>
      `,
    });

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
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
