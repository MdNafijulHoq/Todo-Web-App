import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  console.log("proxy running for:", request.nextUrl.pathname);

  // Get the access token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  //   console.log({ accessToken });

  // Define protected routes
  const protectedRoutes = ["/todos", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Define public routes that should redirect to profile if logged in
  const publicRoutes = ["/login", "/signup", "/"];
  const isPublicRoute = publicRoutes.some(
    (route) => request.nextUrl.pathname === route
  );

  // If user is not authenticated and trying to access protected route
  if (!accessToken && isProtectedRoute) {
    // console.log("Redirecting to login from protected route");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access public routes
  if (accessToken && isPublicRoute) {
    // console.log("Redirecting to profile from public route");
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
