export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/",
    "/explore",
    "/notifications",
    "/messages",
    "/create",
    "/profile",
    "/api/auth/:path*",
    "/api/auth/signin/:path*",
    "/api/auth/signin",
    "/api/auth/signin/callback/:path*",
    "/api/auth/signin/callback",
    "/api/auth/signin/:path*",
    "/post/:path*, /((?!_next|fonts|api|svg|[\\w-]+\\.\\w+).*), /_next/:path*, /_next/data, /_next/data/:path*",
  ],
};
