import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "@/lib/query";
import connectDB from "@/lib/mongodb";
import { authConfig } from "@/auth.config"; // 👈

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await findUserByCredentials({
            email: credentials.email,
            password: credentials.password,
          });
          return user ?? null;
        } catch {
          return null;
        }
      },
    }),
  ],
});