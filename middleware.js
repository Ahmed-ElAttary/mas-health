import { NextResponse } from "next/server";
export function middleware(req) {
  const response = NextResponse.next();
  response.headers.set("access-control-allow-origin", "*");
  return response;
}
export const config = {
  matcher: "/api/:path*",
};
