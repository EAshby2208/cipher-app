-- 2026-04-13 create messages table

drop table if exists messages cascade;

create table messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  phrase text not null,
  result text not null,
  keyphrase text not null,
  keycode text not null,
  mode text not null check (mode in ('encode', 'decode')),
  created_at timestamp default now()
);