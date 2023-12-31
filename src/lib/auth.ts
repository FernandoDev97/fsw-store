import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prismaClient } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { stringify } from "querystring";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user, token }) => {
      session.user = { ...session.user, id: user.id } as {
        id: string;
        name: string;
        email: string;
      };
    
      return session;
    },
  },
};
