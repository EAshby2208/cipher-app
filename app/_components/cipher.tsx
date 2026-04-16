// app/_components/cipher.tsx

"use client";

import { useState } from "react";
import CipherForm from "./cipher_form";
import CipherResult from "./cipher_result";

export default function Cipher() {
  const defaultKeyPhrase = "CIPHER";
  const defaultNums = "314159";

  // states for encode/decode results
  const [result, setResult] = useState("");
  const [keyword, setKeyword] = useState<string[]>([]);
  const [keycode, setKeycode] = useState(defaultNums);

  // handle encode/decode processing
  async function handleProcess(
    phrase: string,
    keyphrase: string,
    keycode: string,
    mode: "encode" | "decode",
    save: boolean
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
          save,
        }),
      });

      if (!res.ok) {
        let errMessage = "Request failed";
        try {
          const err = await res.json();
          console.error("API error:", err);
          errMessage = err.error || errMessage;
        } catch {
          console.error("API error: Unable to parse error response");
        }
        if (res.status === 400) {
          errMessage = "You must be logged in to save messages.";
        }
        throw new Error(errMessage);
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


  // states for analysis
  const [analysis, setAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  // handle analysis (calls /api/analyze which creates a job for the worker to process)
  async function handleAnalyze(
    phrase: string,
    keyphrase: string,
    keycode: string,
  ) {
    const keyToUse = keyphrase.trim() || defaultKeyPhrase;
    const numsToUse = keycode.trim() || defaultNums;

    setAnalyzing(true);
    setAnalysis("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phrase,
          keyphrase: keyToUse,
          keycode: numsToUse,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("API error:", err);
        throw new Error(err.error || "Request failed");
      }

      // get job id from response
      const { jobId } = await res.json();
      // Poll for result
      const interval = setInterval(async () => {
        const statusRes = await fetch(`/api/analyze/status?jobId=${jobId}`);
        const job = await statusRes.json();

        if (job.status === "complete") {
          setAnalysis(job.result);
          setAnalyzing(false);
          clearInterval(interval);
        }
        if (job.status === "failed") {
          setAnalysis("Analysis failed.");
          setAnalyzing(false);
          clearInterval(interval);
        }
      }, 2000); // Poll every 2 seconds

    } catch (error) {
      console.error("Error analyzing cipher:", error);
      setAnalysis("Error analyzing cipher. Please try again.");
      setAnalyzing(false);
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

      <CipherForm onProcess={handleProcess} onAnalyze={handleAnalyze} />

      <CipherResult result={result} keyword={keyword} code={keycode}/>
      
      {analyzing && (
        <p className="text-sm text-zinc-500">Analyzing...</p>
      )}

      {analysis && (
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <strong>Analysis:</strong>
          <p className="mt-2 whitespace-pre-line">{analysis}</p>
        </div>
      )}
    </div>
  );
}
