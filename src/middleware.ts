import { NextRequest, NextResponse } from "next/server";
export { withAuth } from "next-auth/middleware"

 export async  function middleware(req:NextRequest) {
    const cookie = req.cookies.has("next-auth.session-token")

    if(cookie) {
        return NextResponse.next()
    } else {
      return NextResponse.rewrite(new URL("/auth/signin", req.url).toString());
    }
  }

export const config = {
  matcher: [
    "/",
    "/explore",
    "/notifications",
    "/messages",
    "/create",
    "/profile",
    "/profile/:path*",
    "/post/:path*",
    "/post/:path*/:path*",
    "/api/:path*",
    "/auth/:path*",
    "/auth/:path*/:path*",
    "/auth/signin/:path*/:path*",
    "/auth/signin/:path*",
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
