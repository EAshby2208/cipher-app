-- supabase/schemas/messages.sql

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY Default gen_random_uuid(),
  phrase text NOT NULL,
  result text NOT NULL,
  keyphrase text NOT NULL,
  keycode text NOT NULL,
  created_at timestamp default now()
);

