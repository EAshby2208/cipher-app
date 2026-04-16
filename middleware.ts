// middleware.ts
import { updateSession } from "@/lib/supabase/proxy";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
    // Only run middleware on dashboard and API routes (where auth is needed)
    matcher: ["/dashboard/:path*", "/api/:path*"],
};