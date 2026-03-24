// app/_components/cipher_form.tsx

"use client";

import { useState } from "react";

export default function CipherForm({
  onProcess,
}: {
  onProcess: (
    phrase: string,
    keyphrase: string,
    keycode: string,
    mode: "encode" | "decode"
  ) => void;
}) {
  const [phrase, setPhrase] = useState("");
  const [keyphrase, setKeyphrase] = useState("");
  const [keycode, setKeycode] = useState("");

  return (
    <div className="space-y-4">
      <input
        placeholder="Keyword (letters only)"
        value={keyphrase}
        onChange={(e) => setKeyphrase(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />

      <input
        placeholder="Code (numbers only)"
        value={keycode}
        onChange={(e) => setKeycode(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />

      <textarea
        placeholder="Enter message to encode or decode"
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />

      <div className="flex gap-4">
        <button
          onClick={() => onProcess(phrase, keyphrase, keycode, "encode")}
          className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-zinc-800"
        >
          Encode
        </button>

        <button
          onClick={() => onProcess(phrase, keyphrase, keycode, "decode")}
          className="flex-1 bg-zinc-700 text-white py-3 rounded-lg hover:bg-zinc-600"
        >
          Decode
        </button>
      </div>
    </div>
  );
}
