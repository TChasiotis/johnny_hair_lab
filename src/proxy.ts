import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Η Next.js 16 ζητάει ξεκάθαρη συνάρτηση με το όνομα proxy
export async function proxy(req: NextRequest) {
  // Ελέγχουμε αν υπάρχει έγκυρο session/token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Αν δεν έχει token, πόρτα και πίσω στο /login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Αν έχει, περνάει κανονικά
  return NextResponse.next();
}

// Κλειδώνει ΜΟΝΟ το /admin και τα υπομενού του
export const config = {
  matcher: ["/admin/:path*"],
};
