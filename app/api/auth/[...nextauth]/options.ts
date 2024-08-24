import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const prisma = new PrismaClient();
        try {
          if (!credentials?.username || !credentials.password) {
            return null;
          }

          const user = await prisma.user.findFirst({
            where: { username: credentials.username },
          });

          return user;
        } catch (error) {
          console.log(error);
          return null;
        } finally {
          prisma.$disconnect();
        }
      },
    }),
  ],
  pages: {
    signIn: "/signup",
  },
};
