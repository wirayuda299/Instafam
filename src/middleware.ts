import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const regex = new RegExp(
      /^\/([a-zA-Z0-9-_+]+\/)*[a-zA-Z0-9-_+]+\.[a-zA-Z0-9]+$/
    );
    const isStatic = regex.test(pathname);
    const hasToken = req.nextauth.token != null;

    if (pathname === "/latest/meta-data") {
      if (hasToken && isStatic) {
        return NextResponse.rewrite(new URL("/", req.url));
      }
      return NextResponse.rewrite(new URL("/auth/signin", req.url));
    }

    if (isStatic) {
      if (hasToken) {
        return NextResponse.rewrite(new URL(pathname, req.url));
      }
      return NextResponse.rewrite(new URL("/auth/signin", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null || token !== undefined,
    },
  }
);
export const config = {
  matcher: [
    "/",
    "/trending",
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/latest/meta-data",
  ],
};
