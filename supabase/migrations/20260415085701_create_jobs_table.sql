-- 2026-0-415 create jobs table

drop table if exists analysis_jobs cascade;

create table analysis_jobs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    phrase text not null,
    keyphrase text not null,
    keycode text not null,
    status text not null check (status in ('pending', 'completed', 'failed')),
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

create policy "Allow worker updates"
on analysis_jobs
for update
using (true);
