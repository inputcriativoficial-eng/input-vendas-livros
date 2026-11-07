create extension if not exists pgcrypto;
create table if not exists public.profiles(id uuid primary key references auth.users(id) on delete cascade,full_name text not null default '',role text not null default 'customer' check(role in ('customer','admin')),cashback_balance numeric(12,2) not null default 0 check(cashback_balance>=0),created_at timestamptz not null default now());
create table if not exists public.books(id uuid primary key default gen_random_uuid(),slug text unique not null,title text not null,description text not null default '',category text not null default 'Ficção',cover_url text,pdf_storage_path text,purchase_price numeric(12,2) not null check(purchase_price>=0),rent_7_price numeric(12,2) not null check(rent_7_price>=0),rent_15_price numeric(12,2) not null check(rent_15_price>=0),rent_30_price numeric(12,2) not null check(rent_30_price>=0),published boolean not null default false,created_at timestamptz not null default now());
create table if not exists public.orders(id uuid primary key default gen_random_uuid(),user_id uuid not null references public.profiles(id),status text not null default 'pending' check(status in ('pending','paid','cancelled','refunded')),payment_provider text not null default 'mercadopago',provider_payment_id text unique,provider_preference_id text unique,checkout_url text,total numeric(12,2) not null check(total>=0),created_at timestamptz not null default now(),updated_at timestamptz not null default now(),paid_at timestamptz);
create table if not exists public.order_items(id uuid primary key default gen_random_uuid(),order_id uuid not null references public.orders(id) on delete cascade,book_id uuid not null references public.books(id),access_type text not null check(access_type in ('purchase','rental')),rental_days integer check(rental_days in (7,15,30)),unit_price numeric(12,2) not null check(unit_price>=0),access_expires_at timestamptz,check((access_type='purchase' and rental_days is null) or (access_type='rental' and rental_days is not null)));
create table if not exists public.cashback_ledger(id uuid primary key default gen_random_uuid(),user_id uuid not null references public.profiles(id),order_id uuid references public.orders(id),amount numeric(12,2) not null,reason text not null,created_at timestamptz not null default now());
create index if not exists orders_user_id_idx on public.orders(user_id);
alter table public.profiles enable row level security;alter table public.books enable row level security;alter table public.orders enable row level security;alter table public.order_items enable row level security;alter table public.cashback_ledger enable row level security;
create policy "profile read own" on public.profiles for select to authenticated using(id=auth.uid());
-- Profile role and cashback are server-managed; customers cannot update their profile row directly.\nrevoke update on public.profiles from authenticated;
revoke insert, update, delete on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
create policy "published books readable" on public.books for select to anon,authenticated using(published=true);
create policy "customer reads own orders" on public.orders for select to authenticated using(user_id=auth.uid());
create policy "customer reads own order items" on public.order_items for select to authenticated using(exists(select 1 from public.orders o where o.id=order_id and o.user_id=auth.uid()));
create policy "customer reads own cashback" on public.cashback_ledger for select to authenticated using(user_id=auth.uid());
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$ begin insert into public.profiles(id,full_name) values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''));return new;end;$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
-- Criar bucket Storage 'books' como privado. A role admin deve ser provisionada apenas por operação administrativa segura.
-- Only trusted backend functions may create orders, grant access, or update payment status.
revoke insert, update, delete on public.orders from anon, authenticated;
revoke insert, update, delete on public.order_items from anon, authenticated;
revoke insert, update, delete on public.cashback_ledger from anon, authenticated;
revoke insert, update, delete on public.books from anon, authenticated;
grant select on public.books to anon, authenticated;
grant select on public.orders, public.order_items, public.cashback_ledger to authenticated;
