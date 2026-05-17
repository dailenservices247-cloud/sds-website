// app/api/cron/stack-followups/route.ts
//
// Daily cron route that sends 7-day-post-purchase testimonial-ask emails to
// Stack v1 buyers.
//
// STATUS: v1 SCAFFOLD ONLY. Trigger + storage pieces are not yet wired.
//
// To activate this route in production:
//
// 1. Create a Supabase table `stack_purchases` with columns:
//      session_id text primary key
//      customer_email text not null
//      first_name text
//      purchased_at timestamptz not null default now()
//      followup_sent_at timestamptz
//
// 2. Update app/api/stripe-webhook/route.ts to INSERT a row into
//    `stack_purchases` every time a Stack checkout.session.completed fires
//    (after the welcome email send succeeds).
//
// 3. Add a Vercel cron schedule in vercel.json:
//      {
//        "crons": [{
//          "path": "/api/cron/stack-followups",
//          "schedule": "0 14 * * *"
//        }]
//      }
//    (Runs daily at 14:00 UTC = 10:00 AM EDT, before most operators' morning
//    inbox sweep so the email lands before their lunch.)
//
// 4. Set CRON_SECRET in Vercel env. This route checks the Authorization
//    header to prevent unauthorized cron invocations.
//
// 5. Uncomment the Supabase query block below + verify against staging
//    before flipping to production.

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Cron secret check — Vercel passes `Authorization: Bearer <CRON_SECRET>`.
  const secret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ---- v1.1 IMPLEMENTATION (commented until Supabase table is in place) ----
  //
  // import { createClient } from "@supabase/supabase-js";
  // import { sendPeerOperatorStackTestimonialAskEmail } from "@/lib/email";
  // import { stripe } from "@/lib/stripe";
  //
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.SUPABASE_SERVICE_ROLE_KEY!,
  // );
  //
  // const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  //
  // const { data: due, error } = await supabase
  //   .from("stack_purchases")
  //   .select("session_id, customer_email, first_name")
  //   .lte("purchased_at", sevenDaysAgo)
  //   .is("followup_sent_at", null);
  //
  // if (error) {
  //   console.error("[cron/stack-followups] Supabase query failed:", error.message);
  //   return NextResponse.json({ error: "Query failed" }, { status: 500 });
  // }
  //
  // let sent = 0;
  // let failed = 0;
  // for (const row of due ?? []) {
  //   try {
  //     // Reconstruct a minimal Checkout.Session-like object the email function expects.
  //     const session = await stripe.checkout.sessions.retrieve(row.session_id);
  //     await sendPeerOperatorStackTestimonialAskEmail(session);
  //     await supabase
  //       .from("stack_purchases")
  //       .update({ followup_sent_at: new Date().toISOString() })
  //       .eq("session_id", row.session_id);
  //     sent++;
  //   } catch (err) {
  //     console.error(`[cron/stack-followups] Send failed for ${row.session_id}:`, err);
  //     failed++;
  //   }
  // }
  //
  // return NextResponse.json({ ok: true, sent, failed, queried: due?.length ?? 0 });

  // v1 placeholder response — route exists but doesn't act yet
  return NextResponse.json({
    ok: true,
    status: "scaffold-only",
    message:
      "Stack day-7 follow-up cron route is scaffolded but not yet wired. See route source for activation steps. Supabase stack_purchases table + Vercel cron schedule needed before this route does work.",
  });
}
