import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { SupabaseAdapter } from "@auth/supabase-adapter";

export const authConfig: NextAuthConfig = {
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Email({
      server: process.env.EMAIL_SERVER!,
      from: process.env.EMAIL_FROM!,
    }),
  ],
  session: { strategy: "database" },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // @ts-expect-error additional fields we store on users table
        session.user.subscription_status = user.subscription_status ?? null;
        // @ts-expect-error additional fields
        session.user.stripe_customer_id = user.stripe_customer_id ?? null;
      }
      return session;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
