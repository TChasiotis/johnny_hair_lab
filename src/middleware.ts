export { default } from "next-auth/middleware";

export const config = {
  // Αυτό σημαίνει: "Κλείδωσε ΟΛΕΣ τις σελίδες που ξεκινάνε από /admin"
  matcher: ["/admin/:path*"],
};
