// app/page.tsx

import Cipher from "./_components/cipher";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-black dark:to-zinc-900 flex items-center justify-center p-6">
      <Cipher />
    </main>
  );
}
