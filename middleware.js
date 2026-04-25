import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // login ছাড়া payment এ যেতে পারবে না
  if (pathname.startsWith("/payment") && !req.auth) {
    return Response.redirect(new URL("/login", req.url));
  }

  // admin ছাড়া dashboard এ যেতে পারবে না
  if (pathname.startsWith("/dashboard") && req.auth?.user?.role !== "admin") {
    return Response.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/payment/:path*", "/dashboard/:path*"],
};