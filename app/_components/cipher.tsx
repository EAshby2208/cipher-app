// app/_components/cipher.tsx

"use client";

import { useState } from "react";
import { processCipher } from "@/lib/cipher";
import CipherForm from "./cipher_form";
import CipherResult from "./cipher_result";

export default function Cipher() {
  const defaultKeyPhrase = "CIPHER";
  const defaultNums = "314159";

  const [result, setResult] = useState("");
  const [keyword, setKeyword] = useState<string[]>([]);
  const [keycode, setKeycode] = useState(defaultNums);

  async function handleProcess(
    phrase: string,
    keyphrase: string,
    keycode: string,
    mode: "encode" | "decode"
  ) {
    const keyToUse = keyphrase.trim() || defaultKeyPhrase;
    const numsToUse = keycode.trim() || defaultNums;

    try {
      const res = await fetch("/api/cipher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phrase,
          keyphrase: keyToUse,
          keycode: numsToUse,
          mode,
        }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      setResult(data.result);
      setKeyword(data.keyword);
      setKeycode(numsToUse);
    } catch (error) {
      console.error("Error processing cipher:", error);
      setResult("Error processing cipher. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Cipher Encoder / Decoder
      </h1>
      <div className="text-center text-sm text-zinc-500">
        Enter a keyword to build the cipher key, and a numeric code to encode or decode your message. If no keyword or code is provided, defaults will be used.
        <br />
        Default Keyword: <strong>{defaultKeyPhrase}</strong>, Default Code: <strong>{defaultNums}</strong>.
      </div>

      <CipherForm onProcess={handleProcess} />

      <CipherResult result={result} keyword={keyword} code={keycode}/>
    </div>
  );
}
