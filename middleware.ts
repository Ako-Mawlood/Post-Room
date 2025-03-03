import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req: NextRequest) {
  const token = getCookie("token", { req });
  const pathname = req.nextUrl.pathname;

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/blogs", req.url));
  }

  if (!token && config.matcher.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/blogs",
    "/create/:path*",
    "/account-setup",
    "/settings",
    "/search",
    "/category",
    "/delete-account/:path*",
    "/reset-password/:path*",
    "/",
  ],
};
