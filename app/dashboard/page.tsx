// app/dashboard/page.tsx

import Dashboard from "../_components/dashboard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-black dark:to-zinc-900 flex items-center justify-center p-6">
      <Dashboard />
    </main>
  );
}