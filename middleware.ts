import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"
import {getCookie} from "cookies-next"

export function middleware(req: NextRequest) {
  // Check if the request is coming from the home page to prevent redirect loop
  const {pathname} = req.nextUrl
  if (pathname === "/") {
    return NextResponse.next()
  }

  // Get the token from the cookies
  const token = req.cookies.get("token")

  // If there's no token and the request is not for the home page, redirect to home
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // If there's a token, proceed as normal
  return NextResponse.next()
}

// Define the paths the middleware should be applied to
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}
