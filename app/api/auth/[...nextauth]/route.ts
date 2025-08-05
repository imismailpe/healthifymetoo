import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise, { databaseName: "HMT" }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          plan: "free",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Runs on initial sign in
      if (user) {
        const client = await clientPromise;
        const db = client.db();
        const existingUser = await db
          .collection("users")
          .findOne({ _id: new ObjectId(user.id) });

        token.plan = existingUser?.plan || "free";
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
        session.user.plan = token.plan as string;
      }
      return session;
    },
  },
  // events: {
  //   async createUser({ user }) {
  //     const client = await clientPromise;
  //     const db = client.db();
  //     await db
  //       .collection("users")
  //       .updateOne({ _id: new ObjectId(user.id) }, { $set: { plan: "free" } });
  //     console.log("plan set to free for:", user.id);
  //   },
  // },
});

export { handler as GET, handler as POST };
