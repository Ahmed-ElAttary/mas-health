import { NextResponse } from "next/server";

export function middleware(req) {
  // 1. Handle Preflight Request (OPTIONS)
  if (req.method === 'OPTIONS') {
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return new NextResponse(null, { status: 200, headers });
  }

  // 2. Handle Actual Request (POST, GET, etc.)
  const response = NextResponse.next();
  
  // You must still add the Origin header to the actual response
  response.headers.set("Access-Control-Allow-Origin", "*");
  
  return response;
}

export const config = {
  matcher: "/api/:path*",
};