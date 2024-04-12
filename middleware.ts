import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./app/libs/auth";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  const path = request.nextUrl.pathname;

  const authRoutes = path == "/protected";

  if (authRoutes && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
