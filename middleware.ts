import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Get pathname from request
    const path = req.nextUrl.pathname;
    
    // Check if the user is authenticated
    const isAuthenticated = !!req.nextauth.token;
    
    // Define public paths that don't require authentication
    const publicPaths = ["/", "/login", "/register"];
    
    // Check if current path is public
    const isPublicPath = publicPaths.includes(path);

    // Handle authentication redirects
    if (!isAuthenticated && !isPublicPath) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Redirect authenticated users away from login/register pages
    if (isAuthenticated && isPublicPath && path !== "/") {
      return NextResponse.redirect(new URL("/dashboard/student", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // This lets the middleware function handle the logic
    },
  }
);

export const config = {
  // Specify which paths the middleware should run on
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside public directory)
     * 4. /examples (inside public directory)
     * 5. all files inside public (e.g. favicon.ico)
     */
    "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
  ],
};