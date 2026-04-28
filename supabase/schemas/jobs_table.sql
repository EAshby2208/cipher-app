-- supabase/schemas/jobs_table.sql

DROP TABLE IF EXISTS analysis_jobs CASCADE;

CREATE TABLE analysis_jobs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    phrase text NOT NULL,
    keyphrase text NOT NULL,
    keycode text NOT NULL,
    status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
    result text,
    created_at timestamp DEFAULT now()
);

ALTER TABLE analysis_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own jobs"
ON analysis_jobs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own jobs"
ON analysis_jobs
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs"
ON analysis_jobs
FOR UPDATE
USING (auth.uid() = user_id);
