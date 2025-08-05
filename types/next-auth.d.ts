import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    plan?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    plan?: string;
  }
}
