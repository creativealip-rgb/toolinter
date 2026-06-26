import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*"],
};

export function middleware(request: NextRequest) {
  const user = process.env.DASHBOARD_USER || "admin";
  const pass = process.env.DASHBOARD_PASS || "toolinter2026";

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Toolinter Dashboard"' },
    });
  }

  const decoded = atob(authHeader.split(" ")[1]);
  const [u, p] = decoded.split(":");

  if (u !== user || p !== pass) {
    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Toolinter Dashboard"' },
    });
  }

  return NextResponse.next();
}
