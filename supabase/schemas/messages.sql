-- supabase/schemas/messages.sql

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY Default gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  phrase text NOT NULL,
  result text NOT NULL,
  keyphrase text NOT NULL,
  keycode text NOT NULL,
  created_at timestamp default now()
);


ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own messages" ON messages;
CREATE POLICY "Users can insert their own messages"
ON messages
FOR INSERT
WITH CHECK (auth.uid() = user_id);
  
DROP POLICY IF EXISTS "Users can view their own messages" ON messages;
CREATE POLICY "Users can view their own messages"
ON messages
FOR SELECT
USING (auth.uid() = user_id);

