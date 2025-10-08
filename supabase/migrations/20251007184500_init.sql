-- Initial schema for Todo App
create extension if not exists "pgcrypto" with schema public;
create extension if not exists "uuid-ossp" with schema public;

-- Categories table
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  color text,
  created_at timestamptz not null default now()
);

create unique index if not exists categories_user_name_unique
  on public.categories (user_id, lower(name));

create index if not exists categories_user_id_idx
  on public.categories (user_id);

-- Tasks table
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  notes text,
  category_id uuid references public.categories(id) on delete set null,
  priority text check (priority in ('low','medium','high') or priority is null),
  due_date date,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_user_id_idx on public.tasks (user_id);
create index if not exists tasks_category_id_idx on public.tasks (category_id);
create index if not exists tasks_priority_idx on public.tasks (priority);
create index if not exists tasks_completed_idx on public.tasks (completed);
create index if not exists tasks_due_date_idx on public.tasks (due_date);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at
before update on public.tasks
for each row execute procedure public.set_updated_at();

-- user_id defaulting trigger
create or replace function public.set_user_id()
returns trigger as $$
begin
  if new.user_id is null then
    new.user_id := auth.uid();
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists categories_set_user_id on public.categories;
create trigger categories_set_user_id
before insert on public.categories
for each row execute procedure public.set_user_id();

drop trigger if exists tasks_set_user_id on public.tasks;
create trigger tasks_set_user_id
before insert on public.tasks
for each row execute procedure public.set_user_id();

-- RLS policies
alter table public.categories enable row level security;
alter table public.tasks enable row level security;

drop policy if exists "categories_select_own" on public.categories;
drop policy if exists "categories_crud_own" on public.categories;

create policy "categories_select_own" on public.categories
for select using (auth.uid() = user_id);

create policy "categories_crud_own" on public.categories
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "tasks_select_own" on public.tasks;
drop policy if exists "tasks_crud_own" on public.tasks;

create policy "tasks_select_own" on public.tasks
for select using (auth.uid() = user_id);

create policy "tasks_crud_own" on public.tasks
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
