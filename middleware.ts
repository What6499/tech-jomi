import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {

  const session = await auth();


  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );


  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/api/auth/signin", request.url);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/add-product"],
};
