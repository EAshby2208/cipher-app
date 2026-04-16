-- supabase/schemas/jobs_table.sql

CREATE TABLE analysis_jobs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    phrase text NOT NULL,
    keyphrase text NOT NULL,
    job_status text NOT NULL CHECK (job_status IN ('pending', 'completed', 'failed')),
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