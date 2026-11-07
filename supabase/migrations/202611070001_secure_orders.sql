-- Migration: harden customer profile permissions and prepare provider checkout.
alter table public.orders add column if not exists provider_preference_id text unique;
alter table public.orders add column if not exists checkout_url text;
alter table public.orders add column if not exists updated_at timestamptz not null default now();

-- A customer must never be able to promote their own account or edit cashback.
drop policy if exists "profile update own" on public.profiles;
revoke update on public.profiles from authenticated;
grant select on public.profiles to authenticated;

-- Keep payment and entitlement writes server-side only.
revoke insert, update, delete on public.orders from anon, authenticated;
revoke insert, update, delete on public.order_items from anon, authenticated;
revoke insert, update, delete on public.cashback_ledger from anon, authenticated;
revoke insert, update, delete on public.books from anon, authenticated;

-- Public catalog is read-only; administrative writes use trusted server credentials.
grant select on public.books to anon, authenticated;
grant select on public.orders, public.order_items, public.cashback_ledger to authenticated;

-- Seed initial catalog entries. Update descriptions/prices and attach real book files before launch.
insert into public.books(slug,title,description,category,purchase_price,rent_7_price,rent_15_price,rent_30_price,published)
values
('tapajos','O Segredo do Rio Tapajós','Uma expedição pela Amazônia revela um mistério guardado há gerações.','Histórico',29.90,9.90,14.90,19.90,true),
('jose-egito','José do Egito','Uma narrativa sobre fé, perdão e propósito.','Histórico',24.90,8.90,12.90,17.90,true),
('sinfonia','A Sinfonia do Vazio','Um compositor procura sentido no silêncio que tomou sua vida.','Ficção',26.90,9.90,13.90,18.90,true),
('vida-roubada','Uma Vida Roubada','Uma identidade forjada e uma verdade que precisa ser descoberta.','Suspense',28.90,9.90,14.90,19.90,true)
on conflict(slug) do nothing;

-- IMPORTANT: assign role='admin' manually to a trusted user UUID in the Supabase SQL editor.
-- Never expose the service/secret key to the browser.
-- Private object storage for digital book files. Never make this bucket public.
insert into storage.buckets(id,name,public) values('books','books',false) on conflict(id) do update set public=false;
