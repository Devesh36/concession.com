import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                      req.nextUrl.pathname.startsWith('/register');

    if (isAuthPage) {
      if (isAuth) {
        const role = token.role as string;
        const dashboardPath = {
          STUDENT: "/dashboard/student",
          COLLEGE_STAFF: "/dashboard/college",
          RAILWAY_STAFF: "/dashboard/railway",
        }[role] || "/dashboard/student";

        return NextResponse.redirect(new URL(dashboardPath, req.url));
      }
      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ]
};