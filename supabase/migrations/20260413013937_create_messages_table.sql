create table messages (
  id uuid primary key default gen_random_uuid(),
  phrase text not null,
  result text not null,
  keyphrase text not null,
  keycode text not null,
  created_at timestamp default now()
);