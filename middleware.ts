import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req: NextRequest) {
  const token = getCookie("token", { req });
  const pathname = req.nextUrl.pathname;

  // ✅ If user is on "/" and has a token, redirect to "/blogs"
  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/blogs", req.url));
  }

  // ✅ Only protect routes listed in `matcher`, NOT "/"
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Define only protected routes (exclude "/")
const protectedRoutes = [
  "/blogs",
  "/create",
  "/account-setup",
  "/settings",
  "/search",
  "/category",
  "/delete-account",
  "/reset-password",
];

export const config = {
  matcher: protectedRoutes.map((route) => `${route}/:path*`),
};
