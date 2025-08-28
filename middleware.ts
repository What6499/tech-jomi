import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// Define routes that require authentication
const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  // Get the session using your auth function
  const session = await auth();

  // Check if the request path starts with any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If the route is protected and there's no session, redirect to login
  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/api/auth/signin", request.url);

    return NextResponse.redirect(signInUrl);
  }
  // Allow the request to proceed if authenticated or not a protected route
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: ["/dashboard/add-product"],
};
