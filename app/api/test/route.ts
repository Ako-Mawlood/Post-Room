import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

import { sendMail } from "@/service/mailService";
import { generateToken } from "@/libs/auth";

export async function GET(request: Request) {
  try {
    await prisma.user.deleteMany();

    return NextResponse.json("success", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
