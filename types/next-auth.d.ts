import { DefaultUser,TokenSet } from "next-auth";

export interface CustomUser extends DefaultUser {
  id: number; // Match this with your Prisma User model type
}

declare module "next-auth" {
  interface User extends CustomUser {}
} 
