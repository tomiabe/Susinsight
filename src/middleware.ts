import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function buildRedirectUrl(request: NextRequest, pathname: string): URL {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return url;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/feed" || pathname === "/rss") {
    return NextResponse.redirect(buildRedirectUrl(request, "/feed.xml"), 308);
  }

  if (pathname === "/wp-login.php") {
    return NextResponse.redirect(buildRedirectUrl(request, "/login"), 308);
  }

  // Legacy WordPress date permalinks -> /stories/[slug]
  const datedWithDay = pathname.match(/^\/\d{4}\/\d{2}\/\d{2}\/([^/]+)\/?$/);
  if (datedWithDay?.[1]) {
    return NextResponse.redirect(buildRedirectUrl(request, `/stories/${datedWithDay[1]}`), 308);
  }

  const datedNoDay = pathname.match(/^\/\d{4}\/\d{2}\/([^/]+)\/?$/);
  if (datedNoDay?.[1]) {
    return NextResponse.redirect(buildRedirectUrl(request, `/stories/${datedNoDay[1]}`), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"]
};
