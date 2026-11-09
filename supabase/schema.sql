-- ===========================================================================
-- Lucarne — schéma de base de données
--
-- À coller dans Supabase : ton projet → SQL Editor → New query → Run.
-- Le script est rejouable : il supprime et recrée ce qu'il gère.
-- ===========================================================================

-- ------------------------------ Profils ------------------------------
-- Un profil par compte. Le pseudo est ce que les autres joueurs voient ;
-- l'adresse e-mail reste privée, dans la table d'authentification.

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  pseudo text not null unique check (char_length(pseudo) between 3 and 20),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Les profils sont visibles de tous" on public.profiles;
create policy "Les profils sont visibles de tous"
  on public.profiles for select
  using (true);

drop policy if exists "Chacun crée son profil" on public.profiles;
create policy "Chacun crée son profil"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Chacun modifie son profil" on public.profiles;
create policy "Chacun modifie son profil"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Le profil est créé automatiquement à l'inscription, à partir du pseudo
-- envoyé par l'application. Si ce pseudo est déjà pris, on y ajoute un
-- numéro plutôt que de faire échouer l'inscription.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base text := coalesce(nullif(trim(new.raw_user_meta_data ->> 'pseudo'), ''), 'Joueur');
  candidat text := base;
  n int := 0;
begin
  if char_length(base) < 3 then
    base := 'Joueur';
    candidat := base;
  end if;

  while exists (select 1 from public.profiles where pseudo = candidat) loop
    n := n + 1;
    candidat := left(base, 20 - char_length(n::text)) || n::text;
  end loop;

  insert into public.profiles (id, pseudo) values (new.id, candidat);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- --------------------------- Parties de quiz ---------------------------
-- Une ligne par partie terminée. Sert à l'historique du profil, aux
-- statistiques et, plus tard, au classement général.

create table if not exists public.quiz_games (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  theme text not null,
  difficulty text not null,
  score int not null check (score >= 0),
  correct_count int not null check (correct_count >= 0),
  total int not null check (total > 0),
  played_at timestamptz not null default now()
);

alter table public.quiz_games enable row level security;

drop policy if exists "Chacun lit ses parties" on public.quiz_games;
create policy "Chacun lit ses parties"
  on public.quiz_games for select
  using (auth.uid() = user_id);

drop policy if exists "Chacun enregistre ses parties" on public.quiz_games;
create policy "Chacun enregistre ses parties"
  on public.quiz_games for insert
  with check (auth.uid() = user_id);

create index if not exists quiz_games_user_played_idx
  on public.quiz_games (user_id, played_at desc);

-- ---------------------------- Défi du jour ----------------------------
-- Retrouver le nom d'un joueur en six essais. Une seule ligne par joueur et
-- par jour : la clé primaire suffit à garantir l'unique tentative
-- quotidienne, sans que l'application ait à y veiller.

create table if not exists public.daily_results (
  user_id uuid not null references public.profiles on delete cascade,
  day date not null,
  -- Le nom a-t-il été trouvé, et en combien d'essais (six si échec).
  found boolean not null,
  attempts int not null check (attempts between 1 and 6),
  score int not null check (score >= 0),
  played_at timestamptz not null default now(),
  primary key (user_id, day)
);

alter table public.daily_results enable row level security;

drop policy if exists "Chacun lit ses défis" on public.daily_results;
create policy "Chacun lit ses défis"
  on public.daily_results for select
  using (auth.uid() = user_id);

drop policy if exists "Chacun enregistre son défi" on public.daily_results;
create policy "Chacun enregistre son défi"
  on public.daily_results for insert
  with check (auth.uid() = user_id);
