import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
  const supabase = getSupabaseAdmin();

  // Ensure we have a Stripe customer
  let customerId = (session.user as any).stripe_customer_id as string | null;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email!,
      metadata: { supabase_user_id: session.user.id as string },
    });
    customerId = customer.id;
    await supabase.from("users").update({ stripe_customer_id: customerId }).eq("id", session.user.id);
  }

  const priceId = process.env.STRIPE_PRICE_ID!; // recurring $10
  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?cancel=1`,
    allow_promotion_codes: true,
    billing_address_collection: "auto",
  });

  return Response.json({ url: checkout.url });
}
