import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": Deno.env.get("FRONTEND_URL") ?? "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};
const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: cors });
const env = (name: string) => Deno.env.get(name) ?? "";
function keys() {
  const publishable = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") ?? "{}").default ?? env("SUPABASE_ANON_KEY");
  const secretMap = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}");
  const secret = secretMap.default || env("SUPABASE_SERVICE_ROLE_KEY") || env("SUPABASE_SECRET_KEY");
  if (!publishable || !secret || !env("SUPABASE_URL")) throw new Error("Supabase secrets not configured");
  return { publishable, secret };
}
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return reply(405, { error: "Method not allowed" });
  try {
    const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return reply(401, { error: "Faça login para continuar." });
    const { publishable, secret } = keys();
    const url = env("SUPABASE_URL");
    const authClient = createClient(url, publishable, { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false } });
    const { data: authData, error: authError } = await authClient.auth.getUser(token);
    if (authError || !authData.user) return reply(401, { error: "Sessão inválida." });

    const input = await req.json();
    if (!Array.isArray(input.items) || input.items.length < 1 || input.items.length > 20) return reply(400, { error: "Carrinho inválido." });
    const clean = input.items.map((item: any) => ({
      slug: String(item.slug ?? ""),
      access_type: item.access_type,
      rental_days: item.access_type === "rental" ? Number(item.rental_days) : null,
    }));
    if (clean.some((i: any) => !/^[a-z0-9-]{2,80}$/.test(i.slug) || !["purchase", "rental"].includes(i.access_type) || (i.access_type === "rental" && ![7,15,30].includes(i.rental_days)))) {
      return reply(400, { error: "Um ou mais itens do carrinho são inválidos." });
    }

    const admin = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false } });
    const slugs = [...new Set(clean.map((i: any) => i.slug))];
    const { data: books, error: booksError } = await admin.from("books").select("id,slug,title,purchase_price,rent_7_price,rent_15_price,rent_30_price").in("slug", slugs).eq("published", true);
    if (booksError || !books || books.length !== slugs.length) return reply(400, { error: "Livro indisponível no catálogo." });
    const bySlug = new Map(books.map((b: any) => [b.slug, b]));
    const items = clean.map((i: any) => {
      const b: any = bySlug.get(i.slug);
      const price = i.access_type === "purchase" ? Number(b.purchase_price) : Number(b[`rent_${i.rental_days}_price`]);
      return { book_id: b.id, title: b.title, access_type: i.access_type, rental_days: i.rental_days, unit_price: price };
    });
    const total = Number(items.reduce((sum: number, i: any) => sum + i.unit_price, 0).toFixed(2));
    const { data: order, error: orderError } = await admin.from("orders").insert({ user_id: authData.user.id, status: "pending", payment_provider: "mercadopago", total }).select("id").single();
    if (orderError || !order) throw new Error("Não foi possível criar o pedido.");
    const rows = items.map((i: any) => ({ order_id: order.id, book_id: i.book_id, access_type: i.access_type, rental_days: i.rental_days, unit_price: i.unit_price }));
    const { error: itemError } = await admin.from("order_items").insert(rows);
    if (itemError) {
      await admin.from("orders").update({ status: "cancelled" }).eq("id", order.id);
      throw new Error("Não foi possível registrar os itens do pedido.");
    }

    const mpToken = env("MERCADOPAGO_ACCESS_TOKEN");
    const notificationUrl = env("MERCADOPAGO_WEBHOOK_URL");
    if (!mpToken || !notificationUrl) {
      await admin.from("orders").update({ status: "cancelled" }).eq("id", order.id);
      return reply(503, { error: "Pagamento ainda não configurado pelo administrador." });
    }
    const origin = env("FRONTEND_URL");
    const preferenceBody = {
      items: items.map((i: any) => ({ title: i.title + (i.access_type === "rental" ? ` — aluguel ${i.rental_days} dias` : " — compra"), quantity: 1, currency_id: "BRL", unit_price: i.unit_price })),
      external_reference: order.id,
      payer: { email: authData.user.email },
      notification_url: notificationUrl,
      back_urls: { success: `${origin}/?payment=return`, failure: `${origin}/?payment=return`, pending: `${origin}/?payment=return` },
      auto_return: "approved",
      statement_descriptor: "INPUT CRIATIVO",
    };
    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: { Authorization: `Bearer ${mpToken}`, "Content-Type": "application/json", "X-Idempotency-Key": crypto.randomUUID() },
      body: JSON.stringify(preferenceBody),
    });
    const preference = await mpResponse.json();
    if (!mpResponse.ok || !preference.id || !preference.init_point) {
      await admin.from("orders").update({ status: "cancelled" }).eq("id", order.id);
      return reply(502, { error: "O Mercado Pago não conseguiu iniciar o pagamento." });
    }
    await admin.from("orders").update({ provider_preference_id: String(preference.id), checkout_url: preference.init_point }).eq("id", order.id);
    return reply(200, { order_id: order.id, checkout_url: preference.init_point });
  } catch (error) {
    console.error("checkout error", error);
    return reply(500, { error: error instanceof Error ? error.message : "Erro interno." });
  }
});