import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = (subscription.metadata?.supabase_user_id as string) || undefined;
      let foundUserId = userId;
      if (!foundUserId && typeof subscription.customer === "string") {
        const { data } = await supabase.from("users").select("id").eq("stripe_customer_id", subscription.customer).single();
        foundUserId = data?.id;
      }
      if (foundUserId) {
        await supabase.from("subscriptions").upsert({
          user_id: foundUserId,
          stripe_subscription_id: subscription.id,
          status: subscription.status,
        });
        await supabase.from("users").update({ subscription_status: subscription.status }).eq("id", foundUserId);
      }
      break;
    }
    default:
      break;
  }

  return new Response(null, { status: 200 });
}
