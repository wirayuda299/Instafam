export { default } from "next-auth/middleware"

export const config = { matcher: ["/", "/search", "/explore", "/notifications", "/messages", "/create", "/profile", "/api/auth/:path*", '/post/:path*'] }