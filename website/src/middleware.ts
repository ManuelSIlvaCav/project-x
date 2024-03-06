import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { JwtCookie } from "./app/lib/actions/authenticate";

export async function middleware(req: NextRequest) {
  console.log("going in middleware");
  const jwtTokenData = cookies().get("jwt_token") as JwtCookie;
  //We need to check if expired

  if (jwtTokenData) {
    const jwtToken = jwtTokenData.value;
    const maxAge = jwtTokenData.maxAge;
    console.log({ jwtToken, maxAge });
  }
  const { pathname } = req.nextUrl;

  // if (session && (pathname === "/login" || pathname === "/register")) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  //We add the pathname to the request object
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/login/:path*", "/jobs/:id/:path*"],
};
