-- supabase/schemas/messages.sql

DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY Default gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  phrase text NOT NULL,
  result text NOT NULL,
  keyphrase text NOT NULL,
  keycode text NOT NULL,
  mode text NOT NULL CHECK (mode IN ('encode', 'decode')),
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

DROP POLICY IF EXISTS "Users can delete their own messages" ON messages;
CREATE POLICY "Users can delete their own messages"
ON messages
FOR DELETE
USING (auth.uid() = user_id);
