import { auth } from "@/lib/auth/server";

export default auth.middleware({
  loginUrl: "/admin/login",
});

export const config = {
  matcher: [
    // Protect all /admin routes except login
    "/admin",
    "/admin/projects/:path*",
    "/admin/messages/:path*",
  ],
};
