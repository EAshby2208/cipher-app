// app/_components/cipher_form.tsx

"use client";

import { useState } from "react";

export default function CipherForm({
  onProcess,
  onAnalyze,
}: {
  onProcess: (
    phrase: string,
    keyphrase: string,
    keycode: string,
    mode: "encode" | "decode",
    save: boolean
  ) => void;
  onAnalyze: (
    phrase: string,
    keyphrase: string,
    keycode: string
  ) => void;
}) {
  const [phrase, setPhrase] = useState("");
  const [keyphrase, setKeyphrase] = useState("");
  const [keycode, setKeycode] = useState("");

  const [save, setSave] = useState(true);

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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={save}
          onChange={(e) => setSave(e.target.checked)}
          id="save-checkbox"
        />
        <label htmlFor="save-checkbox" className="text-sm text-gray-500">
          Save Message
        </label>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onProcess(phrase, keyphrase, keycode, "encode", save)}
          className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-zinc-800"
        >
          Encode
        </button>

        <button
          onClick={() => onProcess(phrase, keyphrase, keycode, "decode", save)}
          className="flex-1 bg-zinc-700 text-white py-3 rounded-lg hover:bg-zinc-600"
        >
          Decode
        </button>
        {onAnalyze && (
          <button
            onClick={() => onAnalyze(phrase, keyphrase, keycode)}
            className="flex-1 bg-slate-600 text-white py-3 rounded-lg hover:bg-slate-500"
          >
            Analyze Cipher
          </button>
        )}
      </div>
    </div>
  );
}
