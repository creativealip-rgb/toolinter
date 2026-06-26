import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/blog/:path*"],
};

function isAuthorized(request: NextRequest) {
  const user = process.env.DASHBOARD_USER || "admin";
  const pass = process.env.DASHBOARD_PASS || "toolinter2026";
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) return false;

  try {
    const decoded = atob(authHeader.split(" ")[1] || "");
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) return false;

    const u = decoded.slice(0, separatorIndex);
    const p = decoded.slice(separatorIndex + 1);
    return u === user && p === pass;
  } catch {
    return false;
  }
}

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Toolinter Dashboard"',
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
    },
  });
}

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const isPreview = url.searchParams.get("preview") === "1";
  const needsAuth = pathname.startsWith("/dashboard") || isPreview;

  if (needsAuth && !isAuthorized(request)) {
    return unauthorizedResponse();
  }

  const response = NextResponse.next();

  if (isPreview) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  }

  return response;
}
