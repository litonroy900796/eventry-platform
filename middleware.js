import NextAuth from "next-auth";
import { authConfig } from "@/auth.config"; // 👈 auth.js না, auth.config.js

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/payment/:path*", "/dashboard/:path*", "/my-events/:path*"],
};