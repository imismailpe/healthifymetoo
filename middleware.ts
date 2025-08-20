import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});
// Protect only specific routes
export const config = {
  matcher: ["/dashboard", "/settings", "/profile", "/conditions", "/health"],
};
