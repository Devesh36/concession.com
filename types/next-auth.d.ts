import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
    college: string;
  }
  
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      college: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}