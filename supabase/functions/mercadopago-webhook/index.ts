import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
const env = (name: string) => Deno.env.get(name) ?? "";
function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
async function validSignature(req: Request, dataId: string, secret: string) {
  const signature = req.headers.get("x-signature") ?? "";
  const requestId = req.headers.get("x-request-id") ?? "";
  const parts = Object.fromEntries(signature.split(",").map(p => p.trim().split("=", 2)));
  const ts = parts.ts ?? "", received = parts.v1 ?? "";
  if (!ts || !received || !requestId || !dataId) return false;
  const normalizedId = /^[0-9a-f]+$/i.test(dataId) ? dataId.toLowerCase() : dataId;
  const manifest = `id:${normalizedId};request-id:${requestId};ts:${ts};`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(manifest));
  const expected = [...new Uint8Array(digest)].map(x => x.toString(16).padStart(2, "0")).join("");
  const ageSeconds = Math.abs(Date.now() / 1000 - Number(ts));
  return ageSeconds <= 300 && constantTimeEqual(expected, received);
}
Deno.serve(async (req) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });
  try {
    const url = env("SUPABASE_URL");
    const secretMap = JSON.parse(env("SUPABASE_SECRET_KEYS") || "{}");
    const serviceKey = secretMap.default || env("SUPABASE_SERVICE_ROLE_KEY") || env("SUPABASE_SECRET_KEY");
    const mpToken = env("MERCADOPAGO_ACCESS_TOKEN");
    const webhookSecret = env("MERCADOPAGO_WEBHOOK_SECRET");
    if (!url || !serviceKey || !mpToken || !webhookSecret) return json(500, { error: "Webhook not configured" });
    const body = await req.json();
    const paymentId = String(body?.data?.id ?? new URL(req.url).searchParams.get("data.id") ?? "");
    if (body?.type !== "payment" || !paymentId) return json(200, { received: true, ignored: true });
    if (!await validSignature(req, paymentId, webhookSecret)) return json(401, { error: "Invalid signature" });

    const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`, { headers: { Authorization: `Bearer ${mpToken}` } });
    const payment = await paymentResponse.json();
    if (!paymentResponse.ok) return json(502, { error: "Could not verify payment with provider" });
    const orderId = String(payment.external_reference ?? "");
    if (!orderId) return json(200, { received: true, ignored: true });
    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: order, error } = await admin.from("orders").select("id,total,status").eq("id", orderId).maybeSingle();
    if (error || !order) return json(404, { error: "Order not found" });
    if (payment.currency_id !== "BRL" || Number(payment.transaction_amount).toFixed(2) !== Number(order.total).toFixed(2)) {
      console.error("payment mismatch", { orderId, paymentId });
      return json(409, { error: "Payment does not match order" });
    }
    if (payment.status === "approved") {
      if (order.status !== "paid") {
        const paidAt = payment.date_approved ?? new Date().toISOString();
        const { error: updateError } = await admin.from("orders").update({ status: "paid", provider_payment_id: String(payment.id), paid_at: paidAt, updated_at: new Date().toISOString() }).eq("id", orderId).neq("status", "paid");
        if (updateError) return json(500, { error: "Could not confirm order" });
        await admin.from("order_items").update({ access_expires_at: null }).eq("order_id", orderId).eq("access_type", "purchase");
        const { data: rentals } = await admin.from("order_items").select("id,rental_days").eq("order_id", orderId).eq("access_type", "rental");
        for (const rental of rentals ?? []) {
          const expires = new Date(Date.now() + Number(rental.rental_days) * 86400000).toISOString();
          await admin.from("order_items").update({ access_expires_at: expires }).eq("id", rental.id);
        }
      }
    } else if (["rejected", "cancelled"].includes(payment.status) && order.status === "pending") {
      await admin.from("orders").update({ status: "cancelled", provider_payment_id: String(payment.id), updated_at: new Date().toISOString() }).eq("id", orderId);
    }
    return json(200, { received: true });
  } catch (error) {
    console.error("webhook error", error);
    return json(500, { error: "Webhook processing failed" });
  }
});