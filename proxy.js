import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const role = decoded.role;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/dashboard/admin")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard/user", req.url));
      }
    }

    if (path.startsWith("/dashboard/user")) {
      if (role !== "user") {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      }
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/Login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/Profile/:path*",
    "/products/:path*",
    "/card/:path*",
    "/orders/:path*",
  ],
};
