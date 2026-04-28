// app/_components/dashboard.tsx

"use client";

import { useEffect, useState } from "react";
import Cipher from "./cipher";
import LogoutButton from "./logout_button";

type Message = {
    id: string;
    phrase: string;
    keyphrase: string;
    keycode: string;
    result: string;
    created_at: string;
    mode: string;
};

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/messages");
        if (!res.ok) {
          // throw new Error(`HTTP error! status: ${res.status}`);
          console.error(`Failed to fetch messages: ${res.status} ${res.statusText}`);
          setMessages([]);
          return;
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          console.error("Unexpected response format for messages:", data);
          setMessages([]);
          return;
        }
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  async function refreshMessages() {
    const res = await fetch("/api/messages", {
      credentials: "include",
    });
    if (!res.ok) {
      console.error(`Failed to refresh messages: ${res.status} ${res.statusText}`);
      return;
    }
    const data = await res.json();
    setMessages(data);
  }
  
  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 space-y-6">

      <div className="flex justify-end items-center">
        <LogoutButton />
      </div>
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: Cipher Component */}
          <div>
            <Cipher onSaved={refreshMessages} />
          </div>
          {/* RIGHT: Saved Message List */}
          <div className="max-h-[500px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-white dark:bg-zinc-900 p-2">Saved Messages</h2>
            {messages.length === 0 ? (
                <p className="text-center text-gray-500">No messages to display.</p>
            ) : (
                <ul className="space-y-4">
                    {messages.map((msg) => (
                        <li key={msg.id} className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg">
                            <p className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</p>
                            <p className="font-semibold">Input: {msg.phrase}</p>
                            <p className="text-sm text-gray-500">Mode: {msg.mode} </p>
                            <p className="text-sm text-gray-500">Result: {msg.result}</p>
                            <p className="text-sm text-gray-500">Keyword: {msg.keyphrase} | Code: {msg.keycode}</p>
                            {/* Delete Button */}
                            <button onClick={async () => {
                              if (!confirm("Delete this message?")) return;
                              try {
                                const res = await fetch(`/api/messages/${msg.id}`, {
                                  method: "DELETE",
                                  credentials: "include",
                                });
                                if (!res.ok) {
                                  console.error(`Failed to delete message: ${res.status} ${res.statusText}`);
                                  throw new Error("Failed to delete");
                                }
                                // Remove the deleted message from state
                                setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                              } catch (error) {
                                console.error("Failed to delete message:", error);
                              }
                            }} className="mt-2 text-red-500 hover:text-red-700 hover:underline text-sm">Delete</button>
                        </li>
                    ))}
                </ul>
            )}
          </div>
        </div>
     </div>
   );
}