-- 2026-04-15 add policies to messages table

alter table messages enable row level security;

drop policy if exists "Users can insert their own messages" on messages;
create policy "Users can insert their own messages"
on messages
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can view their own messages" on messages;
create policy "Users can view their own messages"
on messages
for select
using (auth.uid() = user_id);

drop policy if exists "Users can delete their own messages" on messages;
create policy "Users can delete their own messages"
on messages
for delete
using (auth.uid() = user_id);
