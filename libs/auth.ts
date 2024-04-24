"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import prisma from "@/libs/prismadb";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateToken(id: number) {
  return await new SignJWT({ id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

export async function decodeToken(token: string) {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ["HS256"],
  });

  return payload as { id: number };
}

export async function getSession() {
  const session = cookies().get("session")?.value;

  if (!session) return null;

  return await decodeToken(session);
}

export async function getCurrentUser() {
  const session = cookies().get("session")?.value;

  if (!session) return null;

  const { id } = await decodeToken(session);

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      isEmailVerified: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}
