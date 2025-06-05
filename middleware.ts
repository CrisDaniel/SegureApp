// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // a dónde redirigir si no hay sesión
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/superadmin/:path*",
  ],
};