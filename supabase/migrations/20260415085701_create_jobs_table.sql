create table analysis_jobs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    phrase text not null,
    keyphrase text not null,
    job_status text not null check (job_status in ('pending', 'completed', 'failed')),
    result text,
    created_at timestamp default now()
);

alter table analysis_jobs enable row level security;

create policy "Users can insert their own jobs"
on analysis_jobs
for insert
with check (auth.uid() = user_id);

create policy "Users can view their own jobs"
on analysis_jobs
for select
using (auth.uid() = user_id);