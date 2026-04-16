// app/_components/dashboard.tsx

"use client";

import { useEffect, useState } from "react";
import Cipher from "./cipher";

type Message = {
    id: string;
    phrase: string;
    keyphrase: string;
    keycode: string;
    result: string;
    created_at: string;
};

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);
  
  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
     <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: Saved Message List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Saved Messages</h2>
            {messages.length === 0 ? (
                <p className="text-center text-gray-500">No messages to display.</p>
            ) : (
                <ul className="space-y-4">
                    {messages.map((msg) => (
                        <li key={msg.id} className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg">
                            <p className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</p>
                            <p className="font-semibold">Input: {msg.phrase}</p>
                            <p className="text-sm text-gray-500">Result: {msg.result}</p>
                            <p className="text-sm text-gray-500">Keyword: {msg.keyphrase} | Code: {msg.keycode}</p>
                        </li>
                    ))}
                </ul>
            )}
          </div>
          {/* RIGHT: Cipher Component */}
          <div>
            <Cipher />
          </div>
        </div>
     </div>
   );
}