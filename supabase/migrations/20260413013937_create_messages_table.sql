-- 2026-04-13 create messages table
create table messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  phrase text not null,
  result text not null,
  keyphrase text not null,
  keycode text not null,
  created_at timestamp default now()
);