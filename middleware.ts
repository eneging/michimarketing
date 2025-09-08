// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value; // 👈 guardado cuando el user hace login

  const { pathname } = request.nextUrl;

  // 🔐 Si no hay token y quiere acceder a admin → redirigir a login
  if (!token && pathname.startsWith("/admin")) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 🔐 Si no es admin y quiere acceder a admin → redirigir al home
  if (pathname.startsWith("/admin") && role !== "admin") {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // protege todo lo que esté bajo /admin
};
