import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      // In development, log the magic link to the server console to avoid SMTP setup
      async sendVerificationRequest({ identifier, url }) {
        console.log(`\n[NextAuth Email] Magic login link for ${identifier}:\n${url}\n`);
      },
    }),
  ],
};
