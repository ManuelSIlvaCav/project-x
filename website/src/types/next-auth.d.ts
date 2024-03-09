import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      accessToken: string;
      userId: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    accessToken: string;
    userId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    userId: string;
  }
}
