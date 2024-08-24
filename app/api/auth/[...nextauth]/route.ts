import NextAuth from "next-auth/next";
import { authOptions } from "./options";

export const auth = NextAuth(authOptions);

export { auth as POST, auth as GET };
